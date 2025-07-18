
import React from 'react';
import { useAppointments } from '../../contexts/AppointmentsContext';
import { Appointment } from '../../types';
import Card from '../common/Card';
import Spinner from '../common/Spinner';

const StatusBadge: React.FC<{ status: Appointment['status'] }> = ({ status }) => {
    const colorClasses = {
        'Așteptare': 'bg-yellow-100 text-yellow-800',
        'Confirmat': 'bg-blue-100 text-blue-800',
        'Finalizat': 'bg-green-100 text-green-800',
        'Anulat': 'bg-red-100 text-red-800',
    };
    return <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClasses[status]}`}>{status}</span>;
}

const CityHallAppointmentsView: React.FC = () => {
    const { appointments, updateAppointmentStatus, isLoading, error } = useAppointments();

    const handleStatusChange = async (appId: string, status: Appointment['status']) => {
        try {
            await updateAppointmentStatus(appId, status);
        } catch (error) {
            console.error('Failed to update appointment status', error);
            // Optionally show an error toast to the user
        }
    }

    if (isLoading) {
        return <Card className="text-center p-12"><Spinner/></Card>
    }

    if (error) {
        return <Card className="text-center p-12 text-red-600">{error}</Card>
    }

    if (appointments.length === 0) {
        return (
             <Card className="text-center p-12">
                 <div className="inline-block bg-slate-100 text-slate-500 rounded-full p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                 </div>
                <h3 className="mt-4 text-2xl font-bold text-slate-700">Nicio programare înregistrată</h3>
                <p className="mt-2 text-slate-500">Când un cetățean va face o programare, aceasta va apărea aici.</p>
            </Card>
        )
    }

    return (
        <Card className="overflow-hidden animate-fade-in">
             <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Management Programări</h3>
                <p className="text-slate-500 mb-6">Vizualizează și gestionează toate programările făcute de cetățeni.</p>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Cetățean</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Serviciu / Instituție</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Data și Ora</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Acțiune</th>
                        </tr>
                    </thead>
                     <tbody className="bg-white divide-y divide-slate-200">
                        {appointments.map(app => (
                            <tr key={app.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-slate-900">{app.citizenName}</div>
                                    <div className="text-sm text-slate-500">{app.id}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-slate-900">{app.service}</div>
                                    <div className="text-sm text-slate-500">{app.institution}</div>
                                </td>
                                 <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-slate-900">{new Date(app.date).toLocaleDateString('ro-RO')}</div>
                                    <div className="text-sm text-slate-500">{app.time}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <StatusBadge status={app.status} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                     <select
                                        value={app.status}
                                        onChange={(e) => handleStatusChange(app.id, e.target.value as Appointment['status'])}
                                        className="text-sm border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 py-1 bg-white text-slate-900"
                                    >
                                        <option value="Așteptare">Așteptare</option>
                                        <option value="Confirmat">Confirmat</option>
                                        <option value="Finalizat">Finalizat</option>
                                        <option value="Anulat">Anulat</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default CityHallAppointmentsView;
