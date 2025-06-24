import React from 'react';
import { Box, Typography } from '@mui/material';

export default function FeedbackChart({ feedbacks }) {
    // Simple chart showing feedback count by sentiment
    const sentimentCounts = {
        positive: feedbacks.filter(f => f.sentiment === 'positive').length,
        neutral: feedbacks.filter(f => f.sentiment === 'neutral').length,
        negative: feedbacks.filter(f => f.sentiment === 'negative').length
    };

    return (
        <Box sx={{ mb: 4, p: 2, border: '1px dashed #ccc', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>Feedback Sentiment</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Box>
                    <Typography>Positive: {sentimentCounts.positive}</Typography>
                </Box>
                <Box>
                    <Typography>Neutral: {sentimentCounts.neutral}</Typography>
                </Box>
                <Box>
                    <Typography>Negative: {sentimentCounts.negative}</Typography>
                </Box>
            </Box>
        </Box>
    );
}
