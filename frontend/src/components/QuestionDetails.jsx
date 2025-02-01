import React from 'react'
import { X } from 'lucide-react'
import { useState } from 'react';
const QuestionDetails = ({ question, setToggle }) => {
    console.log(question);

    const [activeIndex, setActiveIndex] = useState()

    const toggle = (index) => {
        setActiveIndex((prevIndex) => prevIndex == index ? null : index)
    }

    return (
        <>
            <section className='bg-black text-white min-w-full h-screen z-10 bg-opacity-75 absolute top-0 left-0'>
                <div className='p-5 flex justify-end '>

                    <button
                        onClick={() => setToggle(null)}
                        className="p-2 rounded-full bg-red-500 hover:bg-[#070F2B] text-white "
                    >

                        <X className="w-5 h-5" />
                    </button>
                </div>




                <div className='p-5 text-left '>
                    <div className='cursor-pointer'>
                        <div className='text-left p-5 mt-10'>
                            <p><span className='text-2xl text-[#adbef9]'>Question:</span> {question.problem}</p>
                        </div>

                        {
                            question?.questions?.map((q, index) => {
                                return <div className='border border-blue-300 p-5 mt-5 rounded-3xl transition-transform '>


                                    <div className=' flex flex-row justify-between rounded-lg' onClick={() => toggle(index)}>
                                        <p>Q{index + 1} {q}</p>
                                        <span>
                                            {activeIndex === index ? "▲" : "▼"}
                                        </span>
                                    </div>

                                    {
                                        activeIndex == index && (<div>
                                            <p> <span  className='text-2xl text-[#adbef9]'>Answer:</span> {question.answers[index]}</p>
                                        </div>)
                                    }

                                </div>


                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default QuestionDetails