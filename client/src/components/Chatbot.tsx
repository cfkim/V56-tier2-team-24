import {GoogleGenAI} from '@google/genai';
import {useEffect, useState} from 'react';


export default function Chatbot() {
  const [aiResponse, setAiResponse] = useState<any>();

  const handleSubmit = async ()=> {
    
    const ai = new GoogleGenAI({apiKey: import.meta.env.VITE_GEMINI_AI_KEY});
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: "How does AI work?",
      
    })
    
    setAiResponse(response.text);
    
  }
  return (
    <>
    <button onClick={handleSubmit} className="hover:cursor-pointer">click for response</button>
    {aiResponse}
    </>
  )
  
}
