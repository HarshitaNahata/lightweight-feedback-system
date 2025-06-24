import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

export default function FeedbackRequestModal({ open, onClose, onSubmit }) {
    const [requestText, setRequestText] = useState('');
    const handleSubmit = () => {
        onSubmit(requestText);
        setRequestText('');
        onClose();
    };
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Request Feedback</DialogTitle>
            <DialogContent>
                <TextField
                    label="Feedback Request Message"
                    multiline
                    rows={4}
                    fullWidth
                    value={requestText}
                    onChange={(e) => setRequestText(e.target.value)}
                    placeholder="Please specify what kind of feedback you are looking for..."
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit} disabled={!requestText.trim()}>Send Request</Button>
            </DialogActions>
        </Dialog>
    );
}
