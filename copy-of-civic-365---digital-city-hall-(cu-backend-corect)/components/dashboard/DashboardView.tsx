
import React from 'react';
import { NAV_ITEMS } from '../../constants';
import { User, View } from '../../types';
import SummaryCard from './SummaryCard';
import { useAnnouncements } from '../../contexts/AnnouncementsContext';
import Spinner from '../common/Spinner';

const AnnouncementIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 2a6 6 0 00-6 6v3.586l-1.707 1.707A1 1 0 003 15h14a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
    </svg>
);


interface DashboardViewProps {
    setView: (view: View) => void;
    currentUser: User;
}

const DashboardView: React.FC<DashboardViewProps> = ({ setView, currentUser }) => {
    const quickActions = NAV_ITEMS.filter(item => item.id !== 'dashboard');
    const { announcements, isLoading, error } = useAnnouncements();
    const recentAnnouncements = announcements.slice(0, 3);

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">Bună ziua, {currentUser.name}!</h2>
                <p className="text-slate-500 mt-1">Iată o privire de ansamblu asupra activității tale civice.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {quickActions.map(action => (
                    <SummaryCard 
                        key={action.id}
                        title={action.label}
                        icon={action.icon}
                        onClick={() => setView(action.id)}
                    />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                    <h3 className="font-bold text-lg mb-4 text-slate-800">Anunțuri Primărie</h3>
                    {isLoading ? (
                        <div className="text-center py-8"><Spinner /></div>
                    ) : error ? (
                        <div className="text-center py-8 text-red-500">{error}</div>
                    ) : recentAnnouncements.length > 0 ? (
                        <ul className="space-y-4">
                            {recentAnnouncements.map(announcement => (
                                <li key={announcement.id} className="flex items-start space-x-3 animate-fade-in">
                                    <div className="bg-blue-100 text-blue-600 p-2 rounded-full mt-1">
                                        <AnnouncementIcon />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-700">{announcement.title}</p>
                                        <p className="text-sm text-slate-600">{announcement.content}</p>
                                        <p className="text-xs text-slate-400 mt-1">{new Date(announcement.timestamp).toLocaleString('ro-RO')}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                         <div className="text-center py-8">
                            <p className="text-slate-500">Niciun anunț recent de la primărie.</p>
                        </div>
                    )}
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                    <h3 className="font-bold text-lg mb-4 text-slate-800">Calendar Civic</h3>
                     <ul className="space-y-4">
                        <li className="flex items-center space-x-3">
                            <div className="bg-yellow-400 h-2 w-2 rounded-full"></div>
                            <div>
                                <p className="font-semibold text-slate-700">Expiră Cartea de Identitate</p>
                                <p className="text-sm text-slate-500">în 25 de zile</p>
                            </div>
                        </li>
                         <li className="flex items-center space-x-3">
                            <div className="bg-blue-400 h-2 w-2 rounded-full"></div>
                            <div>
                                <p className="font-semibold text-slate-700">Data limită plată impozit</p>
                                <p className="text-sm text-slate-500">30 Septembrie 2024</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardView;
