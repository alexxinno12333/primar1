
import { reports } from '../data/db';
import { FullReport, ReportClassification, User } from '../types';
import * as geminiService from './gemini.service';

// In a real app, these functions would interact with a database.

export const findAll = async (user: User): Promise<FullReport[]> => {
    // Employees see all reports, citizens see only their own.
    if (user.role === 'employee') {
        return [...reports].sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }
    return reports.filter(r => r.citizenId === user.id).sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const create = async (reportData: { description: string; base64Image: string }, citizenId: string): Promise<FullReport> => {
    const classification = await geminiService.classifyReport(reportData.base64Image, reportData.description);
    
    const newReport: FullReport = {
        ...reportData,
        ...classification,
        id: `S${new Date().getTime().toString().slice(-6)}`,
        citizenId,
        timestamp: new Date().toISOString(),
        status: 'Nouă',
    };
    
    reports.unshift(newReport); // Add to the beginning of the array
    return newReport;
};

export const updateStatus = async (reportId: string, newStatus: FullReport['status']): Promise<FullReport | undefined> => {
    const reportIndex = reports.findIndex(r => r.id === reportId);
    if (reportIndex === -1) return undefined;

    reports[reportIndex].status = newStatus;
    return reports[reportIndex];
};

export const updateDetails = async (reportId: string, details: { internalNotes?: string; assignedTo?: string }): Promise<FullReport | undefined> => {
    const reportIndex = reports.findIndex(r => r.id === reportId);
    if (reportIndex === -1) return undefined;
    
    reports[reportIndex] = { ...reports[reportIndex], ...details };
    return reports[reportIndex];
};

export const submitFeedback = async (reportId: string, citizenId: string, rating: number, comment?: string): Promise<FullReport | undefined> => {
    const reportIndex = reports.findIndex(r => r.id === reportId && r.citizenId === citizenId);
    if (reportIndex === -1) return undefined;

    reports[reportIndex].rating = rating;
    if (comment) {
        reports[reportIndex].feedbackComment = comment;
    }
    return reports[reportIndex];
};

export const findById = async (reportId: string): Promise<FullReport | undefined> => {
    return reports.find(r => r.id.toUpperCase() === reportId.toUpperCase());
}
