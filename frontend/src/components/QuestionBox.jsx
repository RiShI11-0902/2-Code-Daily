import React, { useEffect, useState } from 'react'
import axios from "axios"
import useUserStore from '../store/store'
import { FiLoader } from "react-icons/fi";

const QuestionBox = ({ question, index, setShowQuestion, id }) => {

    const [isSolved, setIsSolved] = useState(false)
    const [loading, setLoading] = useState()
    const { addQuestions, solvedQ } = useUserStore()

    useEffect(() => {
        if (id && solvedQ.includes(id)) {
            setIsSolved(true);
        } else {
            setIsSolved(false);
        }
    }, [id, solvedQ])

    return (
        <div>
            {
                <div
                    key={index}
                    className="bg-[#9290C3] shadow-md hover:scale-105 transition-transform hover:bg-[#535C91] rounded-lg text-[#1B1A55] font-semibold text-lg md:text-xl flex flex-col md:flex-row justify-between items-center border border-[#6983de] p-5 space-y-4 md:space-y-0 md:space-x-7 cursor-pointer "
                    onClick={() => !isSolved && setShowQuestion(question)}
                >
                    <p className="text-sm md:text-base">{index + 1 + ")"}</p>
                    <p className="text-base md:text-lg flex-1 text-center md:text-left">
                        {
                            question?.title ? question?.title :
                                (loading ? <FiLoader className="animate-spin w-20 text-purple-900 flex items-center justify-center " /> : question?.problem.substring(44, 90) + "...")
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