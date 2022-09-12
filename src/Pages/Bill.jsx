import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../Components/Loader'


const Bill = () => {
    const { id } = useParams()

    const url = `http://localhost:8000/api/billboard/${id}`
    let tokenStr = JSON.parse(localStorage.getItem('token'))

    const [bill, setBill] = useState({
        loading: false,
        data: null,
        error: false
    })

    let content = null

    useEffect(() => {
        setBill({
            loading: true,
            data: null,
            error: false
        })
        axios.get(url, {
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
    }, [url])

    if(bill.loading){
        content = <Loader />
    }

    if(bill.error){
        content = <div>{bill.data}</div>
    }

    if(bill.data && !bill.error){
        content = 
            <div>
                <h1 className='text-2xl font-bold mb-3'>
                    {bill.data.title}
                </h1>
                <div>
                    <div>
                        <img 
                            src={bill.data.imageUrl}
                            alt={bill.data.name}
                        />
                    </div>
                    <div>
                        {bill.data.text}
                    </div>
                </div>
                <div>
                    <span>Likes= {bill.data.likes}</span>
                    <span>Dislikes= {bill.data.dislikes}</span>
                </div>
            </div>
    }
    
    return(
        <div>
            {content}
        </div>   
    )
}

export default Bill