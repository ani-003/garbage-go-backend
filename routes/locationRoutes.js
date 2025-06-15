import express from 'express';
import { appendLog, readLogs } from '../utils/logManager.js';

export default function locationRoutes(scheduleData, truckLandmarkState) {
  const router = express.Router();

  // POST /api/location/update-status
  router.post('/update-status', (req, res) => {
    const { latitude, longitude, municipality, route, truck_id } = req.body;

    if (
      typeof latitude !== 'number' ||
      typeof longitude !== 'number' ||
      !municipality ||
      !route ||
      !truck_id
    ) {
      return res.status(400).json({ error: 'latitude, longitude, municipality, route, and truck_id are required' });
    }

    const key = `${truck_id}_${route}`;
    if (!truckLandmarkState[key]) truckLandmarkState[key] = new Set();

    const landmarks = scheduleData?.[municipality]?.[route]?.landmarks || [];
    const lastLog = readLogs()
      .filter(log => log.truck_id === truck_id)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];

    let status = 'moving';

    // Function to calculate distance (in km) using Haversine formula
    const getDistance = (lat1, lon1, lat2, lon2) => {
      const toRad = angle => (angle * Math.PI) / 180;
      const R = 6371; // Radius of Earth in km
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    // Find closest landmark within 50 meters
    let nearestLandmark = null;
    for (const landmark of landmarks) {
      const distance = getDistance(latitude, longitude, landmark.latitude, landmark.longitude);
      if (distance <= 0.05) { // 50 meters
        nearestLandmark = landmark;
        break;
      }
    }

    if (!lastLog) {
      status = nearestLandmark
        ? `started from ${nearestLandmark.name}`
        : 'started';
    } else if (nearestLandmark) {
      const visited = truckLandmarkState[key];

      if (!visited.has(nearestLandmark.name)) {
        status = `reached ${nearestLandmark.name}`;
        visited.add(nearestLandmark.name);
      } else {
        status = `at ${nearestLandmark.name}`;
      }
    }

    const logEntry = {
      latitude,
      longitude,
      municipality,
      route,
      truck_id,
      status,
      timestamp: new Date().toISOString()
    };

    appendLog(logEntry);

    res.json({ message: 'Location status logged', logEntry });
  });

  // GET /api/location/current-status?truck_id=xxx
  router.get('/current-status', (req, res) => {
    const { truck_id } = req.query;
    if (!truck_id) {
      return res.status(400).json({ error: 'truck_id required' });
    }

    const logs = readLogs();
    const truckLogs = logs.filter(log => log.truck_id === truck_id);

    if (truckLogs.length === 0) {
      return res.status(404).json({ error: 'No logs found for this truck' });
    }

    truckLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    res.json(truckLogs[0]); // Latest status
  });

  return router;
}
