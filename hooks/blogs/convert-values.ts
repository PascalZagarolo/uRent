import { useBlogCategories } from "./useBlogCategories";

export const getLabelByValue = (value) => {
    const existingCategories = useBlogCategories()
    const category = existingCategories.find(cat => cat.value === value);
    return category ? category.label : null; // Return label if found, otherwise null
};