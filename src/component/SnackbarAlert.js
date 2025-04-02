import React from 'react';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const SnackbarAlert = ({ open, handleClose, message, severity }) => {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <MuiAlert onClose={handleClose} severity={severity}>
                {message}
            </MuiAlert>
        </Snackbar>
    );
};

export default SnackbarAlert;