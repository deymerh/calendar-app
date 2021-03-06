import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './loginScreen.css';

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formLoginValues, handleLoginInputChange, reset] = useForm({
    lEmail: 'deymerh@hotmail.com',
    lPassword: '123456'
  });
  const { lEmail, lPassword } = formLoginValues;
  const [formRegisterValues, handleRegisterInputChange, reset2] = useForm({
    rName: 'Antonio',
    rEmail: 'deyer1227@gmail.com',
    rPassword1: '123456',
    rPassword2: '123456'
  });
  const { rName, rEmail, rPassword1, rPassword2 } = formRegisterValues;
  const handleLogin = (e) => {
    setLoading(true);
    e.preventDefault();
    dispatch(startLogin(lEmail, lPassword));
    setLoading(false);
  }
  const handleRegister = (e) => {
    setLoading(true);
    e.preventDefault();
    if (rPassword1 !== rPassword2) {
      setLoading(false);
      return Swal.fire('Error', 'Las contraseñas debe ser iguales', 'error');
    }
    dispatch(startRegister(rName, rEmail, rPassword1));
    setLoading(false);
  }
  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="lEmail"
                value={lEmail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="lPassword"
                value={lPassword}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                className="btnSubmit"
                value="Login"
                data-testid="bntLogin"
                disabled={loading}
              />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="rName"
                value={rName}
                onChange={handleRegisterInputChange}
                data-testid="rName"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="rEmail"
                value={rEmail}
                onChange={handleRegisterInputChange}
                data-testid="rEmail"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="rPassword1"
                value={rPassword1}
                data-testid="rPassword1"
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="rPassword2"
                value={rPassword2}
                onChange={handleRegisterInputChange}
                data-testid="rPassword2"
              />
            </div>

            <div className="form-group">
              <input
                type="submit"
                className="btnSubmit"
                value="Crear cuenta"
                disabled={loading}
                data-testid="btnRegister"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}