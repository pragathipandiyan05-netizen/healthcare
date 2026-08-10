import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Stepper, Step, StepLabel,
  Box, Typography, TextField, Grid, MenuItem, Checkbox, FormControlLabel, FormGroup,
  Divider, IconButton
} from '@mui/material';
import { Close } from '@mui/icons-material';

const steps = [
  'Basic Info', 'Location', 'Contacts', 'Administration', 
  'Capacity', 'Services', 'Care Alert Setup', 'Documents'
];

const servicesList = [
  'Emergency / Casualty', 'ICU', 'Cardiology', 'Neurology', 'Orthopedics',
  'Pediatrics', 'Obstetrics & Gynecology', 'Surgery', 'Radiology',
  'Laboratory', 'Blood Bank', 'Pharmacy', 'Dialysis', 'Trauma Centre', 'Ambulance'
];

export default function HospitalRegistrationForm({ open, onClose }) {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    services: [],
    sosEnabled: true,
    inventoryAlerts: true
  });

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleChange = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });
  
  const handleServiceToggle = (service) => {
    const current = formData.services;
    const currentIndex = current.indexOf(service);
    const newServices = [...current];
    if (currentIndex === -1) newServices.push(service);
    else newServices.splice(currentIndex, 1);
    setFormData({ ...formData, services: newServices });
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}><Typography variant="h2">Hospital Basic Information</Typography></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Hospital Name *" onChange={handleChange('name')} /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Hospital Code / Facility ID *" onChange={handleChange('code')} /></Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth select label="Hospital Type *" onChange={handleChange('type')}>
                {['Government', 'Private', 'Medical College', 'District Hospital', 'Primary Health Centre', 'Community Health Centre', 'Specialty Hospital', 'Other'].map(opt => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Registration Number" /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Year Established" type="number" /></Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth select label="Hospital Status *" defaultValue="Active">
                {['Active', 'Inactive', 'Temporarily Closed'].map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
              </TextField>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}><Typography variant="h2">Location Details</Typography></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="State *" onChange={handleChange('state')} /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="District *" onChange={handleChange('district')} /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Taluk / Tehsil" /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="City / Town *" /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Address *" multiline rows={2} /></Grid>
            <Grid item xs={12} md={4}><TextField fullWidth label="Pincode *" /></Grid>
            <Grid item xs={12} md={4}><TextField fullWidth label="Latitude" placeholder="e.g. 13.0827" /></Grid>
            <Grid item xs={12} md={4}><TextField fullWidth label="Longitude" placeholder="e.g. 80.2707" /></Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}><Typography variant="h2">Contact Information</Typography></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Main Hospital Phone *" /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Emergency Phone *" /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Email *" type="email" /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Website" /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Ambulance Contact Number" /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Blood Bank Contact Number" /></Grid>
          </Grid>
        );
      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}><Typography variant="h2">Hospital Administration</Typography></Grid>
            <Grid item xs={12} md={4}><TextField fullWidth label="Administrator Name" /></Grid>
            <Grid item xs={12} md={4}><TextField fullWidth label="Administrator Phone" /></Grid>
            <Grid item xs={12} md={4}><TextField fullWidth label="Administrator Email" /></Grid>
            <Grid item xs={12}><Divider sx={{ my: 1 }} /></Grid>
            <Grid item xs={12}><Typography variant="subtitle1" fontWeight="bold">Nodal Officer (Escalation Contact)</Typography></Grid>
            <Grid item xs={12} md={4}><TextField fullWidth label="Nodal Officer Name *" onChange={handleChange('nodalOfficer')} /></Grid>
            <Grid item xs={12} md={4}><TextField fullWidth label="Nodal Officer Phone *" /></Grid>
            <Grid item xs={12} md={4}><TextField fullWidth label="Nodal Officer Email *" /></Grid>
          </Grid>
        );
      case 4:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}><Typography variant="h2">Capacity & Infrastructure</Typography></Grid>
            <Grid item xs={12} md={4}><TextField fullWidth label="Total Beds *" type="number" onChange={handleChange('totalBeds')} /></Grid>
            <Grid item xs={12} md={4}><TextField fullWidth label="ICU Beds" type="number" onChange={handleChange('icuBeds')} /></Grid>
            <Grid item xs={12} md={4}><TextField fullWidth label="Emergency Beds" type="number" /></Grid>
            <Grid item xs={12} md={3}><TextField fullWidth label="HDU Beds" type="number" /></Grid>
            <Grid item xs={12} md={3}><TextField fullWidth label="General Beds" type="number" /></Grid>
            <Grid item xs={12} md={3}><TextField fullWidth label="Private Beds" type="number" /></Grid>
            <Grid item xs={12} md={3}><TextField fullWidth label="NICU/PICU Beds" type="number" /></Grid>
            <Grid item xs={12} md={4}><TextField fullWidth label="Operating Theatres" type="number" /></Grid>
            <Grid item xs={12} md={4}><TextField fullWidth label="Ventilators" type="number" /></Grid>
            <Grid item xs={12} md={4}><TextField fullWidth label="Ambulances" type="number" onChange={handleChange('ambulances')} /></Grid>
          </Grid>
        );
      case 5:
        return (
          <Box>
            <Typography variant="h6" mb={2}>Services Available</Typography>
            <FormGroup>
              <Grid container spacing={2}>
                {servicesList.map(service => (
                  <Grid item xs={12} sm={6} md={4} key={service}>
                    <FormControlLabel
                      control={<Checkbox checked={formData.services.includes(service)} onChange={() => handleServiceToggle(service)} />}
                      label={service}
                    />
                  </Grid>
                ))}
              </Grid>
            </FormGroup>
          </Box>
        );
      case 6:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}><Typography variant="h2">Care Alert System Configuration</Typography></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Hospital Admin Email *" /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Hospital Admin Phone *" /></Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth select label="Notification Method" defaultValue="Push">
                {['Push', 'SMS', 'Email', 'All'].map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth select label="SOS Escalation Time" defaultValue="5">
                <MenuItem value="2">2 Minutes</MenuItem>
                <MenuItem value="5">5 Minutes</MenuItem>
                <MenuItem value="10">10 Minutes</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <FormGroup row>
                <FormControlLabel control={<Checkbox defaultChecked />} label="SOS Enabled" />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Inventory Alerts Enabled" />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Blood Alerts Enabled" />
              </FormGroup>
            </Grid>
          </Grid>
        );
      case 7:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}><Typography variant="h2">Documents & Verification</Typography></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Accreditation Number" /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Verification Status" select defaultValue="Pending">
              {['Pending', 'Under Review', 'Verified'].map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
            </TextField></Grid>
            <Grid item xs={12}>
              <Button variant="outlined" component="label" fullWidth sx={{ py: 3, borderStyle: 'dashed' }}>
                Upload Registration Certificate / Documents
                <input type="file" hidden multiple />
              </Button>
            </Grid>
          </Grid>
        );
      case 8: // Final Review Step
        return (
          <Box sx={{ bgcolor: '#F8FAFC', p: 3, borderRadius: 2 }}>
            <Typography variant="h5" color="primary" mb={3} fontWeight="bold">Review Hospital Registration</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}><Typography color="text.secondary">Hospital</Typography><Typography fontWeight="bold">{formData.name || 'Not provided'}</Typography></Grid>
              <Grid item xs={6}><Typography color="text.secondary">Hospital Code</Typography><Typography fontWeight="bold">{formData.code || 'Not provided'}</Typography></Grid>
              <Grid item xs={6}><Typography color="text.secondary">District</Typography><Typography fontWeight="bold">{formData.district || 'Not provided'}</Typography></Grid>
              <Grid item xs={6}><Typography color="text.secondary">Total Beds</Typography><Typography fontWeight="bold">{formData.totalBeds || 0}</Typography></Grid>
              <Grid item xs={6}><Typography color="text.secondary">ICU Beds</Typography><Typography fontWeight="bold">{formData.icuBeds || 0}</Typography></Grid>
              <Grid item xs={6}><Typography color="text.secondary">Emergency</Typography><Typography fontWeight="bold">24×7</Typography></Grid>
              <Grid item xs={6}><Typography color="text.secondary">Blood Bank</Typography><Typography fontWeight="bold">{formData.services.includes('Blood Bank') ? 'Available' : 'N/A'}</Typography></Grid>
              <Grid item xs={6}><Typography color="text.secondary">Ambulance</Typography><Typography fontWeight="bold">{formData.ambulances || 0}</Typography></Grid>
              <Grid item xs={6}><Typography color="text.secondary">SOS</Typography><Typography fontWeight="bold" color="success.main">Enabled</Typography></Grid>
              <Grid item xs={6}><Typography color="text.secondary">Nodal Officer</Typography><Typography fontWeight="bold">{formData.nodalOfficer || 'Not provided'}</Typography></Grid>
            </Grid>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{ sx: { minHeight: '80vh', borderRadius: 3 } }}>
      <DialogTitle sx={{ m: 0, p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h1">Register New Hospital</Typography>
        <IconButton onClick={onClose}><Close /></IconButton>
      </DialogTitle>
      
      <DialogContent dividers sx={{ p: { xs: 2, md: 4 } }}>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 5, display: { xs: 'none', md: 'flex' } }}>
          {steps.map((label) => (
            <Step key={label}><StepLabel>{label}</StepLabel></Step>
          ))}
        </Stepper>
        
        {/* Mobile Step Indicator */}
        <Typography variant="subtitle2" color="primary" sx={{ display: { xs: 'block', md: 'none' }, mb: 2 }}>
          Step {activeStep + 1} of {steps.length}: {steps[activeStep] || 'Review'}
        </Typography>

        {renderStepContent(activeStep)}
      </DialogContent>
      
      <DialogActions sx={{ p: 3, justifyContent: 'space-between' }}>
        <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined" size="large">
          Back
        </Button>
        {activeStep === steps.length ? (
          <Button variant="contained" color="primary" size="large" onClick={() => {
            console.log('Registered', formData);
            onClose();
          }}>
            Register Hospital
          </Button>
        ) : (
          <Button variant="contained" color="primary" size="large" onClick={handleNext}>
            Next Step
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
