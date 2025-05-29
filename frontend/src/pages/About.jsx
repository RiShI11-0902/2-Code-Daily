import React from 'react';
import Navbar from './Navbar';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const AboutUs = () => {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-stone-950  flex items-center justify-center p-6">
                <div className="w-full mt-20 max-w-6xl bg-white/5 backdrop-blur-md text-white rounded-2xl shadow-xl overflow-hidden border border-white/10">
                    {/* Hero Header */}
                    <div className="bg-stone-950/80 p-8 md:p-12 border-b border-white/10">
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                            About Us
                        </h2>
                        <p className="text-center text-lg text-blue-100 max-w-2xl mx-auto">
                            Empowering developers with AI-driven interview preparation tools
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="md:p-12 space-y-12">
                        {/* Mission & Vision + Extension Info in Two Columns */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Why I Created */}
                            <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg">
                                <div className="flex items-center mb-4">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">Why I Created This</h3>
                                </div>
                                <p className="text-blue-100 leading-relaxed">
                                    As a developer, I know that solving problems isn't just about writing code — it's also about how you think. In real interviews, your approach, reasoning, and communication matter just as much as the solution itself. That's why I built this extension: to help developers practice LeetCode-style questions in a realistic mock interview format that encourages both coding and clear explanation of thought process — all from right inside the browser, without distractions.
                                </p>
                            </div>

                            {/* My Mission */}
                            <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg">
                                <div className="flex items-center mb-4">
                                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-300" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">My Mission</h3>
                                </div>
                                <p className="text-blue-100 leading-relaxed">
                                    My mission is to make interview preparation smarter and more accessible for developers at all levels. By integrating AI-driven mock interviews directly into the browser, this extension helps you prepare efficiently with real LeetCode questions — no need to search, schedule, or stress. Just open it up and start practicing like it's the real thing.
                                </p>
                            </div>

                            {/* About the Extension */}
                            <div className="bg-stone-950/40 rounded-xl p-6 border border-white/10 md:col-span-2 hover:shadow-lg transition-all duration-300">
                                <h3 className="text-3xl font-semibold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300">About the Extension</h3>
                                <p className="text-blue-100 text-center max-w-4xl mx-auto leading-relaxed">
                                    This extension simulates AI-powered mock interviews based on real LeetCode questions. Whether you're preparing for tech interviews or just want to sharpen your coding skills under pressure, it provides realistic, interactive sessions that help you practice like it's the real thing. Simple, effective, and focused — it's the ultimate prep tool for aspiring developers.
                                </p>
                            </div>
                        </div>

                        {/* Developer Section */}
                        <div className="mt-12">
                            <h3 className="text-3xl font-semibold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">About the Developer</h3>
                            <div className="bg-white/5 p-8 rounded-xl border border-white/10 max-w-4xl mx-auto">
                                <div className="flex flex-col md:flex-row items-center gap-8">
                                    <div className="relative">
                                        <img
                                            src="/me.jpg"
                                            alt="Rushikesh Bagade"
                                            className="md:w-60 md:h-20 w-32 h-32 rounded-full border-4 border-white/20 shadow-lg object-cover"
                                        />
                                        <div className="absolute -bottom-2 -right-2 bg-blue-500/90 rounded-full p-2 shadow-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="text-center md:text-left">
                                        <h4 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">Rushikesh Bagade</h4>
                                        <p className="text-blue-300 mb-4">Founder & Developer</p>
                                        <p className="text-blue-100 leading-relaxed mb-6">
                                            I'm a passionate software developer who loves solving problems and building things that help others. This extension is a result of my own experiences as a coder, and I hope it helps you in your coding journey as much as it has helped me!
                                        </p>
                                        <div className="flex justify-center md:justify-start gap-4">
                                            <a
                                                href="https://www.linkedin.com/in/rushikesh-bagade11"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-100 hover:text-blue-600 transition-colors duration-300"
                                                aria-label="LinkedIn"
                                            >
                                                <FaLinkedin className="w-6 h-6" />
                                            </a>
                                            <a
                                                href="https://github.com/RiShI11-0902"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-100 hover:text-blue-600 transition-colors duration-300"
                                                aria-label="GitHub"
                                            >
                                                <FaGithub className="w-6 h-6" />
                                            </a>
                                            <a
                                                href="https://www.instagram.com/rishi_codes"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-100 hover:text-blue-600  transition-colors duration-300"
                                                aria-label="Instagram"
                                            >
                                                <FaInstagram className="w-6 h-6" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutUs;