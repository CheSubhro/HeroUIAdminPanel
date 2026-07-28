
export const validateCategory = (data) => {
    
    const errors = {};
    
    if (!data.name || data.name.trim() === "") {
        errors.name = "Category name is required.";
    } else if (data.name.trim().length < 2) {
        errors.name = "Category name must be at least 2 characters.";
    }

    if (data.description && data.description.length > 200) {
        errors.description = "Description cannot exceed 200 characters.";
    }

    return errors;
};

export const validateProduct = (data) => {
    const errors = {};

    if (!data.name || data.name.trim() === "") {
        errors.name = "Product name is required.";
    }

    if (!data.slug || data.slug.trim() === "") {
        errors.slug = "Slug is required.";
    }

    if (!data.price || isNaN(data.price) || Number(data.price) < 0) {
        errors.price = "Valid price is required.";
    }

    if (data.discountPrice && (isNaN(data.discountPrice) || Number(data.discountPrice) < 0)) {
        errors.discountPrice = "Valid discount price is required.";
    } else if (data.discountPrice && Number(data.discountPrice) >= Number(data.price)) {
        errors.discountPrice = "Discount price must be less than the regular price.";
    }

    if (!data.stock || isNaN(data.stock) || Number(data.stock) < 0) {
        errors.stock = "Valid stock quantity is required.";
    }

    if (!data.categoryId) {
        errors.categoryId = "Category is required.";
    }

    if (!data.isEdit && !data.image) {
        errors.image = "Product image is required.";
    }

    return errors;
};

export const validateRegister = (data) => {

    const errors = {};

    if (!data.username || data.username.trim() === "") {
        errors.username = "Username is required.";
    } else if (data.username.trim().length < 3) {
        errors.username = "Username must be at least 3 characters.";
    }

    if (!data.fullName || data.fullName.trim() === "") {
        errors.fullName = "Full name is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || data.email.trim() === "") {
        errors.email = "Email is required.";
    } else if (!emailRegex.test(data.email)) {
        errors.email = "Please enter a valid email address.";
    }

    if (!data.password) {
        errors.password = "Password is required.";
    } else if (data.password.length < 6) {
        errors.password = "Password must be at least 6 characters long.";
    }

    const validRoles = ["admin", "moderator", "user"];
    if (!data.role) {
        errors.role = "Role is required.";
    } else if (!validRoles.includes(data.role)) {
        errors.role = "Invalid role selected.";
    }

    if (!data.avatar) {
        errors.avatar = "Avatar image is required.";
    }

    return errors;
};

export const validateLogin = (data) => {
    
    const errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || data.email.trim() === "") {
        errors.email = "Email is required.";
    } else if (!emailRegex.test(data.email)) {
        errors.email = "Please enter a valid email address.";
    }

    if (!data.password) {
        errors.password = "Password is required.";
    }

    return errors;
};