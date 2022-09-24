import React from 'react'
import MenuItem from '@mui/material/MenuItem';

const MuiMenuItem = (name, id, action) => {
    return(
        <MenuItem sx={{
            fontFamily: 'Lato',
            // backgroundColor: "#FD2D01"
            }} 
            id={id}
            onClick={action}>
                {name}
        </MenuItem>
    )
}

export default MuiMenuItem