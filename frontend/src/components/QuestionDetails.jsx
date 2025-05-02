import React, { useState } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";

const QuestionDetails = ({ question, setShowQuestion }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggle = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <section className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center p-4 overflow-y-auto ">
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#070F2B] w-full max-w-2xl sm:max-w-lg md:max-w-4xl p-6 rounded-lg shadow-lg text-white 
      relative max-h-[90vh] overflow-y-auto">

                        {/* Close Button */}
                        <button
                            onClick={() => setShowQuestion(null)}
                            className="absolute top-3 right-3 p-2 rounded-full bg-red-500 hover:bg-red-700 transition duration-300"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Question Section */}
                        <div className="p-4 border border-white rounded-lg">
                            <p className="break-words text-lg sm:text-sm">
                                <span className="text-sm md:text-lg sm:text-xl text-[#adbef9] font-semibold">Question:</span>{" "}
                                <span className="text-sm md:text-lg">{question.problem}</span>
                            </p>
                            {/* Correctness */}
                            <p className="text-green-400 mt-2 text-sm">
                                <span className="font-semibold">Correctness:</span> {question.correctness}
                            </p>
                            {/* Feedback */}
                            <p className="text-gray-300 mt-2 text-sm">
                                <span className="font-semibold">Feedback:</span> {question.feedback}
                            </p>
                        </div>

                        {/* Questions List */}
                        {question?.questions?.map((q, index) => (
                            <motion.div
                                key={index}
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className="border border-blue-300 p-4 sm:p-3 mt-5 rounded-lg bg-[#10193a]"
                            >
                                <div
                                    className="flex justify-between items-center cursor-pointer py-2"
                                    onClick={() => toggle(index)}
                                >
                                    <p className="text-sm sm:text-base font-semibold">Q{index + 1}. {q}</p>
                                    <span className="text-xl">{activeIndex === index ? "▲" : "▼"}</span>
                                </div>

                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="mt-3 text-gray-300 text-sm"
                                    >
                                        <p>
                                            <span className="text-xl sm:text-lg text-[#adbef9] font-semibold">Answer:</span>{" "}
                                            {question.answers[index]}
                                        </p>
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>

        </section>
    );
};

export default QuestionDetails;
