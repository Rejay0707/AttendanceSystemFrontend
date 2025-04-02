import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import CapturePage from './pages/CapturePage.js';
import AttendancePage from './pages/AttendancePage.js';

const App = () => {
    return (
        <Router>
            <Container maxWidth="md" style={{ padding: '20px' }}>
                <AppBar position="static" sx={{ backgroundColor: '#4d1a00', marginBottom: '20px' }}>
                    <Toolbar>
                        <Typography variant="h6" style={{ flexGrow: 1 }}>
                            Student Attendance System
                        </Typography>
                        <Button color="inherit" component={Link} to="/">Register</Button>
                        <Button color="inherit" component={Link} to="/view-attendance">View Attendance</Button>
                    </Toolbar>
                </AppBar>
                <Routes>
                    <Route path="/" element={<CapturePage />} />
                    <Route path="/view-attendance" element={<AttendancePage />} />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;