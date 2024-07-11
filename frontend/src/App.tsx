import React from "react";
import Chat from "./components/Chat";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1 className="text-center text-2xl font-bold my-4">Chat with GPT</h1>
      <Chat />
    </div>
  );
};

export default App;
