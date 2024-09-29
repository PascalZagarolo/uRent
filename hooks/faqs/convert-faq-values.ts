
import { useFaqsCategories } from "./useFaqsCategories";

export const getLabelByValueFaqs = (value) => {
    const existingCategories = useFaqsCategories()
    const category = existingCategories.find(cat => cat.value === value);
    return category ? category.label : null; // Return label if found, otherwise null
};