import React, { useState, useEffect } from 'react';
import { Grid, Card, Typography, Box, Chip, Button } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'framer-motion';

export default function MapFeedRow() {
  const [alerts, setAlerts] = useState([]);
  const position = [11.1271, 78.6569];

  useEffect(() => {
    const q = query(collection(db, 'care_alerts'), orderBy('timestamp', 'desc'), limit(15));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newAlerts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAlerts(newAlerts);
    }, (error) => console.error("Firebase listen error", error));
    return () => unsubscribe();
  }, []);

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      
      {/* 65% Map Row */}
      <Grid item xs={12} md={7.8}>
        <Card sx={{ height: '400px', display: 'flex', flexDirection: 'column', p: 0 }}>
          <Box sx={{ p: 2, borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
            <Typography variant="h3">Live GIS Map</Typography>
            <Typography variant="caption">Statewide hospital and ambulance tracking</Typography>
          </Box>
          <Box sx={{ flexGrow: 1, width: '100%' }}>
            <MapContainer center={position} zoom={7} style={{ height: '100%', width: '100%', zIndex: 1 }}>
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution="&copy; <a href='https://carto.com/'>CartoDB</a>"
              />
              {alerts.filter(a => a.latitude && a.longitude).map(alert => (
                <Marker key={`map-${alert.id}`} position={[alert.latitude, alert.longitude]}>
                  <Popup>
                    <strong>{alert.distress_type?.toUpperCase() || 'EMERGENCY SOS'}</strong><br/>
                    Staff ID: {alert.staff_id}<br/>
                    Time: {new Date(alert.timestamp?.toDate()).toLocaleTimeString()}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </Box>
        </Card>
      </Grid>

      {/* 35% Feed Row */}
      <Grid item xs={12} md={4.2}>
        <Card sx={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 2, borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h3">Live Incident Feed</Typography>
              <Typography variant="caption">Auto-updates from field</Typography>
            </Box>
            <Chip label={`${alerts.length} Active`} color="error" size="small" />
          </Box>
          <Box sx={{ p: 2, overflowY: 'auto', flexGrow: 1 }}>
            <AnimatePresence>
              {alerts.map((alert) => (
                <motion.div 
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box sx={{ mb: 2, p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" fontWeight="bold" color="error">
                        {alert.distress_type?.toUpperCase() || 'EMERGENCY SOS'}
                      </Typography>
                      <Typography variant="caption">
                        {alert.timestamp ? new Date(alert.timestamp.toDate()).toLocaleTimeString() : 'Just now'}
                      </Typography>
                    </Box>
                    <Typography variant="body1">Staff ID: {alert.staff_id}</Typography>
                    <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
                      Location: {alert.latitude?.toFixed(4)}, {alert.longitude?.toFixed(4)}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button size="small" variant="contained" color="success">Resolve</Button>
                      <Button size="small" variant="outlined" color="error">Escalate</Button>
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </AnimatePresence>
            {alerts.length === 0 && (
              <Typography color="text.secondary" textAlign="center" sx={{ mt: 4 }}>Listening for incidents...</Typography>
            )}
          </Box>
        </Card>
      </Grid>
      
    </Grid>
  );
}
