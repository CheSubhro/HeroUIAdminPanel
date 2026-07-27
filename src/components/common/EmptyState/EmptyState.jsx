
import React from 'react';

export default function EmptyState({ title = "No Data Found", description, action }) {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-slate-800 bg-slate-950/40 rounded-xl">
            <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 mb-3 shadow-inner">
                📂
            </div>
            <h3 className="text-base font-semibold text-slate-200">{title}</h3>
            {description && <p className="text-xs text-slate-400 mt-1 mb-4 max-w-sm">{description}</p>}
            {action && <div className="mt-2">{action}</div>}
        </div>
    );
}