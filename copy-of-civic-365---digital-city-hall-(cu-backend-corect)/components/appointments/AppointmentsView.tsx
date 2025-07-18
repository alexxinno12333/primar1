
import React, { useState } from 'react';
import Button from '../common/Button';
import Card from '../common/Card';
import { useAppointments } from '../../contexts/AppointmentsContext';
import { Appointment, User } from '../../types';
import Spinner from '../common/Spinner';

const AppointmentForm: React.FC<{ onFinish: () => void, currentUser: User }> = ({ onFinish, currentUser }) => {
    const { addAppointment } = useAppointments();
    const [institution, setInstitution] = useState('');
    const [service, setService] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(institution && service && date && time) {
            setIsSubmitting(true);
            setError(null);
            try {
                await addAppointment({ institution, service, date, time });
                onFinish();
            } catch (err) {
                setError((err as Error).message || "A apărut o eroare la crearea programării.");
            } finally {
                setIsSubmitting(false);
            }
        }
    }

     return (
        <Card className="max-w-2xl mx-auto mb-8 animate-fade-in">
            <form onSubmit={handleSubmit}>
                <div className="p-6">
                    <h3 className="text-xl font-bold mb-4">Fă o programare online</h3>
                    <p className="text-slate-500 mb-6">Evită cozile și programează-te online la orice ghișeu sau instituție locală.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="institution" className="block text-sm font-medium text-slate-700">Instituția</label>
                            <select id="institution" value={institution} onChange={e => setInstitution(e.target.value)} required className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white border-slate-300 text-slate-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                                <option value="">Alege instituția</option>
                                <option>Direcția de Evidență a Persoanelor</option>
                                <option>Stare Civilă</option>
                                <option>Direcția de Taxe și Impozite</option>
                                <option>Urbanism și Amenajarea Teritoriului</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="service" className="block text-sm font-medium text-slate-700">Serviciul</label>
                            <select id="service" value={service} onChange={e => setService(e.target.value)} required className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white border-slate-300 text-slate-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                                <option value="">Alege serviciul</option>
                                <option>Eliberare Carte de Identitate</option>
                                <option>Înregistrare Căsătorie</option>
                                <option>Plată Impozit</option>
                                <option>Depunere dosar autorizație</option>
                            </select>
                        </div>
                        <div>
                             <label htmlFor="date" className="block text-sm font-medium text-slate-700">Data</label>
                             <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} required className="mt-1 block w-full shadow-sm sm:text-sm bg-white border-slate-300 rounded-md text-slate-900" min={new Date().toISOString().split("T")[0]}/>
                        </div>
                         <div>
                             <label htmlFor="time" className="block text-sm font-medium text-slate-700">Ora</label>
                             <input type="time" id="time" value={time} onChange={e => setTime(e.target.value)} required className="mt-1 block w-full shadow-sm sm:text-sm bg-white border-slate-300 rounded-md text-slate-900"/>
                        </div>
                    </div>
                     {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
                </div>
                <div className="bg-slate-50 px-6 py-4 flex justify-end gap-4 rounded-b-lg">
                    <Button type="button" variant="secondary" onClick={onFinish} disabled={isSubmitting}>Anulează</Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? <Spinner/> : 'Programează-te'}
                    </Button>
                </div>
            </form>
        </Card>
    );
}

const AppointmentCard: React.FC<{appointment: Appointment}> = ({ appointment }) => {
    const { status, institution, service, date, time, qrCodeUrl } = appointment;
    const colorClasses = {
        'Așteptare': { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
        'Confirmat': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
        'Finalizat': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
        'Anulat': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
    };
    const statusInfo = colorClasses[status];

    return (
        <Card className={`p-4 animate-fade-in ${statusInfo.bg} border ${statusInfo.border}`}>
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-800">{service}</h4>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusInfo.bg.replace('-50','-100')} ${statusInfo.text}`}>{status}</span>
                    </div>
                    <p className="text-sm text-slate-500 mb-2">{institution}</p>
                    <p className="font-semibold text-slate-900">{new Date(date).toLocaleDateString('ro-RO', { weekday: 'long', day: 'numeric', month: 'long' })} la ora {time}</p>
                </div>
                <div className="flex-shrink-0 bg-white p-2 rounded-lg border self-center">
                    <img src={qrCodeUrl} alt="QR Code Programare" className="w-24 h-24" />
                </div>
            </div>
        </Card>
    );
}

interface AppointmentsViewProps {
    currentUser: User;
}

const AppointmentsView: React.FC<AppointmentsViewProps> = ({ currentUser }) => {
    const { appointments, isLoading, error } = useAppointments();
    const [showForm, setShowForm] = useState(false);
    
    // Filtering is done on the frontend after data is fetched from the backend.
    const userAppointments = appointments.filter(app => app.citizenId === currentUser.id);

    return (
        <div className="max-w-4xl mx-auto">
            {!showForm && (
                <div className="text-right mb-6">
                    <Button onClick={() => setShowForm(true)}>+ Fă o nouă programare</Button>
                </div>
            )}
            
            {showForm && <AppointmentForm onFinish={() => setShowForm(false)} currentUser={currentUser} />}
            
            <div className="space-y-4">
                 <h3 className="text-xl font-bold">Istoricul programărilor tale</h3>
                 {isLoading ? (
                    <Card className="text-center p-8"><Spinner/></Card>
                 ) : error ? (
                    <Card className="text-center p-8 text-red-600">{error}</Card>
                 ) : userAppointments.length === 0 ? (
                    <Card className="text-center p-8">
                        <p className="text-slate-500">Nu ai nicio programare. Apasă pe butonul de mai sus pentru a crea una.</p>
                    </Card>
                 ) : (
                    userAppointments.map(app => (
                        <AppointmentCard key={app.id} appointment={app} />
                    ))
                 )}
            </div>
        </div>
    );
};

export default AppointmentsView;
