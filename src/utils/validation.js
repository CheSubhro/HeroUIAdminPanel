
export const validateCategory = (data) => {
    const errors = {};
    if (!data.name || data.name.trim() === "") {
        errors.name = "Category name is required.";
    } else if (data.name.length < 2) {
        errors.name = "Category name must be at least 2 characters.";
    }
    return errors;
};