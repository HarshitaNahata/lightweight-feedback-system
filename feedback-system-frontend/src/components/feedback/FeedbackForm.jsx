import { useState } from 'react';
import {
    TextField,
    Button,
    Box,
    Grid,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormLabel
} from '@mui/material';

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
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Strengths"
                        multiline
                        rows={4}
                        fullWidth
                        value={strengths}
                        onChange={(e) => setStrengths(e.target.value)}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Areas for Improvement"
                        multiline
                        rows={4}
                        fullWidth
                        value={areas}
                        onChange={(e) => setAreas(e.target.value)}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormLabel component="legend">Sentiment</FormLabel>
                    <RadioGroup
                        row
                        value={sentiment}
                        onChange={(e) => setSentiment(e.target.value)}
                    >
                        <FormControlLabel value="positive" control={<Radio />} label="Positive" />
                        <FormControlLabel value="neutral" control={<Radio />} label="Neutral" />
                        <FormControlLabel value="negative" control={<Radio />} label="Negative" />
                    </RadioGroup>
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained">Submit Feedback</Button>
                </Grid>
            </Grid>
        </form>
    );
}
