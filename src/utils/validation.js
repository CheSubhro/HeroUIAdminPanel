
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

    if (!data.price || isNaN(data.price) || Number(data.price) <= 0) {
        errors.price = "Valid price is required.";
    }

    if (!data.stock || isNaN(data.stock) || Number(data.stock) < 0) {
        errors.stock = "Valid stock quantity is required.";
    }

    if (!data.categoryId) {
        errors.categoryId = "Please select a category.";
    }

    return errors;
};