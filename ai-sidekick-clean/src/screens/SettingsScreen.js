import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
  StyleSheet,
} from "react-native";

export default function SettingsScreen() {
  const [theme, setTheme] = useState("system");
  const [language, setLanguage] = useState("he");

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    console.log("Theme changed to:", newTheme);
    // write here how to change theme.
  };

  const handleLanguageChange = () => {
    const newLang = language === "he" ? "en" : "he";
    setLanguage(newLang);
    console.log("Language changed to:", newLang);
    // write here how to translate language.
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "מחיקת חשבון",
      "האם אתה בטוח שברצונך למחוק את החשבון שלך? לא ניתן לשחזר לאחר מכן",
      [
        { text: "ביטול", style: "cancel" },
        {
          text: "מחק",
          style: "destructive",
          onPress: () => {
            console.log("Account deleted");
            // create API for deleted the account
          },
        },
      ]
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>הגדרות</Text>

      <View style={styles.section}>
        <Text style={styles.label}>ערכת נושא:</Text>
        <View style={styles.optionRow}>
          {["light", "dark", "system"].map((opt) => (
            <TouchableOpacity
              key={opt}
              style={[
                styles.optionButton,
                theme === opt && styles.selectedButton,
              ]}
              onPress={() => handleThemeChange(opt)}
            >
              <Text>
                {opt === "light"
                  ? "בהיר"
                  : opt === "dark"
                  ? "כהה"
                  : "ברירת מערכת"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>שפה:</Text>
        <TouchableOpacity style={styles.optionButton} onPress={handleLanguageChange}>
          <Text style={styles.optionText}>
            {language === "he" ? "עברית" : "English"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
          <Text style={styles.deleteText}>🗑️ מחיקת חשבון</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "right",
  },
  section: {
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "right",
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  optionButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#aaa",
    marginRight: 10,
  },
  selectedButton: {
    backgroundColor: "#eee",
    borderColor: "#333",
  },
  optionText: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "#ffdddd",
    padding: 12,
    borderRadius: 8,
  },
  deleteText: {
    color: "#cc0000",
    textAlign: "center",
    fontWeight: "bold",
  },
});
