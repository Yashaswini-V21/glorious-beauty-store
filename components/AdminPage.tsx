
import { useState, useEffect } from 'react';

interface VisitorInfo {
    id: number;
    ip: string;
    userAgent: string;
    time: string;
}

const AdminPage = () => {
    const [visitors, setVisitors] = useState<VisitorInfo[]>([]);
    const [wsStatus, setWsStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');

    useEffect(() => {
        let ws: WebSocket;

        const connectAdminSocket = () => {
            const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
            // Use localhost for local dev, otherwise use the host of the deployed site
            const host = window.location.host.includes('localhost') ? 'localhost:3001' : window.location.host;
            const wsUrl = `${protocol}//${host}/admin`;


            try {
                ws = new WebSocket(wsUrl);

                ws.onopen = () => {
                    setWsStatus('connected');
                    console.log("Admin socket connected.");
                };
                
                ws.onmessage = (event) => {
                    const data: VisitorInfo = JSON.parse(event.data);
                    if (data.id) { // Check if it's a new visitor object
                       setVisitors(prev => [data, ...prev].slice(0, 50)); // Keep the list to a reasonable size
                    }
                };
                
                ws.onclose = () => {
                    setWsStatus('disconnected');
                    console.log("Admin socket disconnected.");
                };
                
                ws.onerror = (error) => {
                    setWsStatus('disconnected');
                    console.error("Admin socket error:", error);
                };

            } catch (error) {
                console.error("Could not connect to admin analytics server:", error);
                setWsStatus('disconnected');
            }
        };

        connectAdminSocket();

        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, []);

    const getStatusColor = () => {
        switch (wsStatus) {
            case 'connected': return 'text-green-400';
            case 'disconnected': return 'text-red-400';
            default: return 'text-yellow-400';
        }
    };

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-5xl font-serif font-bold text-white">Admin Dashboard</h1>
                <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${wsStatus === 'connected' ? 'bg-green-400 animate-pulse' : wsStatus === 'disconnected' ? 'bg-red-400' : 'bg-yellow-400'}`}></div>
                    <span className={`font-semibold ${getStatusColor()}`}>
                        {wsStatus.charAt(0).toUpperCase() + wsStatus.slice(1)}
                    </span>
                </div>
            </div>

            <p className="text-pink-300 mb-8">Real-time log of new website visitors.</p>

            <div className="bg-slate-800/50 rounded-2xl shadow-2xl border border-slate-700/50">
                <div className="p-4 border-b border-slate-700 grid grid-cols-3 font-bold text-gray-300">
                    <div>Time</div>
                    <div>Visitor Info</div>
                    <div>Masked IP</div>
                </div>
                <div className="max-h-[60vh] overflow-y-auto">
                    {visitors.length === 0 ? (
                        <p className="text-gray-400 text-center p-8">Waiting for new visitors...</p>
                    ) : (
                         visitors.map(visitor => (
                            <div key={visitor.id} className="grid grid-cols-3 p-4 border-b border-slate-800 hover:bg-slate-700/50 transition-colors">
                                <div className="text-gray-400">{visitor.time}</div>
                                <div className="text-gray-200 font-mono text-sm">{visitor.userAgent}</div>
                                <div className="text-gray-400 font-mono">{visitor.ip}</div>
                            </div>
                         ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;