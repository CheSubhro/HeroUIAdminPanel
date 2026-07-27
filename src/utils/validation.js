
export const validateLogin = (identifier, password) => {
    if (!identifier || !password) {
        return { isValid: false, error: 'Please fill in all required fields.' };
    }

    if (password.length < 6) {
        return { isValid: false, error: 'Password must be at least 6 characters long.' };
    }

    return { isValid: true, error: '' };
};

export const validateRegister = (fullName, username, email, password, confirmPassword, avatar) => {
    if (!fullName || !username || !email || !password || !confirmPassword) {
        return { isValid: false, error: 'Please fill in all required fields.' };
    }

    if (!avatar) {
        return { isValid: false, error: 'Avatar image is required.' };
    }

    if (password !== confirmPassword) {
        return { isValid: false, error: 'Passwords do not match.' };
    }

    if (password.length < 6) {
        return { isValid: false, error: 'Password must be at least 6 characters long.' };
    }

    return { isValid: true, error: '' };
};

export const validateContact = (name, email, department, message) => {
    if (!name || !name.trim()) {
        return { isValid: false, error: 'Please enter your name.' };
    }
    if (!email || !email.trim()) {
        return { isValid: false, error: 'Please enter your email address.' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { isValid: false, error: 'Please enter a valid email address.' };
    }
    if (!department) {
        return { isValid: false, error: 'Please select a department.' };
    }
    if (!message || !message.trim()) {
        return { isValid: false, error: 'Please enter your message.' };
    }
    return { isValid: true, error: '' };
};

export const validateNewsletter = (email) => {
    if (!email || !email.trim()) {
        return { isValid: false, error: 'Please enter your email address.' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { isValid: false, error: 'Please enter a valid email address.' };
    }
    return { isValid: true, error: '' };
};