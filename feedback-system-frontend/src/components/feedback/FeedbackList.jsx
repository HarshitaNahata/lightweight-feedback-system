import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, Card, CardContent, Typography, Chip, IconButton, Divider, Tooltip, TextField, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import PersonIcon from '@mui/icons-material/Person';
import { useNotification } from '../../context/NotificationContext';
import { useFeedback } from '../../context/FeedbackContext';

export default function FeedbackList({
    feedbacks,
    editable = false,
    showEmployee = false,
    onAcknowledge
}) {
    const { addNotification } = useNotification();

    // Map of feedbackId -> array of comments
    const [commentsMap, setCommentsMap] = useState({});
    // Map of feedbackId -> current input
    const [commentInputs, setCommentInputs] = useState({});
    const { acknowledgeFeedback } = useFeedback();

    const handleAcknowledge = (id) => {
        if (onAcknowledge) {
            onAcknowledge(id);
            addNotification('Feedback acknowledged!', 'info');
        }
    };

    const handleCommentChange = (id, value) => {
        setCommentInputs(prev => ({ ...prev, [id]: value }));
    };

    const handleAddComment = (id) => {
        const comment = commentInputs[id];
        if (comment && comment.trim()) {
            setCommentsMap(prev => {
                const prevComments = prev[id] || [];
                return { ...prev, [id]: [...prevComments, comment.trim()] };
            });
            setCommentInputs(prev => ({ ...prev, [id]: '' }));
        }
    };

    const getSentimentIcon = (sentiment) => {
        switch (sentiment) {
            case 'positive':
                return <SentimentSatisfiedIcon sx={{ color: '#43a047', fontSize: 32 }} />;
            case 'neutral':
                return <SentimentNeutralIcon sx={{ color: '#fbc02d', fontSize: 32 }} />;
            case 'negative':
                return <SentimentDissatisfiedIcon sx={{ color: '#e53935', fontSize: 32 }} />;
            default:
                return null;
        }
    };

    return (
        <Box sx={{ mt: 2 }}>
            {feedbacks.length === 0 ? (
                <Typography sx={{ color: '#888', textAlign: 'center', mt: 4 }}>
                    No feedback available
                </Typography>
            ) : (
                feedbacks.map(feedback => (
                    <Card
                        key={feedback.id}
                        sx={{
                            mb: 3,
                            borderRadius: 3,
                            boxShadow: '0 2px 8px 0 rgba(25, 118, 210, 0.08)',
                            background: feedback.sentiment === 'positive'
                                ? 'linear-gradient(90deg, #e8f5e9 70%, #e3f2fd 100%)'
                                : feedback.sentiment === 'neutral'
                                    ? 'linear-gradient(90deg, #fffde7 70%, #e3f2fd 100%)'
                                    : 'linear-gradient(90deg, #ffebee 70%, #fce4ec 100%)'
                        }}
                    >
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    {showEmployee && feedback.employeeName && (
                                        <Chip
                                            icon={<PersonIcon />}
                                            label={feedback.employeeName}
                                            size="small"
                                            sx={{
                                                background: '#e3f2fd',
                                                color: '#1976d2',
                                                fontWeight: 600,
                                                mr: 1
                                            }}
                                        />
                                    )}
                                    <Typography variant="body2" color="text.secondary">
                                        {feedback.date}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Tooltip title={feedback.sentiment.charAt(0).toUpperCase() + feedback.sentiment.slice(1)}>
                                        {getSentimentIcon(feedback.sentiment)}
                                    </Tooltip>
                                </Box>
                            </Box>

                            <Divider sx={{ mb: 2 }} />

                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5, letterSpacing: 0.2 }}
                            >
                                Strengths
                            </Typography>
                            <Typography
                                paragraph
                                sx={{
                                    background: '#e8f5e9',
                                    borderRadius: 2,
                                    p: 1.2,
                                    mb: 2,
                                    color: '#388e3c'
                                }}
                            >
                                {feedback.strengths}
                            </Typography>

                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: 600, color: '#1976d2', mb: 0.5, letterSpacing: 0.2 }}
                            >
                                Areas for Improvement
                            </Typography>
                            <Typography
                                paragraph
                                sx={{
                                    background: '#fffde7',
                                    borderRadius: 2,
                                    p: 1.2,
                                    mb: 2,
                                    color: '#fbc02d'
                                }}
                            >
                                {feedback.areas}
                            </Typography>

                            {/* Tag and anonymous display section */}
                            <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                {feedback.anonymous && (
                                    <Chip label="Anonymous" color="default" size="small" sx={{ mr: 1 }} />
                                )}
                                {feedback.tags && feedback.tags.map((tag) => (
                                    <Chip key={tag} label={tag} size="small" color="secondary" />
                                ))}
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                                {!feedback.acknowledged && onAcknowledge && (
                                    <IconButton
                                        onClick={() => acknowledgeFeedback(feedback.id)}
                                        color="primary"
                                        sx={{
                                            background: '#e3f2fd',
                                            borderRadius: 2,
                                            px: 2,
                                            py: 0.5,
                                            '&:hover': { background: '#bbdefb' }
                                        }}
                                    >
                                        <CheckCircleIcon sx={{ color: '#43a047', mr: 1 }} />
                                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1976d2' }}>
                                            Acknowledge
                                        </Typography>
                                    </IconButton>
                                )}

                                {feedback.acknowledged && (
                                    <Chip
                                        label="Acknowledged"
                                        color="success"
                                        icon={<CheckCircleIcon />}
                                        size="small"
                                        sx={{
                                            background: '#e8f5e9',
                                            color: '#43a047',
                                            fontWeight: 600
                                        }}
                                    />
                                )}
                            </Box>

                            {/* Comments Section */}
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1976d2' }}>
                                    Comments
                                </Typography>
                                {(commentsMap[feedback.id] || []).map((cmt, idx) => (
                                    <Box key={idx} sx={{ mb: 1, p: 1, backgroundColor: '#f0f0f0', borderRadius: 1 }}>
                                        <ReactMarkdown>{cmt}</ReactMarkdown>
                                    </Box>
                                ))}
                                <TextField
                                    label="Add a comment (Markdown supported)"
                                    multiline
                                    rows={3}
                                    fullWidth
                                    value={commentInputs[feedback.id] || ''}
                                    onChange={(e) => handleCommentChange(feedback.id, e.target.value)}
                                    sx={{ mt: 1 }}
                                />
                                <Button
                                    variant="contained"
                                    sx={{ mt: 1 }}
                                    onClick={() => handleAddComment(feedback.id)}
                                >
                                    Submit Comment
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                ))
            )}
        </Box>
    );
}
