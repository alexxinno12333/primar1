
import React, { useState } from 'react';
import Button from './common/Button';
import Card from './common/Card';
import Spinner from './common/Spinner';
import { apiRegister } from '../services/api';

interface RegisterViewProps {
    onSwitchToLogin: () => void;
}

const RegisterView: React.FC<RegisterViewProps> = ({ onSwitchToLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState<boolean>(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            await apiRegister(name, email, password);
            setSuccess(true);
        } catch (err) {
            const apiError = err as { message?: string };
            setError(apiError.message || 'A apărut o eroare la înregistrare. Încercați din nou.');
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4">
                <Card className="w-full max-w-sm animate-fade-in p-8 text-center">
                    <div className="mx-auto bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold mt-4 text-slate-800">Înregistrare reușită!</h2>
                    <p className="text-slate-500 mt-2 mb-6">Contul tău a fost creat cu succes.</p>
                    <Button onClick={onSwitchToLogin} size="lg" className="w-full">
                        Mergi la autentificare
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4">
            <Card className="w-full max-w-sm animate-fade-in">
                <form onSubmit={handleRegister}>
                    <div className="p-8">
                        <div className="text-center">
                             <h1 className="text-3xl font-bold text-slate-800">
                                Creează cont nou
                            </h1>
                            <p className="text-slate-500 mt-2 mb-8">Devino un cetățean digital al orașului tău.</p>
                        </div>

                        <div className="space-y-4">
                             <div>
                                <label htmlFor="name" className="block text-sm font-medium text-left text-slate-700">Nume complet</label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Popescu Ion"
                                />
                            </div>
                            <div>
                                <label htmlFor="email-register" className="block text-sm font-medium text-left text-slate-700">Email</label>
                                <input
                                    id="email-register"
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="email@domeniu.ro"
                                />
                            </div>
                            <div>
                                <label htmlFor="password-register" className="block text-sm font-medium text-left text-slate-700">Parolă</label>
                                <input
                                    id="password-register"
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
                                {isLoading ? <Spinner /> : 'Creează cont'}
                            </Button>
                        </div>

                        <div className="mt-6 text-center text-sm">
                            <p className="text-slate-600">
                                Ai deja cont?{' '}
                                <button type="button" onClick={onSwitchToLogin} className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none">
                                    Autentifică-te
                                </button>
                            </p>
                        </div>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default RegisterView;