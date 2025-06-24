import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import ManagerDashboard from './components/dashboard/ManagerDashboard';
import EmployeeDashboard from './components/dashboard/EmployeeDashboard';
import PrivateRoute from './components/auth/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import { FeedbackProvider } from './context/FeedbackContext';
import { NotificationProvider } from './context/NotificationContext';

function App() {
    return (
        <AuthProvider>
            <FeedbackProvider>
                <NotificationProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/manager" element={
                                <PrivateRoute role="manager">
                                    <ManagerDashboard />
                                </PrivateRoute>
                            } />
                            <Route path="/employee" element={
                                <PrivateRoute role="employee">
                                    <EmployeeDashboard />
                                </PrivateRoute>
                            } />
                        </Routes>
                    </BrowserRouter>
                </NotificationProvider>
            </FeedbackProvider>
        </AuthProvider>
    );
}

export default App;
