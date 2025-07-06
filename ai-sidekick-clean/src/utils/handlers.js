import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { saveFileLocally } from "./fileUtils";

/**
 * Opens document picker and saves selected file locally.
 * @param {Function} setAttachment - callback to set the selected file object
 */
export const handlePickDocument = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
      multiple: false,
    });

    if (result.assets?.length > 0) {
      const file = result.assets[0];
      const localUri = await saveFileLocally(file.uri, file.name);
      return { ...file, uri: localUri };
    }
  } catch (err) {
    console.log("שגיאה בבחירת מסמך:", err);
    alert("לא הצלחנו לבחור מסמך.");
  }
  return null;
};

/**
 * Opens image picker, requests permissions, saves image locally.
 * @param {Function} setImage - callback to set the selected image object
 */
export const handlePickImage = async () => {
  const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
  const { status: pickerStatus } =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (mediaStatus !== "granted" || pickerStatus !== "granted") {
    alert("צריך הרשאות כדי לבחור תמונה");
    return null;
  }

  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const asset = result.assets[0];
      const localUri = await saveFileLocally(
        asset.uri,
        `image-${Date.now()}.jpg`
      );
      return { ...asset, uri: localUri };
    }
  } catch (err) {
    console.log("שגיאה בגלריה:", err);
    alert("שגיאה בגישה לגלריה");
  }

  return null;
};