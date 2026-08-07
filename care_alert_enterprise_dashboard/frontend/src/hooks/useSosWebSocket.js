import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const useSosWebSocket = () => {
  const [socket, setSocket] = useState(null);
  const [liveSosAlerts, setLiveSosAlerts] = useState([]);
  const [newAlertTrigger, setNewAlertTrigger] = useState(null);

  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to SOS WebSocket server');
    });

    newSocket.on('sos.created', (alertData) => {
      console.log('New SOS Alert received:', alertData);
      setLiveSosAlerts((prev) => [alertData, ...prev]);
      setNewAlertTrigger(alertData);
      
      // Play sound alert (requires user interaction first usually, but good for dashboard)
      try {
        const audio = new Audio('/alert-sound.mp3');
        audio.play().catch(e => console.log('Audio play failed', e));
      } catch (err) {}
    });

    newSocket.on('sos.acknowledged', (alertData) => {
      setLiveSosAlerts((prev) => 
        prev.map(alert => alert.id === alertData.id ? { ...alert, status: 'ACKNOWLEDGED' } : alert)
      );
    });

    newSocket.on('sos.assigned', (alertData) => {
      setLiveSosAlerts((prev) => 
        prev.map(alert => alert.id === alertData.id ? { ...alert, status: 'ASSIGNED' } : alert)
      );
    });

    newSocket.on('sos.resolved', (alertData) => {
      setLiveSosAlerts((prev) => 
        prev.map(alert => alert.id === alertData.id ? { ...alert, status: 'RESOLVED' } : alert)
      );
    });

    return () => newSocket.close();
  }, []);

  return { socket, liveSosAlerts, newAlertTrigger, setLiveSosAlerts };
};
