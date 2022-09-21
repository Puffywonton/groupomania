import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const Swal = require('sweetalert2')

const BillCreator = () => {
    const url = "http://localhost:8000/api/billboard"
    let tokenStr = JSON.parse(localStorage.getItem('token'))

    const navigate = useNavigate()
    
    const [values, setValues] = useState({
        title:"",
        text:"",
    })

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        })
    }

    const handleSelectedImage = (event) => {
        console.log("image",event.target.files[0])
        setValues({
            ...values,
            image: event.target.files[0]
        })
        console.log("test",event.target.name)
        event.target.value = ""
    }

    const removeSelectedImage = (event) => {
        setValues({
            ...values,
            image: "",
        })
        delete values.image
    }

    const [dataIsCorrect, setDataIsCorrect] = useState(false)
    
    const FormSubmit = (event) => {
        event.preventDefault()
        setDataIsCorrect(true)
    }

    useEffect(() => {
        const navigateHome = () => {
            navigate('/')
        }
        if(dataIsCorrect){
            axios.post(url, values, {
                headers: {
                    'Authorization': `Bearer ${tokenStr}`,
                    'Content-Type': 'multipart/form-data'
                  },
            })
            .then(response => {
                console.log(response.data)
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Bill crée',
                    showConfirmButton: false,
                    timer: 1500
                  })
                navigateHome()
            })
            .catch(catchErrors => {
                console.log(catchErrors)
            })
        }
    }, [navigate, dataIsCorrect, values, tokenStr])

    return(
        <div className="bg-groupomania-pink bloc m-4 p-3 rounded flex-col items-center justify-center">
            <Box>
                <div className='border-b pb-3 text-lg font-bold'>Créer une publication </div>
            </Box>
            <Box pt={2}>
                <TextField
                    fullWidth
                    required
                    name='title'
                    id="title" 
                    label="titre" 
                    variant="outlined"
                    value={values.title}
                    onChange={handleChange}
                />
            </Box>
            <Box pt={1}>
                <Button 
                    component="label"
                    variant='contained'
                >
                    Ajouter/Modifier une image
                    <input 
                        hidden
                        accept="image/*" 
                        multiple
                        type="file"
                        name='image'
                        id='image'
                        onChange={handleSelectedImage}
                    />
                </Button>
            </Box>
            {values.image && (
                <Box pt={2}>
                    <img className='pb-2'
                    src={URL.createObjectURL(values.image)}
                    alt="Thumb"
                    
                    />
                    <Button 
                    variant='contained'
                    onClick={removeSelectedImage}
                    >
                        supprimer l'image
                    </Button>
                </Box>
            )}
            <Box pt={2}>
                <TextField 
                    fullWidth
                    label="un texte interessant"
                    multiline
                    minRows={6}
                    maxRows={10}
                    name='text'
                    id="text"
                    variant="outlined" 
                    value={values.text}
                    onChange={handleChange}
                />
            </Box>
            <Box 
                sx={{
                    paddingTop: 3,
                    paddingBottom: 3,
                    display: "flex",
                    justifyContent: "center",
                }}>
                <Button 
                    variant='contained'
                    onClick={FormSubmit}
                >
                    envoyer
                </Button>  
            </Box>       
        </div>
    )
}

export default BillCreator