import React from 'react'
import { Link } from 'react-router-dom'

const BillCard = (props) => {
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
                    // style={{'backgroundImage': `url('${props.bill.imageUrl})`}}
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
                <div className='bg-red-600 w-1/2 text-center'>
                    likes {props.bill.likes}                  
                </div>
                <div className='bg-blue-600 w-1/2 text-center'>
                    dislikes {props.bill.dislikes}
                </div>
            </div>
        </div>
    )
}

export default BillCard