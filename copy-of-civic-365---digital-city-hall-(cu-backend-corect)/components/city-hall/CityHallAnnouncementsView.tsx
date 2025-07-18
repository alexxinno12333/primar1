
import React, { useState } from 'react';
import { useAnnouncements } from '../../contexts/AnnouncementsContext';
import Card from '../common/Card';
import Button from '../common/Button';
import Spinner from '../common/Spinner';

const PREDEFINED_TITLES = [
    'Întrerupere apă potabilă',
    'Lucrări de reparații stradale',
    'Eveniment public / Festival',
    'Modificare program de lucru',
    'Dezinsecție / Deratizare',
    'Închidere trafic rutier',
    'Anunț de interes public general',
];

const CityHallAnnouncementsView: React.FC = () => {
    const { announcements, addAnnouncement, deleteAnnouncement, isLoading, error: announcementsError } = useAnnouncements();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [formError, setFormError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            setFormError('Titlul și conținutul sunt obligatorii.');
            return;
        }
        setIsSubmitting(true);
        setFormError('');
        try {
            await addAnnouncement(title, content);
            setTitle('');
            setContent('');
        } catch (err) {
            setFormError((err as Error).message || "A apărut o eroare la postarea anunțului.");
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const handleDelete = async (id: string) => {
        // Optional: add a confirmation dialog before deleting
        try {
            await deleteAnnouncement(id);
        } catch (error) {
            console.error("Failed to delete announcement", error);
            // Optionally show an error toast
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
                <Card>
                    <form onSubmit={handleSubmit} className="p-6">
                        <h3 className="text-xl font-bold mb-4">Postează un anunț nou</h3>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="announcement-title" className="block text-sm font-medium text-slate-700">Titlu</label>
                                <select
                                    id="announcement-title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white border-slate-300 text-slate-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                >
                                    <option value="" disabled>Selectează un titlu</option>
                                    {PREDEFINED_TITLES.map(t => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="announcement-content" className="block text-sm font-medium text-slate-700">Conținut</label>
                                <textarea
                                    id="announcement-content"
                                    rows={5}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="mt-1 block w-full shadow-sm sm:text-sm bg-white border-slate-300 rounded-md text-slate-900 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Descrieți anunțul în detaliu..."
                                />
                            </div>
                            {formError && <p className="text-sm text-red-600">{formError}</p>}
                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                               {isSubmitting ? <Spinner/> : 'Postează Anunț'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
            <div className="lg:col-span-2">
                <h3 className="text-xl font-bold mb-4">Anunțuri publicate</h3>
                <div className="space-y-4">
                    {isLoading ? (
                        <Card className="text-center p-8"><Spinner/></Card>
                    ) : announcementsError ? (
                        <Card className="text-center p-8 text-red-600">{announcementsError}</Card>
                    ) : announcements.length === 0 ? (
                        <Card className="text-center p-8">
                            <p className="text-slate-500">Nu există niciun anunț publicat.</p>
                        </Card>
                    ) : (
                        announcements.map(ann => (
                            <Card key={ann.id} className="p-4 animate-fade-in">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-bold text-slate-800">{ann.title}</h4>
                                        <p className="text-sm text-slate-600 mt-1">{ann.content}</p>
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        onClick={() => handleDelete(ann.id)}
                                        className="bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-400 flex-shrink-0"
                                        title="Șterge anunțul"
                                    >
                                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </Button>
                                </div>
                                <p className="text-xs text-slate-400 mt-2 text-right">{new Date(ann.timestamp).toLocaleString('ro-RO')}</p>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default CityHallAnnouncementsView;
