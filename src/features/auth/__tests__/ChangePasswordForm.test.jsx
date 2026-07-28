
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ChangePasswordForm from '../ChangePasswordForm';

describe('ChangePasswordForm Component', () => {
    it('renders all password input fields and submit button', () => {
        render(<ChangePasswordForm />);

        expect(screen.getByLabelText(/current password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^new password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/confirm new password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /update password/i })).toBeInTheDocument();
    });

    it('shows error message if new passwords do not match', async () => {
        render(<ChangePasswordForm />);

        fireEvent.change(screen.getByLabelText(/current password/i), { target: { value: 'oldpass123' } });
        fireEvent.change(screen.getByLabelText(/^new password/i), { target: { value: 'newpassword123' } });
        fireEvent.change(screen.getByLabelText(/confirm new password/i), { target: { value: 'differentpassword' } });

        fireEvent.click(screen.getByRole('button', { name: /update password/i }));

        await waitFor(() => {
            expect(screen.getByText(/new passwords do not match/i)).toBeInTheDocument();
        });
    });

    it('shows success message upon valid password update', async () => {
        render(<ChangePasswordForm />);

        fireEvent.change(screen.getByLabelText(/current password/i), { target: { value: 'oldpass123' } });
        fireEvent.change(screen.getByLabelText(/^new password/i), { target: { value: 'newpassword123' } });
        fireEvent.change(screen.getByLabelText(/confirm new password/i), { target: { value: 'newpassword123' } });

        fireEvent.click(screen.getByRole('button', { name: /update password/i }));

        await waitFor(() => {
            expect(screen.getByText(/password updated successfully/i)).toBeInTheDocument();
        });
    });
});