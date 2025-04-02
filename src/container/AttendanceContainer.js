import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import SnackbarAlert from '../component/SnackbarAlert.js';

const AttendanceContainer = () => {
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
            console.log('Fetched students:', data); // Debugging log

            if (response.ok) {
                const currentHour = new Date().getHours();

                // Process students' data to format date and update attendance dynamically
                const updatedStudents = data.map(student => {
                    const captureDate = new Date(student.capture_date_time);
                    const formattedDate = captureDate.toLocaleDateString();

                    return {
                        ...student,
                        formattedDate,
                        morning_present: student.morning_present ? 'Present' : 'Absent',
                        afternoon_present: currentHour < 12 
                            ? 'Yet to register' 
                            : student.afternoon_present ? 'Present' : 'Absent',
                    };
                });

                setStudents(updatedStudents);
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
        <>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <h5>Registered Students</h5>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Roll No</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Morning Session</TableCell>
                                <TableCell>Afternoon Session</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>{student.roll_no}</TableCell>
                                    <TableCell>{student.formattedDate || 'N/A'}</TableCell> 
                                    <TableCell>{student.morning_present}</TableCell>
                                    <TableCell>{student.afternoon_present}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <SnackbarAlert open={open} handleClose={handleClose} message={message} severity="error" />
        </>
    );
};

export default AttendanceContainer;
