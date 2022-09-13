import React, { useContext }  from 'react';
import { userContext } from "../../Context/userContext"
import { Link } from "react-router-dom"

//QUESTION je peux pas mettre plus de 1 <li> par {currentuser?} je l'emballe dans un div?


const NavigationMenu = (props) => {
    const { currentUser, setCurrentUser } = useContext(userContext)

    const closeMenu = (props) => {
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
                {!currentUser ? (
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
                {!currentUser ? (
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
                {currentUser ? (
                    <li>
                        <Link 
                            to="/" 
                            onClick={() => {
                                closeMenu()
                                setCurrentUser(null)
                                //delete localstorage
                                // QUESTION meilleur soluc pour closemenu ca fait un peu bizarre? 
                            }}
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