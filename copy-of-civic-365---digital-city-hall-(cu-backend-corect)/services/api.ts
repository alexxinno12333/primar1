

import { User, FullReport, Appointment, Announcement, LocalBusiness } from "../types";

const API_BASE_URL = 'http://localhost:3001/api'; // The backend server URL

// Helper function to handle fetch requests
const apiRequest = async (endpoint: string, method: string, body?: any, token?: string | null) => {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
        method,
        headers,
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(errorData.message || 'API request failed');
    }

    // For 204 No Content, there is no body to parse
    if (response.status === 204) {
        return null;
    }

    return response.json();
};

// --- Auth ---
export const apiLogin = async (email: string, password: string): Promise<{ token: string; user: User }> => {
    return apiRequest('/auth/login', 'POST', { email, password });
};

export const apiRegister = async (name: string, email: string, password: string): Promise<User> => {
    return apiRequest('/auth/register', 'POST', { name, email, password });
};

export const apiGetMe = async (token: string): Promise<User> => {
    return apiRequest('/auth/me', 'GET', null, token);
};

// --- Generic getter for functions that need the token ---
const getAuthToken = () => {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('No auth token found');
    return token;
}

// --- Reports ---
export const apiGetReports = async (): Promise<FullReport[]> => {
    return apiRequest('/reports', 'GET', null, getAuthToken());
};

export const apiAddReport = async (data: { description: string, base64Image: string }): Promise<FullReport> => {
    return apiRequest('/reports', 'POST', data, getAuthToken());
};

export const apiUpdateReportStatus = async (id: string, status: FullReport['status']): Promise<FullReport> => {
    return apiRequest(`/reports/${id}/status`, 'PUT', { status }, getAuthToken());
};

export const apiUpdateReportDetails = async (id: string, details: { internalNotes?: string, assignedTo?: string }): Promise<FullReport> => {
    return apiRequest(`/reports/${id}/details`, 'PUT', details, getAuthToken());
};

export const apiSubmitFeedback = async (id: string, feedback: { rating: number, comment?: string }): Promise<FullReport> => {
    return apiRequest(`/reports/${id}/feedback`, 'POST', feedback, getAuthToken());
};

// --- Appointments ---
export const apiGetAppointments = async (): Promise<Appointment[]> => {
    return apiRequest('/appointments', 'GET', null, getAuthToken());
};

export const apiAddAppointment = async (data: Omit<Appointment, 'id' | 'status' | 'citizenId' | 'citizenName' | 'qrCodeUrl'>): Promise<Appointment> => {
    return apiRequest('/appointments', 'POST', data, getAuthToken());
};

export const apiUpdateAppointmentStatus = async (id: string, status: Appointment['status']): Promise<Appointment> => {
    return apiRequest(`/appointments/${id}/status`, 'PUT', { status }, getAuthToken());
};

// --- Announcements ---
// This is public, so no token needed.
export const apiGetAnnouncements = async (): Promise<Announcement[]> => {
    return apiRequest('/announcements', 'GET');
};

export const apiAddAnnouncement = async (data: { title: string, content: string }): Promise<Announcement> => {
    return apiRequest('/announcements', 'POST', data, getAuthToken());
};

export const apiDeleteAnnouncement = async (id: string): Promise<null> => {
    return apiRequest(`/announcements/${id}`, 'DELETE', null, getAuthToken());
};

// --- AI Assistant ---
export const apiGetAiAssistance = async (prompt: string): Promise<{ text: string }> => {
    return apiRequest('/ai/assist', 'POST', { prompt }, getAuthToken());
};

export const apiGetReportStatus = async (reportId: string): Promise<{ message: string }> => {
    return apiRequest(`/ai/report-status/${reportId}`, 'GET', null, getAuthToken());
};

// --- Marketplace ---
export const apiGetBusinesses = async (): Promise<LocalBusiness[]> => {
    return apiRequest('/marketplace', 'GET', null, getAuthToken());
};

export type AddBusinessData = Omit<LocalBusiness, 'id' | 'citizenId' | 'citizenName' | 'approved' | 'timestamp'>;

export const apiAddBusiness = async (data: AddBusinessData): Promise<LocalBusiness> => {
    return apiRequest('/marketplace', 'POST', data, getAuthToken());
};