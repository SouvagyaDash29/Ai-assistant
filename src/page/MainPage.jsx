import { CiMicrophoneOn } from "react-icons/ci";
import HumanAi from "../assets/ai.png";
import { useContext } from "react";
import { dataContext } from "../context/UserContext";
import speakImg from "../assets/speak.gif";
import aiImg from "../assets/aiVoice.gif";

const MainPage = () => {
  let { recognition, speaking, setSpeaking, prompt, setPrompt,response } =
    useContext(dataContext);

  return (
    <div className="h-screen bg-black flex flex-col items-center justify-start gap-7 pt-16">
      <img src={HumanAi} alt="" className="h-[65%] " />
      <span className="text-xl bg-gradient-to-r from-[#22DDE7] to-[#ED047D] bg-clip-text text-transparent">
        {` I'm`} Debian,Your Advance Virtual Assistant
      </span>
      {!speaking ? (
        <button
          onClick={() => {
            setPrompt("listening...")
            setSpeaking(true);
            recognition.start();
          }}
          className="w-44 h-10 flex justify-center items-center gap-5 text-lg rounded-full border-none bg-cyan-300 shadow-[3px_2px_38px_-5px_#00f6fa]"
        >
          Click here <CiMicrophoneOn />
        </button>
      ) : (
        <div className="flex flex-col justify-center items-center">
          {!response ? (
            <img src={speakImg} alt="" className="w-[100px]" />
          ) : (
            <img src={aiImg} alt="" className="w-[50vh] h-[100px]" />
          )}
          <p className="text-white text-lg">{prompt}</p>
        </div>
      )}
    </div>
  );
};

export default MainPage;
