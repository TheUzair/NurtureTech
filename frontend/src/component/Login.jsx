import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const API_URL = import.meta.env.VITE_API_URL;

function Login() {
  const { t } = useTranslation(); 
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [isLogin, setIsLogin] = useState(true); 
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin
        ? `${API_URL}/api/login`
        : `${API_URL}/api/register`;

      const response = await axios.post(url, formData);
      if (isLogin) {
        localStorage.setItem('token', response.data.access_token); 
        setMessage(t('login_success')); 
        navigate('/dashboard');
      } else {
        setMessage(response.data.msg);
      }
    } catch (error) {
      setMessage(error.response?.data?.msg || t('error_message')); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen dark:bg-gray-900 bg-white">
      <div className="text-xl font-bold mb-6 dark:text-white">
        {isLogin ? t('login_title') : t('register_title')} 
      </div>
      <form onSubmit={handleSubmit} className="w-1/3 bg-white dark:bg-gray-800 p-6 rounded shadow-md">
        <input
          type="text"
          name="username"
          placeholder={t('username_placeholder')}
          value={formData.username}
          onChange={handleInputChange}
          className="mb-4 p-2 w-full border dark:bg-gray-700 dark:text-white"
        />
        <input
          type="password"
          name="password"
          placeholder={t('password_placeholder')}
          value={formData.password}
          onChange={handleInputChange}
          className="mb-4 p-2 w-full border dark:bg-gray-700 dark:text-white"
        />
        <button type="submit" className="bg-blue-500 dark:bg-blue-700 text-white p-2 w-full">
          {isLogin ? t('login_btn') : t('register_btn')}
        </button>
      </form>
      {message && <p className="mt-4 dark:text-white">{message}</p>}
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="text-blue-500 dark:text-blue-400 mt-4"
      >
        {isLogin ? t('to_register') : t('switch_to_login')}
      </button>
    </div>
  );
}

export default Login;
