import React, { useContext }  from 'react';
import { userContext } from "../Context/userContext"
import {Routes, Route, useNavigate} from 'react-router-dom';
import { useEffect } from 'react';

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

    return(
        <div>
            <h1 className='font-bold text-2xl'>Home Page</h1>
        </div>
    )
}

export default Home