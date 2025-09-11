import { useState } from 'react'
import { ChatInput } from './components/ChatInput'
import { ChatMessages } from './components/ChatMessages'


import './App.css'


      
function App() {
        const [chatMessages, setChatMessages] = useState(
          []);

        //const chatMessages = array[0];
        //const setChatMessages = array[1];
        //const [chatMessages, setChatMessages] =array;
        return (
          <div className="app-container">
            <ChatMessages
              chatMessages={chatMessages}
              setChatMessages={setChatMessages}
            />
            <ChatInput
              chatMessages={chatMessages}
              setChatMessages={setChatMessages}
            />
          </div>
        );
      }

export default App
