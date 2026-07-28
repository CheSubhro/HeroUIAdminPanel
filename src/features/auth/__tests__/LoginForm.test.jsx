
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import LoginForm from '../LoginForm';
import { useAuth } from '../../../hooks/useAuth';

// Mocking the useAuth hook
vi.mock('../../../hooks/useAuth', () => ({
    useAuth: vi.fn(),
}));

// Mocking useNavigate from react-router-dom
const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockedNavigate,
    };
});

describe('LoginForm Component', () => {
    const mockLogin = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        useAuth.mockReturnValue({
            login: mockLogin,
            loading: false,
            error: null,
            setError: vi.fn(),
        });
    });

    const renderLoginForm = () => {
        return render(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        );
    };

    it('renders all form fields, buttons, and links correctly', () => {
        renderLoginForm();

        expect(screen.getByPlaceholderText(/enter username or email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/••••••••/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
        expect(screen.getByText(/forgot password\?/i)).toBeInTheDocument();
        expect(screen.getByText(/don't have an account\?/i)).toBeInTheDocument();
    });

    it('toggles password visibility when the eye button is clicked', () => {
        renderLoginForm();

        const passwordInput = screen.getByPlaceholderText(/••••••••/i);
        expect(passwordInput).toHaveAttribute('type', 'password');

        const toggleButton = screen.getByRole('button', { name: /show password/i });
        fireEvent.click(toggleButton);

        expect(passwordInput).toHaveAttribute('type', 'text');
    });

    it('displays error message when login fails or validation returns error', async () => {
        useAuth.mockReturnValue({
            login: mockLogin.mockResolvedValueOnce({ success: false, error: 'Invalid credentials' }),
            loading: false,
            error: 'Invalid credentials',
            setError: vi.fn(),
        });

        renderLoginForm();

        const identifierInput = screen.getByPlaceholderText(/enter username or email/i);
        const passwordInput = screen.getByPlaceholderText(/••••••••/i);
        const submitButton = screen.getByRole('button', { name: /sign in/i });

        fireEvent.change(identifierInput, { target: { value: 'wronguser' } });
        fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
        });
    });

    it('handles successful login and redirects to home', async () => {
        mockLogin.mockResolvedValueOnce({ success: true, user: { username: 'admin' } });

        renderLoginForm();

        const identifierInput = screen.getByPlaceholderText(/enter username or email/i);
        const passwordInput = screen.getByPlaceholderText(/••••••••/i);
        const submitButton = screen.getByRole('button', { name: /sign in/i });

        fireEvent.change(identifierInput, { target: { value: 'admin@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'StrongP@ss1' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/successfully signed in! redirecting.../i)).toBeInTheDocument();
        });

        // Wait for timeout to trigger navigate('/')
        await waitFor(() => {
            expect(mockedNavigate).toHaveBeenCalledWith('/');
        }, { timeout: 1500 });
    });
});