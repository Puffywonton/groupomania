import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { userContext } from '../Context/userContext'
import { Button } from '@mui/material'

const BillCard = (props) => {
    const { currentUser, setCurrentUser } = useContext(userContext)

    const [ billCardParams, setBillCardParams ] = useState({
        userLikesBill: props.bill.usersLiked.find(user => user === currentUser ),
        userDislikesBill: props.bill.usersDisliked.find(user => user === currentUser),
        billLikesCount: (props.bill.likes ? props.bill.likes : 0),
        billDislikesCount: (props.bill.dislikes ? props.bill.dislikes : 0)
    })

    const handleLike = (event) => {
        if(event.target.id === "like"){
            console.log("USER CLICKED LIKED")
            if(billCardParams.userLikesBill){
                console.log("REMOVING LIKE")
                setBillCardParams({
                    ...billCardParams,
                    userLikesBill:"",
                    billLikesCount: (billCardParams.billLikesCount-1)
                })
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
                console.log("LIKING POST")
                if(billCardParams.userDislikesBill){
                    console.log("REMOVING DISLIKE")
                    setBillCardParams({
                        userLikesBill: currentUser,
                        billLikesCount: (billCardParams.billLikesCount+1),
                        userDislikesBill: "",
                        billDislikesCount: (billCardParams.billDislikesCount-1)
                    })
                }else{
                    setBillCardParams({
                        ...billCardParams,
                        userLikesBill: currentUser,
                        billLikesCount: (billCardParams.billLikesCount+1),
                    })
                }
                
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
            console.log("USER CLICKED DISLIKE")
            if(billCardParams.userDislikesBill){
                console.log("REMOVING DISLIKE")
                setBillCardParams({
                    ...billCardParams,
                    userDislikesBill:"",
                    billDislikesCount: (billCardParams.billDislikesCount-1)
                })
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
                console.log("DISLIKING POST")
                if(billCardParams.userLikesBill){
                    console.log("REMOVING LIKE")
                    setBillCardParams({
                        userDislikesBill:currentUser,
                        billDislikesCount: (billCardParams.billDislikesCount+1),
                        userLikesBill: "",
                        billLikesCount: (billCardParams.billLikesCount-1)
                    })
                }else{
                    setBillCardParams({
                        ...billCardParams,
                        userDislikesBill:currentUser,
                        billDislikesCount: (billCardParams.billDislikesCount+1),
                    })
                }
                
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
        console.log(billCardParams,"what i like about you")
    }
    return(
        <div className='m-3 border rounded overflow-hidden'>
            <div className='p-3'>
                <div className='font-bold text-xl mb-3 flex justify-between'>
                    <Link to={`/bill/${props.bill._id}`}>
                        {props.bill.title}
                    </Link>
                    <Link className='text-xs' to={`/modifybill/${props.bill._id}`}>
                        MODIFIER
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
                <div className={`flex justify-center border w-1/2 text-center' ${billCardParams.userLikesBill ? `bg-red-500` : null}`} id="like" onClick={handleLike}>
                    <FontAwesomeIcon className="pt-1 pr-1" icon={faArrowUp} />
                    <div>{billCardParams.billLikesCount}</div>
                </div>
                <div className={`flex justify-center border w-1/2 text-center' ${billCardParams.userDislikesBill ? `bg-red-500` : null}`} id="dislike" onClick={handleLike}>
                    <FontAwesomeIcon className="pt-1 pr-1" icon={faArrowDown} />
                    <div>{billCardParams.billDislikesCount}</div>
                </div>
            </div>
        </div>
    )
}

export default BillCard