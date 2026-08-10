import React from 'react';
import { Grid, Card, Typography, Box, Chip, Button } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useSosWebSocket } from '../../hooks/useSosWebSocket';

export default function MapFeedRow() {
  const { liveSosAlerts } = useSosWebSocket();
  const position = [13.0827, 80.2707]; // Chennai center

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      
      {/* 65% Map Row */}
      <Grid item xs={12} md={7.8}>
        <Card sx={{ height: '400px', display: 'flex', flexDirection: 'column', p: 0 }}>
          <Box sx={{ p: 2, borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
            <Typography variant="h3">Live GIS Map</Typography>
            <Typography variant="caption">Statewide hospital and worker tracking</Typography>
          </Box>
          <Box sx={{ flexGrow: 1, width: '100%' }}>
            <MapContainer center={position} zoom={11} style={{ height: '100%', width: '100%', zIndex: 1 }}>
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution="&copy; CartoDB"
              />
              {liveSosAlerts.filter(a => a.latitude && a.longitude).map(alert => (
                <Marker key={`map-${alert.id}`} position={[alert.latitude, alert.longitude]}>
                  <Popup>
                    <strong>{alert.priority?.toUpperCase() || 'CRITICAL SOS'}</strong><br/>
                    Worker: {alert.worker?.name}<br/>
                    Hospital: {alert.hospital?.name}<br/>
                    Time: {new Date(alert.triggered_at).toLocaleTimeString()}
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
              <Typography variant="caption">Real-time alerts via WebSocket</Typography>
            </Box>
            <Chip label={`${liveSosAlerts.length} Active`} color="error" size="small" />
          </Box>
          <Box sx={{ p: 2, overflowY: 'auto', flexGrow: 1 }}>
            <AnimatePresence>
              {liveSosAlerts.map((alert) => (
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
                        🚨 {alert.priority?.toUpperCase() || 'CRITICAL SOS'}
                      </Typography>
                      <Typography variant="caption">
                        {alert.triggered_at ? new Date(alert.triggered_at).toLocaleTimeString() : 'Just now'}
                      </Typography>
                    </Box>
                    <Typography variant="body1">Worker: {alert.worker?.name}</Typography>
                    <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
                      Hospital: {alert.hospital?.name}
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block', mb: 1, fontWeight: 'bold' }}>
                      Status: {alert.status}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </AnimatePresence>
            {liveSosAlerts.length === 0 && (
              <Typography color="text.secondary" textAlign="center" sx={{ mt: 4 }}>Listening for incidents via WebSockets...</Typography>
            )}
          </Box>
        </Card>
      </Grid>
      
    </Grid>
  );
}
