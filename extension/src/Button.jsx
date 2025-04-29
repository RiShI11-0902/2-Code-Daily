import React, { useState } from 'react'
import axios from 'axios'
import "./css files/Button.css"
import RecordAnswer from './RecordAnswer';
import Draggable from 'react-draggable'
import { FaVolumeUp, FaPause, FaPlay } from 'react-icons/fa';
import { useSpeechSynthesis } from 'react-speech-kit';

const Button = () => {
  console.log("computed");

  const [box, setBox] = useState(false)
  const [question, setQuestion] = useState("")
  const [interviewId, setInterviewId] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState()
  const [isPaused, setIsPaused] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);


  // const startInterView = async () => {
  //   const descriptionEle = document.querySelector('meta[name=description]')
  //   const problemState = descriptionEle?.getAttribute('content')
  //   console.log(chrome);

  //   // const userEmail = await chrome?.storage?.local?.get('email')
  //    chrome.runtime.sendMessage({ type: 'GET_EMAIL' }, (response) => {
  //     if (response?.email) {
  //       setEmail(response.email);
  //     }
  //   });
  //   // setEmail(userEmail)

  //   setBox(true)
  //   try {
  //     const sendInterviewProblem = await axios.post("http://localhost:5000/api/getProblem", { problem: problemState, email: userEmail?.email })
  //     setQuestion(sendInterviewProblem?.data?.interview?.questions[0])
  //     setInterviewId(sendInterviewProblem?.data?.interview?._id)
  //     setLoading(false)
  //   } catch (error) {
  //     setError(error.response.data.message)
  //     setLoading(false)
  //   }
  // }

  // const { speak } = useSpeechSynthesis();

  const { speak, cancel, supported } = useSpeechSynthesis({
    onEnd: () => {
      setIsSpeaking(false);
      setIsPaused(false);
    },
  });


  const startInterView = async () => {
    const descriptionEle = document.querySelector('meta[name=description]')
    const problemState = descriptionEle?.getAttribute('content')
    console.log(chrome);

    setBox(true);

    chrome.runtime.sendMessage({ type: 'GET_EMAIL' }, async (response) => {
      if (response?.email) {
        setEmail(response.email);
///http://localhost:5000/  https://two-code-daily-1.onrender.com
        try {
          const sendInterviewProblem = await axios.post("http://localhost:5000/api/getProblem", {
            problem: problemState,
            email: response.email
          });

          setQuestion(sendInterviewProblem?.data?.interview?.questions[0]);
          setInterviewId(sendInterviewProblem?.data?.interview?._id);
          setLoading(false);
        } catch (error) {
          setError(error.response?.data?.message || "Something went wrong");
          setLoading(false);
        }
      } else {
        setError("Email not found");
        setLoading(false);
      }
    });
  };

  const getIcon = () => {
    if (isSpeaking && isPaused) return <FaPlay />;
    if (isSpeaking && !isPaused) return <FaPause />;
    return <FaVolumeUp />;
  };

  // const clickSpeak = () => {
  //   // TextToSpeech.talk(question);
  //   speak({ text: question })
  // }

  const clickSpeak = () => {
    if (isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    } else if (isSpeaking && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      speak({ text: question });
      setIsSpeaking(true);
      setIsPaused(false);
    }
  };

  return (
    <>
      <div onClick={startInterView} style={{ backgroundColor: 'red', position: 'absolute', bottom: '10px', right: '10px', color: 'white' }} className="absolute bottom-10 right-10 bg-red-600 text-white font-semibold text-lg px-6 py-3 rounded-full shadow-lg cursor-pointer hover:bg-red-700 transform hover:scale-105 transition duration-300 z-40">
        Start Interview
      </div>

      {
        box ?

        //  <Draggable className='bg-black'>
        //   <div style={{ padding: '10px 10px 50px 5px', height: 'fit-content', width: '45%', cursor: "move", position: 'absolute', top: '2.5rem', left: '0px' }} className=' convoBox bg-black  fixed top-10 left-0 text-white w-[45%] max-h-screen p-10   '>
        //     <button className="text-lg font-bold fixed bottom-20 border border-white p-2 right-0  cursor-pointer rounded-lg " onClick={() => {
        //       setBox(false)
        //       setError(null)
        //       setLoading(true)
        //       setQuestion("")
        //     }}>
        //       Close Interview
        //     </button>

        //     <div className='font-semibold mt-9 text-white text-lg p-5 '>
        //       <p>{loading ? "Loading...." : question} <button className='ml-2' onClick={clickSpeak}>
        //         {getIcon()}
        //       </button></p>
        //     </div>

        //     <p className='text-lg p-5 '><RecordAnswer loading={loading} setLoading={setLoading} id={interviewId} setQuestion={setQuestion} question={question} error={error} email={email} /></p>

        //   </div>
        // </Draggable> 

        <Draggable handle=".handle">
  <div
    style={{
      width: '400px',
      padding: '20px',
      borderRadius: '12px',
      position: 'fixed',
      top: '20%',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#111',
      zIndex: 1000,
      boxShadow: '0 0 20px rgba(0,0,0,0.5)',
    }}
    className="text-white"
  >
    <div className="handle cursor-move text-center font-bold text-xl mb-4">Interview</div>

    <div className="mb-4">
      <p>
        {loading ? 'Loading...' : question}
        <button className="ml-2" onClick={clickSpeak}>
          {getIcon()}
        </button>
      </p>
    </div>

    <RecordAnswer
      loading={loading}
      setLoading={setLoading}
      id={interviewId}
      setQuestion={setQuestion}
      question={question}
      error={error}
      email={email}
    />

    <button
      onClick={() => {
        setBox(false);
        setError(null);
        setLoading(true);
        setQuestion('');
      }}
      className="mt-6 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg w-full font-semibold"
    >
      Close Interview
    </button>
  </div>
</Draggable>

        : ""
      }
    </>

  )
}

export default Button