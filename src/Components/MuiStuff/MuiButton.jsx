import React from 'react'
import Button from '@mui/material/Button';

const MuiButton = (name, action) => {
    return(
        <Button
            variant="contained"
            onClick={action}
            sx={{
                fontFamily: "Bungee Spice",
                // backgroundColor: "#FD2D01"
            }}
        >
            {name}
        </Button>
    )
}

export default MuiButton