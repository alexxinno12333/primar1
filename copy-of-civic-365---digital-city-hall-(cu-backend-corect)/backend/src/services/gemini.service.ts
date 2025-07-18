
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { ReportClassification } from '../types';
import config from '../config';

const ai = new GoogleGenAI({ apiKey: config.apiKey! });

export const getAiAssistance = async (prompt: string): Promise<string> => {
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Un cetățean din Popești-Leordeni are următoarea solicitare: "${prompt}". Oferă un răspuns scurt și clar.`,
            config: {
                systemInstruction: "Ești un asistent virtual al Primăriei Popești-Leordeni. Răspunde scurt, la subiect și strict cu informații relevante pentru orașul Popești-Leordeni. Nu oferi informații generale despre România. Fii amabil și eficient. Răspunsurile trebuie să fie în limba română.",
                temperature: 0.3,
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error getting AI assistance:", error);
        throw new Error("Eroare la comunicarea cu asistentul AI.");
    }
};

export const classifyReport = async (base64Image: string, description: string): Promise<ReportClassification> => {
    const imagePart = {
        inlineData: {
            mimeType: 'image/jpeg',
            data: base64Image,
        },
    };

    const textPart = {
        text: `Analizează această imagine și descrierea unei probleme semnalate de un cetățean într-un oraș din România. Descriere: "${description}". Bazat pe imagine și text, te rog să returnezi un obiect JSON cu următoarea structură: { "problemType": "...", "suggestedDepartment": "...", "urgency": "..." }. Câmpul 'problemType' trebuie să fie o clasificare scurtă (ex: 'Gropă în asfalt', 'Gunoi neridicat', 'Iluminat stradal defect', 'Parcare ilegală'). Câmpul 'suggestedDepartment' trebuie să fie departamentul primăriei responsabil (ex: 'Administrația Străzilor', 'Salubritate', 'Direcția Tehnică', 'Poliția Locală'). Câmpul 'urgency' poate fi 'Scăzută', 'Medie' sau 'Ridicata'.`,
    };

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: { parts: [imagePart, textPart] },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        problemType: { type: Type.STRING, description: "Tipul problemei identificate." },
                        suggestedDepartment: { type: Type.STRING, description: "Departamentul sugerat pentru soluționare." },
                        urgency: { type: Type.STRING, description: "Nivelul de urgență al sesizării." },
                    },
                    required: ["problemType", "suggestedDepartment", "urgency"]
                }
            }
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as ReportClassification;
    } catch (error) {
        console.error("Error classifying report:", error);
        throw new Error("Nu s-a putut clasifica sesizarea.");
    }
};
