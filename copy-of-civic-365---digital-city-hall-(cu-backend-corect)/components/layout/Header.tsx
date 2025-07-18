import React from 'react';
import { VIEW_TITLES } from '../../constants';
import { View } from '../../types';

interface HeaderProps {
    currentView: View;
}

const Header: React.FC<HeaderProps> = ({ currentView }) => {
    const title = VIEW_TITLES[currentView] || 'Panou Principal';
    return (
        <header className="h-20 bg-white border-b border-slate-200 flex-shrink-0 flex items-center justify-between px-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-800">{title}</h2>
            <div className="flex items-center space-x-4">
                 <button className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </button>
            </div>
        </header>
    );
};

export default Header;