import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { userContext } from '../../Context/userContext'
import { useEffect } from "react";
import axios from "axios";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


import MuiToggleButton from "@mui/material/ToggleButton";
import { styled } from "@mui/material/styles";

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

    // const ToggleButton = styled(MuiToggleButton)(({ selectedColor }) => ({
    //     "&.Mui-selected, &.Mui-selected:hover": {
    //       color: "black",
    //       backgroundColor: selectedColor
    //     }
    // }));
    const [toggleButton, setToggleButton] = useState({

    })
    useEffect(() => {
        if(billCardParams.userLikesBill){
            setToggleButton("like")
            console.log("youpi")
        }
        if(billCardParams.userDislikesBill){
            setToggleButton("dislike")
        }
    }, [billCardParams.userDislikesBill, billCardParams.userLikesBill])
    
    console.log(billCardParams)
    
    
    const handleLike = (event, status) => {
        if(status === "like"){
            console.log("click like")
                if(billCardParams.userDislikesBill){
                    console.log("REMOVING DISLIKE")
                    setBillCardParams({
                        userLikesBill: currentUser.userId,
                        billLikesCount: (billCardParams.billLikesCount+1),
                        userDislikesBill: "",
                        billDislikesCount: (billCardParams.billDislikesCount-1)
                    })
                }else{
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
            console.log("click dislike")
            if(billCardParams.userLikesBill){
                    console.log("REMOVING LIKE")
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
            console.log("click cancel")
            if(billCardParams.userLikesBill){
                console.log("removing like")
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
                console.log("removing dislike")
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
            className="flex space-between w-full"
            >
                <ToggleButton className="w-1/2" value="like"
                >
                    <FontAwesomeIcon fontSize="20" className="pr-1" icon={faArrowUp} />
                    <div className="text-lg">{billCardParams.billLikesCount}</div>
                </ToggleButton>
                <ToggleButton className="w-1/2" value="dislike">
                    <FontAwesomeIcon fontSize="20" className="pr-1" icon={faArrowDown} />
                    <div className="text-lg">{billCardParams.billDislikesCount}</div>
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
    )
}

export default BillCardLikeBox
