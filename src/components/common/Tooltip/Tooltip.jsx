
import React from 'react';
import { Tooltip as HeroTooltip } from "@heroui/react";

export default function Tooltip({ children, content, color = "foreground", ...props }) {
    return (
        <HeroTooltip 
            content={content} 
            color={color}
            classNames={{
                content: "py-1.5 px-3 shadow-xl bg-slate-800 text-slate-100 border border-slate-700 text-xs font-medium rounded-lg",
            }}
            {...props}
        >
            {children}
        </HeroTooltip>
    );
}