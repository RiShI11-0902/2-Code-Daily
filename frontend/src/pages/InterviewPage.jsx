import React, { useEffect, useState } from 'react'
import useUserStore from '../store/store'
import QuestionDetails from '../components/QuestionDetails'
import QuestionBox from '../components/QuestionBox'
import axios from 'axios'
import { Loader } from 'lucide-react'

const InterviewPage = () => {

    const { user } = useUserStore()
    const [loading, setLoading] = useState()
    const [fetchedQuestion, setFetchedQuestion] = useState()
    const [showQuestion, setShowQuestion] = useState();
    const [error, setError] = useState()

    const getSolved = async () => {
        setLoading(true)
        try {
            const questions = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/user/solvedQuestions`, { id: user._id}) 
            setFetchedQuestion(questions.data.questions);  
                      
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error.data.message)
        }
    }

    useEffect(() => {

        getSolved()

    }, [])


    return (
        <>

        <div className='flex flex-col mt-5 space-y-3 h-screen'>
            { error && <p className='mt-10 text-red-500'>{error}</p>}
            {
             loading ? <Loader className=' animate-spin w-5 flex items-center justify-center ' /> :   fetchedQuestion?.slice().reverse().map((question, index) => (
                    <QuestionBox
                        key={index}
                        setShowQuestion={setShowQuestion}
                        question={question}
                        index={index}
                    />
                ))
            }
        </div>

            {/* Question Details Modal */}
            {showQuestion && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
                    <QuestionDetails question={showQuestion} setShowQuestion={setShowQuestion} />
                </div>
            )}
        </>
    )
}

export default InterviewPage