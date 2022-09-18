import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { userContext } from '../Context/userContext'
import BillModCard from './BillStuff/BillModCard'
import Loader from './Loader'

const BillModifier = () => {
    const { id } = useParams()
    // ajouter currentUser pour rediriger vers home si pas le bon user ou admin
    const { currentUser, setCurrentUser } = useContext(userContext)
    const tokenStr = JSON.parse(localStorage.getItem('token'))
    //get bill

    const [bill, setBill] = useState({
        loading: false,
        data: null,
        error: false
    })

    let content = null

    useEffect(() => {
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
    }, [id, tokenStr])

    if(bill.loading){
        content = <Loader />
    }

    if(bill.error){
        content = <div>{bill.data}</div>
    }

    if(bill.data && !bill.error){
        content = 
        <BillModCard
            bill = {bill.data}
        />
    }

    return(
        <div>{content}</div>
    )
}

export default BillModifier