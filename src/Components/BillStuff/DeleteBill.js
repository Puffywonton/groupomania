import axios from "axios"

const HandleBillDelete = (props) => {
    console.log(props.bill)
    console.log("deleting bill", props.bill._id)
    const url = `http://localhost:8000/api/billboard/${props.bill._id}`
    const tokenStr = JSON.parse(localStorage.getItem('token'))
    axios.delete(url, {
        headers: {
            'Authorization': `Bearer ${tokenStr}`
        }
        })
        .then(response => {
            console.log("bill deleted",response)
            props.update({
                reload: true
            })

        })
        .catch(error => {
            console.log("error, error")
        })
}

export default HandleBillDelete