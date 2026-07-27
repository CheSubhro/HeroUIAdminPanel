
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import RegisterForm from '../RegisterForm';

// Mock useNavigate from react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe('RegisterForm Component', () => {
    it('renders registration form elements correctly', () => {
        render(
            <BrowserRouter>
                <RegisterForm />
            </BrowserRouter>
        );

        expect(screen.getByPlaceholderText(/john doe/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/johndoe/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/name@example.com/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /^sign up$/i })).toBeInTheDocument();
    });

    it('shows validation error when required fields are empty', () => {
        render(
            <BrowserRouter>
                <RegisterForm />
            </BrowserRouter>
        );

        const submitButton = screen.getByRole('button', { name: /^sign up$/i });
        fireEvent.click(submitButton);

        expect(screen.getByText(/please fill in all required fields/i)).toBeInTheDocument();
    });

    it('shows error when avatar image is missing', () => {
        render(
            <BrowserRouter>
                <RegisterForm />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByPlaceholderText(/john doe/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText(/johndoe/i), { target: { value: 'johndoe' } });
        fireEvent.change(screen.getByPlaceholderText(/name@example.com/i), { target: { value: 'john@example.com' } });
        
        const passwordInputs = screen.getAllByPlaceholderText(/••••••••/i);
        fireEvent.change(passwordInputs[0], { target: { value: 'password123' } });
        fireEvent.change(passwordInputs[1], { target: { value: 'password123' } });

        fireEvent.click(screen.getByRole('button', { name: /^sign up$/i }));

        expect(screen.getByText(/avatar image is required/i)).toBeInTheDocument();
    });

    it('shows success message and redirects on valid registration', async () => {
        render(
            <BrowserRouter>
                <RegisterForm />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByPlaceholderText(/john doe/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText(/johndoe/i), { target: { value: 'johndoe' } });
        fireEvent.change(screen.getByPlaceholderText(/name@example.com/i), { target: { value: 'john@example.com' } });

        // Mock file upload for avatar using querySelector for file input
        const file = new File(['dummy content'], 'avatar.png', { type: 'image/png' });
        const avatarInput = document.querySelector('input[type="file"]');
        fireEvent.change(avatarInput, { target: { files: [file] } });

        const passwordInputs = screen.getAllByPlaceholderText(/••••••••/i);
        fireEvent.change(passwordInputs[0], { target: { value: 'password123' } });
        fireEvent.change(passwordInputs[1], { target: { value: 'password123' } });

        fireEvent.click(screen.getByRole('button', { name: /^sign up$/i }));

        expect(screen.getByText(/creating account.../i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText(/account created successfully! redirecting to login.../i)).toBeInTheDocument();
        }, { timeout: 2500 });
    });
});