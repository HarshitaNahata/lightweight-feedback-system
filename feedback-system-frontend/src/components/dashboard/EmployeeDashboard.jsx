import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useFeedback } from '../../context/FeedbackContext';
import { Box, Typography, Button, Paper } from '@mui/material';
import FeedbackList from '../feedback/FeedbackList';
import LogoutIcon from '@mui/icons-material/Logout';
import { generatePDF } from '../../utils/pdfExport';
import { useNotification } from '../../context/NotificationContext';
import FeedbackRequestModal from '../feedback/FeedbackRequestModal';

export default function EmployeeDashboard() {
    const { user, logout } = useAuth();
    const { feedbacks, loadFeedbacks, updateFeedback } = useFeedback();
    const { addNotification } = useNotification();

    // State for FeedbackRequestModal
    const [requestModalOpen, setRequestModalOpen] = useState(false);

    useEffect(() => {
        if (user) {
            loadFeedbacks();
        }
    }, [user, loadFeedbacks]);


    const handleAcknowledge = (id) => {
        updateFeedback(id, { acknowledged: true });
        addNotification('Feedback acknowledged!', 'info');
    };

    // Handler for feedback request submission
    const handleRequestFeedback = (message) => {
        // Here you could send the request to backend in the future
        addNotification('Feedback request sent!', 'success');
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #fce4ec 0%, #e3f2fd 100%)',
                py: 6,
                px: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Paper
                elevation={5}
                sx={{
                    width: '100%',
                    maxWidth: 700,
                    p: 4,
                    borderRadius: 4,
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.12)',
                    background: 'rgba(255,255,255,0.97)',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 3,
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            color: '#1976d2',
                            letterSpacing: 1,
                        }}
                    >
                        Employee Dashboard
                    </Typography>
                    <Button
                        onClick={logout}
                        variant="outlined"
                        color="secondary"
                        startIcon={<LogoutIcon />}
                        sx={{
                            fontWeight: 600,
                            borderRadius: 2,
                            px: 2,
                            py: 1,
                            borderColor: '#1976d2',
                            color: '#1976d2',
                            '&:hover': {
                                backgroundColor: '#e3f2fd',
                                borderColor: '#1976d2',
                            },
                        }}
                    >
                        Logout
                    </Button>
                </Box>

                <Typography
                    variant="h5"
                    sx={{
                        mb: 2,
                        fontWeight: 600,
                        color: '#1565c0',
                        letterSpacing: 0.5,
                    }}
                    gutterBottom
                >
                    Your Feedback
                </Typography>

                <Button
                    variant="outlined"
                    onClick={() => generatePDF(feedbacks)}
                    sx={{ mb: 2, float: 'right' }}
                >
                    Export as PDF
                </Button>

                {/* Request Feedback Button */}
                <Button
                    variant="outlined"
                    sx={{ mb: 3, mr: 2 }}
                    onClick={() => setRequestModalOpen(true)}
                >
                    Request Feedback
                </Button>

                <FeedbackList
                    feedbacks={feedbacks}
                    onAcknowledge={handleAcknowledge}
                />

                {/* Feedback Request Modal */}
                <FeedbackRequestModal
                    open={requestModalOpen}
                    onClose={() => setRequestModalOpen(false)}
                    onSubmit={handleRequestFeedback}
                />
            </Paper>
        </Box>
    );
}
