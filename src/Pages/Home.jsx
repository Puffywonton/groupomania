import React, { useContext, useState }  from 'react';
import { userContext } from "../Context/userContext"
import {Routes, Route, useNavigate, Link} from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios'
import Loader from '../Components/Loader';
import BillCard from '../Components/BillCard';
import Login from '../Components/Login/Login';
import Billboard from '../Components/BillStuff/Billboard';

const Home = () => {
    const { currentUser, setCurrentUser } = useContext(userContext)
    const navigate = useNavigate()
    console.log(currentUser)
    useEffect(() => {
        if(!currentUser){
            navigate("/login")
        }
    })
    return(
        <div>
            <div className='flex justify-center'>
                <Link to={`/createbill`} className="bg-red-900 border rounded font-bold text-xl p-3 mt-2">
                    Créer un Bill :D
                </Link>
            </div>
            <Billboard />
        </div>
        
    )
}

export default Home