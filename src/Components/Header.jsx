import React from "react"
import Navigation from "./Navigation/Navigation"
import { Link } from 'react-router-dom'
import logo from '../logo-black.svg'


const Header = () => {
    return(
        <header className="bg-groupomania-red p-5 flex justify-between items-center">
            <Link to={`/`} className="font-bold">
                <img className="max-w-xs" src={logo} alt="groupomania"></img>
            </Link>
            <Navigation />
        </header>
    )
}

export default Header