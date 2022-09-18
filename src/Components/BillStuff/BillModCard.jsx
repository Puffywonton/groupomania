import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";


const BillModCard = (props) => {

    const [values, setValues] = useState({
        title: props.bill.title,
        text: props.bill.text,
        image: props.bill.imageUrl
    })

    console.log("test", props.bill.imageUrl)

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
                    // onChange={handleChange}
                />
            </Box>
            <Box pt={2}>
                <img
                src={values.image}
                alt="Thumb"
                />
                <Button 
                variant='contained'
                // onClick={removeSelectedImage}
                >
                    supprimer
                </Button>
            </Box>
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
                    // onChange={handleChange}
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
                        // onChange={handleImage}
                    />
                </Button>
            </Box>
            <Box pt={1}>
                <Button 
                    variant='contained'
                    // onClick={FormSubmit}
                >
                    envoyer/modifier
                </Button>  
            </Box>
        </div>
    )
}

export default BillModCard