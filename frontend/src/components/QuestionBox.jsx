import React, { useEffect, useState } from 'react'
import axios from "axios"
import useUserStore from '../store/store'
import { FiLoader } from "react-icons/fi";

const QuestionBox = ({ question, index, setToggle, id }) => {

    const [isSolved, setIsSolved] = useState(false)
    const [loading, setLoading] = useState()
    const [fetchedQuestion, setFetchedQuestion] = useState()
    const { user, solvedQ, addQuestions } = useUserStore()

    const fetchquestion = async (id) => {
        console.log(id);
        setLoading(true)
        try {
            const question = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/user/solvedQuestions`, { id })
            console.log(question);
            setFetchedQuestion(question.data.question)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    // const addQuestions = async (id) => {
    //     try {
    //         const res = axios.post("/checked-question", { qId: id, userId: user._id })

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    useEffect(() => {
        // console.log(id);
        if (question?.id && solvedQ.includes(question.id)) {
            setIsSolved(true);
            fetchquestion(question.id);
        } else {
            setIsSolved(false);
        }
    }, [question?.id, solvedQ])
    ////`Q ${question?.id ? question.id : ""}`
    return (
        <div>
            {
                <div
                    key={index}
                    className="bg-[#9290C3] shadow-md hover:scale-105 transition-transform hover:bg-[#535C91] rounded-lg text-[#1B1A55] font-semibold text-lg md:text-xl flex flex-col md:flex-row justify-between items-center border border-[#6983de] p-5 space-y-4 md:space-y-0 md:space-x-7 cursor-pointer "
                    onClick={() => isSolved && setToggle(fetchedQuestion)}
                >
                    <p className="text-sm md:text-base">{index + 1 + ")"}</p>
                    <p className="text-base md:text-lg flex-1 text-center md:text-left">
                        {
                            question?.title ? question?.title :
                                (loading ? <FiLoader className="animate-spin w-20 text-purple-900 flex items-center justify-center " /> : fetchedQuestion?.problem.substring(44, 90) + "...")
                        }
                    </p>

                    {
                        question?.id && <div className='flex space-x-3'>
                            <input type="checkbox" name="solved" checked={isSolved} onChange={() => addQuestions(question.id)} />
                            <a
                                href={question?.url ? question?.url : ""}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white bg-[#1B1A55] hover:bg-[#5a74c9] px-4 py-2 rounded-lg text-sm md:text-base"
                            >
                                Solve
                            </a>
                        </div>
                    }
                </div>
            }
        </div>


    )
}

export default QuestionBox