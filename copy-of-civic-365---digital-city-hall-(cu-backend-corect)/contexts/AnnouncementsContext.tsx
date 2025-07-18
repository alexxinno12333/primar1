
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Announcement } from '../types';
import { apiGetAnnouncements, apiAddAnnouncement, apiDeleteAnnouncement } from '../services/api';

interface AnnouncementsContextType {
    announcements: Announcement[];
    addAnnouncement: (title: string, content: string) => Promise<void>;
    deleteAnnouncement: (announcementId: string) => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

const AnnouncementsContext = createContext<AnnouncementsContextType | undefined>(undefined);

export const AnnouncementsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                setIsLoading(true);
                const data = await apiGetAnnouncements();
                setAnnouncements(data);
                setError(null);
            } catch (err) {
                setError('Nu s-au putut încărca anunțurile.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAnnouncements();
    }, []);

    const addAnnouncement = async (title: string, content: string) => {
        const newAnnouncement = await apiAddAnnouncement({ title, content });
        setAnnouncements(prev => [newAnnouncement, ...prev]);
    };

    const deleteAnnouncement = async (announcementId: string) => {
        await apiDeleteAnnouncement(announcementId);
        setAnnouncements(prev => prev.filter(ann => ann.id !== announcementId));
    };

    return (
        <AnnouncementsContext.Provider value={{ announcements, addAnnouncement, deleteAnnouncement, isLoading, error }}>
            {children}
        </AnnouncementsContext.Provider>
    );
};

export const useAnnouncements = (): AnnouncementsContextType => {
    const context = useContext(AnnouncementsContext);
    if (context === undefined) {
        throw new Error('useAnnouncements must be used within an AnnouncementsProvider');
    }
    return context;
};
