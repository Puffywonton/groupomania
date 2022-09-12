import React, { useState } from 'react'
import LoginForm from "./LoginForm"
import Home from "../../Pages/Home"

const Login = () => {
    const [formIsSubmitted, setFormIsSubmitted] = useState(false)

    const submitForm = () => {
        setFormIsSubmitted(true)
    }

    return(
        <div>
            { !formIsSubmitted ? <LoginForm submitForm={submitForm} /> : <Home />}
        </div>
    )
}

export default Login