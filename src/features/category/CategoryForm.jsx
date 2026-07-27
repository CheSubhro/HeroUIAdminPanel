
import React, { useState, useEffect } from "react";
import { Button, Input } from "../../components/common";
import { validateCategory } from "../../utils/validation";

export default function CategoryForm({ initialData, categoriesList, onSubmit, onCancel }) {
    
    const [formData, setFormData] = useState({ name: "", description: "", parentId: "" });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || "",
                description: initialData.description || "",
                parentId: initialData.parentId || ""
            });
        } else {
            setFormData({ name: "", description: "", parentId: "" });
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

            <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Parent Category (Optional)</label>
                <select
                    name="parentId"
                    value={formData.parentId}
                    onChange={handleChange}
                    className="w-full bg-[#0f1117] border border-gray-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                >
                    <option value="">None (Main Category)</option>
                    {categoriesList
                        ?.filter((cat) => cat.id !== initialData?.id) // Prevent self-parenting
                        .map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                </select>
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