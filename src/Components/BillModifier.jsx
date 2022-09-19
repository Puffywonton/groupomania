import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { userContext } from '../Context/userContext'
import BillModCard from './BillStuff/BillModCard'
import useGetOneBill from './BillStuff/useGetOneBill'
// import GetOneBill from './BillStuff/GetOneBill'
import { Box, Button, TextField } from "@mui/material";
import Loader from './Loader'

const BillModifier = () => {
    const navigate = useNavigate()
    
    const { id } = useParams()
    const url = `http://localhost:8000/api/billboard/${id}`
    // ajouter currentUser pour rediriger vers home si pas le bon user ou admin
    const { currentUser, setCurrentUser } = useContext(userContext)
    const tokenStr = JSON.parse(localStorage.getItem('token'))
    //get bill

    // let { bill } = useGetOneBill(id)
    const [bill, setBill] = useState({
        loading: false,
        data: null,
        error: false
    })
    useEffect(() => {        
        const tokenStr = JSON.parse(localStorage.getItem('token'))
        const url_bill = `http://localhost:8000/api/billboard/${id}`
        setBill({
            loading: true,
            data: null,
            error: false
        })
        axios.get(url_bill, {
            headers: {
                'Authorization': `Bearer ${tokenStr}`
              }
            })
                .then(response => {
                    setBill({
                        loading: false,
                        data: response.data,
                        error: false
                    })         
                    console.log("setBill",bill)
                })
                .catch(error => {
                    setBill({
                        loading: false,
                        data: error.message,
                        error: true
                    })
                })
    }, [id])

    const [values, setValues] = useState({
        hasTitleChanged: false,
        hasTextChanged: false,
        hasImgChanged: false,
    })
    
    const handleChange = (event) => {
        console.log(event.target.name)
        if(event.target.name === "text"){
            setValues({
                ...values,
                hasTextChanged: true,
                [event.target.name]: event.target.value,
            })
        }else{
            setValues({
                ...values,
                hasTitleChanged: true,
                [event.target.name]: event.target.value,
            })
        }
        
    }

    const handleSelectedImage = (event) => {
        setValues({
            ...values,
            hasImgChanged: true,
            image: event.target.files[0]
        })
        console.log(event.target.files[0])
        event.target.value = ""
    }

    const removeSelectedImage = (event) => {
        setValues({
            ...values,
            hasImgChanged: true,
            image: "",
        })
        delete values.image
    }
    
    const [dataIsCorrect, setDataIsCorrect] = useState(false)

    const FormSubmit = (event) => {
        event.preventDefault()
        
        if(!values.hasTextChanged){
            console.log("test 456")
            setValues({
                ...values,
                text: bill.data.text,
            })
        }
        if(!values.hasTitleChanged){
            console.log("test 123")
            setValues({
                ...values,
                title: bill.data.title,
            })
        }
        
        setDataIsCorrect(true)
    }

    useEffect(() => {
        console.log(values)
        const navigateHome = () => {
            navigate('/')
        }
        if(dataIsCorrect){
            axios.put(url, values, {
                headers: {
                    'Authorization': `Bearer ${tokenStr}`,
                    'Content-Type': 'multipart/form-data'
                  },
            })
            .then(response => {
                console.log(response.data)
                navigateHome()
            })
            .catch(catchErrors => {
                console.log(catchErrors)
            })
        }
    }, [navigate, dataIsCorrect, values, tokenStr, url])


    let content = null

    if(bill.loading){
        content = <Loader />
    }

    if(bill.error){
        content = <div>{bill.data}</div>
    }

    if(bill.data && !bill.error){

        content =
        // <BillModCard
        //     bill = {bill.data}
        //     handleSelectedImage = {handleSelectedImage}
        //     handleChange = {handleChange}
        //     FormSubmit = {FormSubmit}
        //     removeSelectedImage = {removeSelectedImage}

        // />
        <div className="bg-red-400 bloc m-4 p-3 rounded flex-col items-center justify-center">
            <Box>
                <div className='border-b pb-3 font-bold'>Creez/modifiez une publication </div>
            </Box>
            <Box pt={2}>
                <TextField
                    fullWidth
                    required
                    name='title'
                    id="title" 
                    label="titre" 
                    variant="outlined"
                    value={values.hasTitleChanged ? values.title : bill.data.title}
                    onChange={handleChange}
                />
            </Box>
            {values.image && (
                <Box pt={2}>
                    <img
                    src={URL.createObjectURL(values.image)}
                    alt="Thumb"
                    />
                    <Button 
                    variant='contained'
                    onClick={removeSelectedImage}
                    >
                        supprimer
                    </Button>
                </Box>
            )}
            {bill.data.imageUrl && !values.hasImgChanged ? (
                <Box pt={2}>
                    <img
                    src={bill.data.imageUrl}
                    alt="Thumb"
                    />
                    <Button 
                    variant='contained'
                    onClick={removeSelectedImage}
                    >
                        supprimer
                    </Button>
                </Box>
            ): null}
            <Box pt={2}>
                <TextField 
                    fullWidth
                    label="un texte interessant"
                    multiline
                    minRows={6}
                    maxRows={10}
                    name='text'
                    id="text"
                    variant="outlined" 
                    value={values.hasTextChanged ? values.text : bill.data.text}
                    onChange={handleChange}
                />
            </Box>
            <Box pt={1}>
                <Button 
                    component="label"
                >
                    Ajouter/Modifier une image
                    <input 
                        hidden
                        accept="image/*" 
                        multiple
                        type="file"
                        name='image'
                        id='image'
                        onChange={handleSelectedImage}
                    />
                </Button>
            </Box>
            <Box pt={1}>
                <Button 
                    variant='contained'
                    onClick={FormSubmit}
                >
                    envoyer/modifier
                </Button>  
            </Box>
        </div>
    }

    return(
        <div>{content}</div>
    )
}

export default BillModifier