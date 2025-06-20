import * as SecureStore from "expo-secure-store";

const CATEGORY_KEY = "taskCategories";

export const saveCategories = async (categories) => {
  await SecureStore.setItemAsync(CATEGORY_KEY, JSON.stringify(categories));
};

export const loadCategories = async () => {
  const data = await SecureStore.getItemAsync(CATEGORY_KEY);
  return data ? JSON.parse(data) : [];
};

export const isValidCategoryName = (name) => {
  const forbiddenChars = /[@{})(\[\]!#$%^&*+=<>\/\\|~`]/;
  return !forbiddenChars.test(name);
};

export const addCategory = async (label, color) => {
  if (!isValidCategoryName(label))
    throw new Error("אפשר להשתמש באותיות ומספרים בלבד");
  const categories = await loadCategories();
  const value = label.toLowerCase().replace(/\s+/g, "-");
  categories.push({ label, value, color });
  await saveCategories(categories);
};

export const deleteCategory = async (value) => {
  const categories = await loadCategories();
  const updated = categories.filter((cat) => cat.value !== value);
  await saveCategories(updated);
};
