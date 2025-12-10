"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdvice = exports.analyzeCrop = void 0;
const genkit_1 = require("../genkit");
const analyzeCrop = async (req, res) => {
    try {
        const { imageDescription, region, language } = req.body;
        // In a real implementation, we would handle image upload and use Cloud Vision API 
        // to get the 'imageDescription' before passing it to Genkit.
        const result = await (0, genkit_1.cropDiagnosisFlow)({ imageDescription, region, language });
        res.json(result);
    }
    catch (error) {
        console.error('Error in analyzeCrop:', error);
        res.status(500).json({ error: 'Failed to analyze crop' });
    }
};
exports.analyzeCrop = analyzeCrop;
const getAdvice = async (req, res) => {
    try {
        const { topic, location } = req.body;
        const result = await (0, genkit_1.generalAdviceFlow)({ topic, location });
        res.json({ advice: result });
    }
    catch (error) {
        console.error('Error in getAdvice:', error);
        res.status(500).json({ error: 'Failed to get advice' });
    }
};
exports.getAdvice = getAdvice;
