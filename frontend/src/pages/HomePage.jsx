import React, { useState } from 'react'
import "../App.css"
import Navbar from './Navbar'
import { AiOutlineGoogle } from 'react-icons/ai'
import axios from 'axios'
const HomePage = () => {
    const [openForm, setopenForm] = useState(false)

    const SignIn = () => {
        window.open("http://localhost:5000/auth/google/callback", "_self ")
    }

    const handlePayment = async ()=>{

        const data = await axios.post("http://localhost:5000/user/checkout", {amount: 1000})

        console.log(data);
        
    }

    return (
        <>
            <Navbar SignIn={SignIn} setopenForm={setopenForm} openForm={openForm} />
            <section id='herosection' className=' bg-gradient-to-r from-[#070F2B] to-[#1B1A55] h-screen flex items-center justify-center'>
                <div className='   font-extrabold space-y-6 text-center items-center'>
                    <h1 className='montserrat-heading text-6xl p-1 md:text-7xl text-[#9290C3] '>Practice LeetCode Like a Pro</h1>
                    <p className='text-2xl montserrat-heading text-[#535C91]'>"Turn LeetCode problems into interactive mock interviews."</p>
                    <div className='flex flex-row items-center justify-center space-x-5'>
                        <button className="bg-[#6983de] text-white py-2 px-6 rounded-lg hover:bg-[#1B1A55] hover:scale-105 transition duration-300 ease-in-out shadow-md transform">
                            How it Works
                        </button>

                        <button className="bg-[#adbef9] text-black py-2 px-6 rounded-lg hover:bg-[#1B1A55] hover:text-white hover:scale-105 transition duration-300 ease-in-out shadow-md transform ml-4">
                            Get Extension
                        </button>
                    </div>
                </div>
            </section>
            <section id="how-it-works" class="text-[#9290C3] py-16 text-center -mt-20 montserrat-heading">
                <div class="container mx-auto">
                    {/* <!-- Title --> */}
                    <h2 class="text-5xl font-extrabold text-lavender mb-4">How It Works</h2>
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
                            <h3 class="text-lg font-bold text-lavender mb-2">Enter Your Email</h3>
                            <p class="text-[#535C91]">Provide your email for updates.</p>
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
                    <p className='text-[15rem] font-extrabold text-[#9290C3]'>3</p>
                    <div className='text-[#535C91] text-2xl flex flex-col space-y-5 '>
                        <p>Mock Interview are Free on Registration</p>
                        <button
                            onClick={SignIn}
                            className="flex montserrat-heading  items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 transition"
                        >
                            <AiOutlineGoogle className="w-5 h-5 mr-2" />
                            Sign in with Google
                        </button>
                    </div>
                </div>
            </section>

            {/* <section id="free" className="mt-5 p-5">
                <div className="montserrat-heading text-center flex flex-col sm:flex-row items-center sm:space-x-5 justify-center">
                    <p className="text-[15rem] font-extrabold text-[#9290C3]">All</p>
                    <div className="text-[#535C91] text-2xl flex flex-col space-y-5">
                        <p> Interviews are Free but with Ads</p>
                        <button
                            onClick={SignIn}
                            className="flex montserrat-heading items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 transition"
                        >
                            <AiOutlineGoogle className="w-5 h-5 mr-2" />
                            Sign in with Google
                        </button>
                    </div>
                </div>
            </section> */}


            <section id='pricing'>
                <div className=" text-white p-6 rounded-lg shadow-xl flex flex-col md:flex-row-reverse items-center w-full md:space-x-10 justify-center  mx-auto  overflow-hidden">
                    {/* Price Section */}
                    <div className=" text-[#9290C3] flex items-center justify-center w-full md:w-1/3 p-8">
                        <div className="text-center">
                            <h2 className="text-[12rem] font-extrabold text-[#9290C3] leading-none">$10</h2>
                            <p className="text-lg text-[#535C91] mt-2">/ month</p>
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
                        <button className=" bg-[#535C91] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-[#434B7B] transition duration-300 w-full md:w-auto" onClick={handlePayment}>
                            Pay Now
                        </button>
                    </div>
                </div>
            </section>

            <footer class="bg-gradient-to-r  from-[#070F2B] to-[#1B1A55] montserrat-heading text-white py-8 text-lavender  shadow-2xl shadow-[#a9a8d8]">
                <div class="container mx-auto px-4">
                    <div class="flex flex-col md:flex-row md:justify-around mb-8">
                        <div class="text-center md:text-left">
                            <h2 class="text-2xl font-bold mb-4 text-[#9290C3]">2Code Daily</h2>
                            <p class="text-[#535C91] ">
                                Practice LeetCode problems like a pro. Turn coding challenges into interactive mock interviews.
                            </p>
                        </div>

                        <div class="text-center">
                            <h3 class="text-xl font-semibold mb-4 text-[#9290C3]">Quick Links</h3>
                            <ul class="space-y-2 text-[#535C91] ">
                                <li>
                                    <a href="#home" class="text-[#535C91] hover:text-lavender transition">Home</a>
                                </li>
                                <li>
                                    <a href="#about" class="text-[#535C91] hover:text-lavender transition">Pricing</a>
                                </li>
                                <li>
                                    <a href="#contact" class="text-[#535C91] hover:text-lavender transition">Contact</a>
                                </li>
                            </ul>
                        </div>

                        <div class="text-center md:text-right">
                            <h3 class="text-xl font-semibold mb-4 text-[#9290C3]">Contact Us</h3>
                            <p class="text-[#535C91]">Email: <a href="mailto:support@2codedaily.com" class="hover:text-lavender transition">support@2codedaily.com</a></p>
                            <p class="text-[#535C91]">Phone: <a href="tel:+1234567890" class="hover:text-lavender transition">+1 234 567 890</a></p>
                            <div class="flex justify-center md:justify-end mt-4 space-x-4">
                                <a href="#" class="text-[#535C91] hover:text-lavender transition">
                                    <i class="fab fa-facebook"></i>
                                </a>
                                <a href="#" class="text-[#535C91] hover:text-lavender transition">
                                    <i class="fab fa-twitter"></i>
                                </a>
                                <a href="#" class="text-[#535C91] hover:text-lavender transition">
                                    <i class="fab fa-linkedin"></i>
                                </a>
                                <a href="#" class="text-[#535C91] hover:text-lavender transition">
                                    <i class="fab fa-github"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class=" pt-4 text-center">
                        <p class="text-sm text-[#535C91]">
                            © 2025 2Code Daily. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>

        </>
    )
}

export default HomePage