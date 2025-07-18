
import React from 'react';
import { useReports } from '../../contexts/ReportsContext';
import { User, View } from '../../types';
import Card from '../common/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StatCard = ({ title, value, icon }: { title: string; value: string | number; icon: React.ReactNode; }) => (
    <Card className="p-5">
        <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <div className="text-slate-400">{icon}</div>
        </div>
        <p className="text-3xl font-bold text-slate-800 mt-1">{value}</p>
    </Card>
);

const weeklyData = [
    { name: 'Luni', sesizari: 0 },
    { name: 'Marți', sesizari: 0 },
    { name: 'Miercuri', sesizari: 0 },
    { name: 'Joi', sesizari: 0 },
    { name: 'Vineri', sesizari: 0 },
    { name: 'Sâmbătă', sesizari: 0 },
    { name: 'Duminică', sesizari: 0 },
];

interface CityHallDashboardViewProps {
    setView: (view: View) => void;
    currentUser: User;
}

const CityHallDashboardView: React.FC<CityHallDashboardViewProps> = ({ setView, currentUser }) => {
    const { reports } = useReports();

    const noi = reports.filter(r => r.status === 'Nouă').length;
    const inAnaliza = reports.filter(r => r.status === 'În analiză').length;
    const rezolvate = reports.filter(r => r.status === 'Rezolvată').length;

    const ratedReports = reports.filter(r => r.rating !== undefined && r.rating > 0);
    const averageRating = ratedReports.length > 0
        ? (ratedReports.reduce((acc, r) => acc + r.rating!, 0) / ratedReports.length).toFixed(1)
        : 'N/A';
    
    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">Bună ziua, {currentUser.name}!</h2>
                <p className="text-slate-500 mt-1">Iată o privire de ansamblu asupra activității din primărie.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Sesizări Noi" 
                    value={noi} 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>}
                />
                 <StatCard 
                    title="Sesizări în Curs" 
                    value={inAnaliza} 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                />
                 <StatCard 
                    title="Sesizări Rezolvate" 
                    value={rezolvate}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                />
                <StatCard 
                    title="Indice Satisfacție" 
                    value={averageRating === 'N/A' ? 'N/A' : `${averageRating}/5`}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>}
                />
            </div>

            <Card>
                <div className="p-6">
                    <h3 className="font-bold text-lg text-slate-800">Evoluție Sesizări Săptămânale</h3>
                     <div className="h-80 mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={weeklyData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
                                <YAxis allowDecimals={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(241, 245, 249, 0.5)' }}
                                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }}
                                />
                                <Legend wrapperStyle={{ fontSize: '14px' }} />
                                <Bar dataKey="sesizari" name="Sesizări" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </Card>

        </div>
    );
};

export default CityHallDashboardView;