
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from '../LoginForm';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe('LoginForm Component', () => {
    it('renders login form elements correctly', () => {
        render(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        );

        expect(screen.getByPlaceholderText(/enter username or email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/••••••••/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /^sign in$/i })).toBeInTheDocument();
    });

    it('shows validation error when submitting empty fields', () => {
        render(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        );

        const submitButton = screen.getByRole('button', { name: /^sign in$/i });
        fireEvent.click(submitButton);

        expect(screen.getByText(/please fill in all required fields/i)).toBeInTheDocument();
    });

    it('shows validation error when password is less than 6 characters', () => {
        render(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        );

        const identifierInput = screen.getByPlaceholderText(/enter username or email/i);
        const passwordInput = screen.getByPlaceholderText(/••••••••/i);
        const submitButton = screen.getByRole('button', { name: /^sign in$/i });

        fireEvent.change(identifierInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: '12345' } });
        fireEvent.click(submitButton);

        expect(screen.getByText(/password must be at least 6 characters long/i)).toBeInTheDocument();
    });

    it('shows success message on valid submission', async () => {
        render(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        );

        const identifierInput = screen.getByPlaceholderText(/enter username or email/i);
        const passwordInput = screen.getByPlaceholderText(/••••••••/i);
        const submitButton = screen.getByRole('button', { name: /^sign in$/i });

        fireEvent.change(identifierInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);

        expect(screen.getByText(/signing in.../i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText(/successfully signed in! redirecting.../i)).toBeInTheDocument();
        }, { timeout: 2000 });
    });
});