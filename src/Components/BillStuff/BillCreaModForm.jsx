import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import MuiButton from "../MuiStuff/MuiButton";
import MuiButtonUpload from "../MuiStuff/MuiButtonUpload"
import TextField from '@mui/material/TextField'
const BillCreaModForm = (props) => {
    console.log("mod bill form")

    const [imageChange, setImageChange] = useState(false)

    const handleChange = (event) => {
        props.setValues({
            ...props.values,
            hasTextChanged: true,
            [event.target.name]: event.target.value,
        })  
    }

    const handleSelectedImage = (event) => {
        setImageChange(true)
        props.setValues({
            ...props.values,
            image: event.target.files[0]
        })
        
        event.target.value = ""
    }

    const removeSelectedImage = () => {
        setImageChange(true)
        props.setValues({
            ...props.values,
            image: "",
        })
        delete props.values.image
    }

    return(
        <div className="flex-col justify-center max-w-screen-lg mx-auto h-auto">
            <div className="mt-10 my-20 bloc drop-shadow-xl shadow-blue-500 w-auto max-w-2xl bg-white border rounded-md overflow-hidden p-5 flex-col items-center justify-center max-w-2xl mx-auto">
                <Box>
                    <div className='border-b pb-3 text-lg font-bold'>{props.mod === true ? "Modifier une publication" : "Créer une publication"} </div>
                </Box>
                <Box pt={2}>
                    <TextField
                        fullWidth
                        required
                        name='title'
                        id="title" 
                        label="titre" 
                        variant="outlined"
                        value={props.values.title}
                        onChange={handleChange}
                    />
                </Box>
                <Box pt={1}>
                    {MuiButtonUpload("Ajouter/Modifier une image",handleSelectedImage)}
                </Box>
                {props.values.image && (
                    <Box pt={2}>
                        <img className='pb-2'
                        src={imageChange ? URL.createObjectURL(props.values.image) : props.values.image}
                        alt="Thumb"
                        />
                        {MuiButton("Supprimer l'image",removeSelectedImage)}
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
                        value={props.values.text}
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
                    {props.mod === true ? MuiButton("Modifier",props.FormSubmit) : MuiButton("Publier",props.FormSubmit)} 
                </Box>
            </div>
        </div>
    )
}

export default BillCreaModForm