import React from "react"
import Navigation from "./Navigation/Navigation"

const Header = () => {
    return(
        <header className="border-b p-3 flex justify-between items-center">
            <span className="font-bold">
                Groupomania
            </span>
            <Navigation />
        </header>
    )
}

export default Header