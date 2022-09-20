import axios from "axios"
import { useEffect, useState } from "react"

const useGetAllBills = () => {
    const [billboard, setBillboard] = useState({
        loading: false,
        data: null,
        error: false,
        reload: true,
    })

    useEffect(() => {
        
        if(billboard.reload){
            const tokenStr = JSON.parse(localStorage.getItem('token'))
            const url_billboard = 'http://localhost:8000/api/billboard'
            
            setBillboard({
                loading: true,
                data: null,
                error: false,
                reload: false
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
                        error: false,
                        reload: false,
                    })
                    
                })
                .catch(error => {
                    setBillboard({
                        loading: false,
                        data: error.message,
                        error: true,
                        reload: false
                    })
                })
        }
        
    }, [billboard.reload])
    
    return{billboard, setBillboard}
}

export default useGetAllBills