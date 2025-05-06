import React, { useEffect, useState } from 'react';
import {
    Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, TextField
} from '@mui/material';
import SnackbarAlert from '../component/SnackbarAlert.js';

const AttendanceContainer = () => {
    const [students, setStudents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date().toISOString().split('T')[0];
        return today;
    });
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchStudents(selectedDate);
    }, [selectedDate]);

    const fetchStudents = async (date) => {
        try {
            const response = await fetch(`http://localhost:5000/api/students?date=${date}`);
            const data = await response.json();

            if (response.ok) {
                const currentHour = new Date().getHours();
                const todayDate = new Date().toISOString().split('T')[0];

                const updatedStudents = data.map(student => {
                    const studentDate = new Date(student.capture_date_time).toISOString().split('T')[0];
                    const isToday = studentDate === todayDate;

                    const afternoonStatus = isToday && currentHour < 12
                        ? 'Yet to register'
                        : student.afternoon_present === null
                            ? 'Yet to register'
                            : student.afternoon_present
                                ? 'Present'
                                : 'Absent';

                    return {
                        ...student,
                        morning_present: student.morning_present ? 'Present' : 'Absent',
                        afternoon_present: afternoonStatus,
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
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    return (
        <>
            <Paper elevation={3} sx={{ padding: 2 }}>
                <TextField
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Roll No</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Session</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Session</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map((student, index) => (
                                <TableRow key={index}>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>{student.roll_no}</TableCell>
                                    <TableCell>{new Date(student.capture_date_time).toLocaleDateString()}</TableCell>
                                    <TableCell>Morning</TableCell>
                                    <TableCell>{student.morning_present}</TableCell>
                                    <TableCell>Afternoon</TableCell>
                                    <TableCell>{student.afternoon_present}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <SnackbarAlert open={open} message={message} handleClose={handleClose} />

            

        </>
    );
};

export default AttendanceContainer;
