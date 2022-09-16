import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { userContext } from '../Context/userContext'
import axios from 'axios'

const BillCard = (props) => {
    
    const { currentUser, setCurrentUser } = useContext(userContext)

    const url = `http://localhost:8000/api/billboard/${props.bill._id}/like`
    const tokenStr = JSON.parse(localStorage.getItem('token'))

    const [values, setValues] = useState({
        userId: userContext,
    })

    const [toto, setToto] = useState(false)
    //recup avec les props la situation des likes
    const didUserLike = props.bill.usersLiked.find(user => user === currentUser )
    const didUserDislike = props.bill.usersDisliked.find(user => user === currentUser)
    //il faudra modif ici pour directement mettre un like/disklike si le user l'a fait auparavaement

    //utiliser id??? 
    const handleLike = (event) => {
        if(event.target.id === "like"){
            if(didUserLike){
                console.log("already liked removing like")
                setValues({
                    ...values,
                    like:"0"
                })
            }else{
                console.log("LIKE")
                setValues({
                    ...values,
                    like:"1"
                })
            }           
        }else{
            if(didUserDislike){
                console.log("already disliked removing dislike")
                setValues({
                    ...values,
                    like:"0"
                })
            }else{
                console.log("DISLIKE")
                setValues({
                    ...values,
                    like:"-1"
                })
            }
        }
        setToto(true)
    }
    useEffect(() => {
        if(toto){
            setToto(false)
            console.log("sending aPI")
            axios.post(url, values,{
                headers: {
                    'Authorization': `Bearer ${tokenStr}`
                }
            })
            .then(response => {
                console.log("hello")
                setToto(false)
                // console.log(response.data)
            })
            .catch(catchErrors => {
                console.log("goodbye")
                setToto(false)
                // console.log(catchErrors)
            })
        }       
    }, [toto])


    return(
        <div className='m-3 border rounded overflow-hidden'>
            <div className='p-3'>
                <div className='font-bold text-xl mb-3'>
                    <Link to={`/bill/${props.bill._id}`}>
                        {props.bill.title}
                    </Link>
                </div>
            </div>
            <Link to={`/bill/${props.bill._id}`}>
                <div
                    style={{'backgroundImage': `url('${props.bill.imageUrl}')`}}
                    className="w-full h-64 bg-blue bg-cover"
                />
            </Link>
            <div className='p-3 mb-3'>
                    <Link to={`/bill/${props.bill._id}`}>
                        {props.bill.text}
                    </Link>
            </div>
            <div className='flex'>
                <div className={`flex justify-center border w-1/2 text-center' ${didUserLike ? `bg-red-500` : null}`} id="like" onClick={handleLike}>
                    <FontAwesomeIcon className="pt-1 pr-1" icon={faArrowUp} />
                    <div>{props.bill.likes}</div>
                </div>
                <div className={`flex justify-center border w-1/2 text-center' ${didUserDislike ? `bg-red-500` : null}`} id="dislike" onClick={handleLike}>
                    <FontAwesomeIcon className="pt-1 pr-1" icon={faArrowDown} />
                    <div>{props.bill.dislikes}</div>
                </div>
            </div>
        </div>
    )
}

export default BillCard