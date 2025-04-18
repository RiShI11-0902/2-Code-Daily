import React, { useEffect, useState } from 'react'
import useUserStore from '../store/store'
import QuestionDetails from '../components/QuestionDetails'
import QuestionBox from '../components/QuestionBox'
import axios from 'axios'

const InterviewPage = () => {

    const { user } = useUserStore()
    const [loading, setLoading] = useState()
    const [fetchedQuestion, setFetchedQuestion] = useState()
    const [showQuestion, setShowQuestion] = useState();

    const getSolved = async () => {
        setLoading(true)
        try {
            const questions = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/user/solvedQuestions`, { id: user._id}) /////68007fcf588386c12c02f0cf   
            setFetchedQuestion(questions.data.questions.solvedQuestions);  
            console.log(questions.data.questions.solvedQuestions);
                      
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    useEffect(() => {

        getSolved()

    }, [])


    return (
        <>
            {
                fetchedQuestion?.slice().reverse().map((question, index) => (
                    <QuestionBox
                        key={index}
                        setShowQuestion={setShowQuestion}
                        question={question}
                        index={index}
                    />
                ))
            }

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