import { useContext } from "react"
import { userContext } from "../../Context/userContext"

const Logout = () => {
    const { setCurrentUser } = useContext(userContext)
    setCurrentUser(null)

    localStorage.clear()
}

export default Logout