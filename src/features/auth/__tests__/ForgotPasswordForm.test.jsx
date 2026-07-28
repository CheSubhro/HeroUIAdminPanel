
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ForgotPasswordForm from '../ForgotPasswordForm';

describe('ForgotPasswordForm Component', () => {
    it('renders input field and submit button correctly', () => {
        render(<ForgotPasswordForm />);

        expect(screen.getByPlaceholderText(/admin@example.com/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /send reset link/i })).toBeInTheDocument();
    });

    it('shows success message upon valid email submission', async () => {
        render(<ForgotPasswordForm />);

        const emailInput = screen.getByPlaceholderText(/admin@example.com/i);
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

        const submitButton = screen.getByRole('button', { name: /send reset link/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/reset link/i)).toBeInTheDocument();
        });
    });
});