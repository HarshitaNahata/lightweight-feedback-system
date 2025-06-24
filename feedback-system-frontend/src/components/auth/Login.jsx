import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { TextField, Button, Box, Typography, Paper, InputAdornment } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ email, password });
            navigate(email.includes('manager') ? '/manager' : '/employee');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #e3f2fd 0%, #fce4ec 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    maxWidth: 400,
                    width: '100%',
                    mx: 'auto',
                    p: 4,
                    borderRadius: 3,
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.12)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        backgroundColor: '#1976d2',
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                    }}
                >
                    <LockOutlinedIcon sx={{ color: '#fff', fontSize: 32 }} />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976d2', mb: 2 }}>
                    Feedback System
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailOutlinedIcon color="primary" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOutlinedIcon color="primary" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    {error && (
                        <Typography color="error" sx={{ mt: 1, mb: 1 }}>
                            {error}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            mt: 2,
                            py: 1.5,
                            fontWeight: 600,
                            fontSize: '1.1rem',
                            background: 'linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)',
                            boxShadow: '0 2px 8px 0 rgba(25, 118, 210, 0.12)',
                        }}
                    >
                        Login
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}
