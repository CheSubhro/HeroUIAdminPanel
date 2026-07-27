
import React from 'react';
import { Button, Card, EmptyState } from '../../components/common';
import { FaEdit, FaTrash, FaListAlt, FaImage } from 'react-icons/fa';

export default function CategoryTable({ categories, selectedIds, onSelectAll, onSelectOne, onEdit, onDelete, onAdd }) {
    
    const isAllSelected = categories.length > 0 && selectedIds.length === categories.length;

    return (
        <Card className="p-6 bg-[#181b22] border border-gray-800 shadow-xl">
            {categories.length > 0 ? (
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
                                <th className="py-3 px-4 w-16">Avatar</th>
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
                                    <td className="py-3 px-4">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedIds.includes(cat.id)} 
                                            onChange={() => onSelectOne(cat.id)}
                                            className="rounded bg-[#0f1117] border-gray-700 text-blue-600 focus:ring-0 cursor-pointer" 
                                        />
                                    </td>
                                    <td className="py-3 px-4">
                                        {cat.avatar ? (
                                            <img 
                                                src={cat.avatar} 
                                                alt={cat.name} 
                                                className="w-9 h-9 rounded-lg object-cover border border-gray-700" 
                                            />
                                        ) : (
                                            <div className="w-9 h-9 rounded-lg bg-[#0f1117] border border-gray-800 flex items-center justify-center text-gray-500">
                                                <FaImage className="text-xs" />
                                            </div>
                                        )}
                                    </td>
                                    <td className="py-3 px-4 font-bold text-white">{cat.name}</td>
                                    <td className="py-3 px-4 text-gray-400 text-xs font-mono">{cat.slug}</td>
                                    <td className="py-3 px-4 text-gray-300 font-medium">{cat.description || "N/A"}</td>
                                    <td className="py-3 px-4">
                                        <span className="bg-blue-500/10 text-blue-400 text-xs px-2.5 py-1 rounded-full font-semibold">
                                            {cat.productCount || 0} items
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {/* Edit Button */}
                                            <Button
                                                isIconOnly
                                                size="sm"
                                                variant="flat"
                                                onClick={() => onEdit(cat)}
                                                className="bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/40 shadow-none"
                                                title="Edit Category"
                                            >
                                                <FaEdit className="text-xs" />
                                            </Button>

                                            {/* Delete Button */}
                                            <Button
                                                isIconOnly
                                                size="sm"
                                                variant="flat"
                                                onClick={() => onDelete(cat)}
                                                className="bg-rose-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500/20 hover:border-rose-500/40 shadow-none"
                                                title="Delete Category"
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