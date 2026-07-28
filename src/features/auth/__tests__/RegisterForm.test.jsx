
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RegisterForm from '../RegisterForm';
import { useAuth } from '../../../hooks/useAuth';

vi.mock('../../../hooks/useAuth', () => ({
    useAuth: vi.fn(),
}));

describe('RegisterForm Component', () => {
    beforeEach(() => {
        useAuth.mockReturnValue({
            register: vi.fn().mockResolvedValue({ success: true }),
            loading: false,
        });
    });

    test('allows user to fill and submit registration form successfully', async () => {
        render(
            <BrowserRouter>
                <RegisterForm />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByPlaceholderText(/john doe/i), {
            target: { value: 'John Doe' },
        });
        fireEvent.change(screen.getByPlaceholderText(/johndoe/i), {
            target: { value: 'johndoe' },
        });
        fireEvent.change(screen.getByPlaceholderText(/name@example.com/i), {
            target: { value: 'john@example.com' },
        });

        const passwordInputs = screen.getAllByPlaceholderText(/••••••••/i);
        fireEvent.change(passwordInputs[0], { target: { value: 'password123' } });
        fireEvent.change(passwordInputs[1], { target: { value: 'password123' } });

        const avatarInput = screen.getByLabelText(/avatar image/i);
        const file = new File(['dummy content'], 'avatar.png', { type: 'image/png' });
        fireEvent.change(avatarInput, { target: { files: [file] } });

        const submitButton = screen.getByRole('button', { name: /sign up/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/success! redirecting.../i)).toBeInTheDocument();
        });
    });
});