import * as FileSystem from "expo-file-system";

/**
 * שומר קובץ לוקאלית ומחזיר את הנתיב החדש
 * @param {string} uri - הנתיב המקורי (למשל מתמונה או דוקומנט)
 * @param {string} filename - שם הקובץ החדש (כולל סיומת)
 * @returns {Promise<string>} - הנתיב החדש שנשמר בו הקובץ
 */
export const saveFileLocally = async (uri, filename) => {
  try {
    const fileUri = FileSystem.documentDirectory + filename;
    await FileSystem.copyAsync({
      from: uri,
      to: fileUri,
    });
    return fileUri;
  } catch (err) {
    console.error("שגיאה בשמירת קובץ לוקאלית:", err);
    throw err;
  }
};
