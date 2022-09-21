import { useNavigate } from 'react-router-dom'
import { Button } from "@mui/material";
import React from "react";
import HandleBillDelete from './DeleteBill';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const BillCardSettingsBox = (props) => {
    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event) => {
        setAnchorEl(null);
        console.log(event.target.id)
        if(event.target.id === "menuItem-Mod"){
            navigate(`/modifybill/${props.bill._id}`)
        }
        if(event.target.id === "menuItem-Del"){
            HandleBillDelete(props)
        }
    };

    return(
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <FontAwesomeIcon 
                    icon={faBars}
                    fontSize="20"
                    color='black'
                />
            </Button>
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