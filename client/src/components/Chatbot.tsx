import {GoogleGenAI} from '@google/genai';
import {use, useEffect, useRef, useState} from 'react';
import { getAIResponse } from '../lib/aiChatService';
import ReactMarkdown from "react-markdown";

interface Message{
  author: string;
  content: string;
  timeStamp: Date;
}

export default function Chatbot({currentPage, role}: {currentPage: string, role: string}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // get dynamic context
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    if(chatEndRef.current) {
      chatEndRef.current.scrollTop = chatEndRef.current.scrollHeight;
    }
  }, [messages])

  useEffect(() => {
    // initializes message history with a welcome message
    const currentTime = new Date();
    setMessages([{author: 'AI', content: 'Hey there, how can we help you?', timeStamp: currentTime}]);
  }, []);

  const handleSubmit = async (suggestion: string)=> {
    console.log(currentPage, role)

    if (isLoading) return; // prevents multiple submissions while loading
    setIsLoading(true);
    let input = suggestion || userInput;
    console.log(input)
    if (!suggestion && userInput.trim() === '') return; // prevents submission of empty messages

    // adds user input to message history
    let currentTime = new Date();
    setMessages((prev) => [...prev, {author: 'User', content: input, timeStamp: currentTime}]);
    setUserInput(''); // clears input field after submission

    const response = await getAIResponse(input, currentPage, role);

    // adds AI response to message history
    currentTime = new Date();
    setMessages((prev) => [...prev, {author: 'AI', content: response || 'Message failed. Try again.', timeStamp: currentTime}]);
    
    setIsLoading(false);
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-[800px] bg-white z-100 rounded-xl drop-shadow-sm/25">
        <div id="chat-header" className="flex flex-col gap-1 bg-accent h-[100px] w-full justify-center drop-shadow-sm/25 p-6 text-3xl rounded-t-xl">
          <p className="font-nunito-bold">Chat with Lumo</p>
          <p className="flex flex-row items-center gap-2 text-sm">
            <span className="relative flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
            </span>
            Online
          </p>
        </div>
        <div id="chat-body" className="flex flex-col h-[800px] w-full overflow-y-auto p-6 text-lg" style={{ scrollbarGutter: "stable" }} ref={chatEndRef}>
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.author === 'AI' ? 'justify-start' : 'justify-end'}`}>
              <div className="flex flex-col mb-6">
                <div className={`${message.author === 'AI' ? 'bg-[#BEE4FF] rounded-bl-none' : 'bg-gray-200 rounded-br-none'} rounded-xl mb-3 p-5 drop-shadow-sm/25 display:inline-block`}>
                  {/* renders markdown for ai chats */}
                  {message.author === 'AI' ? (<ReactMarkdown>{message.content}</ReactMarkdown>): 
                  (<p>{message.content}</p>)}
                  <p></p>
                </div>
                <div className="flex flex-row items-center gap-1">
                  <p className={`text-xs text-gray-500 w-full ${message.author === 'AI' ? 'text-left' : 'text-right'}`}>{message.timeStamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                  {message.author === 'User' && (
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" 
                    width="24px" fill="#B7B7B7"><path d="M268-240 42-466l57-56 170 170 56 56-57 56Zm226 0L268-466l56-57 170 170 368-368 56 57-424 424Zm0-226-57-56 198-198 57 56-198 198Z"/>
                    </svg>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900">
            </div>
          )
          }
        </div>
        <div id="chat-input" className="flex flex-col w-full items-center justify-center shadow-[0_-8px_16px_rgba(0,0,0,0.2)] py-4 rounded-b-xl gap-3">
          <div id="input-suggestions" className="flex flex-row gap-2 drop-shadow-sm/25 z-30">
            <button className=" bg-gray-100 rounded-xl py-2 px-3 hover:cursor-pointer" onClick={()=> handleSubmit("How do I access patients?")}>
              <p className="text-sm">How do I access patients</p>
            </button>
            <button className="display:inline-block bg-gray-100 rounded-xl py-2 px-3 hover:cursor-pointer" onClick={()=> handleSubmit("Can you tell me more about surgery?")}>
              <p className="text-sm">Surgery</p>
            </button>
            <button className="display:inline-block bg-gray-100 rounded-xl py-2 px-3 hover:cursor-pointer" onClick={()=> handleSubmit("What's the FAQ?")}>
              <p className="text-sm">FAQ</p>
            </button>
          </div>
          <div className="flex flex-row justify-between bg-gray-200 rounded-xl py-4 px-3 w-9/10">
            <input
              type="text"
              value={userInput}             
              placeholder="Type your message here..."
              className="outline-none w-full "
              onChange={(e) => setUserInput(e.target.value)}
            >
            </input>
            <button disabled={userInput === ""} className="disabled:pointer-events-none hover:cursor-pointer" onClick={() => handleSubmit("")}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_4418_9832)">
                <path d="M9.51002 4.23062L18.07 8.51062C21.91 10.4306 21.91 13.5706 18.07 15.4906L9.51002 19.7706C3.75002 22.6506 1.40002 20.2906 4.28002 14.5406L5.15002 12.8106C5.37002 12.3706 5.37002 11.6406 5.15002 11.2006L4.28002 9.46062C1.40002 3.71062 3.76002 1.35062 9.51002 4.23062Z" stroke="#1c0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5.43994 12H10.8399" stroke="#1c0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                <clipPath id="clip0_4418_9832">
                <rect width="24" height="24" fill="none"/>
                </clipPath>
                </defs>
              </svg>
            </button>
            
          </div>
          
        </div>
        {/* <button onClick={handleSubmit} className="hover:cursor-pointer">click for response</button>
        {aiResponse} */}
        
      </div>
    </>
  )
  
}
