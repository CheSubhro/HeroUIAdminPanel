
import React from 'react';
import { Button as HeroButton } from "@heroui/react";

export default function Button({ 
    children, 
    as,
    to,
    href,
    onPress, 
    onClick, 
    className = '', 
    variant = 'solid', 
    color = 'primary',
    disabled = false,
    ...props 
}) {
    const colorVariants = {
        primary: "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-emerald-500/30 shadow-lg shadow-emerald-900/20",
        secondary: "bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700/80 shadow-slate-950/50",
        danger: "bg-rose-600 hover:bg-rose-500 text-white border-rose-500/30 shadow-rose-950/40"
    };

    const selectedColorStyle = colorVariants[color] || colorVariants.secondary;

    const combinedClassName = `
        font-semibold rounded-xl transition-all duration-200 cursor-pointer border shadow-md
        active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        ${selectedColorStyle}
        ${className}
    `.trim();

    const handleClick = onClick || onPress;

    if (as || to || href) {
        const Component = as || 'a';
        const linkProps = to ? { to } : href ? { href } : {};
        return (
            <Component 
                className={`inline-flex items-center justify-center ${combinedClassName}`} 
                {...linkProps}
                onClick={handleClick} 
                {...props}
            >
                {children}
            </Component>
        );
    }

    return (
        <HeroButton 
            variant={variant}
            className={combinedClassName}
            onPress={handleClick} 
            isDisabled={disabled}
            {...props}
        >
            {children}
        </HeroButton>
    );
}