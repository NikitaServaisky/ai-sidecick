import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

import { saveFileLocally } from "../utils/fileUtils";
import { saveFilePathSecurely } from "../utils/secureFileStore";
import TaskTypePicker from "../components/TaskTypePicker";

export default function AddTaskScreen() {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [typeTask, setTypeTask] = useState(null);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [attchment, setAttachment] = useState(null);
  const [image, setImage] = useState(null);

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  const handleTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      const updateData = new Date(date);
      updateData.setHours(selectedTime.getHours());
      updateData.setMinutes(selectedTime.getMinutes());
      setDate(updateData);
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

      if (result.assets && result.assets.length > 0 && result.assets[0].uri) {
        const file = result.assets[0];
        const localUri = await saveFileLocally(file.uri, file.name);
        setAttachment({ ...file, uri: localUri });
        await saveFilePathSecurely('taskDocs', localUri);
      }
    } catch (err) {
      console.log("Error picking document:", err);
    }
  };

  const handlePickImage = async () => {
    console.log("נכנס לפונקציה handlePickImage");

    const { status: mediaStatus } =
      await MediaLibrary.requestPermissionsAsync();
    const { status: pickerStatus } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (mediaStatus !== "granted" || pickerStatus !== "granted") {
      alert("צריך הרשאה לגשת לגלריה כדי לעלות תמונות");
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.7,
      });

      console.log("תוצאה מהגלריה:", result);

      if (!result.canceled && result.assets?.length > 0) {
        const asset = result.assets[0];
        const localUri = await saveFileLocally(
          asset.uri,
          `image-${Date.now()}.jpeg`
        );
        setImage({ ...asset, uri: localUri });
        await saveFilePathSecurely('taskImages', localUri);
      }
    } catch (err) {
      console.log("שגיאה בגלריה:", err);
      alert("שגיאה בגישה לגלריה");
    }
  };

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("צריך הרשאה למצלמה כדי לצלם");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  return (
    <View>
      <TextInput multiline={true} placeholder="Task title" />

      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text> תאריך: {date.toLocaleDateString()}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setShowTimePicker(true)}>
        <Text>
          שעה:{" "}
          {date.toLocaleTimeString([], { hour: "2-digit", minutes: "2-digit" })}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          mode="date"
          value={date}
          onChange={handleDateChange}
          display={Platform.OS === "ios" ? "spinner" : "default"}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          mode="time"
          value={date}
          onChange={handleTimeChange}
          display={Platform.OS === "ios" ? "spinner" : "default"}
        />
      )}

      <Text>בחר סוג משימה:</Text>
      <TaskTypePicker taskType={typeTask} setTaskType={setTypeTask} />

      <TextInput
        placeholder="מספר טלפון (לא חובה)"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <TextInput
        placeholder="כתובת מייל (לא חובה)"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        placeholder="העאות נוספות"
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      <TouchableOpacity onPress={handlePickDocument}>
        <Text style={{ color: "blue" }}>
          {attchment ? `${attchment.name}` : "בחר קוצץ לצירוף"}
        </Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", marginTop: 20, gap: 10 }}>
        <TouchableOpacity onPress={handlePickImage}>
          <Text style={{ color: "blue" }}>מהגלריה</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleTakePhoto}>
          <Text style={{ color: "green" }}>מצלמה</Text>
        </TouchableOpacity>
      </View>

      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: 200, height: 200, marginTop: 10 }}
        />
      )}
    </View>
  );
}
