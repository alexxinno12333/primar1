import React from 'react';
import Card from '../common/Card';

interface SummaryCardProps {
    title: string;
    icon: (props: { className: string }) => React.ReactNode;
    onClick: () => void;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, icon: Icon, onClick }) => {
    return (
        <Card onClick={onClick} className="cursor-pointer hover:bg-slate-50 hover:shadow-md transition-all duration-200 group">
            <div className="flex flex-col items-center text-center p-4">
                 <div className="bg-blue-100 text-blue-600 rounded-lg p-4 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                    <Icon className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-slate-800">{title}</h3>
                <p className="text-sm text-slate-500 mt-1">Accesează secțiunea</p>
            </div>
        </Card>
    );
};

export default SummaryCard;