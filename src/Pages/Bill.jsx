import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../Components/Loader'
import BillCard from '../Components/BillCard'
import { userContext } from '../Context/userContext'
import { useContext } from 'react'


const Bill = () => {
    console.log("coucou")
    const { id } = useParams()
    const { currentUser, setCurrentUser } = useContext(userContext)

    const url_bill = `http://localhost:8000/api/billboard/${id}`
    let tokenStr = JSON.parse(localStorage.getItem('token'))

    const [likeUpdate, setLikeUpdate] = useState({
        isTrue: false,
        url:"",
        data: {
            userId: currentUser,
            like: "1"
        } 
    })
    
    const [bill, setBill] = useState({
        loading: false,
        data: null,
        error: false
    })

    let content = null

    const getBill = () => {
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
    }

    useEffect(() => {
        if(likeUpdate.isTrue){
            console.log("post like here",likeUpdate.data)
            axios.post(likeUpdate.url, likeUpdate.data, {
                headers: {
                    'Authorization': `Bearer ${tokenStr}`
                  }
                })
                    .then(response => {
                        console.log(response)
                        getBill()
                        console.log("post updated")
                        
                    })
                    .catch(error => {
                        console.log(error.message)
                        console.log("error")
                    })
        }else{
            getBill()
        }
        likeUpdate.isTrue = false
    }, [likeUpdate.data, likeUpdate.isTrue, likeUpdate.url, likeUpdate, tokenStr])

    if(bill.loading){
        content = <Loader />
    }

    if(bill.error){
        content = <div>{bill.data}</div>
    }

    if(bill.data && !bill.error){
        console.log(bill.data)
        content = 
        <BillCard 
            bill = {bill.data}
            setLikeUpdate={setLikeUpdate}
            likeUpdate={likeUpdate}
        />
    }

    return(
        <div>
            {content}
        </div>   
    )
}

export default Bill