import React from "react";
import AiAssistant from "../Components/chat/AiAssistant.tsx";
import RealChat from "../Components/chat/RealChat.tsx";

export default function Chat() {
  return (
    <div>
      <AiAssistant />
      <RealChat />
    </div>
  );
}
