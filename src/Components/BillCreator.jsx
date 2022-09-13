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
                <TextField
                    required
                    name='Titre'
                    id="title" 
                    label="titre" 
                    variant="outlined"
                    // value={}
                    // onChange={}
                />
                <TextField 
                    required
                    name='Texte'
                    id="text"
                    label="text" 
                    variant="outlined" 
                    // value={}
                    // onChange={}
                />
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