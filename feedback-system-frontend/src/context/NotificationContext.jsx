import React, { createContext, useState, useContext, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';
const NotificationContext = createContext();
export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);
    const addNotification = useCallback((message, severity = 'info') => {
        const id = Date.now();
        setNotifications((prev) => [...prev, { id, message, severity }]);
    }, []);
    const removeNotification = useCallback((id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);
    return (
        <NotificationContext.Provider value={{ addNotification }}>
            {children}
            {notifications.map(({ id, message, severity }) => (
                <Snackbar
                    key={id}
                    open
                    autoHideDuration={4000}
                    onClose={() => removeNotification(id)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Alert onClose={() => removeNotification(id)} severity={severity} sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar>
            ))}
        </NotificationContext.Provider>
    );
}
export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) throw new Error('useNotification must be used within a NotificationProvider');
    return context;
};
