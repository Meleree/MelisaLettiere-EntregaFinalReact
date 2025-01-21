import { object, string, number } from "yup";

let userSchema = object({
  fullname: string().min(3, "EL NOMBRE DEBE TENER 3 LETRAS COMO MINIMO").required("EL NOMBRE ES REQUERIDO") ,
  phone: number().positive().required("EL TELEFONO ES REQUERIDO"),
  email: string().email().required("EL MAIL ES REQUERIDO"),
  dni: number().positive().required("EL DNI ES REQUERIDO"),
})

const validateForm = async(dataForm) => {
  try {
    await userSchema.validate(dataForm)
    return { status: "success", message: "VALIDACIONES CORRECTAS!" }
  } catch (error) {
    return { status: "error", message: error.message }
  }
}

export default validateForm;