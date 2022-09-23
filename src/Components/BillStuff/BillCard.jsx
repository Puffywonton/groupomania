import React, { useContext } from 'react'
import BillCardSettingsBox from './BillCardSettingsBox'
import BillCardLikeBox from './BillCardLikeBox'
import { userContext } from '../../Context/userContext'

const BillCard = (props) => {
    const { currentUser } = useContext(userContext)
    let activateSettings = null

    if((currentUser.userId === props.bill.userId) || currentUser.isAdmin){
        activateSettings =  <BillCardSettingsBox className="p-3"
                                bill = {props.bill}
                                update = {props.update}
                            />
    }

    return(
        <div className='max-w-2xl mx-auto border rounded overflow-hidden bg-groupomania-pink mb-10'>
            <div className='p-3'>
                <div className='font-bold border-b text-xl mb-5 flex justify-between'>
                    <h2 className='mb-3'>{props.bill.title}</h2>
                    {activateSettings}
                </div>
            </div>
            {props.bill.imageUrl &&
                <div
                    style={{'backgroundImage': `url('${props.bill.imageUrl}')`}}
                    className="w-full h-96 bg-blue bg-cover"
                />

            }
            <div className='p-3 mb-3'>
                {props.bill.text}
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