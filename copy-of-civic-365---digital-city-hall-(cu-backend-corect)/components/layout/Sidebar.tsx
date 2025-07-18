
import React from 'react';
import { NAV_ITEMS, CITY_HALL_NAV_ITEMS, LogoutIcon } from '../../constants';
import { User, View } from '../../types';

interface SidebarProps {
    currentView: View;
    setView: (view: View) => void;
    currentUser: User;
    logout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, currentUser, logout }) => {
    const navItems = currentUser.role === 'citizen' ? NAV_ITEMS : CITY_HALL_NAV_ITEMS;
    const isCitizen = currentUser.role === 'citizen';

    return (
        <div className={`w-20 lg:w-64 flex-shrink-0 border-r flex flex-col transition-colors duration-300 ${isCitizen ? 'bg-white border-slate-200' : 'bg-slate-800 border-slate-700 text-white'}`}>
            <div className={`h-20 flex items-center justify-center lg:justify-start lg:pl-6 border-b flex-shrink-0 ${isCitizen ? 'border-slate-200' : 'border-slate-700'}`}>
                <div className="bg-blue-600 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl flex-shrink-0">
                    {isCitizen ? 'C' : 'P'}
                </div>
                <h1 className={`hidden lg:block text-2xl font-bold ml-3 ${isCitizen ? 'text-slate-800' : 'text-white'}`}>
                    {isCitizen ? <>CIVIC<span className="text-blue-600">365</span></> : 'PRIMĂRIE'}
                </h1>
            </div>
            <nav className="flex-1 px-2 lg:px-4 py-4 space-y-2">
                {navItems.map((item) => (
                    <a
                        key={item.id}
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setView(item.id);
                        }}
                        className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                            currentView === item.id
                                ? (isCitizen ? 'bg-blue-50 text-blue-600 font-semibold' : 'bg-slate-600 text-white font-semibold')
                                : (isCitizen ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900' : 'text-slate-300 hover:bg-slate-700 hover:text-white')
                        }`}
                    >
                        <item.icon className="h-6 w-6 flex-shrink-0" />
                        <span className="hidden lg:block ml-4">{item.label}</span>
                    </a>
                ))}
            </nav>
            <div className={`p-4 border-t ${isCitizen ? 'border-slate-200' : 'border-slate-700'}`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img className="h-10 w-10 rounded-full" src={currentUser.avatar} alt="User" />
                        <div className="hidden lg:block ml-3">
                            <p className={`text-sm font-medium truncate ${isCitizen ? 'text-slate-800' : 'text-white'}`}>{currentUser.name}</p>
                            <p className={`text-xs capitalize ${isCitizen ? 'text-slate-500' : 'text-slate-400'}`}>{currentUser.role === 'citizen' ? 'Cetățean' : 'Funcționar Public'}</p>
                        </div>
                    </div>
                     <button
                        onClick={logout}
                        className={`p-2 rounded-full transition-colors duration-200 ${isCitizen ? 'text-slate-500 hover:bg-slate-100' : 'text-slate-400 hover:bg-slate-700'}`}
                        title="Ieșire Cont"
                    >
                        <LogoutIcon className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
