import React, { useState } from 'react';
import WebcamCapture from '../component/WebcamCapture.js';
import SnackbarAlert from '../component/SnackbarAlert.js';
import { Paper } from '@mui/material';

const CaptureContainer = () => {
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);

    const base64ToBlob = (base64, type = 'image/jpeg') => {
        const byteCharacters = atob(base64.split(',')[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type });
    };

    const handleCapture = (imageSrc, name, rollNo) => {
        const imageBlob = base64ToBlob(imageSrc);
        setImage(imageSrc);
        sendImageToServer(imageBlob, name, rollNo);
    };

    const sendImageToServer = async (imageBlob, name, rollNo) => {
        const formData = new FormData();
        formData.append('face', imageBlob, 'face.jpg');
        formData.append('name', name);
        formData.append('roll_no', rollNo);

        try {
            const response = await fetch('http://localhost:5000/api/students/register', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Image captured successfully! Student registered.');
            } else {
                setMessage(data.message || 'Registration failed.');
            }
        } catch (error) {
            setMessage('An error occurred while capturing the image.');
        } finally {
            setOpen(true);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const setErrorMessage = (errorMessage) => {
        setMessage(errorMessage);
        setOpen(true);
    };

    return (
        <Paper elevation={3} style={{ padding: '20px' }}>
            <WebcamCapture onCapture={handleCapture} setErrorMessage={setErrorMessage} />
            {image && (
                <img src={image} alt="Captured" style={{ width: '100%', maxWidth: '400px', borderRadius: '8px', marginTop: '20px' }} />
            )}
            <SnackbarAlert 
                open={open} 
                handleClose={handleClose} 
                message={message} 
                severity={message.includes('successfully') ? 'success' : 'error'} 
            />
        </Paper>
    );
};

export default CaptureContainer;