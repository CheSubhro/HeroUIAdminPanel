
import { useState, useEffect, useCallback } from 'react';
import { validateLogin, validateRegister } from '../utils/validation';

export const useAuth = () => {
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Optional: Check current auth status on initial load (e.g., calling a /me endpoint)
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                // TODO: Replace with actual backend API call to fetch current user info
                // e.g., const response = await axios.get('/api/v1/users/current-user', { withCredentials: true });
                // setUser(response.data.data);
                
                // For now, checking localStorage just for UI persistence (non-sensitive user info only)
                const storedUser = localStorage.getItem('admin_user');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (err) {
                console.error("Not authenticated or session expired", err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    // Login handler
    const login = useCallback(async (credentials) => {
        setError(null);
        const validationErrors = validateLogin(credentials);

        if (Object.keys(validationErrors).length > 0) {
            setError(Object.values(validationErrors)[0]);
            return { success: false, errors: validationErrors };
        }

        try {
            setLoading(true);
            
            // TODO: Replace with actual backend API call
            // const response = await axios.post('/api/v1/users/login', credentials, { withCredentials: true });
            // const loggedInUser = response.data.data.user; // Backend will set HttpOnly cookie automatically
            
            await new Promise((resolve) => setTimeout(resolve, 600)); // Simulating network delay

            const mockUser = {
                username: credentials.email.split('@')[0],
                email: credentials.email,
                fullName: 'Admin User',
                role: 'admin',
                avatar: 'https://via.placeholder.com/150'
            };

            setUser(mockUser);
            localStorage.setItem('admin_user', JSON.stringify(mockUser)); // Storing only non-sensitive UI state

            return { success: true, user: mockUser };
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || "Login failed. Please check your credentials.";
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, []);

    // Register handler
    const register = useCallback(async (userData) => {
        setError(null);
        const validationErrors = validateRegister(userData);

        if (Object.keys(validationErrors).length > 0) {
            setError(Object.values(validationErrors)[0]);
            return { success: false, errors: validationErrors };
        }

        try {
            setLoading(true);

            // TODO: Replace with actual backend API call
            // const response = await axios.post('/api/v1/users/register', userData, { withCredentials: true });
            // const registeredUser = response.data.data.user;

            await new Promise((resolve) => setTimeout(resolve, 600));

            const newUser = {
                username: userData.username,
                email: userData.email,
                fullName: userData.fullName,
                role: userData.role || 'user',
                avatar: userData.avatar || 'https://via.placeholder.com/150'
            };

            setUser(newUser);
            localStorage.setItem('admin_user', JSON.stringify(newUser));

            return { success: true, user: newUser };
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || "Registration failed. Please try again.";
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, []);

    // Logout handler
    const logout = useCallback(async () => {
        try {
            // TODO: Call backend logout API to clear the HttpOnly cookie on server side
            // await axios.post('/api/v1/users/logout', {}, { withCredentials: true });
            
            setUser(null);
            localStorage.removeItem('admin_user');
        } catch (err) {
            console.error("Logout failed", err);
        }
    }, []);

    return {
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!user
    };
};
