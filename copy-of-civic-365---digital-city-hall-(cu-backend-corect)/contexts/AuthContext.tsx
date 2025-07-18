
import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { User } from '../types';
import { apiLogin, apiGetMe } from '../services/api';

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('authToken'));
    const [isLoading, setIsLoading] = useState(true);

    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('authToken');
    }, []);

    useEffect(() => {
        const verifyToken = async () => {
            if (token) {
                try {
                    const userData = await apiGetMe(token);
                    setUser(userData);
                } catch (error) {
                    console.error("Token verification failed", error);
                    logout();
                }
            }
            setIsLoading(false);
        };
        verifyToken();
    }, [token, logout]);
    
    const login = async (email: string, password: string) => {
        const { token: newToken, user: newUser } = await apiLogin(email, password);
        setToken(newToken);
        setUser(newUser);
        localStorage.setItem('authToken', newToken);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
