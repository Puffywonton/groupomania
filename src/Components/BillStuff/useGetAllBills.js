import axios from "axios"
import { useEffect, useState } from "react"

const useGetAllBills = () => {
    const [billboard, setBillboard] = useState({
        loading: false,
        data: null,
        error: false
    })

    useEffect(() => {        
        const tokenStr = JSON.parse(localStorage.getItem('token'))
        const url_billboard = 'http://localhost:8000/api/billboard'
        
        setBillboard({
            loading: true,
            data: null,
            error: false
        })
        axios.get(url_billboard, {
            headers: {
                'Authorization': `Bearer ${tokenStr}`
            }
            })
            .then(response => {
                console.log("BILLBOARD RECEIVED",response)
                setBillboard({
                    loading: false,
                    data: response.data,
                    error: false
                })
                
            })
            .catch(error => {
                setBillboard({
                    loading: false,
                    data: error.message,
                    error: true
                })
            })
    }, [])
    
    return{billboard}
}

export default useGetAllBills