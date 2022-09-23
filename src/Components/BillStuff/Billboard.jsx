import React from 'react';
import BillCard from './BillCard';
import Loader from '../Loader';
import useGetAllBills from './useGetAllBills';

const Billboard = () => {
    const {billboard, setBillboard} = useGetAllBills()
 
    let content = null


    if(billboard.loading){
        content = <Loader />
    }

    if(billboard.error){
        content = <div>{billboard.data}</div>
    }

    if(billboard.data && !billboard.error){
        content = 
        billboard.data.map((bill) => 
            <div key={bill._id}>
                <BillCard 
                    bill = {bill}
                    update = {setBillboard}
                />
            </div>
        )
    }

    return(
        
            <div className="bloc p-3 flex-col items-center justify-center">
                {content}
            </div>
    )
}

export default Billboard
