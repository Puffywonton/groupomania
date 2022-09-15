import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { userContext } from '../Context/userContext'

const BillCard = (props) => {
    //recup avec les props la situation des likes
    const { currentUser, setCurrentUser } = useContext(userContext)
    const [like, setLike] = useState(false)
    const [dislike, setDislike] = useState(false)

    console.log(currentUser)
    // for(let user in props.bill.usersLiked){
    //     if(props.bill.usersLiked[user] === currentUser){
    //         setLike(true)
    //     }
    // }
    // for(let user in props.bill.usersDisliked){
    //     if(props.bill.usersDisliked[user] === currentUser){
    //         setDislike(true)
    //     }
    // }

    
    //il faudra modif ici pour directement mettre un like/disklike si le user l'a fait auparavaement


    //utiliser id??? 
    const handleLike = (event) => {
        console.log(event.target.id)
        if(event.target.id === "like"){
            setLike(true)
            console.log("LIKE")
        }else{
            setDislike(true)
            console.log("DISLIKE")
        }
    }

    // useEffect(() => {
    //     if(like){
    //         console.log("coucou")
    //     }
    // },[like])



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
                    // style={{'backgroundImage': `url('${props.bill.imageUrl})`}}
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
                <div className='flex justify-center border w-1/2 text-center' id="like" onClick={handleLike}>
                    <FontAwesomeIcon className="pt-1 pr-1" icon={faArrowUp} />
                    <div>{props.bill.likes}</div>
                </div>
                <div className='flex justify-center border w-1/2 text-center' id="dislike" onClick={handleLike}>
                    <FontAwesomeIcon className="pt-1 pr-1" icon={faArrowDown} />
                    <div>{props.bill.dislikes}</div>
                </div>
            </div>
        </div>
    )
}

export default BillCard