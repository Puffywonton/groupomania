// import { Link } from "@mui/material";
import { Link } from 'react-router-dom'
import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";


const BillCardSettingsBox = (props) => {
    const navigate = useNavigate()

    const HandleBillDelete = (event) => {
        console.log("BOTARD deleting bill", event.target.id)
        const url = `http://localhost:8000/api/billboard/${event.target.id}`
        const navigateHome = () => {
            navigate('/')
        }
        const tokenStr = JSON.parse(localStorage.getItem('token'))
        axios.delete(url, {
            headers: {
                'Authorization': `Bearer ${tokenStr}`
            }
            })
            .then(response => {
                console.log("bill deleted",response)
                navigateHome()

            })
            .catch(error => {
                console.log("error, error")
            })
    }

    return(
            <Box>
                <Link className='text-xs' to={`/modifybill/${props.bill._id}`}>
                    MODIFIER
                </Link>
                <div className='text-xs' id={props.bill._id} onClick={HandleBillDelete}>
                    Delete
                </div>
            </Box>
    )
}

export default BillCardSettingsBox