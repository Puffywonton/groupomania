import axios from "axios"
import { useEffect } from "react"

const GetOneBill = (id) => {
    useEffect(() => {        
        const tokenStr = JSON.parse(localStorage.getItem('token'))
        const url_bill = `http://localhost:8000/api/billboard/${id}`
        axios.get(url_bill, {
            headers: {
                'Authorization': `Bearer ${tokenStr}`
              }
            })
                .then(response => {
                    console.log(response.data)
                    return(response.data)  
                })
                .catch(error => {
                    return(error.message)
                })
    }, [id])
}

export default GetOneBill