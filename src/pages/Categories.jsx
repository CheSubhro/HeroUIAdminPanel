
import React, { useState, useMemo } from "react";
import { Button, Modal, ConfirmModal, Pagination } from "../components/common";
import CategoryForm from "../features/category/CategoryForm";
import CategoryTable from "../features/category/CategoryTable";
import { FaPlus, FaSearch } from "react-icons/fa";

export default function Categories() {
    const [categories, setCategories] = useState([
        { id: 1, name: "Electronics", slug: "electronics", description: "Gadgets, smartphones and home appliances.", productCount: 12 },
        { id: 2, name: "Clothing", slug: "clothing", description: "Men and women fashion wear.", productCount: 25 },
    ]);
    
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    // Search & Pagination Logic
    const filteredCategories = useMemo(() => {
        return categories.filter((cat) =>
            cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cat.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [categories, searchQuery]);

    const paginatedCategories = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        return filteredCategories.slice(start, start + rowsPerPage);
    }, [filteredCategories, currentPage]);

    const totalPages = Math.ceil(filteredCategories.length / rowsPerPage) || 1;

    const handleFormSubmit = (data) => {
        // Auto generate slug from name if not provided
        const slug = data.name.toLowerCase().replace(/\\s+/g, '-');
        if (selectedCategory) {
            setCategories((prev) =>
                prev.map((item) => (item.id === selectedCategory.id ? { ...item, ...data, slug } : item))
            );
        } else {
            const newCategory = { id: Date.now(), ...data, slug, productCount: 0 };
            setCategories((prev) => [...prev, newCategory]);
        }
        setIsFormOpen(false);
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
                <Button color="primary" className="flex items-center gap-2" onClick={() => { setSelectedCategory(null); setIsFormOpen(true); }}>
                    <FaPlus /> Add Category
                </Button>
            </div>

            {/* Search Bar & Controls */}
            <div className="flex items-center justify-between gap-4 bg-[#181b22] p-4 rounded-xl border border-gray-800">
                <div className="relative flex-1 max-w-sm">
                    <FaSearch className="absolute left-3 top-3 text-gray-400 text-sm" />
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#0f1117] border border-gray-700 text-white text-sm rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="text-sm text-gray-400">
                    Total: <span className="text-white font-bold">{filteredCategories.length}</span> categories
                </div>
            </div>

            {/* Modular Table Component */}
            <CategoryTable
                categories={paginatedCategories}
                onEdit={(cat) => { setSelectedCategory(cat); setIsFormOpen(true); }}
                onDelete={(cat) => { setCategoryToDelete(cat); setIsDeleteOpen(true); }}
                onAdd={() => { setSelectedCategory(null); setIsFormOpen(true); }}
            />

            {/* Pagination Component */}
            {totalPages > 1 && (
                <div className="flex justify-center pt-2">
                    <Pagination
                        page={currentPage}
                        total={totalPages}
                        onChange={(page) => setCurrentPage(page)}
                    />
                </div>
            )}

            {/* Modals... */}
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