import { genkit, z } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

// Initialize Genkit
const ai = genkit({
    plugins: [googleAI()],
    // We set a default, but we override it in the flows below
    model: 'googleai/gemini-3-pro-preview',
});

// 1. Shared Schema (Best Practice)
const CropDiagnosisSchema = z.object({
    diagnosis: z.string().describe("The name of the disease or pest identified"),
    reasoning: z.string().describe("The hidden reasoning process used to reach this diagnosis"), // Optional: capture the thought process
    advice: z.string().describe("Practical, low-cost steps the farmer can take"),
});

// Define a flow for Crop Diagnosis (Using Gemini 3 Thinking)
export const cropDiagnosisFlow = ai.defineFlow(
    {
        name: 'cropDiagnosis',
        inputSchema: z.object({
            imageDescription: z.string(),
            region: z.string(),
            language: z.string().optional(),
        }),
        outputSchema: CropDiagnosisSchema,
    },
    async (input) => {
        try {
            const { output } = await ai.generate({
                model: 'googleai/gemini-3-pro-preview', // Latest V3 Model

                system: "You are an expert agricultural advisor.",

                prompt: `
                    Analyze this crop issue:
                    - Description: ${input.imageDescription}
                    - Region: ${input.region}
                    
                    Think deeply about the symptoms, local climate, and similar looking diseases before diagnosing.
                `,

                // FORCE STRUCTURED JSON OUTPUT
                output: { schema: CropDiagnosisSchema },

                config: {
                    // ENABLE GEMINI 3 THINKING
                    thinkingConfig: {
                        includeThoughts: true, // Returns the thinking trace if supported
                        thinkingLevel: 'HIGH', // Forces deeper reasoning
                    },
                    temperature: 0.2,
                }
            });

            if (!output) throw new Error("No output returned");
            return output;

        } catch (e: any) {
            console.error("Gemini 3 Error:", e.message);
            // Fallback to V2 or Mock if V3 is quota-limited/unavailable
            return {
                diagnosis: "Service Busy",
                reasoning: "Fallback triggered",
                advice: "Please try again in a moment."
            };
        }
    }
);

// Define a flow for General Advice
export const generalAdviceFlow = ai.defineFlow(
    {
        name: 'generalAdvice',
        inputSchema: z.object({
            topic: z.string(),
            location: z.string(),
        }),
        outputSchema: z.string(),
    },
    async (input) => {
        // We can use a lower thinking level for general advice to save tokens
        const { text } = await ai.generate({
            model: 'googleai/gemini-3-pro-preview',
            prompt: `Advice for ${input.topic} in ${input.location}`,
            config: {
                thinkingConfig: { thinkingLevel: 'LOW' } // Faster response
            }
        });
        return text;
    }
);

export const marketPriceFlow = ai.defineFlow(
    {
        name: 'marketPrice',
        inputSchema: z.object({
            crop: z.string(),
            region: z.string(),
        }),
        outputSchema: z.object({
            price: z.string(), // Estimated price range
            trend: z.string(), // Up, Down, Stable
            source: z.string(), // Citation or methodology
            reasoning: z.string().optional(),
        }),
    },
    async (input) => {
        try {
            const { output } = await ai.generate({
                model: 'googleai/gemini-3-pro-preview',
                prompt: `
                    Estimate the current market price for ${input.crop} in ${input.region}, Kenya.
                    
                    CRITICAL INSTRUCTION:
                    If the crop is "Pork", "Pig", or related products AND the region is known to be predominantly Muslim (e.g., Mombasa, Wajir, Mandera, Garissa, Lamu, Isiolo, Kilifi), you MUST:
                    1. Set 'price' to "N/A (Cultural Restriction)".
                    2. Set 'trend' to "N/A".
                    3. In 'reasoning', politely explain that pork farming/sales may face cultural or religious resistance in this region due to Islamic beliefs.
                    4. In 'source', advise checking with specific local non-Muslim butchers if applicable.
                    
                    Otherwise, proceed with normal estimation considering:
                    - Current season (is it harvest time?)
                    - Recent weather patterns affecting supply.
                    - Typical wholesale vs retail prices.
                    
                    Provide a realistic estimation even if exact real-time data is unavailable.
                    State the trend (Stable, Rising, Falling).
                `,
                output: {
                    schema: z.object({
                        price: z.string(),
                        trend: z.string(),
                        source: z.string(),
                        reasoning: z.string(),
                    })
                },
                config: {
                    thinkingConfig: { thinkingLevel: 'LOW' },
                    temperature: 0.3
                }
            });

            if (!output) throw new Error("No output");
            return output;
        } catch (e: any) {
            console.error("Gemini Market Price Error:", e.message);
            return {
                price: "Price Unavailable",
                trend: "Unknown",
                source: "System Error",
                reasoning: "Failed to connect to AI pricing service."
            };
        }
    }
);