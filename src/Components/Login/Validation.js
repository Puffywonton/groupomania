const Validation = (values) => {
    let inputErrors = {}
    let emailRegex = new RegExp(`[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}`)
    if(!values.email){
        inputErrors.email="Veuillez entrer un email"
    } else if(!emailRegex.test(values.email)){
        inputErrors.email="Veuillez entrer un email valide"
    }
    if (!values.password) {
        inputErrors.password="Veuillez entrer un mot de passe"
    } else if(values.password.length < 2) {
            inputErrors.password="Veuillez entrer un mot de passe valide"
        }
    return inputErrors
}

export default Validation