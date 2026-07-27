
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import CategoryForm from "../CategoryForm";

describe("CategoryForm Component", () => {
    
    const mockOnSubmit = vi.fn();
    const mockOnCancel = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("renders form elements correctly", () => {
        render(<CategoryForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
        
        expect(screen.getByPlaceholderText(/enter category name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/enter description/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /add category/i })).toBeInTheDocument();
    });

    test("shows validation error when submitting with empty name", () => {
        render(<CategoryForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
        
        const submitButton = screen.getByRole("button", { name: /add category/i });
        fireEvent.click(submitButton);

        expect(screen.getByText(/category name is required/i)).toBeInTheDocument();
        expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    test("calls onSubmit with FormData when valid data is provided", () => {
        render(<CategoryForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
        
        const nameInput = screen.getByPlaceholderText(/enter category name/i);
        fireEvent.change(nameInput, { target: { value: "Smartphones" } });

        const submitButton = screen.getByRole("button", { name: /add category/i });
        fireEvent.click(submitButton);

        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        expect(mockOnSubmit.mock.calls[0][0]).toBeInstanceOf(FormData);
    });
});