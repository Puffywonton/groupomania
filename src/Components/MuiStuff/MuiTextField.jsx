import React from 'react'
import TextField from '@mui/material/TextField'

const MuiTextField = (props) => {
    return(
        <TextField
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