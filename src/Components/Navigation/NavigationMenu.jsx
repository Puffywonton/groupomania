import React, { useContext, useState }  from 'react';
import { userContext } from "../../Context/userContext"
import { Link, useNavigate } from "react-router-dom"
import logoutLogic from '../Logout/logoutLogic';

const NavigationMenu = (props) => {
    const { currentUser, setCurrentUser } = useContext(userContext)

    //je comprends pas les callbacks =/ ca marche pas du tout

    const logout = (props) => {
        // const { setCurrentUser } = useContext(userContext)
        // setCurrentUser(null)
        // localStorage.clear()
        logoutLogic(setCurrentUser)
        // props.closeMenu
        return(
            props.closeMenu
        )
        
    }
    
    return(
        <div>
            <div className="font-bold py-3">
                Navigation
            </div>
            <ul>
                <li>
                    <Link 
                        to="/" 
                        className="text-blue-500 py-3 border-t border-b block"
                        onClick={props.closeMenu}
                    >
                        Home
                    </Link>
                </li>
                {!currentUser.userId ? (
                    <li>
                        <Link 
                            to="/login" 
                            className="text-blue-500 py-3 border-b block"
                            onClick={props.closeMenu}
                        >
                            Login
                        </Link>
                    </li>
                ) : null}
                {!currentUser.userId ? (
                    <li>
                        <Link 
                            to="/signup" 
                            className="text-blue-500 py-3 border-b block"
                            onClick={props.closeMenu}
                        >
                            Signup
                        </Link>
                    </li>

                ) : null}                
                {currentUser.userId ? (
                    <li>
                        <Link 
                            to="/" 
                            // onClick={() => {
                            //     // closeMenu()
                            //     Logout()
                            // }}
                            onClick={() => {logout()}}
                            // onClick={logout}
                            className="text-blue-500 py-3 border-b block"
                        >
                            Logout                           
                        </Link>
                    </li>
                ) : null}
                <li>
                    <Link 
                        to="/about" 
                        className="text-blue-500 py-3 border-b block"
                        onClick={props.closeMenu}
                    >
                        About
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default NavigationMenu