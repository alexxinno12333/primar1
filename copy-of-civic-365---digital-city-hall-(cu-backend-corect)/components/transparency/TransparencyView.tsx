import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../common/Card';

const data = [
    { name: 'Infrastructură', 'Buget Alocat': 4000000, 'Cheltuieli Realizate': 3200000 },
    { name: 'Educație', 'Buget Alocat': 2500000, 'Cheltuieli Realizate': 2450000 },
    { name: 'Sănătate', 'Buget Alocat': 1800000, 'Cheltuieli Realizate': 1750000 },
    { name: 'Cultură & Sport', 'Buget Alocat': 1200000, 'Cheltuieli Realizate': 950000 },
    { name: 'Administrație', 'Buget Alocat': 1500000, 'Cheltuieli Realizate': 1400000 },
    { name: 'Protecție Socială', 'Buget Alocat': 2200000, 'Cheltuieli Realizate': 2100000 },
];

const TransparencyView: React.FC = () => {
    return (
        <Card>
            <div className="p-6">
                 <h3 className="text-xl font-bold">Transparență Bugetară</h3>
                 <p className="text-slate-500 mt-1">Vezi cum sunt cheltuiți banii publici în orașul tău.</p>
            </div>
            <div className="p-6 h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
                        <YAxis tickFormatter={(value) => new Intl.NumberFormat('ro-RO', { style: 'currency', currency: 'RON', notation: 'compact' }).format(value as number)} tick={{ fill: '#64748b', fontSize: 12 }} />
                        <Tooltip
                            cursor={{ fill: 'rgba(241, 245, 249, 0.5)' }}
                            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }}
                            formatter={(value) => new Intl.NumberFormat('ro-RO').format(value as number) + ' RON'}
                        />
                        <Legend wrapperStyle={{ fontSize: '14px' }} />
                        <Bar dataKey="Buget Alocat" fill="#8884d8" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="Cheltuieli Realizate" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};

export default TransparencyView;