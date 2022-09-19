import React from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../Components/Loader'
import BillCard from '../Components/BillCard'
import useGetOneBill from '../Components/BillStuff/useGetOneBill'

const Bill = () => {
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
        <BillCard 
            bill = {bill.data}
        />
    }

    return(
        <div>
            {content}
        </div>   
    )
}

export default Bill