import * as FileSystem from "expo-file-system";

/**
 * Checks if a file exists, and adds a suffix to avoid name collision.
 * @param {string} basePath - Directory path
 * @param {string} filename - Desired file name
 * @returns {Promise<string>} - Unique filename
 */

const getUniqueFileName = async (basePath, filename) => {
  let name = filename;
  let counter = 1;
  const ext = name.includes(".") ? "." + name.split(".").pop() : "";
  const base = name.replace(ext, "");

  while (
    await FileSystem.getInfoAsync(basePath + name).then((res) => res.exists)
  ) {
    name = `${base}_${counter}${ext}`;
    counter++;
  }
  return name;
};

/**
 * Save a file to local document directry with a uniqte name if needed.
 * @param {string} uri - original URI (from picker)
 * @param {string} filename - desired file name
 * @returns {Promise<string>} - Local URI of the save file
 */ 

export const saveFileLocally = async (uri, filename) => {
  try {
    const basePath = FileSystem.documentDirectory;
    const UniqueName = await getUniqueFileName(basePath, filename);
    const fileUri = basePath + UniqueName;

    await FileSystem.copyAsync({ from: uri, to: fileUri});
    return fileUri;
  } catch (err) {
    console.error("שגיאה בשמירת קובץ לוקאלית:", err);
    throw err;
  }
};