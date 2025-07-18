
import React, { useState, useMemo } from 'react';
import { useMarketplace } from '../../contexts/MarketplaceContext';
import { LocalBusiness } from '../../types';
import Card from '../common/Card';
import Button from '../common/Button';
import Spinner from '../common/Spinner';

const BUSINESS_CATEGORIES = [
    'Instalator', 'Electrician', 'Zugrav / Constructor', 'Servicii Curățenie', 
    'Servicii Auto', 'Frizerie / Coafor', 'Cosmetică', 'Magazin Alimentar', 
    'Restaurant / Catering', 'Croitorie', 'IT & Reparații', 'Altele'
];

const BusinessCard: React.FC<{ business: LocalBusiness }> = ({ business }) => (
    <Card className="flex flex-col animate-fade-in transition-all duration-300 hover:shadow-xl">
        {business.base64Image ? (
            <img src={`data:image/jpeg;base64,${business.base64Image}`} alt={business.name} className="w-full h-40 object-cover rounded-t-lg" />
        ) : (
            <div className="w-full h-40 bg-slate-200 rounded-t-lg flex items-center justify-center">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-slate-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5A.75.75 0 0 1 14.25 12h.5a.75.75 0 0 1 .75.75v7.5m-4.5 0v-7.5A.75.75 0 0 0 9.75 12h.5a.75.75 0 0 0 .75.75v7.5m-4.5 0v-7.5A.75.75 0 0 1 5.25 12h.5a.75.75 0 0 1 .75.75v7.5m-1.5-15-3-3m0 0-3 3m3-3v11.25m6-11.25-3-3m0 0-3 3m3-3v11.25m6-11.25-3-3m0 0-3 3m3-3v11.25M3.75 21h16.5a1.5 1.5 0 0 0 1.5-1.5v-6a1.5 1.5 0 0 0-1.5-1.5H3.75a1.5 1.5 0 0 0-1.5 1.5v6a1.5 1.5 0 0 0 1.5 1.5Z" />
                </svg>
            </div>
        )}
        <div className="p-4 flex flex-col flex-grow">
            <p className="text-xs font-semibold text-blue-600 uppercase">{business.category}</p>
            <h3 className="text-lg font-bold text-slate-800 mt-1">{business.name}</h3>
            <p className="text-sm text-slate-600 mt-2 flex-grow">{business.description}</p>
            <div className="mt-4 pt-4 border-t border-slate-200 space-y-2 text-sm">
                <p className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg> {business.phone}</p>
                {business.email && <p className="flex items-center gap-2 truncate"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg> {business.email}</p>}
                {business.website && <a href={business.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline truncate"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0m-2.828-2.828a2 2 0 012.828 0l3 3a2 2 0 010 2.828l-3 3a2 2 0 01-2.828-2.828l3-3a2 2 0 010-2.828zM10 16a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd"></path></svg> {business.website}</a>}
            </div>
        </div>
    </Card>
);

const AddBusinessForm: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
    const { addBusiness } = useMarketplace();
    const [formData, setFormData] = useState({ name: '', category: '', description: '', phone: '', email: '', website: '' });
    const [base64Image, setBase64Image] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
                setBase64Image((reader.result as string).split(',')[1]);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.category || !formData.description || !formData.phone) {
            setError('Numele, categoria, descrierea și telefonul sunt obligatorii.');
            return;
        }
        setIsSubmitting(true);
        setError('');
        try {
            await addBusiness({ ...formData, base64Image: base64Image || undefined });
            onFinish();
        } catch (err) {
            setError((err as Error).message || 'A apărut o eroare.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="mb-8">
            <form onSubmit={handleSubmit}>
                <div className="p-6">
                    <h3 className="text-xl font-bold">Adaugă afacerea sau serviciul tău</h3>
                    <p className="text-slate-500 mb-6">Completează detaliile pentru a fi listat în piața locală.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700">Nume Afacere / Prestator</label>
                            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full shadow-sm sm:text-sm bg-white border-slate-300 rounded-md text-slate-900"/>
                        </div>
                         <div>
                            <label htmlFor="category" className="block text-sm font-medium text-slate-700">Categorie</label>
                            <select name="category" id="category" value={formData.category} onChange={handleChange} required className="mt-1 block w-full shadow-sm sm:text-sm bg-white border-slate-300 rounded-md text-slate-900">
                                <option value="">Alege o categorie</option>
                                {BUSINESS_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                        <div>
                             <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Telefon de contact</label>
                             <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} required className="mt-1 block w-full shadow-sm sm:text-sm bg-white border-slate-300 rounded-md text-slate-900"/>
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="description" className="block text-sm font-medium text-slate-700">Descriere</label>
                            <textarea name="description" id="description" rows={3} value={formData.description} onChange={handleChange} required className="mt-1 block w-full shadow-sm sm:text-sm bg-white border-slate-300 rounded-md text-slate-900"></textarea>
                        </div>
                        <div>
                             <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email (Opțional)</label>
                             <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full shadow-sm sm:text-sm bg-white border-slate-300 rounded-md text-slate-900"/>
                        </div>
                         <div>
                             <label htmlFor="website" className="block text-sm font-medium text-slate-700">Website (Opțional)</label>
                             <input type="url" name="website" id="website" value={formData.website} onChange={handleChange} className="mt-1 block w-full shadow-sm sm:text-sm bg-white border-slate-300 rounded-md text-slate-900"/>
                        </div>
                         <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700">Imagine / Logo (Opțional)</label>
                            <div className="mt-1 flex items-center gap-4">
                                <div className="h-24 w-24 rounded-lg border border-slate-300 flex items-center justify-center bg-slate-50 overflow-hidden">
                                {imagePreview ? <img src={imagePreview} alt="Preview" className="h-full w-full object-cover"/> : <span className="text-xs text-slate-500">Preview</span>}
                                </div>
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 border border-slate-300 px-4 py-2 text-sm">
                                    <span>Încarcă imagine</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/jpeg, image/png" onChange={handleFileChange} />
                                </label>
                            </div>
                        </div>
                    </div>
                    {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
                </div>
                 <div className="bg-slate-50 px-6 py-4 flex justify-end gap-4 rounded-b-lg">
                    <Button type="button" variant="secondary" onClick={onFinish} disabled={isSubmitting}>Anulează</Button>
                    <Button type="submit" disabled={isSubmitting}>{isSubmitting ? <Spinner/> : 'Adaugă afacerea'}</Button>
                </div>
            </form>
        </Card>
    );
};

const MarketplaceView: React.FC = () => {
    const { businesses, isLoading, error } = useMarketplace();
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');

    const filteredBusinesses = useMemo(() => {
        return businesses
            .filter(b => categoryFilter === 'all' || b.category === categoryFilter)
            .filter(b => b.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [businesses, searchTerm, categoryFilter]);

    return (
        <div className="space-y-6">
            <Card className="p-4">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="flex-grow flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Caută după nume..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full sm:w-1/2 block shadow-sm sm:text-sm bg-white border-slate-300 rounded-md text-slate-900"
                        />
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="w-full sm:w-1/2 block shadow-sm sm:text-sm bg-white border-slate-300 rounded-md text-slate-900"
                        >
                            <option value="all">Toate categoriile</option>
                            {BUSINESS_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <div className="w-full md:w-auto flex-shrink-0 mt-4 md:mt-0">
                        <Button onClick={() => setShowForm(prev => !prev)} className="w-full">
                           {showForm ? '− Anulează' : '+ Adaugă afacerea ta'}
                        </Button>
                    </div>
                </div>
            </Card>

            {showForm && <AddBusinessForm onFinish={() => setShowForm(false)} />}
            
            {isLoading ? (
                <div className="text-center p-8"><Spinner/></div>
            ) : error ? (
                <div className="text-center p-8 text-red-500">{error}</div>
            ) : filteredBusinesses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredBusinesses.map(business => <BusinessCard key={business.id} business={business} />)}
                </div>
            ) : (
                <Card className="text-center p-12">
                     <h3 className="text-xl font-bold text-slate-700">Niciun rezultat</h3>
                    <p className="mt-2 text-slate-500">Nu am găsit nicio afacere conform filtrelor selectate. Încearcă o altă căutare sau adaugă o afacere nouă!</p>
                </Card>
            )}
        </div>
    );
};

export default MarketplaceView;
