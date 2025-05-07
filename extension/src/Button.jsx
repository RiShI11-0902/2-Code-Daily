import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./css files/Button.css"
import RecordAnswer from './RecordAnswer';
import Draggable from 'react-draggable'
import { FaVolumeUp, FaPause, FaPlay } from 'react-icons/fa';
import { useSpeechSynthesis } from 'react-speech-kit';

const Button = () => {
  const [box, setBox] = useState(false)
  const [question, setQuestion] = useState("")
  const [interviewId, setInterviewId] = useState(null)
  const [error, setError] = useState({
    type: null,
    message: null,
  })
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState()
  const [isPaused, setIsPaused] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);


  const { speak, cancel, supported } = useSpeechSynthesis({
    onEnd: () => {
      setIsSpeaking(false);
      setIsPaused(false);
    },
  });


  const startInterView = async () => {
    const descriptionEle = document.querySelector('meta[name=description]')
    const problemState = descriptionEle?.getAttribute('content')


    setBox(true);

    chrome.runtime.sendMessage({ type: 'GET_EMAIL' }, async (response) => {
      if (response?.email) {
        setEmail(response.email);
        ///http://localhost:5000/  https://two-code-daily-1.onrender.com
        try {
          const sendInterviewProblem = await axios.post("https://two-code-daily-1.onrender.com/api/getProblem", {
            problem: problemState,
            email: response.email
          });

          setQuestion(sendInterviewProblem?.data?.interview?.questions[0]);
          setInterviewId(sendInterviewProblem?.data?.interview?._id);
          setLoading(false);
        } catch (error) {
          setError({
            message: error.response?.data?.message || 'Something Went Wrong',
            type: error.response?.data?.type
          });
          setLoading(false);
        }
      } else {
        setError({
          message: "We did not got your email please enter your email in Extension",
          type: 'Extension'
        });
        setLoading(false);
      }
    });
  };

  const getIcon = () => {
    if (isSpeaking && isPaused) return <FaPlay />;
    if (isSpeaking && !isPaused) return <FaPause />;
    return <FaVolumeUp />;
  };

  const clickSpeak = () => {
    const synth = window.speechSynthesis;

    if (isSpeaking && !isPaused) {
      synth.pause();
      setIsPaused(true);
    } else if (isSpeaking && isPaused) {
      synth.resume();
      setIsPaused(false);
    }
  };

  useEffect(() => {
    if (question) {
      window.speechSynthesis.cancel();
      speak({ text: question });
      setIsSpeaking(true);
      setIsPaused(false);
    }
  }, [question]);

  return (
    <>
      <div onClick={startInterView} style={{ backgroundColor: 'red', position: 'absolute', bottom: '10px', right: '10px', color: 'white' }} className="absolute bottom-10 right-10 bg-red-600 text-white font-semibold text-lg px-6 py-3 rounded-full shadow-lg cursor-pointer hover:bg-red-700 transform hover:scale-105 transition duration-300 z-40">
        Start Interview
      </div>

      {
        box ?

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
                setIsPaused={setIsPaused}
                setIsSpeaking={setIsSpeaking}
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
              <span>For any queires/suggestion email us at: contact2codedaily@gmail.com
              </span>
            </div>
          </Draggable>

          : ""
      }
    </>

  )
}

export default Button