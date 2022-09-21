import React, { useContext, useState }  from 'react';
import { userContext } from "../Context/userContext"
import {Routes, Route, useNavigate, Link} from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios'
import Loader from '../Components/Loader';
import BillCard from '../Components/BillCard';
import Login from '../Components/Login/Login';
import Billboard from '../Components/BillStuff/Billboard';
import { Button } from "@mui/material";
const Home = () => {
    const { currentUser, setCurrentUser } = useContext(userContext)
    const navigate = useNavigate()
    const navigateCreateBill = () => {
        navigate('/createbill')
    }
    
    const logout = () => {
        localStorage.clear()


        setCurrentUser("")
        navigate('/login')
    }

    useEffect(() => {
        console.log("currentUser",!currentUser.userId,"currentuser vide",currentUser.userId==="")
        // if(!currentUser && currentUser === ""){
        //     navigate("/login")
        // }
        if(!currentUser.userId){
            navigate("/login")
        }

    })
    return(
        <div className="flex-col justify-center max-w-screen-lg mx-auto bg-groupomania-red shadow-2xl min-h-screen">
            <div className='pt-5 flex justify-center'>  
                <Button 
                    component="label"
                    variant='contained'
                    onClick={navigateCreateBill}                  
                >
                    Qu'avez vous à dire aujourd'hui?                   
                </Button>
            </div>
            <Button onClick={logout}>
                test
            </Button>
            <div>
                Bienvenue {currentUser.userName}
            </div>
            <Billboard />
        </div>        
    )
}

export default Home