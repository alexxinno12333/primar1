
import React, { useState, useRef, useEffect } from 'react';
import { apiGetAiAssistance, apiGetReportStatus } from '../../services/api';
import { ChatMessage } from '../../types';
import Button from '../common/Button';
import Spinner from '../common/Spinner';

const AiAssistantView: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        
        const textToProcess = input;
        setInput('');
        setIsLoading(true);

        const reportIdRegex = /(S\d{6,})/i;
        const match = textToProcess.trim().match(reportIdRegex);

        let aiResponseText: string;

        try {
            if (match) {
                const reportId = match[0].toUpperCase();
                const response = await apiGetReportStatus(reportId);
                aiResponseText = response.message;
            } else {
                const response = await apiGetAiAssistance(textToProcess);
                aiResponseText = response.text;
            }
        } catch (error) {
            const apiError = error as { message?: string };
            aiResponseText = apiError.message || "Ne pare rău, a apărut o eroare. Vă rugăm să încercați din nou mai târziu.";
        }


        const aiMessage: ChatMessage = { sender: 'ai', text: aiResponseText };
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
    };

    const handlePresetClick = (preset: string) => {
        setInput(preset);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-10rem)] bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-4">
                    {messages.length === 0 && (
                        <div className="text-center p-8">
                            <div className="inline-block bg-blue-100 text-blue-600 rounded-full p-4">
                               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V7a2 2 0 012-2h2m6-1a1 1 0 00-1-1H9a3 3 0 00-3 3v8a3 3 0 003 3h6l4 4V10a3 3 0 00-3-3z"/>
                               </svg>
                            </div>
                            <h2 className="mt-4 text-2xl font-bold">Asistent AI Popești-Leordeni</h2>
                            <p className="mt-2 text-slate-500">Adresează o întrebare sau introdu codul sesizării pentru a afla statusul.</p>
                             <div className="mt-6 flex flex-wrap justify-center gap-2">
                                <button onClick={() => handlePresetClick('Acte necesare pentru buletin')} className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm hover:bg-slate-200 transition">Acte necesare buletin</button>
                                <button onClick={() => handlePresetClick('Care este statusul pentru sesizarea S123456?')} className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm hover:bg-slate-200 transition">Verifică status sesizare</button>
                                <button onClick={() => handlePresetClick('Program direcția taxe și impozite')} className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm hover:bg-slate-200 transition">Program taxe și impozite</button>
                            </div>
                        </div>
                    )}
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">A</div>}
                            <div className={`prose prose-sm max-w-xl rounded-lg p-3 ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-800'}`}>
                                 {msg.text.split('\n').map((line, i) => <p key={i} className="my-1" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />)}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-end gap-3 justify-start">
                             <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">A</div>
                            <div className="bg-slate-100 rounded-lg p-3">
                               <Spinner />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <div className="p-4 border-t border-slate-200 bg-white">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Scrie aici solicitarea sau codul sesizării..."
                        className="flex-1 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white text-slate-900"
                        disabled={isLoading}
                    />
                    <Button onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
                        {isLoading ? <Spinner /> : 'Trimite'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AiAssistantView;
