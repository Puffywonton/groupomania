import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import BillCreaModForm from './BillCreaModForm';
const Swal = require('sweetalert2')

const BillCreator = () => {
    const url = "http://localhost:8000/api/billboard"
    let tokenStr = JSON.parse(localStorage.getItem('token'))

    const navigate = useNavigate()
    
    const [values, setValues] = useState({
        title:"",
        text:"",
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
        if(dataIsCorrect){
            axios.post(url, values, {
                headers: {
                    'Authorization': `Bearer ${tokenStr}`,
                    'Content-Type': 'multipart/form-data'
                  },
            })
            .then(response => {
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Bill crée',
                    showConfirmButton: false,
                    timer: 1500
                  })
                navigateHome()
            })
            .catch(catchErrors => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: catchErrors,
                    showConfirmButton: false,
                    timer: 1500
                  })
                navigateHome()
            })
        }
    }, [navigate, dataIsCorrect, values, tokenStr])

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

export default BillCreator