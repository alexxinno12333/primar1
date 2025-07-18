
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { FullReport } from '../types';
import { 
    apiGetReports, 
    apiAddReport, 
    apiUpdateReportStatus, 
    apiUpdateReportDetails, 
    apiSubmitFeedback 
} from '../services/api';

interface ReportsContextType {
    reports: FullReport[];
    addReport: (reportData: { description: string, base64Image: string }) => Promise<void>;
    updateReportStatus: (reportId: string, newStatus: FullReport['status']) => Promise<void>;
    updateReportDetails: (reportId: string, details: { internalNotes?: string; assignedTo?: string }) => Promise<void>;
    submitFeedback: (reportId: string, rating: number, comment?: string) => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

const ReportsContext = createContext<ReportsContextType | undefined>(undefined);

export const ReportsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [reports, setReports] = useState<FullReport[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                setIsLoading(true);
                const data = await apiGetReports();
                setReports(data);
                setError(null);
            } catch (err) {
                setError('Nu s-au putut încărca sesizările.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchReports();
    }, []);

    const addReport = async (reportData: { description: string; base64Image: string }) => {
        const newReport = await apiAddReport(reportData);
        setReports(prevReports => [newReport, ...prevReports]);
    };

    const updateReportStatus = async (reportId: string, newStatus: FullReport['status']) => {
        const updatedReport = await apiUpdateReportStatus(reportId, newStatus);
        setReports(prevReports =>
            prevReports.map(report =>
                report.id === reportId ? updatedReport : report
            )
        );
    };

    const updateReportDetails = async (reportId: string, details: { internalNotes?: string; assignedTo?: string }) => {
        const updatedReport = await apiUpdateReportDetails(reportId, details);
        setReports(prevReports =>
            prevReports.map(report =>
                report.id === reportId ? updatedReport : report
            )
        );
    };

    const submitFeedback = async (reportId: string, rating: number, comment?: string) => {
        const updatedReport = await apiSubmitFeedback(reportId, { rating, comment });
        setReports(prevReports =>
            prevReports.map(report =>
                report.id === reportId ? updatedReport : report
            )
        );
    };

    return (
        <ReportsContext.Provider value={{ reports, addReport, updateReportStatus, updateReportDetails, submitFeedback, isLoading, error }}>
            {children}
        </ReportsContext.Provider>
    );
};

export const useReports = (): ReportsContextType => {
    const context = useContext(ReportsContext);
    if (context === undefined) {
        throw new Error('useReports must be used within a ReportsProvider');
    }
    return context;
};
