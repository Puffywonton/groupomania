import React, { useState } from 'react'
import LoginForm from "./LoginForm"
import Home from "../../Pages/Home"
import { useNavigate } from "react-router-dom"
const Login = () => {
    const [formIsSubmitted, setFormIsSubmitted] = useState(false)

    const submitForm = () => {
        setFormIsSubmitted(true)
    }

    const navigate = useNavigate()
    const navigateHome = () => {
        navigate('/')
    }

    return(
        <div className='w-h flex-col items-center justify-start'>
            <div className='p-3'>
                { !formIsSubmitted ? <LoginForm submitForm={submitForm} /> : navigateHome()}
            </div>         
        </div>
    )
}

export default Login