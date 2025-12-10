"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalAdviceFlow = exports.cropDiagnosisFlow = void 0;
const genkit_1 = require("genkit");
const googleai_1 = require("@genkit-ai/googleai");
// Initialize Genkit
const ai = (0, genkit_1.genkit)({
    plugins: [(0, googleai_1.googleAI)()],
    model: googleai_1.gemini15Pro,
});
// Define a flow for Crop Diagnosis
exports.cropDiagnosisFlow = ai.defineFlow({
    name: 'cropDiagnosis',
    inputSchema: genkit_1.z.object({
        imageDescription: genkit_1.z.string(),
        region: genkit_1.z.string(),
        language: genkit_1.z.string().optional(),
    }),
    outputSchema: genkit_1.z.object({
        diagnosis: genkit_1.z.string(),
        advice: genkit_1.z.string(),
    }),
}, async (input) => {
    const { text } = await ai.generate(`
      You are an expert agricultural advisor for smallholder farmers in Kenya.
      
      Task: Diagnose the crop disease and provide advice.
      Input Description: ${input.imageDescription}
      Region: ${input.region}
      Language: ${input.language || 'English'}
      
      Format your response as valid JSON with 'diagnosis' and 'advice' fields.
      Ensure the advice is practical, low-cost, and suitable for the region.
    `);
    // Simple parsing (in production use structuredOutput or json mode if supported)
    try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        return { diagnosis: "Could not parse diagnosis", advice: text };
    }
    catch (e) {
        return { diagnosis: "Error", advice: text };
    }
});
// Define a flow for General Advice
exports.generalAdviceFlow = ai.defineFlow({
    name: 'generalAdvice',
    inputSchema: genkit_1.z.object({
        topic: genkit_1.z.string(),
        location: genkit_1.z.string(),
    }),
    outputSchema: genkit_1.z.string(),
}, async (input) => {
    const { text } = await ai.generate(`
            Provide timely agricultural advice for: ${input.topic}
            Location: ${input.location}
            Consider local season and common practices in Kenya.
        `);
    return text;
});
