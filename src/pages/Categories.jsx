
import React, { useState } from "react";
import { Button, Modal, ConfirmModal } from "../components/common";
import CategoryForm from "../features/category/CategoryForm";
import CategoryTable from "../features/category/CategoryTable";
import { FaPlus } from "react-icons/fa";

export default function Categories() {
    
    const [categories, setCategories] = useState([
        { id: 1, name: "Electronics", description: "Gadgets, smartphones and home appliances." },
        { id: 2, name: "Clothing", description: "Men and women fashion wear." },
    ]);
    
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    const handleOpenAdd = () => {
        setSelectedCategory(null);
        setIsFormOpen(true);
    };

    const handleOpenEdit = (cat) => {
        setSelectedCategory(cat);
        setIsFormOpen(true);
    };

    const handleFormSubmit = (data) => {
        if (selectedCategory) {
            setCategories((prev) =>
                prev.map((item) => (item.id === selectedCategory.id ? { ...item, ...data } : item))
            );
        } else {
            const newCategory = { id: Date.now(), ...data };
            setCategories((prev) => [...prev, newCategory]);
        }
        setIsFormOpen(false);
    };

    const confirmDelete = (cat) => {
        setCategoryToDelete(cat);
        setIsDeleteOpen(true);
    };

    const handleDelete = () => {
        if (categoryToDelete) {
            setCategories((prev) => prev.filter((item) => item.id !== categoryToDelete.id));
            setIsDeleteOpen(false);
            setCategoryToDelete(null);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">Categories</h1>
                    <p className="text-sm text-gray-400">Organize and manage your product categories.</p>
                </div>
                <Button color="primary" className="flex items-center gap-2" onClick={handleOpenAdd}>
                    <FaPlus /> Add Category
                </Button>
            </div>

            {/* Modular Table Component */}
            <CategoryTable
                categories={categories}
                onEdit={handleOpenEdit}
                onDelete={confirmDelete}
                onAdd={handleOpenAdd}
            />

            {/* Add / Edit Modal */}
            <Modal
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                title={selectedCategory ? "Edit Category" : "Add New Category"}
            >
                <CategoryForm
                    initialData={selectedCategory}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setIsFormOpen(false)}
                />
            </Modal>

            {/* Confirm Delete Modal */}
            <ConfirmModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={handleDelete}
                title="Delete Category"
                message={`Are you sure you want to delete "${categoryToDelete?.name}"? This action cannot be undone.`}
            />
        </div>
    );
}