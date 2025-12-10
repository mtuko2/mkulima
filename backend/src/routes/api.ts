import { Router } from 'express';
import { analyzeCrop, getAdvice, getMarketPrice } from '../controllers/advisorController';

import { handleIncomingSMS } from '../controllers/smsController';

const router = Router();

router.post('/advisor/crop-diagnosis', analyzeCrop);
router.post('/advisor/general', getAdvice);
router.post('/advisor/market', getMarketPrice);
router.post('/sms', handleIncomingSMS);

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

export default router;
