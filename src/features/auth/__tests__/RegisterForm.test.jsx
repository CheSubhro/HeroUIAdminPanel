
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import RegisterForm from '../RegisterForm';
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

describe('RegisterForm Component', () => {
    const mockRegister = vi.fn();
    const mockSetError = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        useAuth.mockReturnValue({
            register: mockRegister,
            loading: false,
            error: null,
            setError: mockSetError,
        });
    });

    const renderRegisterForm = () => {
        return render(
            <BrowserRouter>
                <RegisterForm />
            </BrowserRouter>
        );
    };

    it('renders all registration inputs, file uploads, and buttons correctly', () => {
        renderRegisterForm();

        expect(screen.getByPlaceholderText('John Doe')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('johndoe')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('name@example.com')).toBeInTheDocument();
        expect(screen.getAllByPlaceholderText('••••••••')).toHaveLength(2); // Password and Confirm Password
        expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
        expect(screen.getByText(/already have an account\?/i)).toBeInTheDocument();
    });

    it('shows validation error when submitting empty form', async () => {
        renderRegisterForm();

        const submitButton = screen.getByRole('button', { name: /sign up/i });
        fireEvent.click(submitButton);

        // Since validation fails locally, setError should be called with an error message
        expect(mockSetError).toHaveBeenCalled();
    });

    it('handles successful registration and redirects to login', async () => {
        mockRegister.mockResolvedValueOnce({ success: true });

        renderRegisterForm();

        const fullNameInput = screen.getByPlaceholderText('John Doe');
        const usernameInput = screen.getByPlaceholderText('johndoe');
        const emailInput = screen.getByPlaceholderText('name@example.com');
        const passwordInputs = screen.getAllByPlaceholderText('••••••••');
        const avatarInput = screen.getByAcceptAttribute ? screen.getByAcceptAttribute('image/*') : document.querySelector('input[type="file"]');
        const submitButton = screen.getByRole('button', { name: /sign up/i });

        // Simulate filling out the form
        fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });
        fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.change(passwordInputs[0], { target: { value: 'StrongP@ss1' } });
        fireEvent.change(passwordInputs[1], { target: { value: 'StrongP@ss1' } });

        // Simulate file upload for avatar
        const file = new File(['dummy content'], 'avatar.png', { type: 'image/png' });
        fireEvent.change(avatarInput, { target: { files: [file] } });

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/account created successfully! redirecting to login.../i)).toBeInTheDocument();
        });

        // Wait for timeout to trigger navigate('/login')
        await waitFor(() => {
            expect(mockedNavigate).toHaveBeenCalledWith('/login');
        }, { timeout: 1500 });
    });
});