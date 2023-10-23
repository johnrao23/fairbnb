import React, { useState } from "react";
import { useAuthStore } from "../Backend/store/store";
import { fetchGPTResponse } from "../Backend/api/chatGPT";
import NavBar from "./NavBar";
import Footer from "./Footer";
import buildingdockImg from "../assets/buildingdockImg.png";

const AskAi = () => {
  const user = useAuthStore((state) => state.user);
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
  
    let messages = [
      { role: "system", content: "You are a helpful assistant." },
      ...chatHistory.map((msg) => ({ role: msg.type, content: msg.text })),
      { role: "user", content: userInput }
    ];

    setIsLoading(true);
  
    try {
      const response = await fetchGPTResponse({ messages });
      const data = response;
      console.log("API Response:", data);
  
      if (data && data.choices && data.choices.length > 0) {
        const gptResponse = data.choices[0].message.content || "Sorry, I couldn't understand that.";
        setChatHistory((prevHistory) => [...prevHistory, { type: "user", text: userInput }, { type: "assistant", text: gptResponse }]);
      } else {
        throw new Error(`Unexpected response format: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      console.error(error);
      setChatHistory((prevHistory) => [...prevHistory, { type: "user", text: userInput }, { type: "assistant", text: "An error occurred while fetching the GPT-3.5-turbo response" }]);
    } finally {
      setIsLoading(false);
      setUserInput("");
    }
  };
  

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      {isLoading && (
        <div className="bg-green-500 text-white text-center py-2">
          Thinking of the best answer for your question! This may take a minute...
        </div>
      )}
      <div 
        className="relative flex-grow bg-cover bg-no-repeat bg-center flex flex-col"
        style={{ backgroundImage: `url(${buildingdockImg})` }}
      >
        <div className="bg-gray-500 bg-opacity-30 p-3 md:p-5 rounded-lg shadow-lg mx-auto mt-10 text-center text-orange-800 max-w-xl">
          <h1 className="text-2xl md:text-4xl">How can we help, {user?.twitterUsername || user?.displayName || user?.email}?</h1>
          <p>This is an Ai powered tool generated by chatGPT API that can help answer any questions you may have, regarding this website or in general! Have fun!</p>
        </div>
        <div className="flex flex-col items-center pb-10 justify-between overflow-hidden">
          <div className="chat-container w-3/4 p-4 overflow-y-auto max-h-[50vh] mt-8">
            <ul className="list-none">
              {chatHistory.map((msg, index) => (
                <li key={`${msg.type}-${index}`} className={`flex ${msg.type === 'user' ? 'justify-start' : 'justify-end'} mb-2`}>
                  <span className={`inline-block rounded-lg px-6 py-4 break-words max-w-3/5 ${msg.type === 'user' ? 'bg-orange-500 text-white' : 'bg-green-300 text-black'}`}>
                    {msg.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <form onSubmit={handleQuestionSubmit} className="w-full flex justify-center mt-4">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="border rounded w-1/2 md:w-1/4 py-2 px-3"
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">
              Ask
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AskAi;

