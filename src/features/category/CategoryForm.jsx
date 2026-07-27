
import React, { useState, useEffect } from "react";
import { Button, Input } from "../../components/common";
import { validateCategory } from "../../utils/validation";

export default function CategoryForm({ initialData, onSubmit, onCancel }) {
    
    const [formData, setFormData] = useState({ name: "", description: "" });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({ name: "", description: "" });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateCategory(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
            <div>
                <Input
                    label="Category Name"
                    name="name"
                    placeholder="Enter category name"
                    value={formData.name}
                    onChange={handleChange}
                />
                {errors.name && (
                    <span className="text-xs text-danger mt-1 block">{errors.name}</span>
                )}
            </div>

            <div>
                <Input
                    label="Description"
                    name="description"
                    placeholder="Enter description (optional)"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="flat" color="default" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" color="primary">
                    {initialData ? "Update Category" : "Add Category"}
                </Button>
            </div>
        </form>
    );
}