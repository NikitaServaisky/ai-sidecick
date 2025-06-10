import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import AppWrapper from "./src/screens/AppWrapper";

export default function App() {
  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  );
}
