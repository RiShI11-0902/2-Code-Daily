import React, { useEffect, useState } from 'react'
import useSpeechToText from 'react-hook-speech-to-text';
import "./css files/Button.css"
import { FaMicrophone } from "react-icons/fa";
import { FaMicrophoneSlash } from "react-icons/fa";
import axios from 'axios';
import { handleSubmit } from './utils/storeEmail';

const RecordAnswer = ({ setQuestion, id, question, error, email, setIsPaused, setIsSpeaking }) => {

  const [editableText, setEditableText] = useState("")
  const [userCode, setUserCode] = useState()
  const [settingCode, setSettingCode] = useState(false)
  const [issubmitting, setisSubmitting] = useState(null)
  const [endInterview, setendInterview] = useState(false)
  const [userEmail, setUserEmail] = useState()
  const [loading, setLoading] = useState()
  const [correctNess, setCorrectNess] = useState()

  const {
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });
  const extractCode = (userCodes) => {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = userCodes

    const codeLines = document.querySelectorAll('.view-line')

    const code = Array.from(codeLines).map((line) => line.textContent).join("/n")
    return code
  }

  const setCode = () => {
    setSettingCode(true)

    setTimeout(() => {
      const codeGetter = document.querySelector('.view-lines')
      const userCode = extractCode(codeGetter?.innerHTML ?? " ")
      setUserCode(userCode)
      setSettingCode(false);
    }, 100);
  }


  const submitAnswer = async () => {
    setisSubmitting(true)
    const response = await axios.post("https://two-code-daily-1.onrender.com/getAnswer", { answer: editableText, id: id, question: question, code: userCode, email: email })
    if (response?.data?.question?.feedback) {
      setQuestion(response?.data?.question?.feedback)
      setCorrectNess(response?.data?.question?.correctness)
      setendInterview(true)
      setisSubmitting(false)
      setIsPaused(false)
      setIsSpeaking(false)
    } else {
      setQuestion(response?.data?.question?.next_question)
      setisSubmitting(false)
    }
  }

  useEffect(() => {
    if (results.length > 0) {
      const lastTranscript = results[results.length - 1].transcript
      setEditableText((prev) => prev + " " + lastTranscript)
    }
  }, [results])


  return (
    <>
      {!error ? (
        <p className="text-center">
          <p className='p-5'>{error.message}</p>
          {
            error.type == 'Website' ?
              <a
                href="https://2codedaily.com"
                target="_blank"
                rel="noopener noreferrer"
                className='mt-3'
              >
                <span className="text-blue-400 cursor-pointer text-sm mt-5 border border-white px-3 py-1 bg-blue-700 rounded ml-4">
                  Register here
                </span>
              </a> : <div className='flex flex-col space-y-4 mt-4 items-center justify-center'>
                <input
                  type="email"
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="Enter same email you entered on our website."
                  className="p-2 rounded-md text-sm bg-[#10194a] placeholder-[#ccc] text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  onClick={() => handleSubmit(userEmail, setLoading)}
                  className="bg-blue-600 hover:bg-blue-700 transition text-white p-2 rounded-md text-sm w-full sm:w-1/2"
                >
                  {loading ? "Registering..." : "Register Email"}
                </button>
              </div>
          }
        </p>
      ) : (
        <section className="flex flex-col items-center space-y-4 text-sm">
          {correctNess && <span className='text-green-500 p-2' style={{color:'green'}}> Correctness: {correctNess}%</span>}
          {/* Record Button */}
          <button
            id="recordBtn"
            className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            onClick={isRecording ? stopSpeechToText : startSpeechToText}
          >
            <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
            <span>{isRecording ? <FaMicrophoneSlash /> : <FaMicrophone />}</span>
          </button>

          {/* Textarea */}
          <textarea
            onChange={(e) => setEditableText(e.target.value)}
            value={editableText}
            rows="6"
            placeholder="Your answer..."
            className="w-full rounded p-3 bg-gray-900 text-white border border-gray-600 resize-none"
          ></textarea>

          {/* Action Buttons */}
          {!endInterview && (
            <div className="flex justify-between space-x-3 w-full">
              <button
                className="flex-1 py-2 px-3 border border-purple-300 text-purple-400 rounded hover:bg-purple-800"
                onClick={setCode}
              >
                {settingCode ? 'Attaching Code...' : 'Attach Code'}
              </button>
              <button
                className="flex-1 py-2 px-3 border border-blue-300 text-blue-400 rounded hover:bg-blue-800"
                onClick={submitAnswer}
              >
                {issubmitting ? 'Submitting...' : 'Submit Answer'}
              </button>
            </div>
          )}
        </section>
      )}
    </>
  )
}

export default RecordAnswer