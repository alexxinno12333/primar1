
import { localBusinesses } from '../data/db';
import { LocalBusiness, User } from '../types';

type BusinessData = Omit<LocalBusiness, 'id' | 'citizenId' | 'citizenName' | 'approved' | 'timestamp'>;

export const findAll = async (): Promise<LocalBusiness[]> => {
    // Return only approved businesses, sorted by most recent
    return localBusinesses
        .filter(b => b.approved)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const create = async (businessData: BusinessData, user: User): Promise<LocalBusiness> => {
    const newBusiness: LocalBusiness = {
        ...businessData,
        id: `B${new Date().getTime().toString().slice(-7)}`,
        citizenId: user.id,
        citizenName: user.name,
        approved: true, // Auto-approved for now
        timestamp: new Date().toISOString(),
    };

    localBusinesses.unshift(newBusiness);
    return newBusiness;
};
