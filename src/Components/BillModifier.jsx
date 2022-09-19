import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { userContext } from '../Context/userContext'
import { Box, Button, TextField } from "@mui/material";

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
                navigateHome()
            })
            .catch(catchErrors => {
                console.log(catchErrors)
            })
        }
    }, [dataIsCorrect, values, tokenStr, url, navigate])

    return(
        <div className="bg-red-400 bloc m-4 p-3 rounded flex-col items-center justify-center">
            <Box>
                <div className='border-b pb-3 font-bold'>Creez/modifiez une publication </div>
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
            {values.image && (
                <Box pt={2}>
                    <img
                    src={imageChange ? URL.createObjectURL(values.image) : values.image}
                    alt="Thumb"
                    />
                    <Button 
                    variant='contained'
                    onClick={removeSelectedImage}
                    >
                        supprimer
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
            <Box pt={1}>
                <Button 
                    component="label"
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
            <Box pt={1}>
                <Button 
                    variant='contained'
                    onClick={FormSubmit}
                >
                    envoyer/modifier
                </Button>  
            </Box>
        </div>
    )
}

export default BillModifier