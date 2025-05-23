// import React, { useRef, useState } from 'react';
// import Webcam from 'react-webcam';
// import { TextField, Button, Box } from '@mui/material';

// const WebcamCapture = ({ onCapture, setErrorMessage }) => {
//     const webcamRef = useRef(null);
//     const [name, setName] = useState('');
//     const [rollNo, setRollNo] = useState('');

//     const capture = () => {
//         if (!name || !rollNo) {
//             setErrorMessage('Please enter both Student Name and Roll Number.');
//             return; // Prevent capturing if fields are empty
//         }

//         const imageSrc = webcamRef.current.getScreenshot();
//         onCapture(imageSrc, name, rollNo);
//     };

//     return (
//         <Box display="flex" flexDirection="column" alignItems="center">
//             <TextField
//                 label="Student Name"
//                 variant="outlined"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 style={{ marginBottom: '10px', width: '100%' }}
//             />
//             <TextField
//                 label="Roll Number"
//                 variant="outlined"
//                 value={rollNo}
//                 onChange={(e) => setRollNo(e.target.value)}
//                 style={{ marginBottom: '10px', width: '100%' }}
//             />
//             <Webcam
//                 audio={false}
//                 ref={webcamRef}
//                 screenshotFormat="image/jpeg"
//                 width={400}
//                 style={{ marginBottom: '10px' }}
//             />
//             <Button variant="contained" color="primary" onClick={capture}>
//                 Capture
//             </Button>
//         </Box>
//     );
// };

// export default WebcamCapture;

import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { TextField, Button, Box, MenuItem } from '@mui/material';

const grades = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

const WebcamCapture = ({ onCapture, setErrorMessage }) => {
    const webcamRef = useRef(null);
    const [name, setName] = useState('');
    const [rollNo, setRollNo] = useState('');
    const [grade, setGrade] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const capture = () => {
    if (!name || !rollNo || !grade || !phoneNumber) {
        setErrorMessage('Please enter Student Name, Roll Number, Grade, and Phone Number.');
        return;
    }

    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc, name, rollNo, grade, phoneNumber);
};


    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <TextField
                label="Student Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ marginBottom: '10px', width: '100%' }}
            />
            <TextField
                label="Roll Number"
                variant="outlined"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                style={{ marginBottom: '10px', width: '100%' }}
            />
            <TextField
                select
                label="Grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                variant="outlined"
                style={{ marginBottom: '10px', width: '100%' }}
            >
                {grades.map((g) => (
                    <MenuItem key={g} value={g}>{g}</MenuItem>
                ))}
            </TextField>
            <TextField
                label="Parent's Phone Number"
                variant="outlined"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                style={{ marginBottom: '10px', width: '100%' }}
            />
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={400}
                style={{ marginBottom: '10px' }}
            />
            <Button variant="contained" color="primary" onClick={capture}>
                Capture
            </Button>
        </Box>
    );
};

export default WebcamCapture;
