import {GoogleGenAI} from '@google/genai';
import {use, useEffect, useState} from 'react';

interface Message{
  author: string;
  content: string;
  
}

export default function Chatbot() {
  const [aiResponse, setAiResponse] = useState<any>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  
  useEffect(() => {
    // initializes message history with a welcome message
    setMessages([{author: 'AI', content: 'Hey there, how can we help you?'}]);
  }, []);

  const handleSubmit = async ()=> {
    if (userInput.trim() === '') return; // prevents submission of empty messages

    // adds user input to message history
    setMessages((prev) => [...prev, {author: 'User', content: userInput}]);
    setUserInput(''); // clears input field after submission

    const ai = new GoogleGenAI({apiKey: import.meta.env.VITE_GEMINI_AI_KEY});
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: "How does AI work?",
      
    })
    
    // setAiResponse(response.text);
    setAiResponse("testing a response.")
    // adds AI response to message history
    // setMessages([...messages, {author: 'AI', content: response.text || 'Message failed. Try again.'}]);
    setMessages((prev) => [...prev, {author: 'AI', content: "hey that was a great question!"}]);
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[1000px] w-[500px] bg-white z-10 position:absolute rounded-xl">
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
        <div id="chat-body" className="flex flex-col h-[800px] w-full overflow-y-auto p-6 text-lg">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.author === 'AI' ? 'justify-start' : 'justify-end'}`}>
              <div className={`${message.author === 'AI' ? 'bg-[#BEE4FF] rounded-bl-none' : 'bg-gray-200 rounded-br-none'} rounded-xl w-8/10 h-20 mb-10 p-5 drop-shadow-sm/25`}>
                <p>{message.content}</p>
              </div>
            </div>
          ))}
          
        </div>
        <div id="chat-input" className="flex h-[112px] w-full items-center justify-center shadow-[0_-8px_16px_rgba(0,0,0,0.2)] p-3 rounded-b-xl">
          <div className="flex flex-row justify-between bg-gray-200 rounded-xl py-4 px-3 w-9/10">
            <input
              type="text"             
              placeholder={userInput !== "" ? userInput : "Type your message here..."}
              className="outline-none w-full"
              onChange={(e) => setUserInput(e.target.value)}
            >
            </input>
            <button disabled={userInput === ""} className="disabled:pointer-events-none hover:cursor-pointer" onClick={handleSubmit}>
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
