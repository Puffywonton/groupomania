import React from "react"
import Navigation from "./Navigation/Navigation"
import { Link } from 'react-router-dom'
import logo from '../logo-black.svg'


const Header = () => {
    return(
        <header className="border-b bg-white p-5 flex justify-between items-center">
            <Link to={`/`} className="font-bold">
                <img className="w-40 md:w-80" src={logo} alt="groupomania"></img>
            </Link>
            <Navigation />
        </header>
    )
}

export default Header