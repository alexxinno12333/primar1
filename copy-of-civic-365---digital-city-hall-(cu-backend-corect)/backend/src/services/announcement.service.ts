
import { announcements } from '../data/db';
import { Announcement } from '../types';

export const findAll = async (): Promise<Announcement[]> => {
    return [...announcements].sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const create = async (title: string, content: string): Promise<Announcement> => {
    const newAnnouncement: Announcement = {
        id: `AN${new Date().getTime().toString().slice(-6)}`,
        title,
        content,
        timestamp: new Date().toISOString(),
    };
    announcements.unshift(newAnnouncement);
    return newAnnouncement;
};

export const remove = async (id: string): Promise<boolean> => {
    const initialLength = announcements.length;
    const newAnnouncements = announcements.filter(a => a.id !== id);
    // Update the array in db.ts
    announcements.length = 0;
    announcements.push(...newAnnouncements);
    return newAnnouncements.length < initialLength;
};
