import React from 'react';
import { Paper } from '@mui/material';
import CaptureContainer from '../container/CaptureContainer.js';

const CapturePage = () => {
    return (
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        
            <CaptureContainer />
        </Paper>
    );
};

export default CapturePage;