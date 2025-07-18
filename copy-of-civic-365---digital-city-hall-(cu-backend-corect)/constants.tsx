

import React from 'react';
import { NavItem, User, View } from './types';

const HomeIcon = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

const ChatIcon = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V7a2 2 0 012-2h2m6-1a1 1 0 00-1-1H9a3 3 0 00-3 3v8a3 3 0 003 3h6l4 4V10a3 3 0 00-3-3z" />
    </svg>
);

const FlagIcon = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6H8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
    </svg>
);

const CalendarIcon = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const InboxIcon = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
    </svg>
);

const ClipboardListIcon = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
);

const MegaphoneIcon = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.136A1.76 1.76 0 015.88 9.518H5.88a1.76 1.76 0 011.696-1.07l2.147-6.136A1.76 1.76 0 0111 5.882zM19 11.882l-2.147-6.136A1.76 1.76 0 0015.155 5H15.155a1.76 1.76 0 00-1.696 1.07l-2.147 6.136A1.76 1.76 0 0011 13.482V19.24a1.76 1.76 0 003.417.592l2.147-6.136A1.76 1.76 0 0019 11.882z" />
    </svg>
);

const BuildingStorefrontIcon = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5A.75.75 0 0 1 14.25 12h.5a.75.75 0 0 1 .75.75v7.5m-4.5 0v-7.5A.75.75 0 0 0 9.75 12h.5a.75.75 0 0 0 .75.75v7.5m-4.5 0v-7.5A.75.75 0 0 1 5.25 12h.5a.75.75 0 0 1 .75.75v7.5m-1.5-15-3-3m0 0-3 3m3-3v11.25m6-11.25-3-3m0 0-3 3m3-3v11.25m6-11.25-3-3m0 0-3 3m3-3v11.25M3.75 21h16.5a1.5 1.5 0 0 0 1.5-1.5v-6a1.5 1.5 0 0 0-1.5-1.5H3.75a1.5 1.5 0 0 0-1.5 1.5v6a1.5 1.5 0 0 0 1.5 1.5Z" />
    </svg>
);

export const LogoutIcon = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);

export const USERS: User[] = [
    { id: 'user_1', name: 'Popescu Ion', email: 'cetatean@test.com', role: 'citizen', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
    { id: 'user_2', name: 'Ana Ionescu', email: 'angajat@test.com', role: 'employee', avatar: 'https://i.pravatar.cc/150?u=employee' },
    { id: 'user_3', name: 'Vasile Georgescu', email: 'vasile@test.com', role: 'citizen', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026701d' },
];

export const NAV_ITEMS: NavItem[] = [
    { id: 'dashboard', label: 'Panou Principal', icon: HomeIcon },
    { id: 'ai_assistant', label: 'Asistent AI', icon: ChatIcon },
    { id: 'reports', label: 'Sesizări', icon: FlagIcon },
    { id: 'appointments', label: 'Programări', icon: CalendarIcon },
    { id: 'marketplace', label: 'Piața Locală', icon: BuildingStorefrontIcon },
];

export const CITY_HALL_NAV_ITEMS: NavItem[] = [
    { id: 'city_hall_dashboard', label: 'Panou Principal', icon: HomeIcon },
    { id: 'city_hall_reports', label: 'Sesizări Cetățeni', icon: InboxIcon },
    { id: 'city_hall_appointments', label: 'Management Programări', icon: ClipboardListIcon },
    { id: 'city_hall_announcements', label: 'Management Anunțuri', icon: MegaphoneIcon },
];

export const VIEW_TITLES: { [key in View]: string } = {
    // Citizen
    dashboard: 'Panou Principal',
    ai_assistant: 'Asistent AI Popești-Leordeni',
    reports: 'Sesizări Rapide cu Geolocalizare și AI',
    appointments: 'Programări Online',
    polls: 'Sondaje și Voturi Locale',
    calendar: 'Calendar Civic Personalizat',
    marketplace: 'Piața Locală - Afaceri și Servicii',

    // City Hall
    city_hall_dashboard: 'Panou Principal Primărie',
    city_hall_reports: 'Management Sesizări Cetățeni',
    city_hall_appointments: 'Management Programări',
    city_hall_announcements: 'Management Anunțuri',
};