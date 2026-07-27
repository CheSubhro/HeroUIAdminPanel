
import { useState, useMemo } from "react";

export function useProducts() {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Pro Wireless Mouse",
            slug: "pro-wireless-mouse",
            description: "High precision wireless mouse",
            categoryName: "Electronics",
            categoryId: "1",
            price: 59.99,
            discountPrice: 49.99,
            stock: 25,
            isAvailable: true,
            image: null,
        },
        {
            id: 2,
            name: "Mechanical Keyboard",
            slug: "mechanical-keyboard",
            description: "RGB mechanical gaming keyboard",
            categoryName: "Electronics",
            categoryId: "1",
            price: 129.99,
            discountPrice: "",
            stock: 0,
            isAvailable: false,
            image: null,
        },
    ]);

    const [categories] = useState([
        { id: "1", name: "Electronics" },
        { id: "2", name: "Accessories" },
    ]);

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // সিলেকشن এবং মডালের স্টেটসমূহ
    const [selectedIds, setSelectedIds] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null);

    // Search & Filtering
    const filteredProducts = useMemo(() => {
        return products.filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [products, searchQuery]);

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredProducts.slice(start, start + itemsPerPage);
    }, [filteredProducts, currentPage]);

    // Checkbox Selection Handlers
    const handleSelectOne = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedIds.length === paginatedProducts.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(paginatedProducts.map((p) => p.id));
        }
    };

    const handleFormSubmit = (formData) => {
        const categoryId = formData instanceof FormData ? formData.get("categoryId") : formData.categoryId;
        const categoryObj = categories.find((c) => c.id === categoryId);
        const categoryName = categoryObj ? categoryObj.name : "Uncategorized";

        if (selectedProduct) {
            setProducts((prev) =>
                prev.map((p) =>
                    p.id === selectedProduct.id
                        ? { ...p, ...(formData instanceof FormData ? Object.fromEntries(formData) : formData), categoryName }
                        : p
                )
            );
        } else {
            const newProduct = {
                id: Date.now(),
                ...(formData instanceof FormData ? Object.fromEntries(formData) : formData),
                categoryName,
            };
            setProducts((prev) => [newProduct, ...prev]);
        }

        setIsFormOpen(false);
        setSelectedProduct(null);
    };

    const handleDelete = () => {
        if (productToDelete) {
            setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
            setIsDeleteOpen(false);
            setProductToDelete(null);
        }
    };

    // Bulk Delete Handler
    const handleBulkDelete = () => {
        setProducts((prev) => prev.filter((p) => !selectedIds.includes(p.id)));
        setSelectedIds([]);
        setIsBulkDeleteOpen(false);
    };

    return {
        products,
        categories,
        filteredProducts,
        paginatedProducts,
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
        selectedProduct,
        setSelectedProduct,
        productToDelete,
        setProductToDelete,
        handleFormSubmit,
        handleDelete,
        handleBulkDelete,
    };
}