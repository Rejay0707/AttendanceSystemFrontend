// components/Statistics.js
import React, { useEffect, useState } from 'react';

const Statistics = () => {
    const [totalStudents, setTotalStudents] = useState(0);
    const [totalTeachers, setTotalTeachers] = useState(0);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const studentResponse = await fetch('http://localhost:5000/api/students'); // Adjust the endpoint as needed
                const teacherResponse = await fetch('http://localhost:5000/api/teachers'); // Adjust the endpoint as needed

                if (studentResponse.ok) {
                    const students = await studentResponse.json();
                    setTotalStudents(students.length);
                }

                if (teacherResponse.ok) {
                    const teachers = await teacherResponse.json();
                    setTotalTeachers(teachers.length);
                }
            } catch (error) {
                console.error('Error fetching statistics:', error);
            }
        };

        fetchStatistics();
    }, []);

    return (
        <div>
            <h3>Welcome, Admin!</h3>
            <p>Total Students: {totalStudents}</p>
            <p>Total Teachers: {totalTeachers}</p>
        </div>
    );
};

export default Statistics;
