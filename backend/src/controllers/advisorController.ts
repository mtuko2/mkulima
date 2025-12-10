import { Request, Response } from 'express';
import { cropDiagnosisFlow, generalAdviceFlow, marketPriceFlow } from '../genkit';

export const analyzeCrop = async (req: Request, res: Response) => {
    try {
        const { imageDescription, region, language } = req.body;
        // In a real implementation, we would handle image upload and use Cloud Vision API 
        // to get the 'imageDescription' before passing it to Genkit.

        const result = await cropDiagnosisFlow({ imageDescription, region, language });
        res.json(result);
    } catch (error) {
        console.error('Error in analyzeCrop:', error);
        res.status(500).json({ error: 'Failed to analyze crop' });
    }
};

export const getAdvice = async (req: Request, res: Response) => {
    try {
        const { topic, location } = req.body;
        const result = await generalAdviceFlow({ topic, location });
        res.json({ advice: result });
    } catch (error) {
        console.error('Error in getAdvice:', error);
        res.status(500).json({ error: 'Failed to get advice' });
    }
};

export const getMarketPrice = async (req: Request, res: Response) => {
    try {
        const { crop, region } = req.body;
        const result = await marketPriceFlow({ crop, region });
        res.json(result);
    } catch (error) {
        console.error('Error in getMarketPrice:', error);
        res.status(500).json({ error: 'Failed to get market price' });
    }
};
