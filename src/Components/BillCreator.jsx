import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
//titre
//description
//date
//
const BillCreator = () => {
    return(
        <div className="bg-red-400 bloc m-4 p-3 rounded flex-col items-center justify-center">
            <Box>
                <div className='border-b pb-3 font-bold'>Creez/modifiez une publication </div>
            </Box>
            <Box pt={2}>
                <TextField
                    fullWidth
                    required
                    name='Titre'
                    id="title" 
                    label="titre" 
                    variant="outlined"
                    // value={}
                    // onChange={}
                />
            </Box>
            <Box pt={2}>
                <TextField 
                    fullWidth
                    required
                    label="un text interessant"
                    multiline
                    minRows={6}
                    maxRows={10}
                    name='Texte'
                    id="text"
                    variant="outlined" 
                    // value={}
                    // onChange={}
                />
            </Box>
            <Box pt={1}>
                <Button>
                    Ajouter/Modifier une image
                </Button>
            </Box>
            <Box pt={1}>
                <Button 
                    variant='contained'
                    // onClick={}
                >
                    envoyer/modifier
                </Button>  
            </Box>       
        </div>
    )
}

export default BillCreator