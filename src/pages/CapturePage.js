// import React from 'react';
// import { Paper } from '@mui/material';
// import CaptureContainer from '../container/CaptureContainer.js';

// const CapturePage = () => {
//     return (
//         <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        
//             <CaptureContainer />
//         </Paper>
//     );
// };

// export default CapturePage;
// pages/CapturePage.js
import React from 'react';
import { Paper } from '@mui/material';
import CaptureContainer from '../container/CaptureContainer';
import RegisterTeacher from '../component/RegisterTeacher'; // New component for registering teachers

const CapturePage = () => {
    return (
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
            <h2>Register Student</h2>
            <CaptureContainer />
            <h2>Register Teacher</h2>
            <RegisterTeacher />
        </Paper>
    );
};

export default CapturePage;
