
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import ProductForm from "../ProductForm";

describe("ProductForm Component", () => {
    const mockCategories = [
        { id: "1", name: "Electronics" },
        { id: "2", name: "Accessories" },
    ];

    const mockSubmit = vi.fn();
    const mockCancel = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("renders form fields correctly for adding a new product", () => {
        render(
            <ProductForm
                initialData={null}
                categories={mockCategories}
                onSubmit={mockSubmit}
                onCancel={mockCancel}
            />
        );

        expect(screen.getByPlaceholderText(/enter product name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/product-slug/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/enter product description/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/enter price/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/enter stock/i)).toBeInTheDocument();
        expect(screen.getByText(/add product/i)).toBeInTheDocument();
    });

    test("calls onCancel when cancel button is clicked", () => {
        render(
            <ProductForm
                initialData={null}
                categories={mockCategories}
                onSubmit={mockSubmit}
                onCancel={mockCancel}
            />
        );

        const cancelButton = screen.getByRole("button", { name: /cancel/i });
        fireEvent.click(cancelButton);

        expect(mockCancel).toHaveBeenCalledTimes(1);
    });

    test("updates input values on change", () => {
        render(
            <ProductForm
                initialData={null}
                categories={mockCategories}
                onSubmit={mockSubmit}
                onCancel={mockCancel}
            />
        );

        const nameInput = screen.getByPlaceholderText(/enter product name/i);
        fireEvent.change(nameInput, { target: { value: "New Gaming Mouse" } });

        expect(nameInput.value).toBe("New Gaming Mouse");
    });

    test("pre-fills form fields when initialData is provided for editing", () => {
        const productData = {
            name: "Pro Wireless Mouse",
            slug: "pro-wireless-mouse",
            description: "High precision",
            price: 59.99,
            discountPrice: 49.99,
            stock: 25,
            categoryId: "1",
            isAvailable: true,
            image: null,
        };

        render(
            <ProductForm
                initialData={productData}
                categories={mockCategories}
                onSubmit={mockSubmit}
                onCancel={mockCancel}
            />
        );

        expect(screen.getByPlaceholderText(/enter product name/i).value).toBe("Pro Wireless Mouse");
        expect(screen.getByPlaceholderText(/product-slug/i).value).toBe("pro-wireless-mouse");
        expect(screen.getByPlaceholderText(/enter price/i).value).toBe("59.99");
        expect(screen.getByRole("button", { name: /update product/i })).toBeInTheDocument();
    });
});