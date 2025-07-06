import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  setTempImage,
  setTempAttachment,
  clearTempTaskData,
} from "../features/tasks/taskTempSlice";

import TaskTypePicker from "../components/TaskTypePicker";
import DatePicker from "../components/DatePicker";
import TimePicker from "../components/TimePicker";
import ImageSelector from "../components/ImageSelector";
import FilePicker from "../components/FilePicker";
import { addTask } from "../features/tasks/tasksSlice";
import { formatDateKey, formatTimeString } from "../utils/taskHelpers";
import { handlePickDocument, handlePickImage } from "../utils/handlers";

export default function AddTaskScreen() {
  const dispatch = useDispatch();
  const image = useSelector((state) => state.taskTemp.image);
  const attachment = useSelector((state) => state.taskTemp.attachment);

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [typeTask, setTypeTask] = useState(null);
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

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

  const handleImageSelection = async () => {
    const pickedImage = await handlePickImage();
    if (pickedImage) {
      dispatch(setTempImage(pickedImage));
    }
  };

  const handleDocumentSelection = async () => {
    const pickedFile = await handlePickDocument();
    if (pickedFile) {
      dispatch(setTempAttachment(pickedFile));
    }
  };

  const handleSaveTask = () => {
    const dateKey = formatDateKey(date);
    const timeString = formatTimeString(date);

    dispatch(
      addTask(
        dateKey,
        title || "משימה ללא שם",
        timeString,
        typeTask,
        phone,
        email,
        notes,
        attachment,
        image?.uri || null
      )
    );

    dispatch(clearTempTaskData());
    Alert.alert("הצלחה", "המשימה נשמרה בהצלחה");
  };

  console.log("TaskTypePicker:", TaskTypePicker);
  console.log("DatePicker:", DatePicker);
  console.log("TimePicker:", TimePicker);
  console.log("ImageSelector:", ImageSelector);
  console.log("FilePicker:", FilePicker);

  return (
    <View style={styles.container}>
      <TextInput
        multiline
        placeholder="תיאור המשימה"
        value={title}
        onChangeText={setTitle}
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

      <FilePicker onPress={handleDocumentSelection} />

      <ImageSelector onPress={handleImageSelection} imageUri={image?.uri} />

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
