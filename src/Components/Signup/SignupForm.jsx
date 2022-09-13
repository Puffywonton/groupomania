import React, { useState, useEffect } from "react"
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import Validation from "./Validation.js"


import axios from "axios"


const SignupForm = ({ submitForm }) => {
    const [values, setValues] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        pwConfirm:""
    })
    
    const handleChange = (event) => {
        setValues({
          ...values,
          [event.target.name]: event.target.value,
        })
    }
    
    const [errors, setErrors] = useState({})
    const [dataIsCorrect, setDataIsCorrect] = useState(false)

    const FormSubmit = (event) => {
        event.preventDefault()
        console.log("form submit")
        setErrors(Validation(values))
        setDataIsCorrect(true)
            //ct token user
            //usenav page nav
            //set state? user created ?
    }
    useEffect(() =>{
        if(Object.keys(errors).length === 0 && dataIsCorrect){
            axios.post('http://localhost:8000/api/auth/signup', values)
            .then(response => {
              console.log(response)
              submitForm(true)
            });
        }
    }, [errors, dataIsCorrect, submitForm,values])
    

    return(
        <div className="bloc p-3 flex-col items-center justify-center">
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                    background: "lightgrey",
                    width: 'auto',
                    height: 'auto',
                    display: "flex",
                    border: "1px, solid",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    error={errors.firstName? true : false} 
                    helperText={errors.firstName}
                    required 
                    name='firstName'
                    id="firstNameInput" 
                    label="firstName" 
                    variant="outlined"
                    value={values.firstName}
                    onChange={handleChange}
                />
                <TextField
                    error={errors.lastName? true : false} 
                    helperText={errors.lastName}
                    required 
                    name='lastName'
                    id="lastNameInput" 
                    label="lastname" 
                    variant="outlined"
                    value={values.lastName}
                    onChange={handleChange}
                />
                <TextField
                    error={errors.email? true : false} 
                    helperText={errors.email}
                    required 
                    name='email'
                    id="emailInput" 
                    label="email" 
                    variant="outlined"
                    value={values.email}
                    onChange={handleChange}
                />
                <TextField 
                    error={errors.password? true: false}
                    helperText={errors.password}
                    required
                    name='password'
                    id="passwordInput"
                    type="password"
                    label="password" 
                    variant="outlined" 
                    value={values.password}
                    onChange={handleChange}
                />
                <TextField
                    error={errors.pwConfirm? true: false}
                    helperText={errors.pwConfirm}
                    required
                    id="pwConfirm"
                    name='pwConfirm'
                    type="password" 
                    label="Confirm Password" 
                    variant="outlined"
                    value={values.pwConfirm}
                    onChange={handleChange} 
                />
                <Button 
                    variant='contained'
                    onClick={FormSubmit}
                >
                    Créer un compte
                </Button>
            </Box>
        </div>
    )
}

export default SignupForm