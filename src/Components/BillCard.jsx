import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import BillCardSettingsBox from './BillStuff/BillCardSettingsBox'
import BillCardLikeBox from './BillStuff/BillCardLikeBox'
import { userContext } from '../Context/userContext'

const BillCard = (props) => {
    const { currentUser } = useContext(userContext)

    let activateSettings = null

    if((currentUser.userId === props.bill.userId) || currentUser.isAdmin){
        activateSettings =  <BillCardSettingsBox 
                                bill = {props.bill}
                                update = {props.update}
                            />
    }

    return(
        <div className='m-3 border rounded overflow-hidden'>
            <div className='p-3'>
                <div className='font-bold text-xl mb-3 flex justify-between'>
                    <Link to={`/bill/${props.bill._id}`}>
                        {props.bill.title}
                    </Link>                  
                    {activateSettings}
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