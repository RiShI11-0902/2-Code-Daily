import React, { useEffect, useState } from 'react'
import "../App.css"
import Navbar from './Navbar'
import axios from 'axios'
import { Loader } from 'lucide-react'
import { time } from 'framer-motion'
import { Footer } from '../components/Footer'
const HomePage = () => {
    const [openForm, setopenForm] = useState(false)
    const [name, setName] = useState()
    const [suggestion, setSuggestion] = useState()
    const [message, setMessage] = useState()
    const [email, setEmail] = useState()
    const [loading, setLoading] = useState()
    const [duration, setduration] = useState(3000)

   
    ///https://two-code-daily.onrender.com
    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(false)
        }, duration);

        return () => clearInterval(timer)
    }, [duration])


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await axios.post("https://two-code-daily-1.onrender.com/user/email", { email })

            if (response.status == 200) {
                setMessage(response.data.message)
                setLoading(false)
            }
        } catch (error) {
            setMessage(error.data.message)
        }

    };

    return (
        <>
            <Navbar setopenForm={setopenForm} openForm={openForm} />

            <section id='herosection' className='bg-gradient-to-r from-[#070F2B] to-[#1B1A55] min-h-screen flex items-center justify-center px-4 -mt-10'>
                <div className='font-extrabold space-y-6 text-center'>
                    <h1 className='montserrat-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#9290C3]'>Practice LeetCode Like a Pro</h1>
                    <p className='text-base sm:text-lg md:text-2xl text-[#535C91]'>"Turn LeetCode problems into interactive mock interviews."</p>
                    <a
                        href="https://chromewebstore.google.com/detail/2-code-daily/eamejmihabhegokmlajmahmpgkfadphl"
                        target="_blank"
                        rel="noopener noreferrer"
                        className='inline-block mt-4 px-6 py-3 text-white bg-[#535C91] hover:bg-[#6b74b0] rounded-2xl text-lg font-semibold transition duration-300'
                    >
                        🚀 Get the Extension
                    </a>
                </div>
            </section>

            <section id="how-it-works" class="text-[#9290C3] py-16 text-center -mt-20 montserrat-heading">
                <div class="container mx-auto">
                    {/* <!-- Title --> */}
                    <h2 class="md:text-5xl text-4xl font-extrabold text-lavender mb-4">How It Works</h2>
                    <p class="text-[#535C91] mb-12">Get started in just 4 simple steps!</p>

                    {/* <!-- Steps --> */}
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* <!-- Step 1 --> */}
                        <div class="bg-deepPurple p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300">
                            <div class="flex items-center justify-center bg-slateBlue text-[#9290C3] w-12 h-12 rounded-full mx-auto mb-4 text-4xl">
                                1
                            </div>
                            <h3 class="text-lg font-bold text-lavender mb-2">Register Here</h3>
                            <p class="text-[#535C91]">Create an account to get started.</p>
                        </div>

                        {/* <!-- Step 2 --> */}
                        <div class="bg-deepPurple p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300">
                            <div class="flex items-center justify-center bg-slateBlue text-[#9290C3] w-12 h-12 rounded-full mx-auto mb-4 text-4xl">
                                2
                            </div>
                            <h3 class="text-lg font-bold text-lavender mb-2">Download Extension</h3>
                            <p class="text-[#535C91]">Install our browser extension.</p>
                        </div>

                        {/* <!-- Step 3 --> */}
                        <div class="bg-deepPurple p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300">
                            <div class="flex items-center justify-center bg-slateBlue text-[#9290C3] w-12 h-12 rounded-full mx-auto mb-4 text-4xl">
                                3
                            </div>
                            <h3 class="text-lg font-bold text-lavender mb-2">Enter Your Email in Extension</h3>
                            <p class="text-[#535C91]">Provide your email for Starting.</p>
                        </div>


                        <div class="bg-deepPurple p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300">
                            <div class="flex items-center justify-center bg-slateBlue text-[#9290C3] w-12 h-12 rounded-full mx-auto mb-4 text-4xl">
                                4
                            </div>
                            <h3 class="text-lg font-bold text-lavender mb-2">Start Interviewing</h3>
                            <p class="text-[#535C91]">Practice mock interviews with ease!</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id='free' className='mt-5 p-5'>
                <div className='montserrat-heading text-center flex flex-col sm:flex-row items-center sm:space-x-5 justify-center'>
                    <p className='text-8xl md:text-[10rem] font-extrabold text-[#9290C3]'>3</p>
                    <div className='text-[#535C91] text-2xl flex flex-col space-y-5 '>
                        <p>Mock Interview are Free on Registration</p>
                        {/* <button
                            onClick={SignIn}
                            className="flex montserrat-heading  items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 transition"
                        >
                            <AiOutlineGoogle className="w-5 h-5 mr-2" />
                            Sign in with Google
                        </button> */}
                    </div>
                </div>
            </section>


            <section id='pricing'>
                <div className=" text-white p-6 rounded-lg shadow-xl flex flex-col md:flex-row-reverse items-center w-full md:space-x-10 justify-center  mx-auto  overflow-hidden">
                    {/* Price Section */}
                    <div className=" text-[#9290C3] flex items-center justify-center w-full md:w-1/3 p-8">
                        <div className="text-center">
                            <h2 className=" text-8xl md:text-[10rem] font-extrabold text-[#9290C3] leading-none">₹250</h2>
                            <p className="text-lg text-[#535C91] mt-2">/ month Starter </p>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="text-[#9290C3] p-8 flex flex-col space-y-10 md:space-y-0">
                        <h3 className="text-4xl font-bold text-[#535C91] mb-4">What's Included:</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center">
                                <span className="text-[#9290C3] text-xl mr-2">✅</span>
                                Interviews without ADS
                            </li>
                            <li className="flex items-center">
                                <span className="text-[#9290C3] text-xl mr-2">✅</span>
                                AI-powered feedback
                            </li>
                            <li className="flex items-center">
                                <span className="text-[#9290C3] text-xl mr-2">✅</span>
                                AI-powered solutions
                            </li>
                            <li className="flex items-center">
                                <span className="text-[#9290C3] text-xl mr-2">✅</span>
                                Monthly updates
                            </li>
                        </ul>
                        {/* <button className=" bg-[#535C91] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-[#434B7B] transition duration-300 w-full md:w-auto mt-5" onClick={()=>handlePayment()}>
                            Pay Now
                        </button> */}
                    </div>
                </div>
            </section>

            {/* <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#070F2B] to-[#1B1A55] p-4">
                <div className=" shadow-lg rounded-xl p-6 max-w-md w-full">
                    <h2 className="text-2xl font-bold text-[#9290C3] mb-4 text-center">
                        Have any suggestions?
                    </h2>
                    <p className="text-[#9290C3] text-center mb-4">
                        We'd love to hear your thoughts on the extension or website. Any ideas to improve?
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Your Name (optional)"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 border border-[#535C91] bg-[#070F2B] text-white rounded-lg focus:ring-2 focus:ring-[#535C91] outline-none"
                        />
                        <textarea
                            placeholder="Share your suggestions..."
                            value={suggestion}
                            style={{ resize: 'none' }}
                            onChange={(e) => setSuggestion(e.target.value)}
                            className="w-full p-3 border border-[#535C91] bg-[#070F2B] text-white rounded-lg focus:ring-2 focus:ring-[#535C91] outline-none h-32"
                        />
                        <button
                            type="submit"
                            className="w-full bg-[#535C91] text-white font-bold py-2 rounded-lg hover:bg-[#9290C3] transition"
                        >
                            Submit
                        </button>
                        <p className='text-white font-semibold'>{message}</p>
                    </form>
                </div>
            </div> */}

<Footer />

        </>
    )
}

export default HomePage