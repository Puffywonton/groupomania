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
            <div className='m-3 border rounded overflow-hidden'>
                <div className='font-bold text-xl mb-3'>
                    {bill.data.title}
                </div>
                <div>
                    <img 
                        src={bill.data.imageUrl}
                        alt={bill.data.name}
                    />
                </div>
                <div className='p-3 mb-3'>
                    {bill.data.text}
                </div>
                <div className='flex'>
                    <div className='bg-red-600 w-1/2 text-center'>
                        likes {bill.data.likes}                  
                    </div>
                    <div className='bg-blue-600 w-1/2 text-center'>
                        dislikes {bill.data.dislikes}
                    </div>
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