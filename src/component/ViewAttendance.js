import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ViewAttendance = () => {
    const [students, setStudents] = useState([]);
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/students');
            const data = await response.json();
            if (response.ok) {
                setStudents(data);
            } else {
                setMessage(data.message || 'Failed to fetch students.');
                setOpen(true);
            }
        } catch (error) {
            console.error('Error fetching students:', error);
            setMessage('An error occurred while fetching students.');
            setOpen(true);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Container maxWidth="md" style={{ padding: '20px' }}>
            <AppBar position="static" sx={{ backgroundColor: '#52143d', marginBottom: '20px' }}>
                <Toolbar>
                    <Typography variant="h6">Attendance List</Typography>
                </Toolbar>
            </AppBar>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h5" gutterBottom>
                    Registered Students
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Roll No</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map((student) => (
                                <TableRow key={student.roll_no}>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>{student.roll_no}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ViewAttendance;






