
import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import * as geminiService from '../services/gemini.service';
import * as reportService from '../services/report.service';

export const getAssistance = async (req: AuthenticatedRequest, res: Response) => {
    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).json({ message: "Prompt is required." });
    }
    try {
        const responseText = await geminiService.getAiAssistance(prompt);
        res.json({ text: responseText });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message || "Error getting AI assistance" });
    }
};


export const getReportStatus = async(req: AuthenticatedRequest, res: Response) => {
    const { reportId } = req.params;
    try {
        const report = await reportService.findById(reportId);

        if (!report) {
            return res.status(404).json({ message: `Nu am găsit nicio sesizare cu codul **${reportId}**.`});
        }
        
        // Security check: Citizens can only check their own reports.
        if (req.user!.role === 'citizen' && report.citizenId !== req.user!.id) {
            return res.status(403).json({ message: 'Nu aveți permisiunea să vizualizați această sesizare.' });
        }

        res.json({ message: `Sesizarea cu codul **${report.id}** are statusul: **${report.status}**.` });

    } catch(error) {
         res.status(500).json({ message: 'Eroare la verificarea statusului sesizării.' });
    }
}