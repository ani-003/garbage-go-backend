import fetch from 'node-fetch';

const landmarks = [
  { lat: 22.65752, lng: 88.377101, name: "Start of Nilgunj Road" },
  { lat: 22.66022, lng: 88.377101, name: "WBTC Bus Depot" },
  { lat: 22.66292, lng: 88.377101, name: "Indrapally Nilgunj Rd" },
  { lat: 22.66562, lng: 88.377101, name: "Rathtala More" },
  { lat: 22.66832, lng: 88.377101, name: "Panchatala New Rd" },
  { lat: 22.67102, lng: 88.377101, name: "Arabinda Maydaan" },
  { lat: 22.67372, lng: 88.377101, name: "Old Nimta Rd" },
  { lat: 22.67642, lng: 88.377101, name: "Colony Bazaar Rd" },
  { lat: 22.67912, lng: 88.377101, name: "6 Matha More" },
  { lat: 22.68182, lng: 88.377101, name: "NIT More" },
];

const interval = 5000; // 5 seconds
let index = 0;

function sendNextLocation() {
  if (index >= landmarks.length) {
    console.log('All landmarks sent.');
    return;
  }

  const landmark = landmarks[index];

  const payload = {
    latitude: landmark.lat,
    longitude: landmark.lng,
    municipality: "Kamarhati",
    route: "Nilgunj Rd - Narula More",
    truck_id: "T354",
    landmark_name: landmark.name,
    timestamp: new Date().toISOString(),
  };

  console.log(`Sending landmark #${index + 1}:`, payload);

  fetch('http://localhost:5000/api/location/update-status', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then(res => res.json())
    .then(data => {
      console.log('Server response:', data);
      index++;
      setTimeout(sendNextLocation, interval);
    })
    .catch(err => {
      console.error('Error sending location:', err);
      index++;
      setTimeout(sendNextLocation, interval);
    });
}

sendNextLocation();
