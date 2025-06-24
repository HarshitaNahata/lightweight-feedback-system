import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useFeedback } from '../../context/FeedbackContext';
import { Box, Typography, Button, Grid, Paper, Divider } from '@mui/material';
import FeedbackForm from '../feedback/FeedbackForm';
import FeedbackList from '../feedback/FeedbackList';
import FeedbackChart from '../feedback/FeedbackChart';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import { generatePDF } from '../../utils/pdfExport';

export default function ManagerDashboard() {
    const { user, logout } = useAuth();
    const { teamMembers, feedbacks, loadInitialData } = useFeedback();
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        if (user && teamMembers.length === 0) {
            loadInitialData(user);
        }
    }, [user, loadInitialData, teamMembers.length]);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #e3f2fd 0%, #fce4ec 100%)',
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
                    maxWidth: 1100,
                    p: 4,
                    borderRadius: 4,
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.12)',
                    background: 'rgba(255,255,255,0.97)',
                }}
            >
                {/* Header */}
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
                        Manager Dashboard
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

                <Grid container spacing={4}>
                    {/* Team Members and Feedback Form */}
                    <Grid item xs={12} md={4}>
                        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <GroupIcon sx={{ color: '#1976d2' }} />
                            <Typography
                                variant="h6"
                                sx={{ color: '#1976d2', fontWeight: 600, letterSpacing: 0.5 }}
                                gutterBottom
                            >
                                Team Members
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {teamMembers.map(member => (
                                <Button
                                    key={member.id}
                                    variant={selectedEmployee?.id === member.id ? 'contained' : 'outlined'}
                                    onClick={() => setSelectedEmployee(member)}
                                    sx={{
                                        justifyContent: 'flex-start',
                                        textAlign: 'left',
                                        fontWeight: 500,
                                        color: selectedEmployee?.id === member.id ? '#fff' : '#1976d2',
                                        background: selectedEmployee?.id === member.id
                                            ? 'linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)'
                                            : '#e3f2fd',
                                        borderColor: '#1976d2',
                                        borderRadius: 2,
                                        mb: 1,
                                        px: 2,
                                        py: 1.2,
                                        boxShadow: selectedEmployee?.id === member.id
                                            ? '0 2px 8px 0 rgba(25, 118, 210, 0.12)'
                                            : 'none',
                                        '&:hover': {
                                            background: selectedEmployee?.id === member.id
                                                ? 'linear-gradient(90deg, #1565c0 60%, #64b5f6 100%)'
                                                : '#bbdefb',
                                        },
                                    }}
                                >
                                    {member.name}
                                </Button>
                            ))}
                        </Box>

                        {selectedEmployee && (
                            <Box sx={{ mt: 3 }}>
                                <Divider sx={{ mb: 2 }} />
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: '#1565c0',
                                        fontWeight: 600,
                                        mb: 2,
                                        letterSpacing: 0.5,
                                    }}
                                    gutterBottom
                                >
                                    Feedback for {selectedEmployee.name}
                                </Typography>
                                <FeedbackForm
                                    employee={selectedEmployee}
                                    onSubmit={() => setSelectedEmployee(null)}
                                />
                            </Box>
                        )}
                    </Grid>

                    {/* Feedback Chart, Export PDF Button and List */}
                    <Grid item xs={12} md={8}>
                        <Button
                            variant="outlined"
                            onClick={() => generatePDF(feedbacks)}
                            sx={{
                                mb: 2,         // existing margin-bottom (theme spacing, e.g. 16px if spacing=8)
                                float: 'right',
                                position: 'relative',
                                top: '5px',
                                right: '5px'
                            }}
                        >
                            Export as PDF
                        </Button>
                        <FeedbackChart feedbacks={feedbacks} />
                        <Divider sx={{ my: 2 }} />
                        <FeedbackList
                            feedbacks={feedbacks}
                            editable={true}
                            showEmployee={true}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}
