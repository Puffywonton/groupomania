import React from 'react';
import { Link } from "react-router-dom"
import logoutLogic from '../Logout/logoutLogic';

const NavigationDesktop = (props) => {
    return(
        <div className='hidden md:block pr-10'>
            {!props.currentUser ? (
                <div className="inline-flex space-x-6">  
                    <Link 
                        to="/login" 
                        className="lalo-bold py-3 border-b text-xl block hover:text-blue-500"
                    >
                        Connexion
                    </Link>
                    <Link 
                        to="/signup" 
                        className="lalo-bold py-3 border-b text-xl block hover:text-blue-500"
                    >
                        Inscription
                    </Link>
                </div>
                    
            ) : null}               
            {props.currentUser ? (
                <div>
                    <Link 
                        to="/" 
                        onClick={() => {logoutLogic(props.currentUser)}}
                        className="lalo-bold py-3 border-b text-lg block hover:text-blue-500"
                    >
                        Déconnexion                           
                    </Link>
                </div>
            ) : null}
        </div>        
    )
}

export default NavigationDesktop