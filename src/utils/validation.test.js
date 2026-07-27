
import { validateCategory } from "./validation";

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