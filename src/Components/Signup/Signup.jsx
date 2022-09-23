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
        console.log("handleCHange", event.target.name, event.target.value)
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
    }
    useEffect(() =>{
        if(Object.keys(errors).length === 0 && dataIsCorrect){
            axios.post('http://localhost:8000/api/auth/signup', values)
            .then(response => {
              console.log(response)
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
        {error: errors.lastName,name: "lastName",id: "lastNameInput",label: "Nom",values: values.lastName,type: "text",handleChange: handleChange}
    
    ]
    
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
                {arr.map((pizza,i) => {
                    return(
                        <MuiTextField 
                        error = {pizza.error}
                        name = {pizza.name}
                        id = {pizza.id}
                        label = {pizza.label}
                        values = {pizza.values}
                        type = {pizza.type}
                        handleChange = {pizza.handleChange}
                        />
                    )
                    
                })}
                {/* {MuiTextField({
                    error: errors.firstName,
                    name: "firstName",
                    id: "firstNameInput",
                    label: "Prénom",
                    values: values.firstName,
                    type: "text",
                    handleChange: handleChange 
                })}
                {MuiTextField({
                    error: errors.lastName,
                    name: "lastName",
                    id: "lastNameInput",
                    label: "Nom",
                    values: values.lastName,
                    type: "text",
                    handleChange: handleChange 
                })}
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
                {MuiTextField({
                    error: errors.pwConfirm,
                    name: "pwConfirm",
                    id: "pwConfirmInput",
                    label: "Confirmation du mot de passe",
                    values: values.pwConfirm,
                    type: "password",
                    handleChange: handleChange 
                })} */}
                {MuiButton("Créer un compte",FormSubmit)}
            </Box>
        </div>
    )
}

export default Signup