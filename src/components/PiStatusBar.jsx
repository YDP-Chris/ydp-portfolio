import React, { useState, useEffect } from 'react';

const PI_API_URL = import.meta.env.VITE_FORGE_WEBHOOK_URL || 'https://web-notification-intimate-carlo.trycloudflare.com';

function PiStatusBar() {
  const [piData, setPiData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPiStatus = async () => {
      try {
        const res = await fetch(`${PI_API_URL}/pulse/pi`);
        const data = await res.json();
        if (data.available) {
          setPiData(data);
          setError(false);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      }
    };

    fetchPiStatus();
    // Refresh every 60 seconds
    const interval = setInterval(fetchPiStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  if (error || !piData) {
    return null; // Don't show if unavailable
  }

  const getTempColor = (temp) => {
    if (!temp) return 'text-gray-400';
    if (temp >= 80) return 'text-red-400';
    if (temp >= 70) return 'text-amber-400';
    return 'text-green-400';
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800 py-2 px-4 z-40">
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-pink-400">🍓</span>
          <span className="text-gray-400">Powered by Raspberry Pi 4B</span>
        </div>

        <div className="hidden sm:flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="text-gray-500">Temp:</span>
            <span className={getTempColor(piData.cpu_temp)}>
              {piData.cpu_temp ? `${piData.cpu_temp}°C` : 'N/A'}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-gray-500">CPU:</span>
            <span className="text-green-400">{piData.cpu_percent}%</span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-gray-500">Mem:</span>
            <span className="text-green-400">{piData.memory_percent}%</span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-gray-500">Uptime:</span>
            <span className="text-blue-400">{piData.uptime_human}</span>
          </div>
        </div>

        <div className={`flex items-center gap-1 ${piData.healthy ? 'text-green-400' : 'text-red-400'}`}>
          <span className={`w-2 h-2 rounded-full ${piData.healthy ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></span>
          <span>{piData.healthy ? 'Online' : 'Issues'}</span>
        </div>
      </div>
    </div>
  );
}

export default PiStatusBar;
