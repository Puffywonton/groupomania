import axios from "axios"
const Swal = require('sweetalert2')

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
            Swal.fire({
                icon: 'success',
                title: 'Supprimé',
                showConfirmButton: false,
                timer: 500
              }).then((result) => {
                props.update({
                    reload: true
                })
              })
        })
        .catch(error => {
            console.log("error", error)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
                showConfirmButton: false,
                timer: 1500
              }).then((result) => {
                props.update({
                    reload: true
                })
              })
        })
}

export default HandleBillDelete