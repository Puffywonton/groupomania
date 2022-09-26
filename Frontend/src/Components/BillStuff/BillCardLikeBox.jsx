import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { userContext } from '../../Context/userContext'
import { useEffect } from "react";
import axios from "axios";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
const Swal = require('sweetalert2')

const BillCardLikeBox = (props) => {
    const { currentUser } = useContext(userContext)
    const tokenStr = JSON.parse(localStorage.getItem('token'))
    const [ billCardParams, setBillCardParams ] = useState({
        userLikesBill: props.bill.usersLiked.find(user => user === currentUser.userId ),
        userDislikesBill: props.bill.usersDisliked.find(user => user === currentUser.userId),
        billLikesCount: (props.bill.likes ? props.bill.likes : 0),
        billDislikesCount: (props.bill.dislikes ? props.bill.dislikes : 0)
    })
    
    const [likeUpdate, setLikeUpdate] = useState({
        isTrue: false,
        url:"",
        data: {
            userId: currentUser.userId,
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
                        Swal.fire({
                            position: 'top',
                            icon: 'success',
                            title: 'like/dislike enregistré',
                            showConfirmButton: false,
                            timer: 650
                          })   
                    })
                    .catch(error => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: error,
                            showConfirmButton: false,
                            timer: 1500
                          })
                    })
        }
        likeUpdate.isTrue = false
    }, [likeUpdate, tokenStr])

    const [toggleButton, setToggleButton] = useState({

    })
    useEffect(() => {
        if(billCardParams.userLikesBill){
            setToggleButton("like")
        }
        if(billCardParams.userDislikesBill){
            setToggleButton("dislike")
        }
    }, [billCardParams.userDislikesBill, billCardParams.userLikesBill])
       
    const handleLike = (event, status) => {
        if(status === "like"){
            //user clicked like
                if(billCardParams.userDislikesBill){
                    //user already disliked removing dislike and adding like
                    setBillCardParams({
                        userLikesBill: currentUser.userId,
                        billLikesCount: (billCardParams.billLikesCount+1),
                        userDislikesBill: "",
                        billDislikesCount: (billCardParams.billDislikesCount-1)
                    })
                }else{
                    //adding like
                    setBillCardParams({
                        ...billCardParams,
                        userLikesBill: currentUser.userId,
                        billLikesCount: (billCardParams.billLikesCount+1),
                    })
                }               
                setLikeUpdate({
                    ...likeUpdate,
                    data: {
                        userId: currentUser.userId,
                        like: "1"
                    },
                    isTrue: true,
                    url: `http://localhost:8000/api/billboard/${props.bill._id}/like`
                })
        }
        if(status === "dislike"){
            //user clicked dislike
            if(billCardParams.userLikesBill){
                    //user already liked removing like and adding dislike
                    setBillCardParams({
                        userDislikesBill:currentUser.userId,
                        billDislikesCount: (billCardParams.billDislikesCount+1),
                        userLikesBill: "",
                        billLikesCount: (billCardParams.billLikesCount-1)
                    })
                }else{
                    setBillCardParams({
                        ...billCardParams,
                        userDislikesBill:currentUser.userId,
                        billDislikesCount: (billCardParams.billDislikesCount+1),
                    })
                }               
                setLikeUpdate({
                    ...likeUpdate,
                    data: {
                        userId: currentUser.userId,
                        like: "-1"
                    },
                    isTrue: true,
                    url: `http://localhost:8000/api/billboard/${props.bill._id}/like`
                })
        }
        if(status === null){
            //user wants to cancel like/dislike
            if(billCardParams.userLikesBill){
                //already liked removing like
                setBillCardParams({
                    ...billCardParams,
                    userLikesBill:"",
                    billLikesCount: (billCardParams.billLikesCount-1)
                })
                setLikeUpdate({
                    ...likeUpdate,
                    data: {
                        userId: currentUser.userId,
                        like: "0"
                    },
                    isTrue: true,
                    url: `http://localhost:8000/api/billboard/${props.bill._id}/like`
                })
            }
            if(billCardParams.userDislikesBill){
                //already disliked removing dislike
                setBillCardParams({
                    ...billCardParams,
                    userDislikesBill:"",
                    billDislikesCount: (billCardParams.billDislikesCount-1)
                })
                setLikeUpdate({
                    ...likeUpdate,
                    data: {
                        userId: currentUser.userId,
                        like: "0"
                    },
                    isTrue: true,
                    url: `http://localhost:8000/api/billboard/${props.bill._id}/like`
                })
            }
        }
        setToggleButton(status)
    }

    return(
        <div className="w-f">
            <ToggleButtonGroup
            value={toggleButton}
            exclusive
            onChange={handleLike}
            aria-label="text alignment"
            className="flex justify-between w-full"
            sx={{ borderLeft: 0, borderRight: 0, borderRadius: 0}}
            >
                <ToggleButton className="w-1/2 rounded-none" value="like" sx={{ borderLeft: 0, borderBottom: 0, borderRadius: 0 }}
                >
                    <FontAwesomeIcon fontSize="20" className="pr-1" icon={faArrowUp}  />
                    <div className="text-lg">{billCardParams.billLikesCount}</div>
                </ToggleButton>
                <ToggleButton className="w-1/2 rounded-none" value="dislike" sx={{ borderRight: 0, borderBottom: 0, borderRadius: 0 }}
                >
                    <FontAwesomeIcon fontSize="20" className="pr-1" icon={faArrowDown} />
                    <div className="text-lg">{billCardParams.billDislikesCount}</div>
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
    )
}

export default BillCardLikeBox
