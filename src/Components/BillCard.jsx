import React from 'react'
import { Link } from 'react-router-dom'
// import DeleteBill from './BillStuff/DeleteBill'
import BillCardSettingsBox from './BillStuff/BillCardSettingsBox'
import BillCardLikeBox from './BillStuff/BillCardLikeBox'

const BillCard = (props) => {
    return(
        <div className='m-3 border rounded overflow-hidden'>
            <div className='p-3'>
                <div className='font-bold text-xl mb-3 flex justify-between'>
                    <Link to={`/bill/${props.bill._id}`}>
                        {props.bill.title}
                    </Link>
                    <BillCardSettingsBox 
                        bill = {props.bill}
                    />
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
            <BillCardLikeBox 
                bill = {props.bill}
                setLikeUpdate = {props.setLikeUpdate}
                LikeUpdate = {props.LikeUpdate}
            />
        </div>
    )
}

export default BillCard