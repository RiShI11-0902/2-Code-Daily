import React, { useEffect, useState } from 'react'
import axios from "axios"
import useUserStore from '../store/store'
const QuestionBox = ({ question, index, setToggle, id }) => {

    const [isSolved, setIsSolved] = useState(false)
    const [fetchedQuestion, setFetchedQuestion] = useState()

    const {solvedQ,addQuestions} = useUserStore()

    // console.log(id);



    const fetchquestion = async (id) => {
        console.log(id);

        try {
            const question = await axios.post("http://localhost:5000/auth/solvedQuestions", { id })
            console.log(question);
            setFetchedQuestion(question.data.question)

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        // console.log(id);
        if (id) {
            setIsSolved(true)
            fetchquestion(id)
        } else {
            setIsSolved(false)
        }
    }, [id])


    return (

        <div>
            {
                <div
                    key={index}
                    className="bg-[#9290C3] shadow-md hover:scale-105 transition-transform hover:bg-[#535C91] rounded-lg text-[#1B1A55] font-semibold text-lg md:text-xl flex flex-col md:flex-row justify-between items-center border border-[#6983de] p-5 space-y-4 md:space-y-0 md:space-x-7 cursor-pointer "
                    onClick={() => isSolved && setToggle(fetchedQuestion)}
                >
                    <p className="text-sm md:text-base">{`Q ${question?.id ? question.id : ""}`}</p>
                    <p className="text-base md:text-lg flex-1 text-center md:text-left">
                        {question?.title ? question?.title : fetchedQuestion?.problem.substring(44, 90) + "..."}
                    </p>


                    {
                        question?.id && <div className='flex space-x-3'>
                            <input type="checkbox" name="solved" onChange={()=>addQuestions(question.id)} />
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