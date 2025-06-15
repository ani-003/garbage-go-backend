const express = require('express');
const router = express.Router();

module.exports = (scheduleData) => {
    router.get('/', (req, res) => {
        const { municipality, route } = req.query;
        const area = scheduleData[municipality];

        if (!area || !area[route]) return res.status(404).json({ error: "Route not found" });

        const active = area[route].find(sch => sch.collection_status === "ongoing");
        if (!active) return res.json({ message: "No collection in progress" });

        res.json(active);
    });

    return router;
};
