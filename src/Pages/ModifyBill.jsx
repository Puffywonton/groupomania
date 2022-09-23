import React from 'react'
import { useParams } from 'react-router-dom'
import BillModifier from '../Components/BillStuff/BillModifier'
import useGetOneBill from '../Components/BillStuff/useGetOneBill'
import Loader from '../Components/Loader'

const ModifyBill = () => {
    const { id } = useParams()
    const { bill } = useGetOneBill(id)

    let content = null

    if(bill.loading){
        content = <Loader />
    }
    if(bill.error){
        content = <div>{bill.data}</div>
    }
    if(bill.data && !bill.error){
        content = 
        <BillModifier 
            bill = {bill.data}
        />
    }

    return(
        <div>
            {content}
        </div>
    )
}

export default ModifyBill