import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

import TaskTypePicker from "../components/TaskTypePicker";
import DatePicker from "../components/DatePicker";
import TimePicker from "../components/TimePicker";
import ImageSelector from "../components/ImageSelector";
import FilePicker from "../components/FilePicker";
import { addTask } from "../features/tasks/tasksSlice";
import { saveFileLocally } from "../utils/fileUtils";
import { formatDateKey, formatTimeString } from "../utils/taskHelpers";

export default function AddTaskScreen() {
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [typeTask, setTypeTask] = useState(null);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [image, setImage] = useState(null);

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) setDate(selectedDate);
    setShowDatePicker(false);
  };

  const handleTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      const updated = new Date(date);
      updated.setHours(selectedTime.getHours());
      updated.setMinutes(selectedTime.getMinutes());
      setDate(updated);
    }
    setShowTimePicker(false);
  };

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.assets?.length > 0) {
        const file = result.assets[0];
        const localUri = await saveFileLocally(file.uri, file.name);
        setAttachment({ ...file, uri: localUri });
      }
    } catch (err) {
      console.log("שגיאה בבחירת מסמך:", err);
      alert("לא הצלחנו לבחור מסמך.");
    }
  };

  const handlePickImage = async () => {
    const { status: mediaStatus } =
      await MediaLibrary.requestPermissionsAsync();
    const { status: pickerStatus } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (mediaStatus !== "granted" || pickerStatus !== "granted") {
      alert("צריך הרשאה לגלריה כדי לבחור תמונה.");
      return;
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
        setImage({ ...asset, uri: localUri });
      }
    } catch (err) {
      console.log("שגיאה בגלריה:", err);
      alert("שגיאה בגישה לגלריה.");
    }
  };

  const handleSaveTask = () => {
    const dateKey = formatDateKey(date);
    const timeString = formatTimeString(date);

    dispatch(
      addTask({
        date: dateKey,
        text: notes || "משימה ללא שם",
        time: timeString,
        type: typeTask,
        phone,
        email,
        notes,
        attachment,
        imageUri: image?.uri || null,
      })
    );

    Alert.alert("הצלחה", "המשימה נשמרה בהצלחה");
  };

  return (
    <View style={styles.container}>
      <TextInput
        multiline
        placeholder="תיאור המשימה"
        value={notes}
        onChangeText={setNotes}
        style={styles.input}
      />

      <DatePicker
        date={date}
        show={showDatePicker}
        onChange={handleDateChange}
        onToggle={() => setShowDatePicker(true)}
      />

      <TimePicker
        date={date}
        show={showTimePicker}
        onChange={handleTimeChange}
        onToggle={() => setShowTimePicker(true)}
      />

      <Text style={{ marginTop: 15 }}>בחר סוג משימה:</Text>
      <TaskTypePicker taskType={typeTask} setTaskType={setTypeTask} />

      <TextInput
        placeholder="טלפון"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={styles.input}
      />

      <TextInput
        placeholder="אימייל"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />

      <FilePicker onPress={handlePickDocument} />

      <ImageSelector onPress={handlePickImage} imageUri={image?.uri} />

      <Pressable style={styles.saveButton} onPress={handleSaveTask}>
        <Text style={styles.saveButtonText}>💾 שמור משימה</Text>
      </Pressable>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    padding: 8,
  },
  link: {
    color: "blue",
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
