import React from 'react'

const Input = ({icon: Icon, ...props}) => {
  return (
    <>
    <div className='flex flex-row justify-center items-center space-x-2 '>
        <div className='flex items-center pl-3 pointer-events-none'>
            <Icon className='text-blue-700'/>
        </div>
        <input {...props}  className='w-96 pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:blue-green-500 focus:ring-2 focus:ring-blue-500 text-white placeholder-purple-400 transition duration-200'/>
    </div>
    </>
  )
}

export default Input