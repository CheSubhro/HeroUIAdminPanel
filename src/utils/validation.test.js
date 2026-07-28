
import { validateProduct, validateCategory, validateRegister, validateLogin } from "./validation";

describe("validateCategory Utility", () => {
    test("should return error if category name is empty", () => {
        const errors = validateCategory({ name: "" });
        expect(errors.name).toBe("Category name is required.");
    });

    test("should return error if category name is less than 2 characters", () => {
        const errors = validateCategory({ name: "A" });
        expect(errors.name).toBe("Category name must be at least 2 characters.");
    });

    test("should not return error if category name is valid", () => {
        const errors = validateCategory({ name: "Electronics" });
        expect(errors.name).toBeUndefined();
    });
});

describe("validateProduct Utility", () => {
    test("should return errors if required product fields are missing", () => {
        const errors = validateProduct({
            name: "",
            slug: "",
            price: "",
            stock: "",
            categoryId: "",
            isEdit: false,
        });

        expect(errors.name).toBeDefined();
        expect(errors.slug).toBeDefined();
        expect(errors.price).toBeDefined();
        expect(errors.stock).toBeDefined();
        expect(errors.categoryId).toBeDefined();
    });

    test("should return error if image is missing for a new product", () => {
        const errors = validateProduct({
            name: "Test Mouse",
            slug: "test-mouse",
            price: 50,
            stock: 10,
            categoryId: "1",
            image: null,
            isEdit: false,
        });

        expect(errors.image).toBe("Product image is required.");
    });

    test("should not return image error if editing and image is null", () => {
        const errors = validateProduct({
            name: "Test Mouse",
            slug: "test-mouse",
            price: 50,
            stock: 10,
            categoryId: "1",
            image: null,
            isEdit: true,
        });

        expect(errors.image).toBeUndefined();
    });

    test("should not return errors if product data is completely valid", () => {
        const errors = validateProduct({
            name: "Pro Wireless Mouse",
            slug: "pro-wireless-mouse",
            price: 59.99,
            stock: 25,
            categoryId: "1",
            image: { name: "mouse.png" },
            isEdit: false,
        });

        expect(Object.keys(errors).length).toBe(0);
    });
});

describe("validateRegister Utility", () => {
    test("should return errors if required register fields are missing or invalid", () => {
        const errors = validateRegister({
            username: "ab",
            email: "invalid-email",
            fullName: "",
            password: "123",
            role: "superhero",
            avatar: null,
        });

        expect(errors.username).toBeDefined();
        expect(errors.email).toBeDefined();
        expect(errors.fullName).toBeDefined();
        expect(errors.password).toBeDefined();
        expect(errors.role).toBeDefined();
        expect(errors.avatar).toBeDefined();
    });

    test("should not return errors if register data is completely valid", () => {
        const errors = validateRegister({
            username: "adminuser",
            email: "admin@example.com",
            fullName: "Admin User",
            password: "securepassword123",
            role: "admin",
            avatar: "avatar.png",
        });

        expect(Object.keys(errors).length).toBe(0);
    });
});

describe("validateLogin Utility", () => {
    test("should return errors if login fields are missing or invalid", () => {
        const errors = validateLogin({
            email: "bad-email",
            password: "",
        });

        expect(errors.email).toBeDefined();
        expect(errors.password).toBeDefined();
    });

    test("should not return errors if login credentials are valid", () => {
        const errors = validateLogin({
            email: "admin@example.com",
            password: "securepassword123",
        });

        expect(Object.keys(errors).length).toBe(0);
    });
});