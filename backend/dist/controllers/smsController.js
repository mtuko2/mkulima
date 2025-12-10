"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleIncomingSMS = void 0;
const smsService_1 = require("../services/smsService");
const handleIncomingSMS = async (req, res) => {
    const { From, Body } = req.body;
    console.log(`Received SMS from ${From}: ${Body}`);
    let reply = "Welcome to Mkulima Help. Send 'Weather' or 'Maize Price' for info.";
    if (Body && Body.toLowerCase().includes('weather')) {
        reply = "Weather in Nairobi: 24°C, Cloudy. High 26°C.";
    }
    else if (Body && Body.toLowerCase().includes('price')) {
        reply = "Maize price: 4500 KES/bag. Beans: 8000 KES/bag around Nairobi.";
    }
    // Simulate sending reply (in real Twilio, this might be TwiML response or async API call)
    await (0, smsService_1.sendSMS)(From, reply);
    res.type('text/xml');
    res.send('<Response></Response>');
};
exports.handleIncomingSMS = handleIncomingSMS;
