import React, { useState, useEffect, useContext } from "react"
import { userContext } from "../../Context/userContext";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import Validation from "./Validation"

import axios from "axios"
import { fontFamily } from "@mui/system";
import MuiButton from "../MuiStuff/MuiButton";

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

    //dataIsCorrect pour empecher le login API de fonctionner
    const [dataIsCorrect, setDataIsCorrect] = useState(false)

    const FormSubmit = (event) => {
        console.log("coucou")
        event.preventDefault()
        setErrors(Validation(values))
        setDataIsCorrect(true)
    }
    
    const { setCurrentUser } = useContext(userContext)

    useEffect(() => {
        if(Object.keys(errors).length === 0 && dataIsCorrect){
            axios.post('http://localhost:8000/api/auth/login', values)
            .then(response => {
                console.log(response.data)
                setCurrentUser({
                    userId: response.data.userId,
                    userName: response.data.userName,
                    isAdmin: response.data.isAdmin
                })
                navigate('/')
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
    }, [errors, dataIsCorrect, setCurrentUser, values, navigate])


    //bg-neutral-200

    return(
        <div className="font-link flex justify-center max-w-screen-lg mx-auto h-screen">
            <div className="mt-10 drop-shadow-xl shadow-blue-500 w-fit h-fit border rounded-md overflow-hidden">
                <Box
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
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
                            // margintop: "4",
                            width: 'auto',
                            height: 'auto',
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-around",
                        }}    
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
                            sx={{
                                fontFamily: "Bungee Spice",
                                color: "yellow",
                                backgroundColor: "red"
                            }}
                            InputProps={{ style: { fontFamily: "Bungee Spice" } }}
                            InputLabelProps={{ style: { fontFamily: "Bungee Spice" } }}
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
                    </Box>
                    {MuiButton("Login",FormSubmit)}               
                </Box>
                <div className="bg-stone-300 flex justify-center p-5">
                    <span className="p-3">Pas encore inscrit? rejoignez nous ici:</span>
                    {MuiButton("Signup",navigateSignup)}    
                </div>            
            </div>
        </div>
        
    )
}

export default Login