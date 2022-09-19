import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { userContext } from '../../Context/userContext'
import { useEffect } from "react";
import axios from "axios";

const BillCardLikeBox = (props) => {
    const { currentUser } = useContext(userContext)
    const tokenStr = JSON.parse(localStorage.getItem('token'))

    const [ billCardParams, setBillCardParams ] = useState({
        userLikesBill: props.bill.usersLiked.find(user => user === currentUser ),
        userDislikesBill: props.bill.usersDisliked.find(user => user === currentUser),
        billLikesCount: (props.bill.likes ? props.bill.likes : 0),
        billDislikesCount: (props.bill.dislikes ? props.bill.dislikes : 0)
    })
    
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

    const HandleLike = (event) => {
        if(event.target.id === "like"){
            console.log("USER CLICKED LIKED")
            if(billCardParams.userLikesBill){
                console.log("REMOVING LIKE")
                setBillCardParams({
                    ...billCardParams,
                    userLikesBill:"",
                    billLikesCount: (billCardParams.billLikesCount-1)
                })
                setLikeUpdate({
                    ...likeUpdate,
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
                setLikeUpdate({
                    ...likeUpdate,
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
                setLikeUpdate({
                    ...likeUpdate,
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
                setLikeUpdate({
                    ...likeUpdate,
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
        <div className='flex'>
                <div className={`flex justify-center border w-1/2 text-center' ${billCardParams.userLikesBill ? `bg-red-500` : null}`} id="like" onClick={HandleLike}>
                    <FontAwesomeIcon className="pt-1 pr-1" icon={faArrowUp} />
                    <div>{billCardParams.billLikesCount}</div>
                </div>
                <div className={`flex justify-center border w-1/2 text-center' ${billCardParams.userDislikesBill ? `bg-red-500` : null}`} id="dislike" onClick={HandleLike}>
                    <FontAwesomeIcon className="pt-1 pr-1" icon={faArrowDown} />
                    <div>{billCardParams.billDislikesCount}</div>
                </div>
        </div>
    )
}

export default BillCardLikeBox
