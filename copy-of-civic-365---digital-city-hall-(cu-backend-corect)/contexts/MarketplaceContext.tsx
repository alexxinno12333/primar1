import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { LocalBusiness } from '../types';
import { apiGetBusinesses, apiAddBusiness, AddBusinessData } from '../services/api';

interface MarketplaceContextType {
    businesses: LocalBusiness[];
    addBusiness: (businessData: AddBusinessData) => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export const MarketplaceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [businesses, setBusinesses] = useState<LocalBusiness[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                setIsLoading(true);
                const data = await apiGetBusinesses();
                setBusinesses(data);
                setError(null);
            } catch (err) {
                setError('Nu s-au putut încărca afacerile locale.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBusinesses();
    }, []);

    const addBusiness = async (businessData: AddBusinessData) => {
        const newBusiness = await apiAddBusiness(businessData);
        setBusinesses(prev => [newBusiness, ...prev]);
    };
    
    return (
        <MarketplaceContext.Provider value={{ businesses, addBusiness, isLoading, error }}>
            {children}
        </MarketplaceContext.Provider>
    );
};

export const useMarketplace = (): MarketplaceContextType => {
    const context = useContext(MarketplaceContext);
    if (context === undefined) {
        throw new Error('useMarketplace must be used within a MarketplaceProvider');
    }
    return context;
};
