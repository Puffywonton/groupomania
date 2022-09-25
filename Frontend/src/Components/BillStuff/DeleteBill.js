import axios from "axios"
const Swal = require('sweetalert2')

const HandleBillDelete = (props) => {
    const url = `http://localhost:8000/api/billboard/${props.bill._id}`
    const tokenStr = JSON.parse(localStorage.getItem('token'))
    axios.delete(url, {
        headers: {
            'Authorization': `Bearer ${tokenStr}`
        }
        })
        .then(response => {
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