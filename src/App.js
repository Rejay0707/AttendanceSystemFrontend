import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container
} from '@mui/material';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminContainer from './container/AdminContainer';
import TeacherPage from './pages/TeacherPage';
import StudentPage from './pages/StudentPage';
import CapturePage from './pages/CapturePage';
import AttendancePage from './pages/AttendancePage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    setRole('');
  };

  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    if (savedRole) {
      setIsAuthenticated(true);
      setRole(savedRole);
    }
  }, []);

  return (
    <Router>
      <Container maxWidth="md" sx={{ padding: '20px' }}>
        {isAuthenticated && (
          <AppBar position="static" sx={{ backgroundColor: '#4d1a00', marginBottom: '20px' }}>
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Student Attendance System ({role})
              </Typography>
              {role === 'admin' && (
                <>
                  <Button color="inherit" component={Link} to="/admin">Dashboard</Button>
                  <Button color="inherit" component={Link} to="/capture">Capture</Button>
                  <Button color="inherit" component={Link} to="/attendance">Attendance</Button>
                </>
              )}
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </Toolbar>
          </AppBar>
        )}

        <Routes>
          {/* Public Routes */}
          {!isAuthenticated && (
            <>
              <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} setRole={setRole} />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}

          {/* Admin Routes */}
          {isAuthenticated && role === 'admin' && (
            <>
              <Route path="/admin" element={<AdminContainer />} />
              <Route path="/capture" element={<CapturePage />} />
              <Route path="/attendance" element={<AttendancePage />} />
              <Route path="*" element={<Navigate to="/admin" />} />
            </>
          )}

          {/* Teacher Routes */}
          {isAuthenticated && role === 'teacher' && (
            <>
              <Route path="/teacher" element={<TeacherPage />} />
              <Route path="*" element={<Navigate to="/teacher" />} />
            </>
          )}

          {/* Student Routes */}
          {isAuthenticated && role === 'student' && (
            <>
              <Route path="/student" element={<StudentPage />} />
              <Route path="*" element={<Navigate to="/student" />} />
            </>
          )}
        </Routes>
      </Container>
    </Router>
  );
};

export default App;


