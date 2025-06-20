import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { loadCategories } from "../services/categotyStorege";

export default function TaskTypePicker({ taskType, setTaskType }) {
  const [taskTypes, setTaskTypes] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const loaded = await loadCategories();
      setTaskTypes(loaded);
    };
    fetchCategories();
  }, []);

  return (
    <Picker
      selectedValue={taskType}
      onValueChange={(itemValue) => setTaskType(itemValue)}
    >
      {taskTypes.map((type) => (
        <Picker.Item
          key={type.value}
          label={type.label}
          value={type.value}
          color={type.color}
        />
      ))}
    </Picker>
  );
}
