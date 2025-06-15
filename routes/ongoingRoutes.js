import express from 'express';

const router = express.Router();

// Helper to convert "HH:mm" to minutes
function timeToMinutes(timeStr) {
  const [hour, minute] = timeStr.split(':').map(Number);
  return hour * 60 + minute;
}

export default function ongoingRoutes(scheduleData) {
  router.get('/ongoing', (req, res) => {
    const { location, route } = req.query;
    if (!location || !route) {
      return res.status(400).json({ error: 'location and route query params required' });
    }

    const schedules = scheduleData[location]?.[route];
    if (!schedules) {
      return res.status(404).json({ error: 'No schedules found for location/route' });
    }

    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    const ongoing = schedules.find(sch => {
      const startMins = timeToMinutes(sch.starting_time);
      const endMins = timeToMinutes(sch.ending_time);
      return nowMinutes >= startMins && nowMinutes <= endMins;
    });

    if (ongoing) {
      res.json(ongoing);
    } else {
      res.json({});
    }
  });

  return router;
}
