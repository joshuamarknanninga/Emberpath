import { useEffect, useState } from 'react';

const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:5000/ws';

export const useRealtime = () => {
  const [connected, setConnected] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => setConnected(true);
    socket.onclose = () => setConnected(false);
    socket.onerror = () => setConnected(false);
    socket.onmessage = (message) => {
      try {
        const data = JSON.parse(message.data);
        setEvents((curr) => [data, ...curr].slice(0, 8));
      } catch (error) {
        // keep stream resilient to malformed messages
      }
    };

    return () => socket.close();
  }, []);

  return { connected, events };
};
