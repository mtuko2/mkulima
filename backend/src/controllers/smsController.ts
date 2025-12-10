import { Request, Response } from 'express';
import { sendSMS } from '../services/smsService';

export const handleIncomingSMS = async (req: Request, res: Response) => {
    const { From, Body } = req.body;

    console.log(`Received SMS from ${From}: ${Body}`);

    let reply = "Welcome to Mkulima Help. Send 'Weather' or 'Maize Price' for info.";

    if (Body && Body.toLowerCase().includes('weather')) {
        reply = "Weather in Nairobi: 24°C, Cloudy. High 26°C.";
    } else if (Body && Body.toLowerCase().includes('price')) {
        reply = "Maize price: 4500 KES/bag. Beans: 8000 KES/bag around Nairobi.";
    }

    // Simulate sending reply (in real Twilio, this might be TwiML response or async API call)
    await sendSMS(From, reply);

    res.type('text/xml');
    res.send('<Response></Response>');
};
