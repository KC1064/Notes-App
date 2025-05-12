import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({ value, onChange, placeholder }) => {
    const [isVisible, setIsVisible] = useState(false)
    
    const toggleVisibility = () => {
        setIsVisible(!isVisible)
    }

    return (
        <div className="relative">
            <input 
                value={value}
                onChange={onChange}
                type={isVisible ? "text" : "password"}
                placeholder={placeholder || "Password"}
                className='w-full px-4 py-1 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <span 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={toggleVisibility}
            >
                {isVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
        </div>
    )
}

export default PasswordInput