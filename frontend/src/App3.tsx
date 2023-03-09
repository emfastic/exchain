import React from "react";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import logo from "./logo.svg";

function App() {
  const login = true;

  return login ? <Login /> : <Dashboard />;
}

export default App;
