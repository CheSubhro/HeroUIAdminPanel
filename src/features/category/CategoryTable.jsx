
import React from 'react';
import { Button, Card, EmptyState } from '../../components/common';
import { FaEdit, FaTrash, FaListAlt } from 'react-icons/fa';

export default function CategoryTable({ categories, onEdit, onDelete, onAdd }) {

    return (
        <Card className="p-6 bg-[#181b22] border border-gray-800 shadow-xl">
            {categories.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-800 text-gray-300 text-sm font-semibold">
                                <th className="py-3 px-4">Name</th>
                                <th className="py-3 px-4">Slug</th>
                                <th className="py-3 px-4">Description</th>
                                <th className="py-3 px-4">Products</th>
                                <th className="py-3 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/60 text-sm">
                            {categories.map((cat) => (
                                <tr key={cat.id} className="hover:bg-gray-800/40 transition-colors">
                                    <td className="py-3 px-4 font-bold text-white">{cat.name}</td>
                                        <td className="py-3 px-4 text-gray-400 text-xs font-mono">{cat.slug}</td>
                                        <td className="py-3 px-4 text-gray-300 font-medium">{cat.description || "N/A"}</td>
                                        <td className="py-3 px-4">
                                            <span className="bg-blue-500/10 text-blue-400 text-xs px-2.5 py-1 rounded-full font-semibold">
                                                {cat.productCount || 0} items
                                            </span>
                                        </td>
                                    <td className="py-3 px-4 text-right space-x-1">
                                        <Button
                                            isIconOnly
                                            variant="light"
                                            size="sm"
                                            onClick={() => onEdit(cat)}
                                            className="text-blue-400 hover:bg-blue-500/10"
                                        >
                                            <FaEdit />
                                        </Button>
                                        <Button
                                            isIconOnly
                                            variant="light"
                                            size="sm"
                                            onClick={() => onDelete(cat)}
                                            className="text-red-400 hover:bg-red-500/10"
                                        >
                                            <FaTrash />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <EmptyState
                    icon={<FaListAlt className="text-4xl text-gray-500" />}
                    title="No Categories Found"
                    description="Get started by creating a new category for your items."
                    action={
                        <Button color="primary" size="sm" onClick={onAdd}>
                            Add Category
                        </Button>
                    }
                />
            )}
        </Card>
    );
}