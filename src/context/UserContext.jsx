import { createContext, useState } from "react";
import run from "../gemin";

export const dataContext = createContext();

// eslint-disable-next-line react/prop-types
const UserContext = ({ children }) => {
  let [speaking, setSpeaking] = useState(false);
  let [prompt, setPrompt] = useState("listening...");
  let [response, setResponse] = useState(false);

  function speak(text) {
    let text_speack = new SpeechSynthesisUtterance(text);
    text_speack.volume = 1;
    text_speack.rate = 1;
    text_speack.pitch = 1;
    text_speack.lang = "hi-GB";
    window.speechSynthesis.speak(text_speack);
  }
  async function aiResponse(prompt) {
    let text = await run(prompt);
    let newText =
      text.split("**") &&
      text.split("*");
    //   text.replace("google", "Souvagya") &&
    //   text.replace("Google", "Souvagya");
    setPrompt(newText);
    speak(text);
    setResponse(true);
    setTimeout(() => {
      setSpeaking(false);
    }, 3000);
  }

  let speechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new speechRecognition();
  recognition.onresult = (e) => {
    let currentIndex = e.resultIndex;
    let transcript = e.results[currentIndex][0].transcript;

    setPrompt(transcript);
    takeCommand(transcript.toLowerCase());
  };

  function takeCommand(command) {
    if (command.includes("open") && command.includes("youtube")) {
      window.open("http://www.youtube.com/", "_blank");
      speak("opening YouTube");
      setPrompt("Open YouTube...");
	  setResponse(true);
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else if (command.includes("open") && command.includes("google")) {
      window.open("http://www.google.com/", "_blank");
      speak("opening Google");
      setPrompt("Open Google...");
	  setResponse(true);
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else if (command.includes("open") && command.includes("instagram")) {
      window.open("http://www.instagram.com/", "_blank");
      speak("opening Instagram");
      setPrompt("Open Instagram...");
	  setResponse(true);
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else if (command.includes("time")) {
      let time = new Date().toLocaleString(undefined, {
        hour: "numeric",
        minute: "numeric",
      });
      speak(time);
	  setPrompt(time);
	  setResponse(true);
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else if (command.includes("date")) {
      let date = new Date().toLocaleString(undefined, {
        day: "numeric",
        month: "short",
      });
      speak(date);
	  setPrompt(date);
	  setResponse(true);
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else {
      aiResponse(command);
    }
  }

  let value = {
    recognition,
    speaking,
    setSpeaking,
    prompt,
    setPrompt,
    response,
    setResponse,
  };
  return (
    <div>
      <dataContext.Provider value={value}>{children}</dataContext.Provider>
    </div>
  );
};

export default UserContext;
