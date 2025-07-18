

export type View = 'dashboard' | 'ai_assistant' | 'reports' | 'appointments' | 'polls' | 'calendar' | 'marketplace' | 'city_hall_dashboard' | 'city_hall_reports' | 'city_hall_appointments' | 'city_hall_announcements';

export type UserRole = 'citizen' | 'employee';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar: string;
}

export interface NavItem {
    id: View;
    label: string;
    icon: (props: { className: string }) => React.ReactNode;
}

export interface ChatMessage {
    sender: 'user' | 'ai';
    text: string;
}

export interface ReportClassification {
    problemType: string;
    suggestedDepartment: string;
    urgency: 'Scăzută' | 'Medie' | 'Ridicata';
}

export interface FullReport extends ReportClassification {
    id: string;
    citizenId: string;
    timestamp: string;
    description: string;
    base64Image: string;
    status: 'Nouă' | 'În analiză' | 'Rezolvată';
    internalNotes?: string;
    assignedTo?: string;
    rating?: number;
    feedbackComment?: string;
}

export interface Appointment {
    id: string;
    citizenId: string;
    citizenName: string;
    institution: string;
    service: string;
    date: string;
    time: string;
    status: 'Așteptare' | 'Confirmat' | 'Finalizat' | 'Anulat';
    qrCodeUrl: string;
}

export interface Announcement {
    id: string;
    title: string;
    content: string;
    timestamp: string;
}

export interface LocalBusiness {
    id: string;
    citizenId: string;
    citizenName: string;
    name: string;
    category: string;
    description: string;
    phone: string;
    email?: string;
    website?: string;
    base64Image?: string;
    approved: boolean;
    timestamp: string;
}