import { useNavigate } from 'react-router-dom'
import React from "react";
import HandleBillDelete from './DeleteBill';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const BillCardSettingsBox = (props) => {
    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event) => {
        setAnchorEl(null);
        if(event.target.id === "menuItem-Mod"){
            navigate(`/modifybill/${props.bill._id}`)
        }
        if(event.target.id === "menuItem-Del"){
            HandleBillDelete(props)
        }
    };

    return(
        <div>
            <IconButton
                aria-label="more"
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem id="menuItem-Mod" onClick={handleClose}>Modifier</MenuItem>
                <MenuItem id="menuItem-Del" onClick={handleClose}>Supprimer</MenuItem>
            </Menu>
        </div>
    )
}

export default BillCardSettingsBox