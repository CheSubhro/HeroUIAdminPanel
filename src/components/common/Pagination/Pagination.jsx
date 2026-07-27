
import React from 'react';
import Button from '../Button/Button';

export default function Pagination({ 
    total = 10, 
    page = 1, 
    onChange, 
    className = "" 
}) {
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= total) {
            onChange(newPage);
        }
    };

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <Button
                variant="secondary"
                disabled={page <= 1}
                onClick={() => handlePageChange(page - 1)}
                className="px-3 py-1.5 text-xs bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800"
            >
                Prev
            </Button>

            <span className="text-sm text-slate-300 px-3 font-medium">
                Page <strong className="text-emerald-400">{page}</strong> of <strong className="text-slate-100">{total}</strong>
            </span>

            <Button
                variant="secondary"
                disabled={page >= total}
                onClick={() => handlePageChange(page + 1)}
                className="px-3 py-1.5 text-xs bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800"
            >
                Next
            </Button>
        </div>
    );
}