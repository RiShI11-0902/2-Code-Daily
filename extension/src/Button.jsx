import React, { useState } from 'react'
import axios from 'axios'
import "./css files/Button.css"
import RecordAnswer from './RecordAnswer';
import Draggable from 'react-draggable'

const Button = () => {
  console.log("computed");

  const [box, setBox] = useState(false)
  const [question, setQuestion] = useState("")
  const [interviewId, setInterviewId] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState()


  const startInterView = async () => {
    const descriptionEle = document.querySelector('meta[name=description]')
    const problemState = descriptionEle?.getAttribute('content')
    const userEmail = await chrome.storage.local.get('email')
    setEmail(userEmail)

    setBox(true)
    try {
      const sendInterviewProblem = await axios.post("http://localhost:5000/api/getProblem", { problem: problemState, email: userEmail?.email })
      setQuestion(sendInterviewProblem?.data?.interview?.questions[0])
      setInterviewId(sendInterviewProblem?.data?.interview?._id)
      setLoading(false)
    } catch (error) {
      setError(error.response.data.message)
      setLoading(false)
    }
  }


  return (
    <>
      <div onClick={startInterView} style={{ backgroundColor: 'red', position: 'absolute', bottom: '10px', right: '10px', color: 'white' }} className="absolute bottom-10 right-10 bg-red-600 text-white font-semibold text-lg px-6 py-3 rounded-full shadow-lg cursor-pointer hover:bg-red-700 transform hover:scale-105 transition duration-300 z-40">
        Start Interview
      </div>

      {
        box ? <Draggable className='bg-black'>
          <div style={{ padding: '10px 10px 50px 5px', height: '100vh', width: '45%', cursor: "move", position: 'absolute', top: '2.5rem', left: '0px' }} className=' convoBox bg-black  fixed top-10 left-0 text-white w-[45%] max-h-screen p-10   '>
            <div className="text-lg font-bold fixed bottom-20 border border-white p-2 right-0 bg-red-600 cursor-pointer " onClick={()=>{
              setBox(false)
              setError(null)
              setLoading(true)
            }}>
              Close Interview
            </div>

            <p className='font-semibold mt-9 text-white text-lg p-5 '>{loading ? "Loading...." : question}</p>

            <p className='text-lg p-5 '><RecordAnswer loading={loading} setLoading={setLoading} id={interviewId} setQuestion={setQuestion} question={question} error={error} email={email} /></p>

          </div>
        </Draggable> : ""
      }
    </>

  )
}

export default Button