import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const DeleteBill = (id) => {
    const navigate = useNavigate()
    useEffect(() => {
        const url = `http://localhost:8000/api/billboard/${id}`
        const navigateHome = () => {
            navigate('/')
        }
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
    },[navigate, id])
}

export default DeleteBill