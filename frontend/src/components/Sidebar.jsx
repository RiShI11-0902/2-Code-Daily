import axios from 'axios'
import React from 'react'
import useUserStore from '../store/store'
import { Link, Navigate, useNavigate } from 'react-router'
import handlePayment from '../utils/paymentFunction'


const Sidebar = ({ visible, scrollToTop, notify, setShowSolved, setProgressBar, isExpired }) => {

    const { user } = useUserStore()

    const navigate = useNavigate()

    const logout = async () => {
        // alert("Hello")
        try {
            const res = await axios.get("https://two-code-daily-1.onrender.com/auth/logout", { withCredentials: true })
            if (res.status == 200)
                useUserStore.getState().removeUser()
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <section className="sidebar fixed montserrat-heading h-screen w-64 bg-gray-900 text-white">
                <div className="p-4">
                    <Link to={"/"} className='text-2xl text-[#9290C3] font-semibold  p-2 cursor-pointer transition duration-200'>
                        2Code Daily
                    </Link>
                    <ul className="space-y-4 flex flex-col mt-5 text-[#535C91]">
                        <li onClick={() => {
                            setShowSolved(false)
                            setProgressBar(false)
                        }} className="text-lg font-semibold hover:bg-gray-800 rounded-md p-2 cursor-pointer transition duration-200">
                            Coding Sheet
                        </li>
                        <li onClick={() => {
                            setShowSolved(true)
                            setProgressBar(false)
                        }} className="text-lg font-semibold hover:bg-gray-800 rounded-md p-2 cursor-pointer transition duration-200">
                            Solved
                        </li>

                        <li onClick={() => setProgressBar(true)} className="text-lg font-semibold hover:bg-gray-800 rounded-md p-2 cursor-pointer transition duration-200">Progress</li>
                        {/* //*/}
                        <li onClick={() => user.isSubscribed && !isExpired ? notify() : handlePayment(user)} className="text-lg font-semibold hover:bg-gray-800 rounded-md p-2 cursor-pointer transition duration-200">Go Premium</li>

                        <li onClick={logout} className="text-lg font-semibold hover:bg-gray-800 rounded-md p-2 cursor-pointer transition duration-200">
                            Log Out
                        </li>
                    </ul>
                </div>
                {
                    <button
                        onClick={scrollToTop}
                        className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg"
                    >
                        ↑ Top
                    </button>
                }

            </section>

        </>
    )
}

export default Sidebar