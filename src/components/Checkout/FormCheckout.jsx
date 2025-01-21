import React from 'react';

const FormCheckout = ({ dataForm, handleChangeInput, handleSubmitForm }) => {
  return (
    <form onSubmit={handleSubmitForm} className="form-checkout">
      <h2>CHECKOUT</h2>

      <div className="content-input">
        <label className="label">NOMBRE Y APELLIDO: </label>
        <input
          type="text"
          name="fullname"
          value={dataForm.fullname || ''} 
          onChange={handleChangeInput}
        />
      </div>

      <div className="content-input">
        <label className="label">DNI: </label>
        <input
          type="number"
          name="dni"
          value={dataForm.dni || ''} 
          onChange={handleChangeInput}
        />
      </div>

      <div className="content-input">
        <label className="label">TELEFONO:</label>
        <input
          type="number"
          name="phone"
          value={dataForm.phone || ''}
          onChange={handleChangeInput}
        />
      </div>

      <div className="content-input">
        <label className="label">EMAIL:</label>
        <input
          type="email"
          name="email"
          value={dataForm.email || ''} 
          onChange={handleChangeInput}
        />
      </div>

      <button type="submit" className="button-send-order">
        ENVIAR ORDEN
      </button>
    </form>
  );
};

export default FormCheckout;
