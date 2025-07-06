import React from "react";
import { useSelector } from "react-redux";

import AppNavigator from "../navigation/appNavigator";

export default function AppWrapper() {
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = !!token

  return <AppNavigator isAuthenticated={isAuthenticated} />;
}
