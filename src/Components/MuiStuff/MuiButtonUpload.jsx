import React from 'react'
import Button from '@mui/material/Button';

const MuiButtonUpload = (name, action) => {
    return(
        <Button
            component="label"
            variant="contained"
            sx={{
                fontFamily: 'Lato',
                textTransform: 'lowercase'
            }}
        >
            {name}
            <input 
                hidden
                accept="image/*" 
                multiple
                type="file"
                name='image'
                id='image'
                onChange={action}
            />
        </Button>
    )
}

export default MuiButtonUpload