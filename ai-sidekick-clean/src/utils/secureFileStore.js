import * as SecureStore from "expo-secure-store";

/**
 * מוסיף נתיב חדש לרשימת הקבצים השמורים לפי מפתח
 * @param {string} key - מפתח ייחודי (למשל "taskImage", "taskDoc")
 * @param {string} fileUri - הנתיב של הקובץ ששמרנו מקומית
 */
export const saveFilePathSecurely = async (key, fileUri) => {
  try {
    const existing = await SecureStore.getItemAsync(key);
    let list = existing ? JSON.parse(existing) : [];
    list.push(fileUri);
    await SecureStore.setItemAsync(key, JSON.stringify(list));
  } catch (err) {
    console.error("שגיאה בשמירת נתיב מוצפן:", err);
  }
};

/**
 * מחזיר את כל הנתיבים השמורים תחת מפתח מסוים
 * @param {string} key
 * @returns {Promise<string[]>}
 */
export const getFilePaths = async (key) => {
  try {
    const data = await SecureStore.getItemAsync(key);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("שגיאה בשליפת נתיבים:", err);
    return [];
  }
};

/**
 * מוחק נתיבים שמורים למפתח מסוים
 * @param {string} key
 */
export const clearFilePaths = async (key) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (err) {
    console.error("שגיאה במחיקת נתיבים:", err);
  }
};
