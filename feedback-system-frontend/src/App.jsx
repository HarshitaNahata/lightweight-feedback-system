import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import ManagerDashboard from './components/dashboard/ManagerDashboard';
import EmployeeDashboard from './components/dashboard/EmployeeDashboard';
import PrivateRoute from './components/auth/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import { FeedbackProvider } from './context/FeedbackContext';

function App() {
    return (
        <AuthProvider>
            <FeedbackProvider>
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
            </FeedbackProvider>
        </AuthProvider>
    );
}

export default App;
