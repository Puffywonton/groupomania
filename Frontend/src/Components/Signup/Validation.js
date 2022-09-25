

const ValuesCheckerList = {
    firstName : "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
    lastName : "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
    email : `[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}`
}

const Validation = (values) => {
    let inputErrors = {}
    for (let key in values) {
        let re = new RegExp(ValuesCheckerList[key])
        if (key !== "password" && key !== "pwConfirm"){
            if (!re.test(values[key])){
                inputErrors[key]="Veuillez entrer un "+key+" valide"
            }
        }
    }
    if(values.pwConfirm !== values.password) {
        inputErrors.pwConfirm="Veuillez entrer un mot de passe identique"
        inputErrors.password="Veuillez entrer un mot de passe identique"
    } else if(!values.pwConfirm){
            inputErrors.pwConfirm="Veuillez confirmer le mot de passe"
        }
    if (!values.password) {
        inputErrors.password="Veuillez entrer un mot de passe"
    } else if(values.password.length < 2) {
            inputErrors.password="Veuillez entrer un mot de passe valide"
        }
    return inputErrors
}

export default Validation