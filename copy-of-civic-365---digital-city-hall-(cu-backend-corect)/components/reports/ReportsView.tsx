
import React, { useState } from 'react';
import { FullReport, User } from '../../types';
import Button from '../common/Button';
import Card from '../common/Card';
import Spinner from '../common/Spinner';
import { useReports } from '../../contexts/ReportsContext';

const StatusBadge: React.FC<{ status: FullReport['status'] }> = ({ status }) => {
    const colorClasses = {
        'Nouă': 'bg-blue-100 text-blue-800',
        'În analiză': 'bg-yellow-100 text-yellow-800',
        'Rezolvată': 'bg-green-100 text-green-800',
    };
    return <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClasses[status]}`}>{status}</span>;
}

const StarRating: React.FC<{ rating: number, setRating?: (r:number)=>void, setHoverRating?:(r:number)=>void, hoverRating?: number, interactive: boolean }> = ({ rating, setRating, hoverRating, setHoverRating, interactive }) => {
    return (
        <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    className={`text-2xl ${interactive ? 'cursor-pointer' : ''} ${star <= (hoverRating || rating) ? 'text-yellow-400' : 'text-slate-300'}`}
                    onClick={() => interactive && setRating && setRating(star)}
                    onMouseEnter={() => interactive && setHoverRating && setHoverRating(star)}
                    onMouseLeave={() => interactive && setHoverRating && setHoverRating(0)}
                    disabled={!interactive}
                >
                    ★
                </button>
            ))}
        </div>
    );
};


const FeedbackForm: React.FC<{ reportId: string }> = ({ reportId }) => {
    const { submitFeedback } = useReports();
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (rating > 0) {
            setIsSubmitting(true);
            try {
                await submitFeedback(reportId, rating, comment);
            } catch (error) {
                console.error("Failed to submit feedback", error);
                // Optionally show an error to the user
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="mt-4 pt-4 border-t border-slate-200">
            <h5 className="text-sm font-bold text-slate-800">Oferă Feedback</h5>
            <p className="text-xs text-slate-500 mb-2">Cum evaluezi soluționarea acestei sesizări?</p>
            <StarRating rating={rating} setRating={setRating} hoverRating={hoverRating} setHoverRating={setHoverRating} interactive={true} />
            <textarea
                rows={2}
                className="mt-2 block w-full shadow-sm sm:text-sm bg-white border-slate-300 rounded-md text-slate-900 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Lasă un comentariu (opțional)..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <Button onClick={handleSubmit} size="sm" className="mt-2" disabled={rating === 0 || isSubmitting}>
                {isSubmitting ? <Spinner/> : 'Trimite Feedback'}
            </Button>
        </div>
    );
};


interface ReportsViewProps {
    currentUser: User;
}

const ReportsView: React.FC<ReportsViewProps> = ({ currentUser }) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [base64Image, setBase64Image] = useState<string | null>(null);
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const { reports, addReport, isLoading: isLoadingReports, error: reportsError } = useReports();
    
    // Filtering is now done on the frontend after data is fetched
    const userReports = reports.filter(report => report.citizenId === currentUser.id);

    const resetForm = () => {
        setImagePreview(null);
        setBase64Image(null);
        setDescription('');
        setError(null);
        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        if(fileInput) fileInput.value = '';
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
                const base64String = (reader.result as string).split(',')[1];
                setBase64Image(base64String);
                setError(null);
                setSuccessMessage(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        if (!base64Image || !description.trim()) {
            setError("Vă rugăm adăugați o imagine și o descriere.");
            return;
        }
        setIsSubmitting(true);
        setError(null);
        setSuccessMessage(null);
        try {
            await addReport({ description, base64Image });
            setSuccessMessage("Sesizarea a fost trimisă cu succes și adăugată în istoricul dumneavoastră.");
            resetForm();
        } catch (err) {
            setError((err as Error).message || "Nu s-a putut trimite sesizarea.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
                 <Card>
                    <div className="p-6">
                        <h3 className="text-xl font-bold mb-4">Trimite o sesizare nouă</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Încarcă o imagine</label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="Preview" className="mx-auto h-32 w-auto rounded-md" />
                                        ) : (
                                            <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                        <div className="flex text-sm text-slate-600 justify-center">
                                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                                <span>Selectează un fișier</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/jpeg, image/png" onChange={handleFileChange} />
                                            </label>
                                        </div>
                                        <p className="text-xs text-slate-500">PNG, JPG</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-slate-700">Descriere și locație</label>
                                <textarea
                                    id="description"
                                    rows={4}
                                    className="mt-1 block w-full shadow-sm sm:text-sm bg-white border-slate-300 rounded-md text-slate-900 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Ex: Groapă periculoasă în asfalt pe Strada Libertății, nr. 10..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                             {error && <p className="text-sm text-red-600">{error}</p>}
                             {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}
                            <div>
                                <Button onClick={handleSubmit} disabled={isSubmitting || !base64Image || !description.trim()} className="w-full">
                                    {isSubmitting ? <Spinner /> : 'Trimite sesizarea'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
            
            <div className="lg:col-span-3">
                <h3 className="text-xl font-bold mb-4">Istoricul sesizărilor tale</h3>
                 <div className="space-y-4">
                    {isLoadingReports ? (
                        <Card className="p-6 text-center"><Spinner /></Card>
                    ) : reportsError ? (
                        <Card className="p-6 text-center text-red-600">{reportsError}</Card>
                    ) : userReports.length === 0 ? (
                        <Card className="p-6 text-center">
                            <p className="text-slate-500">Nu aveți nicio sesizare trimisă. Folosiți formularul pentru a adăuga una nouă.</p>
                        </Card>
                    ) : (
                        userReports.map(report => (
                             <Card key={report.id} className="p-4 animate-fade-in">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <img src={`data:image/jpeg;base64,${report.base64Image}`} alt="Report" className="w-full sm:w-32 h-32 object-cover rounded-md flex-shrink-0" />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-slate-800">{report.problemType}</h4>
                                            <StatusBadge status={report.status} />
                                        </div>
                                        <p className="text-xs text-slate-500 mb-2">ID: {report.id} &bull; {new Date(report.timestamp).toLocaleString('ro-RO')}</p>
                                        <p className="text-sm text-slate-600">{report.description}</p>
                                         <div className="mt-2 text-xs">
                                            <span className="font-semibold">Departament sugerat:</span> {report.suggestedDepartment} &bull; <span className="font-semibold">Urgență:</span> <span className={`font-medium ${report.urgency === 'Ridicata' ? 'text-red-500' : report.urgency === 'Medie' ? 'text-yellow-500' : 'text-green-500'}`}>{report.urgency}</span>
                                        </div>
                                        {report.status === 'Rezolvată' && (
                                            report.rating ? (
                                                <div className="mt-4 pt-4 border-t border-slate-200">
                                                    <h5 className="text-sm font-bold text-slate-800">Feedback-ul tău</h5>
                                                    <StarRating rating={report.rating} interactive={false} />
                                                    {report.feedbackComment && <p className="text-sm text-slate-600 mt-1 italic">"{report.feedbackComment}"</p>}
                                                </div>
                                            ) : (
                                                <FeedbackForm reportId={report.id} />
                                            )
                                        )}
                                    </div>
                                </div>
                            </Card>
                        ))
                    )}
                 </div>
            </div>
        </div>
    );
};

export default ReportsView;
