import React from 'react'
import axios from 'axios'

const Bill = () => {
    const url = 'http://localhost:8000/api/billboard/630cdf14222de57b654da37e'
    let tokenStr = JSON.parse(localStorage.getItem('token'))


    var bills = {}
    axios.get(url, {
        headers: {
            'Authorization': `Bearer ${tokenStr}`
          }
        })
            .then(response => {
                bills = response.data
                console.log(bills,"hello")
                return(
                    <div>hello</div>
                )
                
            })
            .catch(catchErrors => {
                console.log(catchErrors)
            })
            .then(data => {
                return(
                    <div>hello</div>
                )
            })
    return(
        <div>
            <h1>this is the bill page</h1>
        </div>   
    )
}

export default Bill