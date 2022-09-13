import React, { useContext, useState }  from 'react';
import { userContext } from "../Context/userContext"
import {Routes, Route, useNavigate, Link} from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios'
import Loader from '../Components/Loader';
import BillCard from '../Components/BillCard';

const Home = () => {
    const { currentUser, setCurrentUser } = useContext(userContext)
    const navigate = useNavigate()
    

    const url = 'http://localhost:8000/api/billboard'
    let tokenStr = JSON.parse(localStorage.getItem('token'))

    const [billboard, setBillboard] = useState({
        loading: false,
        data: null,
        error: false
    })

    let content = null

    useEffect(() => {
        if (!currentUser) {
            navigate('/login')
        }else{
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
        }
    }, [url, navigate, currentUser, tokenStr])

    if(billboard.loading){
        content = <Loader />
    }

    if(billboard.error){
        content = <div>{billboard.data}</div>
    }

    if(billboard.data && !billboard.error){
        content = 
        billboard.data.map((bill) => 
            <div key={bill._id}>
                <BillCard 
                    bill = {bill}
                />
            </div>
        )
    }
    return(
        <div>
            <div className='flex justify-center'>
                <Link to={`/createbill`} className="bg-red-900 border rounded font-bold text-xl p-3 mt-2">
                    Créer un Bill :D
                </Link>
            </div>
            {content}
        </div>
    )
}

export default Home