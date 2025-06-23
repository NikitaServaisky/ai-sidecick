/**
 * ייצוא כל הקבצים שנשמרו ע"י המשתמש כקובץ ZIP אחד, ושיתוף שלו.
 * Exports all user-saved files into a single ZIP archive and shares it.
 *
 * הפונקציה:
 * - שולפת את נתיבי הקבצים מה־SecureStore
 * - יוצרת תיקייה זמנית
 * - מעתיקה אליה את כל הקבצים
 * - אורזת את התיקייה כקובץ ZIP
 * - משתפת את הקובץ עם המשתמש
 *
 * The function:
 * - Retrieves file paths from SecureStore
 * - Creates a temporary export directory
 * - Copies all files into the directory
 * - Compresses the directory into a ZIP file
 * - Shares the ZIP file with the user
 *
 * תנאים מוקדמים:
 * - דורש הרשאות גישה לקבצים
 * - מחייב קבצים שנשמרו מראש (תמונות/מסמכים)
 *
 * Requirements:
 * - Requires file system permissions
 * - Assumes user has previously saved files (images/documents)
 *
 * דוגמה לשימוש:
 * Example usage:
 * await exportAllUserFiles();
 */

import { exportTasksData } from "./exportTasksData";
import { getFilePaths } from "./secureFileStore";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { zip } from "react-native-zip-archive";

export const exportAllUserFiles = async () => {
  try {
    const imagePaths = await getFilePaths("taskImages");
    const docPaths = await getFilePaths("taskDocs");
    const allFiles = [...imagePaths, ...docPaths];

    const exportDir = FileSystem.documentDirectory + "exported_tasks/";
    const zipPath = FileSystem.documentDirectory + "exported_tasks.zip";

    // ודא שהתיקייה קיימת
    if (dirInfo.exists) {
      await FileSystem.deleteAsync(exportDir, { idempotent: true });
      await FileSystem.makeDirectoryAsync(exportDir, { intermediates: true });
    } else {
      await FileSystem.makeDirectoryAsync(exportDir, { intermediates: true });
    }

    // העתק את הקבצים לתיקיית הייצוא
    for (const filePath of allFiles) {
      const filename = filePath.split("/").pop();
      const destPath = exportDir + filename;
      await FileSystem.copyAsync({ from: filePath, to: destPath });
    }

    // צור את קובץ המשימות
    const tasksJsonPath = await exportTasksData();
    const tasksJsonDest = exportDir + "tasks_data.json";
    await FileSystem.copyAsync({ from: tasksJsonPath, to: tasksJsonDest });

    // מחק ZIP קודם אם קיים
    const zipExists = await FileSystem.getInfoAsync(zipPath);
    if (zipExists.exists) {
      await FileSystem.deleteAsync(zipPath, { idempotent: true });
    }

    // צור ZIP ושתף
    await zip(exportDir, zipPath);
    await Sharing.shareAsync(zipPath);
  } catch (err) {
    console.log("שגיאה ביצוא הקבצים:", err);
    alert("שגיאה ביצוא הקבצים. נסה שוב");
  }
};
