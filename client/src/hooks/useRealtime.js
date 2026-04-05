import { useEffect, useRef, useState } from 'react';

const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:5000/ws';

export const useRealtime = () => {
  const [connected, setConnected] = useState(false);
  const [events, setEvents] = useState([]);
  const reconnectRef = useRef(null);

  useEffect(() => {
    let closedByUser = false;
    let socket;

    const connect = () => {
      socket = new WebSocket(wsUrl);

      socket.onopen = () => setConnected(true);
      socket.onclose = () => {
        setConnected(false);
        if (!closedByUser) {
          reconnectRef.current = setTimeout(connect, 1200);
        }
      };
      socket.onerror = () => {
        // Intentionally quiet: transient startup ordering can briefly fail before server is ready.
      };
      socket.onmessage = (message) => {
        try {
          const data = JSON.parse(message.data);
          setEvents((curr) => [data, ...curr].slice(0, 8));
        } catch (error) {
          // keep stream resilient to malformed messages
        }
      };
    };

    connect();

    return () => {
      closedByUser = true;
      if (reconnectRef.current) clearTimeout(reconnectRef.current);
      if (socket && socket.readyState <= 1) socket.close();
    };
  }, []);

  return { connected, events };
};
