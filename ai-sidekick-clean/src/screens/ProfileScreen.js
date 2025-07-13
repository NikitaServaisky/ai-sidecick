import React from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";

export default function ProfileScreen() {
  const user = useSelector((state) => state.auth.user);
  console.log("Redux user in profile:", user)
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>אזור אישי</Text>

      {user ? (
        <>
          <Text>שם משתמש: {user.firstName} {user.lastName}</Text>
          <Text>אימייל: {user.email}</Text>
          <Text>רמת פרופיל: {user.profileLevel}</Text>
          {user.isVerified ? (
            <Text>המשתמש מאומת ✅</Text>
          ) : (
            <Text>המשתמש לא מאומת ❌</Text>
          )}
        </>
      ) : (
        <Text>לא מחובר</Text>
      )}
    </View>
  );
}
