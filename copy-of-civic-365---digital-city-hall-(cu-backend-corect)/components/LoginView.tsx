
import React, { useState } from 'react';
import Button from './common/Button';
import Card from './common/Card';
import Spinner from './common/Spinner';
import { useAuth } from '../contexts/AuthContext';

interface LoginViewProps {
    onSwitchToRegister: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onSwitchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            await login(email, password);
            // On successful login, the AuthProvider will handle navigation
        } catch (err) {
            const apiError = err as { message?: string };
            setError(apiError.message || 'A apărut o eroare. Încercați din nou.');
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4">
            <Card className="w-full max-w-sm animate-fade-in">
                <form onSubmit={handleLogin}>
                    <div className="p-8">
                        <div className="text-center">
                            <div className="mx-auto bg-blue-600 text-white w-16 h-16 rounded-lg flex items-center justify-center font-bold text-3xl">
                                C
                            </div>
                            <h1 className="text-3xl font-bold mt-6 text-slate-800">
                                CIVIC<span className="text-blue-600">365</span>
                            </h1>
                            <p className="text-slate-500 mt-2 mb-8">Autentifică-te pentru a continua.</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-left text-slate-700">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="email@domeniu.ro"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-left text-slate-700">Parolă</label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {error && <p className="mt-4 text-sm text-red-600 text-center">{error}</p>}

                        <div className="mt-6">
                            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                                {isLoading ? <Spinner /> : 'Intră în cont'}
                            </Button>
                        </div>

                        <div className="mt-6 text-center text-sm">
                            <p className="text-slate-600">
                                Nu ai cont?{' '}
                                <button type="button" onClick={onSwitchToRegister} className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none">
                                    Înregistrează-te
                                </button>
                            </p>
                        </div>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default LoginView;