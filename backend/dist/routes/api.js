"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const advisorController_1 = require("../controllers/advisorController");
const smsController_1 = require("../controllers/smsController");
const router = (0, express_1.Router)();
router.post('/advisor/crop-diagnosis', advisorController_1.analyzeCrop);
router.post('/advisor/general', advisorController_1.getAdvice);
router.post('/sms', smsController_1.handleIncomingSMS);
// Mock Weather Route
router.get('/weather', (req, res) => {
    const { lat, lon } = req.query;
    res.json({
        location: "Nairobi", // Mock
        temp: 24,
        condition: "Partly Cloudy",
        alerts: []
    });
});
// Mock Market Route
router.get('/market', (req, res) => {
    const { crop, region } = req.query;
    res.json({
        crop: crop || "Maize",
        price: "4500 KES per 90kg bag",
        trend: "stable",
        source: "KAOP (Mock)"
    });
});
exports.default = router;
