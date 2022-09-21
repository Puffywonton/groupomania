import { useContext } from "react"
import { userContext } from "../../Context/userContext"

const logoutLogic = (user) => {
    console.log('coucou')
    localStorage.clear()


    user("")
    
}

export default logoutLogic

