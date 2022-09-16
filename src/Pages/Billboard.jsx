import axios from 'axios'
import React, { useContext, useEffect, useState }  from 'react';
import {Routes, Route, useNavigate, Link} from 'react-router-dom';
import BillCard from '../Components/BillCard';
import Loader from '../Components/Loader';

const Billboard = () => {
    // const { currentUser, setCurrentUser } = useContext(userContext)
    // const navigate = useNavigate()

    const url = 'http://localhost:8000/api/billboard'
    
    
    const [billboard, setBillboard] = useState({
        loading: false,
        data: null,
        error: false
    })

    let content = null

    useEffect(() => {
        const tokenStr = JSON.parse(localStorage.getItem('token'))
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
                console.log("BILLBOARD RECEIVED",response)
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
    }, [])

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

export default Billboard
