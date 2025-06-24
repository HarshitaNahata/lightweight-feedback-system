import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for existing session
        const storedUser = JSON.parse(localStorage.getItem('feedbackUser'));
        if (storedUser) setUser(storedUser);
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        // API call to authenticate
        const response = await fakeAuthService(credentials);
        setUser(response);
        localStorage.setItem('feedbackUser', JSON.stringify(response));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('feedbackUser');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);

// Mock authentication service
const fakeAuthService = async ({ email, password }) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: '123',
                email,
                name: email.includes('manager') ? 'Manager User' : 'Employee User',
                role: email.includes('manager') ? 'manager' : 'employee',
                team: 'engineering'
            });
        }, 500);
    });
};
