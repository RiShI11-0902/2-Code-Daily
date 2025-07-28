import { useState } from "react";
import AuthModal from "../components/AuthModal"
import { useNavigate } from "react-router";
import useUserStore from "../store/store";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import { Loader } from "lucide-react";

const AuthenticateExtension = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [userSuccess, setUserSuccess] = useState(false)

    const { userData } = useUserStore()

    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {

            const res = isLogin
                ? await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/login`, form, { withCredentials: true })
                : await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/register`, form, { withCredentials: true });


            if (res.status == 200) {
                userData(res.data.user)
                window.postMessage({
                    type: "EMAIL_FOR_EXTENSION",
                    email: res.data.user.email // dynamically set from backend response
                }, "*");
                setUserSuccess(true)
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Something Wnet Wrong')
        }

        setLoading(false)
    };

    const SignIn = () => {
        const popup = window.open(
            `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/google`,
            "_blank",
            "width=500,height=600"
        );

        window.addEventListener("message", (event) => {
            if (event.data === "auth-success") {
                window.location.href = "/dashboard";
            }
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex flex-col space-y-5 items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm px-4">
            <div>
                <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/")}>
                    <span className="text-[#9290C3]">2</span>
                    <span className="text-white">Code Daily</span>
                </div>
            </div>
            {
                userSuccess ? <div className="">
                    <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10 max-w-md w-full">
                        <h2 className="text-2xl font-bold text-green-600 mb-2">🎉 Success!</h2>
                        <p className="text-gray-700 mb-4">
                            You have successfully registered / logged in.
                        </p>
                        <p className="text-gray-600 mb-6">
                            Head over to <strong>LeetCode</strong> and start your interview by clicking the bottom-right button, or visit your dashboard on <strong>2Code Daily</strong>.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="https://leetcode.com/problems/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                Go to LeetCode
                            </a>
                            <a
                                href="https://2codedaily.com" // Replace with your real domain
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
                            >
                                Visit 2Code Daily
                            </a>
                        </div>
                    </div>
                </div> : <div className="relative w-full max-w-md bg-gradient-to-r from-[#070F2B] to-[#1B1A55] rounded-3xl shadow-2xl text-white p-8 space-y-6 transition-all duration-300">

                    <h2 className="text-3xl font-bold text-center">
                        {isLogin ? "Sign In" : "Register"}
                    </h2>

                    <button
                        onClick={SignIn}
                        className="flex items-center justify-center gap-3 w-full py-2.5 rounded-lg bg-white text-black font-medium hover:bg-blue-200 transition"
                    >
                        <AiOutlineGoogle className="w-5 h-5" />
                        Sign in with Google
                    </button>

                    <div className="flex items-center gap-4">
                        <hr className="flex-1 border-gray-400" />
                        <span className="text-sm text-gray-300">or</span>
                        <hr className="flex-1 border-gray-400" />
                    </div>

                    {error && <p className="text-red-600 mt-3">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Name"
                                className="w-full px-4 py-3 rounded-xl bg-white text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#bcbbe9]"
                                required
                            />
                        )}
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full px-4 py-3 rounded-xl bg-white text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#1B1A55]"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full px-4 py-3 rounded-xl bg-white text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#1B1A55]"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl bg-blue-400 text-black font-semibold hover:bg-gray-200 transition"
                        >
                            {
                                !loading && (isLogin ? "Sign In" : "Register")
                            }
                            {/* {isLogin && !loading ? "Sign In" : "Register"} */}
                            {loading && <Loader className="mx-auto animate-spin flex items-center justify-center" />}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-300">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                        <button
                            className="underline font-medium text-white hover:text-gray-200"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? "Register" : "Sign In"}
                        </button>
                    </p>
                </div>
            }

        </div>
    )
}

export default AuthenticateExtension