import { Box, Card, CardContent, Typography, Chip, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

export default function FeedbackList({
    feedbacks,
    editable = false,
    showEmployee = false,
    onAcknowledge
}) {
    const getSentimentIcon = (sentiment) => {
        switch (sentiment) {
            case 'positive': return <SentimentSatisfiedIcon color="success" />;
            case 'neutral': return <SentimentNeutralIcon color="warning" />;
            case 'negative': return <SentimentDissatisfiedIcon color="error" />;
            default: return null;
        }
    };

    return (
        <Box sx={{ mt: 2 }}>
            {feedbacks.length === 0 ? (
                <Typography>No feedback available</Typography>
            ) : (
                feedbacks.map(feedback => (
                    <Card key={feedback.id} sx={{ mb: 2 }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box>
                                    {showEmployee && feedback.employeeName && (
                                        <Chip
                                            label={feedback.employeeName}
                                            size="small"
                                            sx={{ mb: 1 }}
                                        />
                                    )}
                                    <Typography variant="body2" color="text.secondary">
                                        {feedback.date}
                                    </Typography>
                                </Box>
                                <Box>
                                    {getSentimentIcon(feedback.sentiment)}
                                </Box>
                            </Box>

                            <Typography variant="h6" sx={{ mt: 1 }}>Strengths</Typography>
                            <Typography paragraph>{feedback.strengths}</Typography>

                            <Typography variant="h6">Areas for Improvement</Typography>
                            <Typography paragraph>{feedback.areas}</Typography>

                            {!feedback.acknowledged && onAcknowledge && (
                                <IconButton
                                    onClick={() => onAcknowledge(feedback.id)}
                                    color="primary"
                                >
                                    <CheckCircleIcon />
                                    <Typography variant="body2" sx={{ ml: 1 }}>Acknowledge</Typography>
                                </IconButton>
                            )}

                            {feedback.acknowledged && (
                                <Chip
                                    label="Acknowledged"
                                    color="success"
                                    icon={<CheckCircleIcon />}
                                    size="small"
                                />
                            )}
                        </CardContent>
                    </Card>
                ))
            )}
        </Box>
    );
}
