
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
    isIconOnly = false,
    size = 'md',
    ...props 
}) {
    const colorVariants = {
        primary: "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-emerald-500/30 shadow-lg shadow-emerald-900/20",
        secondary: "bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700/80 shadow-slate-950/50",
        danger: "bg-rose-600 hover:bg-rose-500 text-white border-rose-500/30 shadow-rose-950/40",
        success: "bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500/30",
        warning: "bg-amber-600 hover:bg-amber-500 text-white border-amber-500/30",
    };

    const sizeStyles = {
        sm: isIconOnly ? "w-8 h-8 p-0 text-xs" : "px-3 py-1.5 text-xs",
        md: isIconOnly ? "w-10 h-10 p-0 text-sm" : "px-4 py-2 text-sm",
        lg: isIconOnly ? "w-12 h-12 p-0 text-base" : "px-5 py-2.5 text-base",
    };

    const selectedColorStyle = colorVariants[color] || colorVariants.secondary;
    const selectedSizeStyle = sizeStyles[size] || sizeStyles.md;

    const combinedClassName = `
        font-semibold rounded-xl transition-all duration-200 cursor-pointer border shadow-md inline-flex items-center justify-center
        active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        ${selectedColorStyle}
        ${selectedSizeStyle}
        ${className}
    `.trim();

    const handleClick = onClick || onPress;

    if (as || to || href) {
        const Component = as || 'a';
        const linkProps = to ? { to } : href ? { href } : {};
        return (
            <Component 
                className={combinedClassName} 
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
            isIconOnly={isIconOnly}
            {...props}
        >
            {children}
        </HeroButton>
    );
}