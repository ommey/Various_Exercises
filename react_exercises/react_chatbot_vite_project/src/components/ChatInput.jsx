  import { Chatbot } from 'supersimpledev'
  import { useState } from 'react'
  import './ChatInput.css'

  export function ChatInput({ chatMessages, setChatMessages }) {
        const [inputText, setInputText] = useState("");

        function saveInputText(event) {
          setInputText(event.target.value);
        }

        function sendMessage() {
          console.log(inputText);

          const newChatMessages = [
            ...chatMessages,
            {
              text: inputText,
              sender: "user",
              id: crypto.randomUUID(),
            },
          ];
          setChatMessages(newChatMessages);

          setChatMessages([
            ...newChatMessages,
            {
              text: Chatbot.getResponse(inputText),
              sender: "robot",
              id: crypto.randomUUID(),
            },
          ]);
          setInputText("");
        }

        return (
          // can only return one element thherefore wrap in div
          <div className="chat-input-container">
            <input
              placeholder="Write a message!"
              size="32"
              onChange={saveInputText}
              value={inputText}
              className="chat-input"
            />
            <button onClick={sendMessage} className="send-button">
              Send
            </button>
          </div>
        );
      }