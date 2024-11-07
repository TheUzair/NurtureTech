import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Register() {
  const { t } = useTranslation(); 
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:3000/api/register'; 

      const response = await axios.post(url, formData);
      setMessage(response.data.msg);
      navigate('/login'); 
    } catch (error) {
      setMessage(error.response?.data?.msg || t('error_message')); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen dark:bg-gray-900 bg-white">
      <h2 className="text-xl font-bold mb-6 dark:text-white">
        {t('register_title')} 
      </h2>
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
          {t('register')} 
        </button>
      </form>
      {message && <p className="mt-4 dark:text-white">{message}</p>}
    </div>
  );
}

export default Register;
