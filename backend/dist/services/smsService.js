"use strict";
// Mock Twilio Service
// import twilio from 'twilio';
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSMS = void 0;
const sendSMS = async (to, message) => {
    console.log(`[SMS MOCK] Sending to ${to}: ${message}`);
    // In production:
    // const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
    // await client.messages.create({ to, from: process.env.TWILIO_PHONE, body: message });
    return true;
};
exports.sendSMS = sendSMS;
