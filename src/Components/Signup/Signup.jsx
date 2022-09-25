import React, { useState, useEffect } from "react"
import Box from '@mui/material/Box'
import Validation from "./Validation.js"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import MuiTextField from "../MuiStuff/MuiTextField"
import MuiButton from "../MuiStuff/MuiButton.jsx";
const Swal = require('sweetalert2')

const Signup = () => {
    const navigate = useNavigate()


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
        setErrors(Validation(values))
        setDataIsCorrect(true)
    }
    useEffect(() =>{
        if(Object.keys(errors).length === 0 && dataIsCorrect){
            axios.post('http://localhost:8000/api/auth/signup', values)
            .then(response => {
              Swal.fire({
                position: 'top',
                icon: 'success',
                title: 'Enregistrement réussi',
                showConfirmButton: false,
                timer: 1500
              })
              navigate('/')
            });
        }
    }, [errors, dataIsCorrect, values, navigate])
    
    const arr = [
        {error: errors.firstName,name: "firstName",id: "firstNameInput",label: "Prénom",values: values.firstName,type: "text",handleChange: handleChange },
        {error: errors.lastName,name: "lastName",id: "lastNameInput",label: "Nom",values: values.lastName,type: "text",handleChange: handleChange},
        {error: errors.email,name: "email",id: "emailInput",label: "Email",values: values.email,type: "text",handleChange: handleChange},
        {error: errors.password,name: "password",id: "passwordInput",label: "Mot de passe",values: values.password,type: "password",handleChange: handleChange },
        {error: errors.pwConfirm,name: "pwConfirm",id: "pwConfirmInput",label: "Confirmation du mot de passe",values: values.pwConfirm,type: "password",handleChange: handleChange }
    ]
    
    return(
        <div className="flex justify-center max-w-screen-lg mx-auto h-screen">
            <div className="mt-4 sm:mt-10 drop-shadow-xl shadow-blue-500 h-fit border rounded-md overflow-hidden">
                <Box
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                        background: "white",
                        width: 'auto',
                        height: '550px',
                        display: "flex",
                        border: "1px, solid",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-around",
                    }}
                    noValidate
                >
                    <div className=" lalo-bold text-2xl border-b pb-4 text-center">Inscription</div>
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
                        {arr.map((form) => {
                        return(
                            <MuiTextField 
                            error = {form.error}
                            name = {form.name}
                            key = {form.id}
                            label = {form.label}
                            values = {form.values}
                            type = {form.type}
                            handleChange = {form.handleChange}
                            />
                        )
                        })}
                    </Box>
                    <div className="pb-4 flex justify-center">
                        {MuiButton("Créer un compte",FormSubmit)}
                    </div>
                </Box>
            </div>
        </div>
    )
}

export default Signup