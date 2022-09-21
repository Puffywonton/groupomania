import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { userContext } from '../Context/userContext'
import { Box, Button, TextField } from "@mui/material";
const Swal = require('sweetalert2')

const BillModifier = (props) => {
    console.log("picture", props.bill.imageUrl)
    const navigate = useNavigate()
    
    const { id } = useParams()
    const url = `http://localhost:8000/api/billboard/${id}`

    const tokenStr = JSON.parse(localStorage.getItem('token'))

    const [values, setValues] = useState({
        title: props.bill.title,
        text: props.bill.text,
        image: props.bill.imageUrl
    })

    const [imageChange, setImageChange] = useState(false)
    
    const handleChange = (event) => {
        setValues({
            ...values,
            hasTextChanged: true,
            [event.target.name]: event.target.value,
        })  
    }

    const handleSelectedImage = (event) => {
        setImageChange(true)
        setValues({
            ...values,
            image: event.target.files[0]
        })
        
        event.target.value = ""
    }

    const removeSelectedImage = () => {
        setImageChange(true)
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
        console.log(values)       
        if(dataIsCorrect){
            axios.put(url, values, {
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
                    title: 'Bill modifié',
                    showConfirmButton: false,
                    timer: 500
                  })
                navigateHome()
            })
            .catch(catchErrors => {
                console.log(catchErrors)
            })
        }
    }, [dataIsCorrect, values, tokenStr, url, navigate])

    return(
        <div className="flex-col justify-center p-5 max-w-screen-lg mx-auto bg-neutral-200 min-h-screen">
            <div className="bg-groupomania-pink p-5 flex-col items-center justify-center max-w-2xl mx-auto">
                <Box>
                    <div className='border-b pb-3 text-lg font-bold'>Modifier une publication </div>
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
                        src={imageChange ? URL.createObjectURL(values.image) : values.image}
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
                        modifier
                    </Button> 
                </Box>
            </div>
        </div>    
    )
}

export default BillModifier