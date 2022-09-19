import axios from "axios"
import { useEffect } from "react"

const DeleteBill = () => {
    const url = `http://localhost:8000/api/billboard/${id}`
    useEffect(() => {
        const tokenStr = JSON.parse(localStorage.getItem('token'))
        axios.delete(url, {
            headers: {
                'Authorization': `Bearer ${tokenStr}`
            }
            })
            .then(response => {
                console.log("bill deleted",response)
            })
            .catch(error => {
                console.log("error, error")
            })
    })
}

export default DeleteBill