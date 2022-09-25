import React from 'react'
import MenuItem from '@mui/material/MenuItem';

const MuiMenuItem = (name, id, action) => {
    return(
        <MenuItem sx={{
            fontFamily: 'Lato',
            }} 
            id={id}
            onClick={action}>
                {name}
        </MenuItem>
    )
}

export default MuiMenuItem