// Mock Twilio Service
// import twilio from 'twilio';

export const sendSMS = async (to: string, message: string) => {
    console.log(`[SMS MOCK] Sending to ${to}: ${message}`);
    // In production:
    // const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
    // await client.messages.create({ to, from: process.env.TWILIO_PHONE, body: message });
    return true;
};
