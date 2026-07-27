
import { describe, it, expect } from 'vitest';
import { 
    validateNewsletter, 
    validateLogin, 
    validateRegister, 
    validateContact 
} from './validation';

describe('Newsletter Validation', () => {
    it('should return invalid for empty email', () => {
        const result = validateNewsletter('');
        expect(result.isValid).toBe(false);
    });

    it('should return invalid for incorrect email format', () => {
        const result = validateNewsletter('invalid-email');
        expect(result.isValid).toBe(false);
    });

    it('should return valid for correct email format', () => {
        const result = validateNewsletter('test@example.com');
        expect(result.isValid).toBe(true);
    });
});

describe('Login Validation', () => {
    it('should return invalid if identifier or password is empty', () => {
        const result = validateLogin('', '');
        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Please fill in all required fields.');
    });

    it('should return invalid if password is less than 6 characters', () => {
        const result = validateLogin('user@example.com', '12345');
        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Password must be at least 6 characters long.');
    });

    it('should return valid for correct credentials format', () => {
        const result = validateLogin('user@example.com', 'password123');
        expect(result.isValid).toBe(true);
        expect(result.error).toBe('');
    });
});

describe('Register Validation', () => {
    it('should return invalid if any required field is empty', () => {
        const result = validateRegister('', '', '', '', '', null);
        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Please fill in all required fields.');
    });

    it('should return invalid if avatar is missing', () => {
        const result = validateRegister('John Doe', 'johndoe', 'john@example.com', 'password123', 'password123', null);
        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Avatar image is required.');
    });

    it('should return invalid if passwords do not match', () => {
        const dummyAvatar = { name: 'avatar.png' };
        const result = validateRegister('John Doe', 'johndoe', 'john@example.com', 'password123', 'wrongpassword', dummyAvatar);
        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Passwords do not match.');
    });

    it('should return valid for correct register data', () => {
        const dummyAvatar = { name: 'avatar.png' };
        const result = validateRegister('John Doe', 'johndoe', 'john@example.com', 'password123', 'password123', dummyAvatar);
        expect(result.isValid).toBe(true);
    });
});

describe('Contact Validation', () => {
    it('should return invalid for empty fields in contact', () => {
        const result = validateContact('', '', '', '');
        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Please enter your name.');
    });

    it('should return valid for correct contact info', () => {
        const result = validateContact('Jane Doe', 'jane@example.com', 'Support', 'Hello, I need help.');
        expect(result.isValid).toBe(true);
    });
});