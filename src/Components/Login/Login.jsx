import React, { useState } from 'react'
import LoginForm from "./LoginForm"
import Home from "../../Pages/Home"

const Login = () => {
    const [formIsSubmitted, setFormIsSubmitted] = useState(false)

    const submitForm = () => {
        setFormIsSubmitted(true)
    }

    return(
        <div className='w-h flex-col items-center justify-start'>
            <div className='p-3'>
                { !formIsSubmitted ? <LoginForm submitForm={submitForm} /> : <Home />}
            </div>         
        </div>
    )
}

export default Login