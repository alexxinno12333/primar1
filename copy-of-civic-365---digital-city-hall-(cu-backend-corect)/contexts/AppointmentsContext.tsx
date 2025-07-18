
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Appointment } from '../types';
import { apiGetAppointments, apiAddAppointment, apiUpdateAppointmentStatus } from '../services/api';

interface AppointmentsContextType {
    appointments: Appointment[];
    addAppointment: (appointmentData: Omit<Appointment, 'id' | 'status' | 'citizenId' | 'citizenName' | 'qrCodeUrl'>) => Promise<void>;
    updateAppointmentStatus: (appointmentId: string, newStatus: Appointment['status']) => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

const AppointmentsContext = createContext<AppointmentsContextType | undefined>(undefined);

export const AppointmentsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                setIsLoading(true);
                const data = await apiGetAppointments();
                setAppointments(data);
                setError(null);
            } catch (err) {
                setError('Nu s-au putut încărca programările.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAppointments();
    }, []);

    const addAppointment = async (appointmentData: Omit<Appointment, 'id' | 'status' | 'citizenId' | 'citizenName' | 'qrCodeUrl'>) => {
        const newAppointment = await apiAddAppointment(appointmentData);
        setAppointments(prev => [newAppointment, ...prev].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    };

    const updateAppointmentStatus = async (appointmentId: string, newStatus: Appointment['status']) => {
        const updatedAppointment = await apiUpdateAppointmentStatus(appointmentId, newStatus);
        setAppointments(prevAppointments =>
            prevAppointments.map(appointment =>
                appointment.id === appointmentId ? updatedAppointment : appointment
            )
        );
    };

    return (
        <AppointmentsContext.Provider value={{ appointments, addAppointment, updateAppointmentStatus, isLoading, error }}>
            {children}
        </AppointmentsContext.Provider>
    );
};

export const useAppointments = (): AppointmentsContextType => {
    const context = useContext(AppointmentsContext);
    if (context === undefined) {
        throw new Error('useAppointments must be used within an AppointmentsProvider');
    }
    return context;
};
