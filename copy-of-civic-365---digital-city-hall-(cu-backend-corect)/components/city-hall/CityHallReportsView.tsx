
import React, { useState } from 'react';
import { useReports } from '../../contexts/ReportsContext';
import { FullReport } from '../../types';
import Card from '../common/Card';
import Button from '../common/Button';
import Spinner from '../common/Spinner';

const StatusBadge: React.FC<{ status: FullReport['status'] }> = ({ status }) => {
    const colorClasses = {
        'Nouă': 'bg-blue-100 text-blue-800',
        'În analiză': 'bg-yellow-100 text-yellow-800',
        'Rezolvată': 'bg-green-100 text-green-800',
    };
    return <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClasses[status]}`}>{status}</span>;
}

const ReportCard: React.FC<{ report: FullReport }> = ({ report }) => {
    const { updateReportStatus, updateReportDetails } = useReports();
    const [internalNotes, setInternalNotes] = useState(report.internalNotes || '');
    const [assignedTo, setAssignedTo] = useState(report.assignedTo || '');
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await updateReportDetails(report.id, { internalNotes, assignedTo });
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 2000);
        } catch (error) {
            console.error("Failed to save details", error);
            // Optionally show an error to the user
        } finally {
            setIsSaving(false);
        }
    };
    
    const handleStatusChange = async (newStatus: FullReport['status']) => {
        try {
            await updateReportStatus(report.id, newStatus);
        } catch (error) {
             console.error("Failed to update status", error);
        }
    }

    return (
        <Card className="flex flex-col md:flex-row gap-4 p-4 hover:shadow-lg transition-shadow duration-200 animate-fade-in">
            <img src={`data:image/jpeg;base64,${report.base64Image}`} alt="Report" className="w-full md:w-48 h-48 object-cover rounded-md flex-shrink-0" />
            <div className="flex-1 space-y-3">
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="font-bold text-lg text-slate-800">{report.problemType}</h4>
                        <p className="text-sm text-slate-500">ID: {report.id} &bull; {new Date(report.timestamp).toLocaleString('ro-RO')}</p>
                    </div>
                    <StatusBadge status={report.status} />
                </div>
                <p className="text-sm text-slate-600 border-l-2 border-slate-200 pl-3">{report.description}</p>
                <div className="bg-slate-50 p-3 rounded-md border border-slate-200 text-sm space-y-2">
                    <p><strong>Departament AI:</strong> <span className="text-blue-600 font-semibold">{report.suggestedDepartment}</span></p>
                    <p><strong>Urgență AI:</strong> <span className={`font-semibold ${report.urgency === 'Ridicata' ? 'text-red-600' : report.urgency === 'Medie' ? 'text-yellow-600' : 'text-green-600'}`}>{report.urgency}</span></p>
                </div>
                 <div className="space-y-3 pt-2">
                     <div>
                        <label className="text-sm font-medium text-slate-600">Atribuie responsabil:</label>
                        <input 
                            type="text" 
                            value={assignedTo}
                            onChange={e => setAssignedTo(e.target.value)}
                            placeholder="Nume sau departament..." 
                            className="mt-1 w-full text-sm border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 py-1.5 px-2 bg-white text-slate-900" 
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-600">Note interne (private):</label>
                        <textarea 
                            rows={2} 
                            value={internalNotes}
                            onChange={e => setInternalNotes(e.target.value)}
                            placeholder="Comentarii pentru echipa internă..." 
                            className="mt-1 w-full text-sm border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 py-1.5 px-2 bg-white text-slate-900"
                        ></textarea>
                    </div>
                </div>
                 <div className="mt-2 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Status:</span>
                        <select
                            value={report.status}
                            onChange={(e) => handleStatusChange(e.target.value as FullReport['status'])}
                            className="text-sm border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 py-1 bg-white text-slate-900"
                        >
                            <option value="Nouă">Nouă</option>
                            <option value="În analiză">În analiză</option>
                            <option value="Rezolvată">Rezolvată</option>
                        </select>
                    </div>
                    <Button size="sm" onClick={handleSave} disabled={isSaving}>
                        {isSaving ? <Spinner/> : isSaved ? 'Salvat ✓' : 'Salvează'}
                    </Button>
                </div>
            </div>
        </Card>
    )
}

const CityHallReportsView: React.FC = () => {
    const { reports, isLoading, error } = useReports();
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');

    const problemTypes = [...new Set(reports.map(r => r.problemType))];

    const filteredReports = reports
        .filter(report => statusFilter === 'all' || report.status === statusFilter)
        .filter(report => typeFilter === 'all' || report.problemType === typeFilter);

    return (
        <div className="space-y-6">
            <Card className="p-4">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <h3 className="font-bold text-lg flex-shrink-0">Filtrează Sesizări</h3>
                    <div className="w-full h-px md:h-auto md:w-px bg-slate-200"></div>
                    <div className="w-full flex flex-col sm:flex-row gap-4">
                        <div className="w-full sm:w-1/2">
                            <label htmlFor="status-filter" className="block text-sm font-medium text-slate-700">După Status</label>
                            <select
                                id="status-filter"
                                value={statusFilter}
                                onChange={e => setStatusFilter(e.target.value)}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white border-slate-300 text-slate-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            >
                                <option value="all">Toate</option>
                                <option value="Nouă">Nouă</option>
                                <option value="În analiză">În analiză</option>
                                <option value="Rezolvată">Rezolvată</option>
                            </select>
                        </div>
                        <div className="w-full sm:w-1/2">
                             <label htmlFor="type-filter" className="block text-sm font-medium text-slate-700">După Tipul Problemei</label>
                            <select
                                id="type-filter"
                                value={typeFilter}
                                onChange={e => setTypeFilter(e.target.value)}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white border-slate-300 text-slate-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            >
                                <option value="all">Toate</option>
                                {problemTypes.map(type => <option key={type} value={type}>{type}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
            </Card>

            {isLoading ? (
                 <Card className="text-center p-12"><Spinner /></Card>
            ) : error ? (
                 <Card className="text-center p-12 text-red-600">{error}</Card>
            ) : filteredReports.length === 0 ? (
                <Card className="text-center p-12">
                     <div className="inline-block bg-slate-100 text-slate-500 rounded-full p-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                     </div>
                    <h3 className="mt-4 text-2xl font-bold text-slate-700">Niciun rezultat</h3>
                    <p className="mt-2 text-slate-500">Nu au fost găsite sesizări care să corespundă filtrelor selectate.</p>
                </Card>
            ) : (
                filteredReports.map(report => <ReportCard key={report.id} report={report} />)
            )}
        </div>
    );
};

export default CityHallReportsView;
