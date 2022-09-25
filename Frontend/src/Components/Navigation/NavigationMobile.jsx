
import React from 'react';
import Menu from '@mui/material/Menu';
import { useNavigate } from "react-router-dom"
import logoutLogic from '../Logout/logoutLogic';
import MuiMenuItem from '../MuiStuff/MuiMenuItem';


import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const NavigationMobile = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const navigate = useNavigate()

    const navigateSignup = () => {
        navigate('/signup')
    }
    const navigateLogin = () => {
        navigate('/login')
    }
    const navigateHome = () => {
        navigate('/')
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event) => {
        if(event.target.id === "navItemSignup"){
            navigateSignup()
        }
        if(event.target.id === "navItemLogin"){
            navigateLogin()
        }
        if(event.target.id === "navItemLogout"){
            logoutLogic(props.setCurrentUser)
            navigateHome()
        }
        if(event.target.id === "navItemHome"){
            navigateHome()
        }
        setAnchorEl(null);
    };
    return(
        <div className='md:hidden'>
                <IconButton
                    aria-label="more"
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MenuIcon fontSize="medium"/>
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    {MuiMenuItem("Page d'accueil","navItemHome",handleClose)}
                    {!props.currentUser ? (
                        MuiMenuItem("Inscription","navItemSignup",handleClose)
                    ) : null}
                    {!props.currentUser ? (
                        MuiMenuItem("Connexion","navItemLogin",handleClose)
                    ) : null}
                    {props.currentUser? (
                        MuiMenuItem("Déconnexion","navItemLogout",handleClose)
                    ) : null}
                </Menu>
            </div>        
    )
}

export default NavigationMobile