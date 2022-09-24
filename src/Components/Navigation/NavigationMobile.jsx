
import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { useNavigate } from "react-router-dom"
import logoutLogic from '../Logout/logoutLogic';
import MuiMenuItem from '../MuiStuff/MuiMenuItem';

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
        setAnchorEl(null);
    };
    return(
        <div className='md:hidden'>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    // sx={{
                    //     fontFamily: "Bungee Spice",
                    //     // backgroundColor: "#FD2D01"
                    // }}
                    variant="outlined"
                >
                    Navigation
                </Button>
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