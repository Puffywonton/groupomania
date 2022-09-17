import axios from 'axios'
import React, { useContext, useEffect, useState }  from 'react';
import {Routes, Route, useNavigate, Link} from 'react-router-dom';
import BillCard from '../Components/BillCard';
import Loader from '../Components/Loader';
import { userContext } from '../Context/userContext';

const Billboard = () => {
    const { currentUser, setCurrentUser } = useContext(userContext)

    const url_billboard = 'http://localhost:8000/api/billboard'
    const tokenStr = JSON.parse(localStorage.getItem('token'))

    const [likeUpdate, setLikeUpdate] = useState({
        isTrue: false,
        url:"",
        data: {
            userId: currentUser,
            like: "1"
        } 
    })

    const [billboard, setBillboard] = useState({
        loading: false,
        data: null,
        error: false
    })

    let content = null


    const getBillBoard = () => {
        setBillboard({
            loading: true,
            data: null,
            error: false
        })
        axios.get(url_billboard, {
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
    }

    useEffect(() => {
        if(likeUpdate.isTrue){
            console.log("post like here",likeUpdate.data)
            axios.post(likeUpdate.url, likeUpdate.data, {
                headers: {
                    'Authorization': `Bearer ${tokenStr}`
                  }
                })
                    .then(response => {
                        console.log(response)
                        getBillBoard()
                        console.log("post updated")
                        
                    })
                    .catch(error => {
                        console.log(error.message)
                        console.log("error")
                    })
        }else{
            getBillBoard()
        }
        console.log("does it go here ?")
        likeUpdate.isTrue = false
    }, [likeUpdate.data, likeUpdate.isTrue, likeUpdate.url, likeUpdate, tokenStr])

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
