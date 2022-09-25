import React, { useContext }  from 'react';
import { userContext } from "../Context/userContext"
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Billboard from '../Components/BillStuff/Billboard';
import { Button } from "@mui/material";
import MuiButton from '../Components/MuiStuff/MuiButton';

const Home = () => {
    const { currentUser, setCurrentUser } = useContext(userContext)
    const navigate = useNavigate()
    const navigateCreateBill = () => {
        navigate('/createbill')
    }
    useEffect(() => {
        if(!currentUser.userId){
            navigate("/login")
        }
    })
    return(
        <div className="flex-col justify-center max-w-screen-lg mx-auto h-auto">
            <div className='pt-8 text-xl flex justify-center'>
                Bienvenue {currentUser.userName}
            </div>
            <div className='py-8 flex justify-center'>  
                {MuiButton("Qu'avez vous à dire aujourd'hui?",navigateCreateBill)}
            </div>
            <Billboard />
        </div>        
    )
}

export default Home