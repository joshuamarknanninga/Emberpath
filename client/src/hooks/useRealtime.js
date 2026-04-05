import { useEffect, useRef, useState } from 'react';

const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:5000/ws';
const apiBase = import.meta.env.VITE_API_BASE || '';

export const useRealtime = () => {
  const [connected, setConnected] = useState(false);
  const [events, setEvents] = useState([]);
  const reconnectRef = useRef(null);

  useEffect(() => {
    let closedByUser = false;
    let socket;

    const waitForApi = async () => {
      try {
        const response = await fetch(`${apiBase}/api/health`);
        return response.ok;
      } catch (error) {
        return false;
      }
    };

    const scheduleReconnect = () => {
      if (closedByUser) return;
      reconnectRef.current = setTimeout(connect, 1200);
    };

    const connect = async () => {
      const apiReady = await waitForApi();
      if (!apiReady) {
        scheduleReconnect();
        return;
      }

      socket = new WebSocket(wsUrl);

      socket.onopen = () => setConnected(true);
      socket.onclose = () => {
        setConnected(false);
        scheduleReconnect();
      };
      socket.onerror = () => {
        // Quiet by design: retries happen automatically.
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
      if (socket && socket.readyState === WebSocket.OPEN) socket.close();
    };
  }, []);

  return { connected, events };
};
