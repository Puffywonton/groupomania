import React, { useState, useEffect, useContext } from "react"
import { userContext } from "../../Context/userContext";
import {Routes, Route, useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import Validation from "./Validation"

import axios from "axios"

const LoginForm = ({ submitForm }) => {
    const navigate = useNavigate()
    const navigateSignup = () => {
        navigate('/signup')
    }
    const [values, setValues] = useState({
        email:"",
        password:"",
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
        setErrors(Validation(values))
        setDataIsCorrect(true)
    }
    
    const { currentUser, setCurrentUser } = useContext(userContext)

    useEffect(() => {
        if(Object.keys(errors).length === 0 && dataIsCorrect){
            axios.post('http://localhost:8000/api/auth/login', values)
            .then(response => {
                console.log(response.data)
                setCurrentUser(response.data.userId)
                submitForm(true)
                localStorage.setItem("token", JSON.stringify(response.data.token));
            })
            .catch(catchErrors => {
                console.log(catchErrors)
                let loginError = {}
                loginError.email = catchErrors.response.data.message
                loginError.password = catchErrors.response.data.message
                setErrors(loginError)
            })
        }
    }, [errors])

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
                <Button 
                    variant='contained'
                    onClick={FormSubmit}
                >
                    Login
                </Button>               
            </Box>
            <div className="bg-orange-400 flex justify-center p-3">
                <span className="p-3">Pas encore inscrit? rejoignez nous ici:</span>
                <Button
                    variant='contained'
                    onClick={navigateSignup}
                >
                    Signup
                </Button>
            </div>
            
        </div>
    )
}

export default LoginForm