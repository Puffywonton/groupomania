import axios from "axios"
import { useEffect, useState } from "react"

const useGetOneBill = (id) => {
    const [bill, setBill] = useState({
        loading: false,
        data: null,
        error: false
    })

    useEffect(() => {        
        const tokenStr = JSON.parse(localStorage.getItem('token'))
        const url_bill = `http://localhost:8000/api/billboard/${id}`
        
        setBill({
            loading: true,
            data: null,
            error: false
        })
        axios.get(url_bill, {
            headers: {
                'Authorization': `Bearer ${tokenStr}`
              }
            })
                .then(response => {
                    setBill({
                        loading: false,
                        data: response.data,
                        error: false
                    })
                    
                })
                .catch(error => {
                    setBill({
                        loading: false,
                        data: error.message,
                        error: true
                    })
                })
    }, [id])
    
    return{bill}
}

export default useGetOneBill