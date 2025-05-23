// components/RegisterTeacher.js
import React, { useState } from 'react';
import { TextField, Button, MenuItem, Box } from '@mui/material';

const grades = ['I', 'II', 'III', 'IV']; // Adjust as needed

const RegisterTeacher = () => {
    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        selectedGrades: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleGradeChange = (e) => {
        const value = e.target.value;
        setFormData((prev) => ({
            ...prev,
            selectedGrades: typeof value === 'string' ? value.split(',') : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add logic to send formData to the backend
        console.log('Registering teacher:', formData);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
                label="Teacher's Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <TextField
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
            />
            <TextField
                select
                label="Grades"
                name="selectedGrades"
                value={formData.selectedGrades}
                onChange={handleGradeChange}
                required
                SelectProps={{
                    multiple: true,
                }}
            >
                {grades.map((grade) => (
                    <MenuItem key={grade} value={grade}>
                        {grade}
                    </MenuItem>
                ))}
            </TextField>
            <Button type="submit" variant="contained" color="primary">
                Register Teacher
            </Button>
        </Box>
    );
};

export default RegisterTeacher;
