

import React, { useState } from 'react';
import { View } from './types';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DashboardView from './components/dashboard/DashboardView';
import AiAssistantView from './components/ai/AiAssistantView';
import ReportsView from './components/reports/ReportsView';
import AppointmentsView from './components/appointments/AppointmentsView';
import CityHallReportsView from './components/city-hall/CityHallReportsView';
import CityHallDashboardView from './components/city-hall/CityHallDashboardView';
import CityHallAppointmentsView from './components/city-hall/CityHallAppointmentsView';
import CityHallAnnouncementsView from './components/city-hall/CityHallAnnouncementsView';
import MarketplaceView from './components/marketplace/MarketplaceView';
import { ReportsProvider } from './contexts/ReportsContext';
import { AppointmentsProvider } from './contexts/AppointmentsContext';
import { AnnouncementsProvider } from './contexts/AnnouncementsContext';
import { MarketplaceProvider } from './contexts/MarketplaceContext';
import LoginView from './components/LoginView';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import RegisterView from './components/RegisterView';

const AppContent: React.FC = () => {
    const { user, logout } = useAuth();
    const [currentView, setCurrentView] = useState<View>(user?.role === 'employee' ? 'city_hall_dashboard' : 'dashboard');

    if (!user) {
        // This case should ideally not be reached if App logic is correct, but as a fallback.
        // The main logic is in AppWrapper
        return null; 
    }

    const renderView = () => {
        switch (currentView) {
            // Citizen Views
            case 'dashboard':
                return <DashboardView setView={setCurrentView} currentUser={user} />;
            case 'ai_assistant':
                return <AiAssistantView />;
            case 'reports':
                return <ReportsView currentUser={user} />;
            case 'appointments':
                return <AppointmentsView currentUser={user} />;
            case 'marketplace':
                return <MarketplaceView />;
            
            // City Hall Views
            case 'city_hall_dashboard':
                return <CityHallDashboardView setView={setCurrentView} currentUser={user} />;
            case 'city_hall_reports':
                return <CityHallReportsView />;
            case 'city_hall_appointments':
                return <CityHallAppointmentsView />;
            case 'city_hall_announcements':
                return <CityHallAnnouncementsView />;

            default:
                return <DashboardView setView={setCurrentView} currentUser={user} />;
        }
    };

    return (
         <div className="flex h-screen bg-slate-100">
            <Sidebar currentView={currentView} setView={setCurrentView} currentUser={user} logout={logout} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header currentView={currentView} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 p-6 md:p-8">
                    {renderView()}
                </main>
            </div>
        </div>
    );
}

const App: React.FC = () => {
    return (
        <AuthProvider>
            <AppWrapper />
        </AuthProvider>
    );
};

// A wrapper component to access the auth context and manage auth flow
const AppWrapper: React.FC = () => {
    const { user, isLoading } = useAuth();
    const [isRegistering, setIsRegistering] = useState(false);

    if (isLoading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    if (!user) {
        return isRegistering ? (
            <RegisterView onSwitchToLogin={() => setIsRegistering(false)} />
        ) : (
            <LoginView onSwitchToRegister={() => setIsRegistering(true)} />
        );
    }
    
    // Only provide data contexts if user is logged in
    return (
        <AnnouncementsProvider>
            <ReportsProvider>
                <AppointmentsProvider>
                    <MarketplaceProvider>
                        <AppContent />
                    </MarketplaceProvider>
                </AppointmentsProvider>
            </ReportsProvider>
        </AnnouncementsProvider>
    );
}

export default App;