import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useFeedback } from '../../context/FeedbackContext';
import { Box, Typography, Button, Grid } from '@mui/material';
import FeedbackForm from '../feedback/FeedbackForm';
import FeedbackList from '../feedback/FeedbackList';
import FeedbackChart from '../feedback/FeedbackChart';

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
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4">Manager Dashboard</Typography>
                <Button onClick={logout}>Logout</Button>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Typography variant="h6" gutterBottom>Team Members</Typography>
                    {teamMembers.map(member => (
                        <Button
                            key={member.id}
                            variant={selectedEmployee?.id === member.id ? 'contained' : 'outlined'}
                            onClick={() => setSelectedEmployee(member)}
                            sx={{ m: 1 }}
                        >
                            {member.name}
                        </Button>
                    ))}

                    {selectedEmployee && (
                        <Box sx={{ mt: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Feedback for {selectedEmployee.name}
                            </Typography>
                            <FeedbackForm
                                employee={selectedEmployee}
                                onSubmit={() => setSelectedEmployee(null)}
                            />
                        </Box>
                    )}
                </Grid>

                <Grid item xs={8}>
                    <FeedbackChart feedbacks={feedbacks} />
                    <FeedbackList
                        feedbacks={feedbacks}
                        editable={true}
                        showEmployee={true}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
