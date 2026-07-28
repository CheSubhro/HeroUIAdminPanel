
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ChangePasswordForm from '../ChangePasswordForm';

describe('ChangePasswordForm Component', () => {
    it('renders all password input fields and submit button', () => {
        render(<ChangePasswordForm />);

        const inputs = screen.getAllByPlaceholderText(/••••••••/i);
        expect(inputs).toHaveLength(3);
        expect(screen.getByRole('button', { name: /update password/i })).toBeInTheDocument();
    });

    it('shows error message if new passwords do not match', async () => {
        render(<ChangePasswordForm />);

        const inputs = screen.getAllByPlaceholderText(/••••••••/i);

        fireEvent.change(inputs[0], { target: { value: 'oldpass123' } });
        fireEvent.change(inputs[1], { target: { value: 'newpassword123' } });
        fireEvent.change(inputs[2], { target: { value: 'differentpassword' } });

        fireEvent.click(screen.getByRole('button', { name: /update password/i }));

        await waitFor(() => {
            expect(screen.getByText(/new passwords do not match/i)).toBeInTheDocument();
        });
    });

    it('shows success message upon valid password update', async () => {
        render(<ChangePasswordForm />);

        const inputs = screen.getAllByPlaceholderText(/••••••••/i);

        fireEvent.change(inputs[0], { target: { value: 'oldpass123' } });
        fireEvent.change(inputs[1], { target: { value: 'newpassword123' } });
        fireEvent.change(inputs[2], { target: { value: 'newpassword123' } });

        fireEvent.click(screen.getByRole('button', { name: /update password/i }));

        const successMessage = await screen.findByText(/password updated successfully|success/i, {}, { timeout: 3000 });
        expect(successMessage).toBeInTheDocument();
    });
});