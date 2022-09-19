import axios from 'axios'
import React, { useContext, useEffect, useState }  from 'react';
import {Routes, Route, useNavigate, Link} from 'react-router-dom';
import BillCard from '../BillCard';
import Loader from '../Loader';
import { userContext } from '../../Context/userContext';
import useGetAllBills from './useGetAllBills';

const Billboard = () => {
    const { currentUser, setCurrentUser } = useContext(userContext) 
    const tokenStr = JSON.parse(localStorage.getItem('token'))

    const {billboard} = useGetAllBills()
    
    const [likeUpdate, setLikeUpdate] = useState({
        isTrue: false,
        url:"",
        data: {
            userId: currentUser,
            like: ""
        } 
    })

    useEffect(() => {
        if(likeUpdate.isTrue){
            axios.post(likeUpdate.url, likeUpdate.data, {
                headers: {
                    'Authorization': `Bearer ${tokenStr}`
                  }
                })
                    .then(response => {
                        console.log(response)
                        console.log("post updated")
                        
                    })
                    .catch(error => {
                        console.log(error.message)
                        console.log("error")
                    })
        }
        likeUpdate.isTrue = false
    }, [likeUpdate, tokenStr])


    let content = null
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
                    setLikeUpdate={setLikeUpdate}
                    likeUpdate={likeUpdate}
                />
            </div>
        )
    }

    return(
        <div>
            {content}
        </div>
    )
}

export default Billboard
