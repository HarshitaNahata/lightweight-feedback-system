import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useFeedback } from '../../context/FeedbackContext';
import { Box, Typography, Button } from '@mui/material';
import FeedbackList from '../feedback/FeedbackList';

export default function EmployeeDashboard() {
    const { user, logout } = useAuth();
    const { feedbacks, loadInitialData, updateFeedback } = useFeedback();

    useEffect(() => {
        if (user) loadInitialData(user);
    }, [user, loadInitialData]);

    const handleAcknowledge = (id) => {
        updateFeedback(id, { acknowledged: true });
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4">Employee Dashboard</Typography>
                <Button onClick={logout}>Logout</Button>
            </Box>

            <Typography variant="h5" gutterBottom>Your Feedback</Typography>
            <FeedbackList
                feedbacks={feedbacks}
                onAcknowledge={handleAcknowledge}
            />
        </Box>
    );
}
