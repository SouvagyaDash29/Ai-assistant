import { createContext, useState } from 'react';
import run from '../gemin';
export const dataContext = createContext()

// eslint-disable-next-line react/prop-types
const UserContext = ({ children }) => {

	let [speaking, setSpeaking] = useState(false);
	let [prompt, setPrompt] = useState("listening...");
	let [response, setResponse] = useState(false);

	function speak(text){
		let text_speack = new SpeechSynthesisUtterance(text)
		text_speack.volume=1;
		text_speack.rate=1;
		text_speack.pitch=1;
		text_speack.lang="hi-GB"
		window.speechSynthesis.speak(text_speack)
	}
	async function aiResponse(prompt) {
		let text = await run(prompt);
		setPrompt(text);
		speak(text);
		setResponse(true);
		setTimeout(() => {
			setSpeaking(false);	
		}, 3000);
		
	}

	
	let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
	let recognition = new speechRecognition();
	recognition.onresult = (e) => {
		let currentIndex = e.resultIndex
		let transcript = e.results[currentIndex][0].transcript

		setPrompt(transcript)
		aiResponse(transcript)
	  };
	
	let value = {
		recognition,
		speaking,
		setSpeaking,
		prompt,
		setPrompt,
		response
	}
  return (
	<div>
		<dataContext.Provider value={value}>
			{children}
		</dataContext.Provider>
	</div>
  )
}

export default UserContext