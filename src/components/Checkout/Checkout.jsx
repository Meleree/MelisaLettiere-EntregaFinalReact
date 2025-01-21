import { useState, useContext } from "react"
import FormCheckout from "./FormCheckout"
import { CartContext } from "../../Context/CartContext.jsx" 
import { Timestamp, collection, addDoc } from "firebase/firestore"
import { Link } from "react-router-dom"
import { db } from "../../db/db.js"
import validateForm from "../../utils/ValidateForm.js"
import { toast } from "react-toastify"
import "./FormCheckout.css"

const Checkout = () => {
  const [dataForm, setDataForm] = useState({
    fullname: "",
    phone: "",
    email: ""
  })
  const [orderId, setOrderId] = useState(null)
  const { cart, totalPrice } = useContext(CartContext)

  const handleChangeInput = (event) => {
    setDataForm({ ...dataForm, [event.target.name]: event.target.value })
  }

  const handleSubmitForm = async (event) => {
    event.preventDefault()
    const order = {
      buyer: { ...dataForm },
      products: [...cart],
      total: totalPrice(),
      date: Timestamp.fromDate(new Date())
    }

    const response = await validateForm(dataForm)
    if(response.status === "success"){
      await uploadOrder(order)
    }else{
      toast.warn(response.message)
    }
  }

  const uploadOrder = async (newOrder) => {
    try {
      const ordersRef = collection(db, "orders")
      const response = await addDoc(ordersRef, newOrder)
      setOrderId(response.id)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="checkout">
      {
        orderId ? (
          <div>
            <h2>ORDEN ENVIADA 😁</h2>
            <p>NUMERO DE SEGUIMIENTO: {orderId}</p>
            <Link to="/" className="button-to-home">INICIO</Link>
          </div>
        ) : (
          <FormCheckout dataForm={dataForm} handleChangeInput={handleChangeInput} handleSubmitForm={handleSubmitForm} />
        )
      }
    </div>
  )
}
export default Checkout