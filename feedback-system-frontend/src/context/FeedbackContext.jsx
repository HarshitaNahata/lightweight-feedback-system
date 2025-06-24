import { createContext, useState, useContext, useCallback } from 'react';

const FeedbackContext = createContext();

export function FeedbackProvider({ children }) {
    const [feedbacks, setFeedbacks] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);

    // Wrap loadInitialData with useCallback
    const loadInitialData = useCallback((user) => {
        // Mock data based on user role
        if (user.role === 'manager') {
            setTeamMembers([
                { id: '1', name: 'Alex Johnson', role: 'Developer' },
                { id: '2', name: 'Sam Smith', role: 'Designer' }
            ]);

            setFeedbacks([
                {
                    id: '101',
                    employeeId: '1',
                    strengths: 'Excellent problem-solving skills',
                    areas: 'Could improve documentation',
                    sentiment: 'positive',
                    date: '2025-06-15',
                    acknowledged: false
                }
            ]);
        } else {
            setFeedbacks([
                {
                    id: '101',
                    strengths: 'Excellent problem-solving skills',
                    areas: 'Could improve documentation',
                    sentiment: 'positive',
                    date: '2025-06-15',
                    acknowledged: false
                }
            ]);
        }
    }, []); // Empty dependency array ensures stable reference

    const addFeedback = (feedback) => {
        setFeedbacks([...feedbacks, {
            ...feedback,
            id: Date.now().toString(),
            date: new Date().toISOString().split('T')[0],
            acknowledged: false
        }]);
    };

    const updateFeedback = (id, updates) => {
        setFeedbacks(feedbacks.map(f =>
            f.id === id ? { ...f, ...updates } : f
        ));
    };

    return (
        <FeedbackContext.Provider
            value={{
                feedbacks,
                teamMembers,
                addFeedback,
                updateFeedback,
                loadInitialData
            }}
        >
            {children}
        </FeedbackContext.Provider>
    );
}

export const useFeedback = () => useContext(FeedbackContext);
