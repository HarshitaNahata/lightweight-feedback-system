import { createContext, useState, useContext } from 'react';
import API from '../services/api';

const FeedbackContext = createContext();

export function FeedbackProvider({ children }) {
    const [feedbacks, setFeedbacks] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Load feedbacks from API
    const loadFeedbacks = async () => {
        if (!localStorage.getItem('token')) return;
        setLoading(true);
        try {
            const response = await API.get('/feedbacks');
            setFeedbacks(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to load feedbacks');
            console.error('Error loading feedbacks:', err);
        } finally {
            setLoading(false);
        }
    };

    // Load team members (for manager)
    const loadTeamMembers = async () => {
        setLoading(true);
        try {
            // Temporary mock data until backend implements /team-members
            if (process.env.NODE_ENV === 'development') {
                setTeamMembers([
                    { id: '1', name: 'Alex Johnson', role: 'Developer' },
                    { id: '2', name: 'Sam Smith', role: 'Designer' }
                ]);
                return;
            }

            const response = await API.get('/team-members');
            setTeamMembers(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to load team members');
            console.error('Error loading team members:', err);
        } finally {
            setLoading(false);
        }
    };

    // Create new feedback
    const createFeedback = async (feedbackData) => {
        try {
            const response = await API.post('/feedbacks', feedbackData);
            setFeedbacks(prev => [...prev, response.data]); // Functional update
            return true;
        } catch (err) {
            console.error('Error creating feedback:', err);
            return false;
        }
    };

    // Update feedback
    const updateFeedback = async (id, updates) => {
        try {
            await API.patch(`/feedbacks/${id}`, updates);
            setFeedbacks(prev =>
                prev.map(f => f.id === id ? { ...f, ...updates } : f)
            );
            return true;
        } catch (err) {
            console.error('Error updating feedback:', err);
            return false;
        }
    };

    // Acknowledge feedback
    const acknowledgeFeedback = async (id) => {
        return updateFeedback(id, { acknowledged: true });
    };

    return (
        <FeedbackContext.Provider
            value={{
                feedbacks,
                teamMembers,
                loading,
                error,
                loadFeedbacks,
                loadTeamMembers,
                createFeedback,
                updateFeedback,
                acknowledgeFeedback
            }}
        >
            {children}
        </FeedbackContext.Provider>
    );
}

export const useFeedback = () => useContext(FeedbackContext);
