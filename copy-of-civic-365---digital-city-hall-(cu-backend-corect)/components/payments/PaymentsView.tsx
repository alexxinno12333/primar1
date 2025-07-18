import React, { useState } from 'react';
import Button from '../common/Button';
import Card from '../common/Card';

const payments = [
    { id: 1, type: 'Impozit pe clădire', amount: '450.00 RON', due: '30.09.2024', paid: false },
    { id: 2, type: 'Impozit pe teren', amount: '85.50 RON', due: '30.09.2024', paid: false },
    { id: 3, type: 'Taxă de salubrizare', amount: '120.00 RON', due: '31.12.2024', paid: true },
    { id: 4, type: 'Amendă parcare', amount: '250.00 RON', due: '15.08.2024', paid: false },
];

const PaymentsView: React.FC = () => {
    const [paymentStatus, setPaymentStatus] = useState<{[key: number]: boolean}>(
        payments.reduce((acc, p) => ({ ...acc, [p.id]: p.paid }), {})
    );

    const handlePay = (id: number) => {
        setPaymentStatus(prev => ({ ...prev, [id]: true }));
    };

    return (
        <Card className="overflow-hidden">
            <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Plățile tale locale</h3>
                <p className="text-slate-500 mb-6">Vizualizează și achită taxele, impozitele și amenzile direct din aplicație. Plățile sunt procesate securizat prin ghiseul.ro.</p>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Tip Plată</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Sumă</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Data Scadentă</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Acțiune</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {payments.map(payment => (
                            <tr key={payment.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{payment.type}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{payment.amount}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{payment.due}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    {paymentStatus[payment.id] ? (
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Achitat</span>
                                    ) : (
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Neachitat</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    {paymentStatus[payment.id] ? (
                                        <span className="text-slate-400">Finalizat</span>
                                    ) : (
                                        <Button size="sm" onClick={() => handlePay(payment.id)}>Plătește</Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default PaymentsView;