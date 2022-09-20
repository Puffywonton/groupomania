
const logoutLogic = (user) => {
    // const { setCurrentUser } = useContext(userContext)
    // setCurrentUser(null)
    user(null)
    localStorage.clear()
}

export default logoutLogic

