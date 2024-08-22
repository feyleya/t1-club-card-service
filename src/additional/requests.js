import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from './context';

export const getUserRole = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.role; 
    } catch (e) {
        return null;
    }
};

export const useAuth = () => {
  const navigate = useNavigate();
  const {login} = useContext(AppContext);

  const handleAuth = async (url, data) => {
    try {
        //const response = await axios.post(url, data);
        //const { token } = response.data;
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciJ9.04wRHoeP0SL7-IWcxX-KFt6fgXT8urkjy8vyEwB0Gbc.eyJyb2xlIjoiYWRtaW4ifQ.UHnffynBjuE3dcwEUyqldVbN-5QzMT-oiyXqkRbWJOI";

        if (token) {
            localStorage.setItem('token', token);
            login();
            const role = getUserRole();
            if (role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/user');
            }
        }
    } catch (error) {
      alert(`Ошибка при выполнении ${url.includes('login') ? 'авторизации' : 'регистрации'}: ${error.message}`);
    }
  };

  return { handleAuth };
};