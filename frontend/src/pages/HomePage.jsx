import { useEffect, useState } from 'react';
import "../App.css";
import Navbar from './Navbar';
import axios from 'axios';
import { Footer } from '../components/Footer';
import { ArrowBigDown, MoveDown } from 'lucide-react';

const HomePage = () => {
    const [openForm, setopenForm] = useState(false);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [duration] = useState(3000);

    useEffect(() => {
        const timer = setTimeout(() => setMessage(null), duration);
        return () => clearTimeout(timer);
    }, [duration]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("https://two-code-daily-1.onrender.com/user/email", { email });
            if (response.status === 200) {
                setMessage(response.data.message);
            }
        } catch (error) {
            setMessage(error?.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar setopenForm={setopenForm} openForm={openForm} />

            {/* Hero Section */}
            <section className="bg-stone-950 min-h-screen flex items-center justify-center">
                <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-10 p-8 rounded-xl">
                    <div className="text-left space-y-6 max-w-xl">
                        <h1 className="montserrat-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#9290C3]">
                            Practice LeetCode Like a Pro
                        </h1>
                        <p className="text-[#535C91] text-base sm:text-lg md:text-lg">
                            Instant mock interviews on LeetCode questions, guided by AI.
                            Prep like you're sitting across the table—every single time.
                        </p>
                        <a
                            href="https://chromewebstore.google.com/detail/2-code-daily/eamejmihabhegokmlajmahmpgkfadphl"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-6 py-3 bg-[#535C91] text-white rounded-2xl text-lg font-semibold hover:bg-[#6b74b0] transition"
                        >
                            🚀 Get the Extension
                        </a>
                    </div>

                    {/* Image only on tablets and larger */}
                    <div className="hidden sm:block">
                        <img
                            src="/fullbox.png"
                            alt="Extension preview"
                            className="w-[20rem] md:w-[25rem] lg:w-[30rem] object-contain"
                        />
                    </div>
                </div>

            </section>
            <MoveDown className='text-[#9290C3] w-fit mx-auto relative bottom-24 animate-bounce' />


            <section className="bg-stone-950 py-16 px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-[#9290C3] mb-8">
                    🎥 Watch the Extension in Action
                </h2>
                <div className="w-full max-w-5xl mx-auto aspect-video rounded-xl overflow-hidden shadow-lg">
                    <iframe
                        src="https://www.youtube.com/embed/iHuH_gbDvng?start=7&autoplay=1&mute=1"
                        title="Preplaced AI Chrome Extension Demo"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                    ></iframe>
                </div>
            </section>



            {/* How It Works */}
            <section className="text-[#9290C3] py-16 text-center montserrat-heading">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4">How It Works</h2>
                    <p className="text-[#535C91] mb-12">Get started in just 4 simple steps!</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {["Register Here", "Download Extension", "Enter Your Email", "Start Interviewing"].map((step, i) => (
                            <div key={i} className="bg-stone-950 shadow-gray-700 p-6 rounded-lg shadow-sm hover:shadow-2xl transform hover:-translate-y-2 transition">
                                <div className="w-12 h-12 text-2xl font-bold bg-[#535C91] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                                    {i + 1}
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{step}</h3>
                                <p className="text-[#9290C3]">
                                    {
                                        ["Create an account to get started.", "Install our browser extension.",
                                            "Provide your email for starting.", "Practice mock interviews with ease!"][i]
                                    }
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-stone-950 py-16 px-6 text-center text-[#9290C3]">
                {/* Header */}
                <div className="mb-16">
                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-6">
                        <p className="text-8xl md:text-[10rem] font-extrabold text-[#9290C3]">3</p>
                        <p className="text-2xl text-[#535C91] font-medium">
                            Mock Interviews are Free on Registration
                        </p>
                    </div>
                    <p className="mt-4 text-lg text-[#535C91]">Get started instantly. No credit card needed.</p>
                </div>

                {/* Pricing Plans */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Plan Card */}
                    {[
                        {
                            name: 'Starter',
                            price: 250,
                            interviews: '20 Mock Interviews',
                            description: 'Perfect for beginners who want steady progress.',
                        },
                        {
                            name: 'Pro',
                            price: 500,
                            interviews: '50 Mock Interviews',
                            description: 'Best for consistent daily learners.',
                        },
                        {
                            name: 'Elite',
                            price: 1000,
                            interviews: '100 Mock Interviews',
                            description: 'Ideal for hardcore DSA grinders.',
                        },
                    ].map((plan, index) => (
                        <div
                            key={index}
                            className="bg-[#1c1b29] rounded-xl shadow-lg p-8 flex flex-col justify-between text-left"
                        >
                            <div>
                                <h3 className="text-3xl font-bold text-[#9290C3]">{plan.name}</h3>
                                <p className="text-[#535C91] text-xl mt-2">{plan.description}</p>
                                <h2 className="text-5xl font-extrabold mt-6 text-[#9290C3]">₹{plan.price}</h2>
                                <p className="text-[#535C91] mt-1">{plan.interviews}</p>
                            </div>
                            <button className="mt-6 bg-[#535C91] text-white py-3 px-6 rounded-lg hover:bg-[#6b74b0] transition">
                                Choose {plan.name}
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </>
    );
};

export default HomePage;
