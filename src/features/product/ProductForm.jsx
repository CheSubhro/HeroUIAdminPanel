
import React, { useState, useEffect } from "react";
import { Button, Input } from "../../components/common";
import { validateProduct } from "../../utils/validation";
import { FaImage, FaTimes } from "react-icons/fa";

export default function ProductForm({
    initialData,
    categories = [],
    onSubmit,
    onCancel
}) {
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        description: "",
        price: "",
        discountPrice: "",
        stock: "",
        categoryId: "",
        isAvailable: true,
        image: null
    });

    const [previewUrl, setPreviewUrl] = useState("");
    const [errors, setErrors] = useState({});

    // Add / Edit data load
    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setFormData({
                name: initialData.name || "",
                slug: initialData.slug || "",
                description: initialData.description || "",
                price: initialData.price || "",
                discountPrice: initialData.discountPrice || "",
                stock: initialData.stock || "",
                categoryId: initialData.categoryId || "",
                isAvailable:
                    initialData.isAvailable !== undefined
                        ? initialData.isAvailable
                        : true,
                image: null
            });

            setPreviewUrl(initialData.image || "");
        } else {
            setFormData({
                name: "",
                slug: "",
                description: "",
                price: "",
                discountPrice: "",
                stock: "",
                categoryId: "",
                isAvailable: true,
                image: null
            });

            setPreviewUrl("");
        }

        setErrors({});
    }, [initialData]);

    // Text / Number / Select / Checkbox fields
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: null
            }));
        }
    };

    // Image upload
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setFormData((prev) => ({
                ...prev,
                image: file
            }));

            setPreviewUrl(URL.createObjectURL(file));

            if (errors.image) {
                setErrors((prev) => ({
                    ...prev,
                    image: null
                }));
            }
        }
    };

    // Remove image
    const handleRemoveImage = () => {
        setFormData((prev) => ({
            ...prev,
            image: null
        }));

        setPreviewUrl("");

        if (!initialData) {
            setErrors((prev) => ({
                ...prev,
                image: "Product image is required"
            }));
        }
    };

    // Submit
    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateProduct({
            ...formData,
            isEdit: Boolean(initialData)
        });

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const dataToSend = new FormData();

        dataToSend.append("name", formData.name);
        dataToSend.append("slug", formData.slug);
        dataToSend.append("description", formData.description);
        dataToSend.append("price", formData.price);
        dataToSend.append("discountPrice", formData.discountPrice);
        dataToSend.append("stock", formData.stock);
        dataToSend.append("categoryId", formData.categoryId);
        dataToSend.append(
            "isAvailable",
            String(formData.isAvailable)
        );

        if (formData.image) {
            dataToSend.append("image", formData.image);
        }

        onSubmit(dataToSend);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 py-2 max-h-[80vh] overflow-y-auto px-1">
            {/* Product Name */}
            <div className="space-y-1.5">
                <Input
                    label="Product Name"
                    name="name"
                    placeholder="Enter product name"
                    value={formData.name}
                    onChange={handleChange}
                />
                {errors.name && (
                    <span className="text-xs text-danger block">
                        {errors.name}
                    </span>
                )}
            </div>

            {/* Slug */}
            <div className="space-y-1.5">
                <Input
                    label="Slug"
                    name="slug"
                    placeholder="product-slug"
                    value={formData.slug}
                    onChange={handleChange}
                />
                {errors.slug && (
                    <span className="text-xs text-danger block">
                        {errors.slug}
                    </span>
                )}
            </div>

            {/* Description */}
            <div className="space-y-1.5">
                <Input
                    label="Description"
                    name="description"
                    placeholder="Enter product description"
                    value={formData.description}
                    onChange={handleChange}
                />
                {errors.description && (
                    <span className="text-xs text-danger block">
                        {errors.description}
                    </span>
                )}
            </div>

            {/* Price & Discount Price */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <Input
                        label="Price"
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Enter price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                    {errors.price && (
                        <span className="text-xs text-danger block">
                            {errors.price}
                        </span>
                    )}
                </div>

                <div className="space-y-1.5">
                    <Input
                        label="Discount Price"
                        name="discountPrice"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Enter discount price"
                        value={formData.discountPrice}
                        onChange={handleChange}
                    />
                    {errors.discountPrice && (
                        <span className="text-xs text-danger block">
                            {errors.discountPrice}
                        </span>
                    )}
                </div>
            </div>

            {/* Stock & Category */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <Input
                        label="Stock"
                        name="stock"
                        type="number"
                        min="0"
                        placeholder="Enter stock quantity"
                        value={formData.stock}
                        onChange={handleChange}
                    />
                    {errors.stock && (
                        <span className="text-xs text-danger block">
                            {errors.stock}
                        </span>
                    )}
                </div>

                <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-gray-400">
                        Category
                    </label>
                    <select
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        className="w-full bg-[#0f1117] border border-gray-700 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-blue-500"
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    {errors.categoryId && (
                        <span className="text-xs text-danger block">
                            {errors.categoryId}
                        </span>
                    )}
                </div>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2 pt-1">
                <input
                    type="checkbox"
                    name="isAvailable"
                    checked={formData.isAvailable}
                    onChange={handleChange}
                    className="rounded bg-[#0f1117] border-gray-700 text-blue-600 focus:ring-0 cursor-pointer w-4 h-4"
                />
                <label className="text-sm text-gray-300 font-medium">
                    Product is available
                </label>
            </div>

            {/* Product Image */}
            <div className="space-y-1.5 pt-1">
                <label className="block text-xs font-semibold text-gray-400">
                    Product Image
                    {!initialData && (
                        <span className="text-red-400 ml-1">*</span>
                    )}
                </label>

                {previewUrl ? (
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-700 bg-[#0f1117]">
                        <img
                            src={previewUrl}
                            alt="Product preview"
                            className="w-full h-full object-cover"
                        />
                        <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute top-1.5 right-1.5 bg-red-600 text-white p-1 rounded-full text-xs hover:bg-red-700 transition"
                        >
                            <FaTimes />
                        </button>
                    </div>
                ) : (
                    <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-[#0f1117] hover:bg-gray-800/50 transition">
                        <div className="flex flex-col items-center justify-center pt-3 pb-4">
                            <FaImage className="text-gray-400 text-xl mb-1.5" />
                            <p className="text-xs text-gray-400">
                                <span className="font-semibold text-blue-400">
                                    Click to upload
                                </span>{" "}
                                or drag and drop
                            </p>
                            <p className="text-[10px] text-gray-500 mt-1">
                                PNG, JPG or WEBP
                            </p>
                        </div>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>
                )}

                {errors.image && (
                    <span className="text-xs text-danger block">
                        {errors.image}
                    </span>
                )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
                <Button
                    type="button"
                    variant="flat"
                    color="default"
                    onClick={onCancel}
                >
                    Cancel
                </Button>
                
                <Button
                    type="submit"
                    color="primary"
                >
                    {initialData && Object.keys(initialData).length > 0 ? "Update Product" : "Add Product"}
                </Button>
            </div>
        </form>
    );
}