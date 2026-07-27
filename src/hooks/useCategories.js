
import { useState, useMemo } from "react";

export function useCategories() {
    
    const [categories, setCategories] = useState([
        { id: 1, name: "Electronics", slug: "electronics", description: "Gadgets, smartphones and home appliances.", productCount: 12, parentId: "", avatar: "" },
        { id: 2, name: "Clothing", slug: "clothing", description: "Men and women fashion wear.", productCount: 25, parentId: "", avatar: "" },
    ]);
    
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedIds, setSelectedIds] = useState([]);
    const rowsPerPage = 5;

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);
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

    // Selection Handlers
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(paginatedCategories.map((cat) => cat.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectOne = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleFormSubmit = (data) => {
        // Handle FormData or regular object depending on submission
        const name = data instanceof FormData ? data.get("name") : data.name;
        const slug = name.toLowerCase().replace(/\s+/g, '-');
        
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

    const handleBulkDelete = () => {
        setCategories((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
        setSelectedIds([]);
        setIsBulkDeleteOpen(false);
    };

    return {
        categories,
        filteredCategories,
        paginatedCategories,
        searchQuery,
        setSearchQuery,
        currentPage,
        setCurrentPage,
        totalPages,
        selectedIds,
        handleSelectAll,
        handleSelectOne,
        isFormOpen,
        setIsFormOpen,
        isDeleteOpen,
        setIsDeleteOpen,
        isBulkDeleteOpen,
        setIsBulkDeleteOpen,
        selectedCategory,
        setSelectedCategory,
        categoryToDelete,
        setCategoryToDelete,
        handleFormSubmit,
        handleDelete,
        handleBulkDelete
    };
}