import React, { useContext, useState }  from 'react';
import { userContext } from "../Context/userContext"
import {Routes, Route, useNavigate, Link} from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios'
import Loader from '../Components/Loader';
import BillCard from '../Components/BillCard';
import Login from '../Components/Login/Login';
import Billboard from './Billboard';

const Home = () => {
    const { currentUser, setCurrentUser } = useContext(userContext)
    const navigate = useNavigate()
    console.log(currentUser)
    useEffect(() => {
        if(!currentUser){
            console.log("hello")
            navigate("/login")
        }
    })
    return(
        <Billboard />
    )
}

export default Home