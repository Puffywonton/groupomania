import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { userContext } from '../Context/userContext'

const BillCard = (props) => {
    console.log('gutten tag')
    const { currentUser, setCurrentUser } = useContext(userContext)

    const didUserLike = props.bill.usersLiked.find(user => user === currentUser )
    const didUserDislike = props.bill.usersDisliked.find(user => user === currentUser)

    const handleLike = (event) => {
        if(event.target.id === "like"){
            if(didUserLike){
                console.log("already liked removing like")
                props.setLikeUpdate({
                    ...props.likeUpdate,
                    data: {
                        userId: currentUser,
                        like: "0"
                    },
                    isTrue: true,
                    url: `http://localhost:8000/api/billboard/${props.bill._id}/like`
                })
            }else{
                console.log("LIKE")
                props.setLikeUpdate({
                    ...props.likeUpdate,
                    data: {
                        userId: currentUser,
                        like: "1"
                    },
                    isTrue: true,
                    url: `http://localhost:8000/api/billboard/${props.bill._id}/like`
                })
            }           
        }else{
            if(didUserDislike){
                console.log("already disliked removing dislike")
                props.setLikeUpdate({
                    ...props.likeUpdate,
                    data: {
                        userId: currentUser,
                        like: "0"
                    },
                    isTrue: true,
                    url: `http://localhost:8000/api/billboard/${props.bill._id}/like`
                })
            }else{
                props.setLikeUpdate({
                    ...props.likeUpdate,
                    data: {
                        userId: currentUser,
                        like: "-1"
                    },
                    isTrue: true,
                    url: `http://localhost:8000/api/billboard/${props.bill._id}/like`
                })
            }
        }
    }
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