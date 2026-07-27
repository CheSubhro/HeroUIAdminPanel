
import React from 'react';
import { Button, Card, EmptyState } from '../../components/common';
import { FaEdit, FaTrash, FaBox, FaImage } from 'react-icons/fa';

export default function ProductList({
    products = [],
    selectedIds = [],
    onSelectAll = () => {},
    onSelectOne = () => {},
    onEdit,
    onDelete,
    onAdd
}) {
    const isAllSelected =
        products.length > 0 &&
        selectedIds.length === products.length;

    return (
        <Card className="p-6 bg-[#181b22] border border-gray-800 shadow-xl">
            {products.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-800 text-gray-300 text-sm font-semibold">

                                <th className="py-3 px-4 w-10">
                                    <input
                                        type="checkbox"
                                        onChange={onSelectAll}
                                        checked={isAllSelected}
                                        className="rounded bg-[#0f1117] border-gray-700 text-blue-600 focus:ring-0 cursor-pointer"
                                    />
                                </th>

                                <th className="py-3 px-4 w-16">
                                    Image
                                </th>

                                <th className="py-3 px-4">
                                    Product Name
                                </th>

                                <th className="py-3 px-4">
                                    Category
                                </th>

                                <th className="py-3 px-4">
                                    Price
                                </th>

                                <th className="py-3 px-4">
                                    Stock
                                </th>

                                <th className="py-3 px-4 text-right">
                                    Actions
                                </th>

                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-800/60 text-sm">
                            {products.map((product) => (
                                <tr
                                    key={product.id}
                                    className="hover:bg-gray-800/40 transition-colors"
                                >

                                    {/* Select */}
                                    <td className="py-3 px-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(product.id)}
                                            onChange={() =>
                                                onSelectOne(product.id)
                                            }
                                            className="rounded bg-[#0f1117] border-gray-700 text-blue-600 focus:ring-0 cursor-pointer"
                                        />
                                    </td>

                                    {/* Image */}
                                    <td className="py-3 px-4">
                                        {product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-9 h-9 rounded-lg object-cover border border-gray-700"
                                            />
                                        ) : (
                                            <div className="w-9 h-9 rounded-lg bg-[#0f1117] border border-gray-800 flex items-center justify-center text-gray-500">
                                                <FaImage className="text-xs" />
                                            </div>
                                        )}
                                    </td>

                                    {/* Product Name */}
                                    <td className="py-3 px-4 font-bold text-white">
                                        {product.name}
                                    </td>

                                    {/* Category */}
                                    <td className="py-3 px-4 text-gray-400">
                                        {product.categoryName || "Uncategorized"}
                                    </td>

                                    {/* Price */}
                                    <td className="py-3 px-4 text-gray-300 font-medium">
                                    ₹{Number(product.price || 0).toFixed(2)}
                                    </td>

                                    {/* Stock */}
                                    <td className="py-3 px-4">
                                        <span
                                            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                                Number(product.stock) > 0
                                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                                    : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                            }`}
                                        >
                                            {product.stock || 0} in stock
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="py-3 px-4 text-right">
                                        <div className="flex items-center justify-end gap-2">

                                            {/* Edit */}
                                            <Button
                                                isIconOnly
                                                size="sm"
                                                variant="flat"
                                                onClick={() => onEdit(product)}
                                                className="bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/40 shadow-none"
                                                title="Edit Product"
                                            >
                                                <FaEdit className="text-xs" />
                                            </Button>

                                            {/* Delete */}
                                            <Button
                                                isIconOnly
                                                size="sm"
                                                variant="flat"
                                                onClick={() => onDelete(product)}
                                                className="bg-rose-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500/20 hover:border-rose-500/40 shadow-none"
                                                title="Delete Product"
                                            >
                                                <FaTrash className="text-xs" />
                                            </Button>

                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <EmptyState
                    icon={<FaBox className="text-4xl text-gray-500" />}
                    title="No Products Found"
                    description="Get started by creating a new product for your inventory."
                    action={
                        <Button
                            color="primary"
                            size="sm"
                            onClick={onAdd}
                        >
                            Add Product
                        </Button>
                    }
                />
            )}
        </Card>
    );
}