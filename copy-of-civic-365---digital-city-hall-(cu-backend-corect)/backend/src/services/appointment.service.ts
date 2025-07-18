
import { appointments } from '../data/db';
import { Appointment, User } from '../types';

export const findAll = async (user: User): Promise<Appointment[]> => {
    if (user.role === 'employee') {
        return [...appointments].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    return appointments.filter(a => a.citizenId === user.id).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const create = async (appointmentData: Omit<Appointment, 'id' | 'status' | 'citizenId' | 'citizenName' | 'qrCodeUrl'>, user: User): Promise<Appointment> => {
    const { institution, service, date, time } = appointmentData;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=CIVIC365-Appointment-${user.id}-${date}-${time}`;
    
    const newAppointment: Appointment = {
        institution,
        service,
        date,
        time,
        id: `A${new Date().getTime().toString().slice(-6)}`,
        status: 'Așteptare',
        citizenId: user.id,
        citizenName: user.name,
        qrCodeUrl: qrUrl,
    };
    
    appointments.push(newAppointment);
    appointments.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return newAppointment;
};

export const updateStatus = async (appointmentId: string, newStatus: Appointment['status']): Promise<Appointment | undefined> => {
    const appIndex = appointments.findIndex(a => a.id === appointmentId);
    if (appIndex === -1) return undefined;

    appointments[appIndex].status = newStatus;
    return appointments[appIndex];
};
