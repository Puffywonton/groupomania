import React from 'react'
import Button from '@mui/material/Button';

const MuiButton = (name, action) => {
    return(
        <Button
            variant="contained"
            onClick={action}
            sx={{
                fontFamily: 'Lato',
                textTransform: 'capitalize',
                boxShadow: 3
            }}
        >
            {name}
        </Button>
    )
}

export default MuiButton