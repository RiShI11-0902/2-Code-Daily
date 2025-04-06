import React, { useEffect, useState } from 'react'
import useSpeechToText from 'react-hook-speech-to-text';
import "./css files/Button.css"
import { FaMicrophone } from "react-icons/fa";
import { FaMicrophoneSlash } from "react-icons/fa";
import axios from 'axios';

const RecordAnswer = ({ setQuestion, id, question, error, email }) => {

    const [editableText, setEditableText] = useState("")
    const [userCode, setUserCode] = useState()
    const [settingCode, setSettingCode] = useState(false)
    const [issubmitting, setisSubmitting] = useState(null)
    const [endInterview, setendInterview] = useState(false)

    const {
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });
    console.log(error);

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
        const response = await axios.post("http://localhost:5000/api/getAnswer", { answer: editableText, id: id, question: question, code: userCode, email:email })
        if (response?.data?.question?.feedback) {
            alert(response?.data?.question?.feedback)
            setQuestion(response?.data?.question?.feedback)
            setendInterview(true)
            setisSubmitting(false)
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
            {
                error ? <p>{error} <a href='http://localhost:5173' target='_blank' className='' ><span className='text-blue-400 cursor-pointer text-lg border border-white p-2 bg-blue-700'>Register here</span>  </a></p> : <section>
                    <div className='w-fit mx-auto' >
                        {/* <h1>Recording: {isRecording.toString()}</h1> */}
                        <button id='recordBtn' className='flex flex-row space-x-5 items-center' onClick={isRecording ? stopSpeechToText : startSpeechToText}>
                            <p>{isRecording ? 'Stop Recording' : 'Start Recording'}</p>
                            <p>{isRecording ? <FaMicrophoneSlash /> : <FaMicrophone />}</p>
                        </button>

                    </div>
                    <div className='font-semibold text-center mt-5 p-2 text-lg text-white'>

                        <textarea style={{ color: 'white' }} onChange={(e) => setEditableText(e.target.value)} value={editableText} cols="60" rows="10" className='p-3'>
                        </textarea>

                    </div>

                    {
                        !endInterview && <div className='flex flex-row space-x-4'>
                            <button className='border-2 border-purple-300 text-blue-700 p-2 ' onClick={setCode}>
                                {
                                    settingCode ? "Attaching Code.." : "Attach Code"
                                }
                            </button>
                            <button className='border-2 border-purple-300 text-blue-700 p-2 ' onClick={submitAnswer}>
                                {
                                    issubmitting ? "Submitting.." : "Sumit Answer"
                                }
                            </button>
                        </div>
                    }


                </section>
            }

        </>


    )
}

export default RecordAnswer