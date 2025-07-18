import React from 'react';

const Spinner: React.FC = () => {
    return (
        <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:0.1s]"></div>
            <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
        </div>
    );
};

export default Spinner;