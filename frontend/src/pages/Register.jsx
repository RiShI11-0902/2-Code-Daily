import React, { useState } from 'react'
import Input from '../components/Input'
import { Mail, User, Lock, Loader2 } from 'lucide-react'
import { initialFormState } from '../constants/form'
import axios from "axios"
import { useNavigate } from 'react-router'
import useUserStore from "../store/store";
import Cookies from 'js-cookie'

const Register = () => {

    const [form, setForm] = useState(initialFormState)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    const userData = useUserStore((state) => state.userData)


    const navigate = useNavigate()

    const handleChange = (e)=>{
        const {name,value} = e.target
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setLoading(true)
        try {
            const sendData = await axios.post("http://localhost:5000/user/register", {form}, {
                withCredentials: true,
              })
            console.log(sendData);
            if(sendData.status == 200){
                userData(sendData.data.user)
                // Cookies.set('toekn',sendData.data.user. )
                navigate("/dashboard", {state: sendData.data.user})
            }
        } catch (error) {
            console.log(error?.response?.data?.message);
            setError(error?.response?.data?.message)
        }
        setLoading(false)
    }


    return (
        <>
            <section id='registration' className='flex  justify-around  items-center mx-auto h-screen space-y-5 w-full '>
                <div className='flex flex-col space-y-5'>
                    <div className="text-2xl font-bold mx-auto w-fit">
                        <span className="text-[#9290C3]">2</span>
                        <span className="text-white">Code Daily</span>
                    </div>
                    <form onSubmit={handleSubmit} className='p-5 flex-col space-y-5 shadow-sm shadow-[#a9a8d8] rounded-2xl'>
                        <p className='font-bold text-[#9290C3] text-3xl'>Register Now</p>
                        <Input icon={Mail} type='email' placeholder='Enter your Email' name='email' value={form.email} onChange={handleChange} />
                        <Input icon={User} type='text' placeholder='Enter your Name' name='name' value={form.name} onChange={handleChange} />
                        <Input icon={Lock} type='password' placeholder='Enter your Password' name='password' value={form.password} onChange={handleChange} />
{/* /// #021526 #03346E #6EACDAr */}
                        { error && <p className='text-red-800 font-semibold pt-1'>{error}</p>}

                        <div className="mt-6 space-y-3">
                           
                            <button className="w-full bg-[#535C91] py-3 rounded-lg font-bold hover:bg-[#9290C3] transition duration-300 mx-auto items-center flex justify-center">
                                { loading ? <Loader2 className='animate-spin' /> : "Register"}
                            </button>
                           
                            <button className="w-full text-sm text-[#9290C3] hover:underline">
                                Forgot Password?
                            </button>
                            <p className='mx-auto w-fit text-white'>Already a user? <span className=
                            'text-[#9290C3] cursor-pointer' onClick={()=>{}}>Login</span></p>
                        </div>
                    </form>
                </div>

            </section>
        </>
    )
}

export default Register