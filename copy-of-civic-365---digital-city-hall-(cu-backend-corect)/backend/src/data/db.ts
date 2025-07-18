

import { User, FullReport, Appointment, Announcement, LocalBusiness } from '../types';
import bcrypt from 'bcryptjs';

// ===================================================================================
// MOCK DATABASE
// In a real application, this file would be replaced by a database connection
// (e.g., PostgreSQL, MongoDB) and an ORM (e.g., Prisma, TypeORM).
// The service files would then call the ORM methods instead of these arrays.
// ===================================================================================

// --- USERS ---
const rawUsers: Omit<User, 'passwordHash'>[] = [
    { id: 'user_1', name: 'Popescu Ion', email: 'cetatean@test.com', role: 'citizen', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
    { id: 'user_2', name: 'Ana Ionescu', email: 'angajat@test.com', role: 'employee', avatar: 'https://i.pravatar.cc/150?u=employee' },
    { id: 'user_3', name: 'Vasile Georgescu', email: 'vasile@test.com', role: 'citizen', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026701d' },
    // 5 new employee accounts
    { id: 'user_4', name: 'Mihai Popa', email: 'mihai.popa@primarie.test', role: 'employee', avatar: 'https://i.pravatar.cc/150?u=employee1' },
    { id: 'user_5', name: 'Elena Radu', email: 'elena.radu@primarie.test', role: 'employee', avatar: 'https://i.pravatar.cc/150?u=employee2' },
    { id: 'user_6', name: 'Stefan Marin', email: 'stefan.marin@primarie.test', role: 'employee', avatar: 'https://i.pravatar.cc/150?u=employee3' },
    { id: 'user_7', name: 'Laura Cristea', email: 'laura.cristea@primarie.test', role: 'employee', avatar: 'https://i.pravatar.cc/150?u=employee4' },
    { id: 'user_8', name: 'Adrian Dinu', email: 'adrian.dinu@primarie.test', role: 'employee', avatar: 'https://i.pravatar.cc/150?u=employee5' },
];

const passwords: { [key: string]: string } = {
    'user_1': 'parola123',
    'user_2': 'parola456',
    'user_3': 'parola789',
    'user_4': 'parolaPrimarie1',
    'user_5': 'parolaPrimarie2',
    'user_6': 'parolaPrimarie3',
    'user_7': 'parolaPrimarie4',
    'user_8': 'parolaPrimarie5',
};

export let users: User[] = rawUsers.map(user => ({
    ...user,
    passwordHash: bcrypt.hashSync(passwords[user.id], 8),
}));


// --- REPORTS ---
export let reports: FullReport[] = [];

// --- APPOINTMENTS ---
export let appointments: Appointment[] = [];

// --- ANNOUNCEMENTS ---
export let announcements: Announcement[] = [
    {
        id: 'AN1716301389',
        title: 'Întrerupere apă potabilă',
        content: 'Se va întrerupe furnizarea apei potabile pe Str. Libertății în data de 25.05.2024 între orele 09:00 - 15:00 pentru lucrări de mentenanță.',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'AN1716301390',
        content: 'Vă informăm că programul de lucru al Direcției de Taxe și Impozite va fi modificat în data de 01.06.2024, fiind zi liberă legal.',
        title: 'Modificare program de lucru',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    }
];

// --- LOCAL BUSINESSES ---
export let localBusinesses: LocalBusiness[] = [];
