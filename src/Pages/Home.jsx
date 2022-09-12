import React, { useContext, useState }  from 'react';
import { userContext } from "../Context/userContext"
import {Routes, Route, useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios'
import Loader from '../Components/Loader';

const Home = () => {
    const { currentUser, setCurrentUser } = useContext(userContext)
    const navigate = useNavigate()
    const navigateLogin = () => {
        navigate('/login')
    }
    useEffect(() => {
        if (!currentUser) {
            navigateLogin()
        }
    }, [])

    const url = 'http://localhost:8000/api/billboard'
    let tokenStr = JSON.parse(localStorage.getItem('token'))

    const [billboard, setBillboard] = useState({
        loading: false,
        data: null,
        error: false
    })

    let content = null

    useEffect(() => {
        setBillboard({
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
                    console.log(response)
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
    }, [url])

    if(billboard.loading){
        content = <Loader />
    }

    if(billboard.error){
        content = <div>{billboard.data}</div>
    }

    if(billboard.data && !billboard.error){
        content = 
        billboard.data.map((bill, key) => 
            <div>
                {bill.title}
            </div>
        )
    }
    return(
        <div>
            <h1 className='font-bold text-2xl'>Home Page</h1>
            {content}
        </div>
    )
}

export default Home