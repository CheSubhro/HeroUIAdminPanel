
import React, { useState, useEffect } from "react";
import { Button, Input } from "../../components/common";
import { validateCategory } from "../../utils/validation";
import { FaImage, FaTimes } from "react-icons/fa";

export default function CategoryForm({ initialData, categoriesList, onSubmit, onCancel }) {
    
    const [formData, setFormData] = useState({ 
        name: "", 
        description: "", 
        parentId: "", 
        avatar: null 
    });
    const [previewUrl, setPreviewUrl] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || "",
                description: initialData.description || "",
                parentId: initialData.parentId || "",
                avatar: null 
            });
            setPreviewUrl(initialData.avatar || "");
        } else {
            setFormData({ name: "", description: "", parentId: "", avatar: null });
            setPreviewUrl("");
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, avatar: file }));
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setFormData((prev) => ({ ...prev, avatar: null }));
        setPreviewUrl("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateCategory(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const dataToSend = new FormData();
        dataToSend.append("name", formData.name);
        dataToSend.append("description", formData.description);
        dataToSend.append("parentId", formData.parentId);
        if (formData.avatar) {
            dataToSend.append("avatar", formData.avatar);
        }

        onSubmit(dataToSend);
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

            {/* Avatar File Upload Field */}
            <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Avatar / Image (Optional)</label>
                {previewUrl ? (
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-700 bg-[#0f1117]">
                        <img src={previewUrl} alt="Avatar preview" className="w-full h-full object-cover" />
                        <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full text-xs hover:bg-red-700 transition"
                        >
                            <FaTimes />
                        </button>
                    </div>
                ) : (
                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-[#0f1117] hover:bg-gray-800/50 transition">
                        <div className="flex flex-col items-center justify-center pt-3 pb-4">
                            <FaImage className="text-gray-400 text-xl mb-1" />
                            <p className="text-xs text-gray-400"><span className="font-semibold text-blue-400">Click to upload</span> or drag and drop</p>
                            <p className="text-[10px] text-gray-500 mt-0.5">SVG, PNG, JPG or WEBP</p>
                        </div>
                        <input type="file" name="avatar" accept="image/*" onChange={handleFileChange} className="hidden" />
                    </label>
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
                        ?.filter((cat) => cat.id !== initialData?.id)
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