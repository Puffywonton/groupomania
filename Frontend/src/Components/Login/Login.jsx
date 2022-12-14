import React, { useState, useEffect, useContext } from "react"
import { userContext } from "../../Context/userContext";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box'
import Validation from "./Validation"

import axios from "axios"

import MuiButton from "../MuiStuff/MuiButton";
import MuiTextField from "../MuiStuff/MuiTextField";

const Login = () => {
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
    
    const { setCurrentUser } = useContext(userContext)

    useEffect(() => {
        if(Object.keys(errors).length === 0 && dataIsCorrect){
            axios.post('http://localhost:8000/api/auth/login', values)
            .then(response => {
                setCurrentUser({
                    userId: response.data.userId,
                    userName: response.data.userName,
                    isAdmin: response.data.isAdmin
                })
                navigate('/')
                localStorage.setItem("token", JSON.stringify(response.data.token));
            })
            .catch(catchErrors => {
                let loginError = {}
                loginError.email = catchErrors.response.data.message
                loginError.password = catchErrors.response.data.message
                setErrors(loginError)
            })
        }
    }, [errors, dataIsCorrect, setCurrentUser, values, navigate])

    return(
        <div className="flex justify-center max-w-screen-lg mx-auto h-screen">
            <div className="mt-10 drop-shadow-xl shadow-blue-500 w-fit h-fit border rounded-md overflow-hidden">
                <Box
                    sx={{
                        background: "white",
                        width: 'auto',
                        height: '250px',
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                    }}                 
                >
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                            width: 'auto',
                            height: 'auto',
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-around",
                        }}    
                    >
                        {MuiTextField({
                            error: errors.email,
                            name: "email",
                            id: "emailInput",
                            label: "Email",
                            values: values.email,
                            type: "text",
                            handleChange: handleChange 
                        })}
                        {MuiTextField({
                            error: errors.password,
                            name: "password",
                            id: "passwordInput",
                            label: "Mot de passe",
                            values: values.password,
                            type: "password",
                            handleChange: handleChange 
                        })}
                    </Box>
                    {MuiButton("Connexion",FormSubmit)}               
                </Box>
                <div className="bg-stone-200 flex flex-col sm:flex-row justify-center p-5">
                    <span className="p-3">Pas encore inscrit? Rejoignez-nous!</span>
                    {MuiButton("Inscription",navigateSignup)}    
                </div>            
            </div>
        </div>
        
    )
}

export default Login