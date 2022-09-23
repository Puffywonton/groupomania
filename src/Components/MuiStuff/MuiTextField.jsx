import React from 'react'
import TextField from '@mui/material/TextField'


const MuiTextField = (props) => {
    console.log('hello')
    return(
        <TextField
            sx={{
                fontFamily: "Bungee Spice",
                color: "yellow",
                backgroundColor: "blue"
            }}
            InputProps={{ style: { fontFamily: "Bungee Spice" } }}
            InputLabelProps={{ style: { fontFamily: "Bungee Spice" } }}
            variant="outlined"    
            error={props.error? true : false} 
            helperText={props.error}
            required 
            name={props.name}
            id={props.id}
            label={props.label} 
            value={props.values}
            onChange={props.handleChange}
            type={props.type}
        />
    )
}

export default MuiTextField