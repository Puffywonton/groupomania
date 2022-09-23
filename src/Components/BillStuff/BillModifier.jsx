import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BillCreaModForm from './BillCreaModForm';
const Swal = require('sweetalert2')


const BillModifier = (props) => {
    
    console.log("picture", props.bill.imageUrl)
    const navigate = useNavigate()
    
    const { id } = useParams()
    const url = `http://localhost:8000/api/billboard/${id}`

    const tokenStr = JSON.parse(localStorage.getItem('token'))

    const [values, setValues] = useState({
        title: props.bill.title,
        text: props.bill.text,
        image: props.bill.imageUrl
    })

    const [dataIsCorrect, setDataIsCorrect] = useState(false)

    const FormSubmit = (event) => {
        event.preventDefault()       
        setDataIsCorrect(true)
    }
    
    useEffect(() => {
        const navigateHome = () => {
            navigate('/')
        }
        console.log(values)       
        if(dataIsCorrect){
            axios.put(url, values, {
                headers: {
                    'Authorization': `Bearer ${tokenStr}`,
                    'Content-Type': 'multipart/form-data'
                  },
            })
            .then(response => {
                console.log(response.data)
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Bill modifié',
                    showConfirmButton: false,
                    timer: 500
                  })
                navigateHome()
            })
            .catch(catchErrors => {
                console.log(catchErrors)
            })
        }
    }, [dataIsCorrect, values, tokenStr, url, navigate])

    return(
        <div>
            {BillCreaModForm({
                values: values,
                setValues: setValues,
                FormSubmit: FormSubmit,
            })}
        </div>         
    )
}

export default BillModifier