// import { Link } from "@mui/material";
import { Link } from 'react-router-dom'
import { Box, Button } from "@mui/material";
import axios from "axios";
import React from "react";
import HandleBillDelete from './DeleteBill';


const BillCardSettingsBox = (props) => {
    return(
            <Box>
                <Link className='text-xs' to={`/modifybill/${props.bill._id}`}>
                    MODIFIER
                </Link>
                <Button className='text-xs' id={props.bill._id} onClick={() => HandleBillDelete(props)}>
                    DELETE
                </Button>
            </Box>
    )
}

export default BillCardSettingsBox