import React from 'react';
import { Box, Typography, Chip, Paper } from '@mui/material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

export default function FeedbackChart({ feedbacks }) {
    // Simple chart showing feedback count by sentiment
    const sentimentCounts = {
        positive: feedbacks.filter(f => f.sentiment === 'positive').length,
        neutral: feedbacks.filter(f => f.sentiment === 'neutral').length,
        negative: feedbacks.filter(f => f.sentiment === 'negative').length
    };

    return (
        <Paper
            elevation={2}
            sx={{
                mb: 4,
                p: 3,
                borderRadius: 3,
                background: 'linear-gradient(90deg, #e3f2fd 70%, #fce4ec 100%)',
                boxShadow: '0 2px 8px 0 rgba(25, 118, 210, 0.06)',
            }}
        >
            <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: 700, color: '#1976d2', letterSpacing: 0.5 }}
            >
                Feedback Sentiment Overview
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
                <Chip
                    icon={<SentimentSatisfiedAltIcon style={{ color: '#43a047' }} />}
                    label={`Positive: ${sentimentCounts.positive}`}
                    sx={{
                        background: '#e8f5e9',
                        color: '#388e3c',
                        fontWeight: 600,
                        fontSize: '1.05rem',
                        px: 2,
                        py: 1,
                        minWidth: 130,
                    }}
                />
                <Chip
                    icon={<SentimentNeutralIcon style={{ color: '#fbc02d' }} />}
                    label={`Neutral: ${sentimentCounts.neutral}`}
                    sx={{
                        background: '#fffde7',
                        color: '#fbc02d',
                        fontWeight: 600,
                        fontSize: '1.05rem',
                        px: 2,
                        py: 1,
                        minWidth: 130,
                    }}
                />
                <Chip
                    icon={<SentimentDissatisfiedIcon style={{ color: '#e53935' }} />}
                    label={`Negative: ${sentimentCounts.negative}`}
                    sx={{
                        background: '#ffebee',
                        color: '#e53935',
                        fontWeight: 600,
                        fontSize: '1.05rem',
                        px: 2,
                        py: 1,
                        minWidth: 130,
                    }}
                />
            </Box>
        </Paper>
    );
}
