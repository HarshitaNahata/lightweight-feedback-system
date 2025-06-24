import { useState } from 'react';
import {
    TextField,
    Button,
    Box,
    Grid,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormLabel,
    Paper,
    Typography
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import MoodIcon from '@mui/icons-material/Mood';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

export default function FeedbackForm({ employee, onSubmit }) {
    const [strengths, setStrengths] = useState('');
    const [areas, setAreas] = useState('');
    const [sentiment, setSentiment] = useState('positive');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            employeeId: employee.id,
            strengths,
            areas,
            sentiment
        });
        // Reset form
        setStrengths('');
        setAreas('');
        setSentiment('positive');
    };

    return (
        <Paper
            elevation={2}
            sx={{
                p: 3,
                borderRadius: 3,
                background: 'linear-gradient(90deg, #e3f2fd 70%, #fce4ec 100%)',
                boxShadow: '0 2px 8px 0 rgba(25, 118, 210, 0.06)',
            }}
        >
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <EmojiEventsIcon sx={{ color: '#43a047', mr: 1 }} />
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1976d2' }}>
                                Strengths
                            </Typography>
                        </Box>
                        <TextField
                            label="What went well?"
                            multiline
                            rows={3}
                            fullWidth
                            value={strengths}
                            onChange={(e) => setStrengths(e.target.value)}
                            required
                            sx={{ background: '#e8f5e9', borderRadius: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <WarningAmberIcon sx={{ color: '#fbc02d', mr: 1 }} />
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1976d2' }}>
                                Areas for Improvement
                            </Typography>
                        </Box>
                        <TextField
                            label="What could be improved?"
                            multiline
                            rows={3}
                            fullWidth
                            value={areas}
                            onChange={(e) => setAreas(e.target.value)}
                            required
                            sx={{ background: '#fffde7', borderRadius: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormLabel component="legend" sx={{ color: '#1976d2', fontWeight: 600, mb: 1 }}>
                            Sentiment
                        </FormLabel>
                        <RadioGroup
                            row
                            value={sentiment}
                            onChange={(e) => setSentiment(e.target.value)}
                        >
                            <FormControlLabel
                                value="positive"
                                control={<Radio sx={{ color: '#43a047', '&.Mui-checked': { color: '#43a047' } }} />}
                                label={
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <MoodIcon sx={{ color: '#43a047', mr: 0.5 }} /> Positive
                                    </Box>
                                }
                            />
                            <FormControlLabel
                                value="neutral"
                                control={<Radio sx={{ color: '#fbc02d', '&.Mui-checked': { color: '#fbc02d' } }} />}
                                label={
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <SentimentNeutralIcon sx={{ color: '#fbc02d', mr: 0.5 }} /> Neutral
                                    </Box>
                                }
                            />
                            <FormControlLabel
                                value="negative"
                                control={<Radio sx={{ color: '#e53935', '&.Mui-checked': { color: '#e53935' } }} />}
                                label={
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <SentimentVeryDissatisfiedIcon sx={{ color: '#e53935', mr: 0.5 }} /> Negative
                                    </Box>
                                }
                            />
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                mt: 1,
                                py: 1.3,
                                fontWeight: 600,
                                fontSize: '1.05rem',
                                background: 'linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)',
                                boxShadow: '0 2px 8px 0 rgba(25, 118, 210, 0.12)',
                            }}
                        >
                            Submit Feedback
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}
