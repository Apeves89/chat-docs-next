"use client";
import { useState } from "react";

export default function Chat({ sidebarOpen, DocLoading }) {
  const [answerLoading, setAnswerLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const handleChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (question) {
      try {
        setAnswerLoading(true);
        const data = new FormData();
        data.append("question", question);
        const response = await fetch("http://localhost:8000/chat/", {
          method: "POST",
          body: data,
        });
        const responseData = await response.json();
        setMessages(responseData.messages);
      } catch (error) {
        console.log(error);
      } finally {
        setAnswerLoading(false);
      }
    } else {
      console.log("no question");
    }
  };

  return (
    <div
      className={` w-7/12 ${
        sidebarOpen ? "ml-[400px]" : null
      } ease-in-out duration-500`}
    >
      <div className="w-full px-5 flex flex-col justify-between">
        <form onSubmit={handleSubmit}>
          <div className="py-5  h-[10vh]">
            <input
              className={`w-full ${
                DocLoading ? "bg-gray-600" : "bg-gray-300"
              } py-5 px-3 rounded-xl`}
              type="text"
              placeholder="Ask a question about your documents..."
              onChange={handleChange}
              disabled={DocLoading}
            />
          </div>
        </form>

        {answerLoading ? (
          <div className="flex mt-5 h-[82vh] justify-center items-center">
            <div className="text-3xl text-white animate-bounce">Loading...</div>
          </div>
        ) : (
          <div className="flex flex-col mt-5 py-5 px-3 rounded-xl bg-slate-900 h-[82vh] overflow-y-scroll">
            {messages.map((message, i) =>
              i % 2 === 0 ? (
                <div className="flex justify-start items-center mb-4">
                  <img
                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                  />
                  <div className="ml-2 py-3 px-4  rounded-br-3xl rounded-tr-3xl  text-white">
                    {message}
                  </div>
                </div>
              ) : (
                <div className="flex justify-end items-center mb-4">
                  <div className="mr-2 py-3 px-4  rounded-bl-3xl rounded-tl-3xl text-white">
                    {message}
                  </div>
                  <img
                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                  />
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
