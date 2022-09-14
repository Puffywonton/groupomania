import React, { useState } from 'react'
import LoginForm from "./LoginForm"
import { useNavigate } from "react-router-dom"
const Login = () => {
    const [setFormIsSubmitted] = useState(false)
    const navigate = useNavigate()
    
    const submitForm = () => {
        setFormIsSubmitted(true)
        navigate('/')
    }

    return(
        <div className='w-h flex-col items-center justify-start'>
            <div className='p-3'>
                <LoginForm submitForm={submitForm}/>
            </div>         
        </div>
    )
}

export default Login