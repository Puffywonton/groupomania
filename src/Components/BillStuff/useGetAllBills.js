import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { userContext } from "../../Context/userContext"

const useGetAllBills = () => {
    const { currentUser } = useContext(userContext)
    const [billboard, setBillboard] = useState({
        loading: false,
        data: null,
        error: false,
        reload: true,
    })

    useEffect(() => {
        if(billboard.reload && currentUser.userId){
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
    }, [billboard.reload, currentUser])
    
    return{billboard, setBillboard}
}

export default useGetAllBills