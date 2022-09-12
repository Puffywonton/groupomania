import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupForm from './SignupForm';
import SignupFormSuccess from './SignupSuccess';
import Home from '../../Pages/Home'


function Signup() {
    const navigate = useNavigate()
    const [formIsSubmitted, setFormIsSubmitted] = useState(false)
    
    const submitForm = () => {
        setFormIsSubmitted(true)
    }
    return (
        <div>
            { !formIsSubmitted ? <SignupForm submitForm={submitForm}/> : <div><SignupFormSuccess /><Home /></div>}
        </div>
    );
}

export default Signup