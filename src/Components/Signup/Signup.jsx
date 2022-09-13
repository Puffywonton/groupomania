import React, { useState } from 'react';
import SignupForm from './SignupForm';
import SignupFormSuccess from './SignupSuccess';

//verif comme login

function Signup() {

    const [formIsSubmitted, setFormIsSubmitted] = useState(false)
    
    const submitForm = () => {
        setFormIsSubmitted(true)
    }
    return (
        <div>
            { !formIsSubmitted ? <SignupForm submitForm={submitForm}/> : <div><SignupFormSuccess /></div>}
        </div>
    );
}

export default Signup