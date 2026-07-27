
import React, { useState } from "react";
import { Button, Modal, ConfirmModal, Pagination } from "../components/common";
import ProductForm from "../features/product/ProductForm";
import ProductList from "../features/product/ProductList";
import { FaPlus, FaSearch } from "react-icons/fa";

export default function ProductsPage() {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Pro Wireless Mouse",
            categoryName: "Electronics",
            categoryId: "1",
            price: 59.99,
            stock: 25,
            image: null,
        },
        {
            id: 2,
            name: "Mechanical Keyboard",
            categoryName: "Electronics",
            categoryId: "1",
            price: 129.99,
            stock: 0,
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

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null);

    // Search & Filtering
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleFormSubmit = (formData) => {
        const categoryObj = categories.find((c) => c.id === formData.categoryId);
        const categoryName = categoryObj ? categoryObj.name : "Uncategorized";

        if (selectedProduct) {
            // Update
            setProducts(
                products.map((p) =>
                    p.id === selectedProduct.id
                        ? { ...p, ...formData, categoryName }
                        : p
                )
            );
        } else {
            // Create
            const newProduct = {
                id: Date.now(),
                ...formData,
                categoryName,
            };
            setProducts([newProduct, ...products]);
        }
        setIsFormOpen(false);
        setSelectedProduct(null);
    };

    const handleDelete = () => {
        if (productToDelete) {
            setProducts(products.filter((p) => p.id !== productToDelete.id));
            setIsDeleteOpen(false);
            setProductToDelete(null);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">Products Management</h1>
                    <p className="text-sm text-gray-400">Organize and manage your store inventory.</p>
                </div>
                <Button 
                    color="primary" 
                    className="flex items-center gap-2" 
                    onClick={() => { setSelectedProduct(null); setIsFormOpen(true); }}
                >
                    <FaPlus /> Add Product
                </Button>
            </div>

            {/* Search Bar & Controls */}
            <div className="flex items-center justify-between gap-4 bg-[#181b22] p-4 rounded-xl border border-gray-800">
                <div className="relative flex-1 max-w-sm">
                    <FaSearch className="absolute left-3 top-3 text-gray-400 text-sm" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#0f1117] border border-gray-700 text-white text-sm rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="text-sm text-gray-400">
                    Total: <span className="text-white font-bold">{filteredProducts.length}</span> products
                </div>
            </div>

            {/* Modular Product List Component */}
            <ProductList
                products={paginatedProducts}
                onAdd={() => { setSelectedProduct(null); setIsFormOpen(true); }}
                onEdit={(product) => { setSelectedProduct(product); setIsFormOpen(true); }}
                onDelete={(product) => { setProductToDelete(product); setIsDeleteOpen(true); }}
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

            {/* Modals */}
            <Modal
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                title={selectedProduct ? "Edit Product" : "Add New Product"}
            >
                <ProductForm
                    initialData={selectedProduct || {}}
                    categories={categories}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setIsFormOpen(false)}
                />
            </Modal>

            <ConfirmModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={handleDelete}
                title="Delete Product"
                message={`Are you sure you want to delete "${productToDelete?.name}"? This action cannot be undone.`}
            />
        </div>
    );
}