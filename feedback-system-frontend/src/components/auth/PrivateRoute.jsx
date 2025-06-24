import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function PrivateRoute({ children, role }) {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (!user) return <Navigate to="/" />;

    if (role && user.role !== role) {
        return <Navigate to={user.role === 'manager' ? '/manager' : '/employee'} />;
    }

    return children;
}
