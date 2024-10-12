import React from "react";
import "./App.css";
import { useEmailContext } from "./contexts/EmailContext";

const App: React.FC = () => {
  const { emails } = useEmailContext();

  return (
    <div className="app">
      <p>{JSON.stringify(emails)}</p>
    </div>
  );
};

export default App;
