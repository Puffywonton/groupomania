import React, { useContext }  from 'react';
import { userContext } from "../Context/userContext"
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Billboard from '../Components/BillStuff/Billboard';
import { Button } from "@mui/material";
import MuiButton from '../Components/MuiStuff/MuiButton';

const Home = () => {
    console.log('hello')
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
                {MuiButton("Qu'avez vous à dire aujourd'hui?",navigateCreateBill)}
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