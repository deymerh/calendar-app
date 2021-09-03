import Swal from 'sweetalert2';
import { fetchWithoutToken, fetchWithToken } from '../helpers/fetch';
import { types } from '../types/types';

export const startLogin = (email, password) => {
  return async (dispatch) => {
    try {
      const res = await fetchWithoutToken('auth', { email, password }, 'POST');
      const body = await res.json();
      if (body.ok) {
        localStorage.setItem('token', body.token);
        localStorage.setItem('token-init-date', new Date().getTime());
        dispatch(login({
          uid: body.uid,
          name: body.name
        }));
      } else {
        Swal.fire('Error', body.msg, 'error')
      }
    } catch (error) {
      console.log(error);
    }
  }
}
export const startRegister = (name, email, password) => {
  return async (dispatch) => {
    try {
      const res = await fetchWithoutToken('auth/register', { name, email, password }, 'POST');
      const body = await res.json();
      if (body.ok) {
        localStorage.setItem('token', body.token);
        localStorage.setItem('token-init-date', new Date().getTime());
        dispatch(login({
          uid: body.uid,
          name: body.name
        }));
        Swal.fire('Ok', body.msg, 'success');
      } else {
        Swal.fire('Error', body.msg, 'error');
      }
    } catch (error) {
      console.log(error);
    }
  }
}
export const startChecking = () => {
  return async (dispatch) => {
    const res = await fetchWithToken('auth/renew');
    const body = await res.json();
    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(login({
        uid: body.uid,
        name: body.name
      }));
    } else {
      dispatch(checkingSinish());
    }
  }
}

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout)
  }
}
const logout = () => ({ type: types.authLogout });

const login = (user) => ({
  type: types.authLogin,
  payload: user
});

const checkingSinish = () => ({ type: types.authCheckingFinish });