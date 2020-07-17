import React, { Component, useState, useEffect } from "react";
import { Widget, addResponseMessage } from "react-chat-widget";

import "react-chat-widget/lib/styles.css";

export default function Chatbox() {
  useEffect(() => {
    addResponseMessage("How can I help?");
  }, []);
  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
    addResponseMessage("ok lah");
  };

  return (
    <div>
      <Widget title="Hi there!" profileAvatar={"https://pbs.twimg.com/profile_images/935595594768371717/zHNDguay_400x400.jpg"} subtitle="Chat with us!" handleNewUserMessage={handleNewUserMessage} />
    </div>
  );
}
