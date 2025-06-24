import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function PrivateRoute({ children, role }) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #e3f2fd 0%, #fce4ec 100%)',
                }}
            >
                <CircularProgress color="primary" size={48} />
                <Typography variant="h6" sx={{ mt: 2, color: '#1976d2' }}>
                    Loading, please wait...
                </Typography>
            </Box>
        );
    }

    if (!user) return <Navigate to="/" />;

    if (role && user.role !== role) {
        return <Navigate to={user.role === 'manager' ? '/manager' : '/employee'} />;
    }

    return children;
}
