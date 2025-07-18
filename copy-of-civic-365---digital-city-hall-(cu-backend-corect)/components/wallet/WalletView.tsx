import React from 'react';
import Card from '../common/Card';

const DocumentItem = ({ title, status }: { title: string; status: string; }) => (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition">
        <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="font-medium text-slate-800">{title}</span>
        </div>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${status === 'Valid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
            {status}
        </span>
    </div>
);

const WalletView: React.FC = () => {
    return (
        <Card className="max-w-3xl mx-auto">
            <div className="p-6">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-xl font-bold">Portofelul tău de acte</h3>
                        <p className="text-slate-500 mt-1">Păstrează-ți actele locale importante într-un singur loc, sigur și accesibil.</p>
                    </div>
                     <div className="flex items-center text-sm text-green-600 font-semibold">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                        </svg>
                        Securizat
                    </div>
                </div>

                <div className="mt-8 space-y-4">
                    <DocumentItem title="Carte de Identitate" status="Valid" />
                    <DocumentItem title="Pașaport" status="Valid" />
                    <DocumentItem title="Certificat de Căsătorie" status="Valid" />
                    <DocumentItem title="Autorizație de Construcție #123" status="Expiră în 3 luni" />
                    <DocumentItem title="Adeverință de la locul de muncă" status="Valid" />
                </div>

                <div className="mt-6 text-center">
                    <button className="font-medium text-blue-600 hover:text-blue-500">
                        + Adaugă un document nou
                    </button>
                </div>
            </div>
        </Card>
    );
};

export default WalletView;