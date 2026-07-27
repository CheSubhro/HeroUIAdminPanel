
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