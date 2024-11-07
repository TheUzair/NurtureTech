import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Homepage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [isLogin, setIsLogin] = useState(true);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = isLogin
                ? 'http://localhost:3000/api/login'
                : 'http://localhost:3000/api/register';

            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            
            if (isLogin) {
                localStorage.setItem('token', response.data.access_token);
                setMessage(t('login_success'));
                navigate('/dashboard');
            } else {
                setMessage(response.data.msg);
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
                console.error('Error status:', error.response.status);
                console.error('Error headers:', error.response.headers);
            } else if (error.request) {
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            setMessage(error.response?.data?.msg || t('error_message'));
        }
    };

    return (
        <div className="flex items-center justify-center h-screen dark:bg-slate-900 bg-white">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-center text-2xl font-bold mb-4 dark:text-white">
                    {isLogin ? t('login_title') : t('register_title')}
                </h2>
                <input
                    type="text"
                    placeholder={t('username_placeholder')}
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="block w-full p-2 mb-4 border rounded dark:bg-slate-700 dark:text-white"
                />
                <input
                    type="password"
                    placeholder={t('password_placeholder')}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="block w-full p-2 mb-4 border rounded dark:bg-slate-700 dark:text-white"
                />
                <button type="submit" className="bg-blue-500 dark:bg-blue-700 text-white w-full py-2 rounded">
                    {isLogin ? t('login_button') : t('register_button')}
                </button>
                <p className="text-center mt-4 dark:text-white">{message}</p>
                <p
                    className="text-center mt-2 cursor-pointer text-blue-600 dark:text-blue-400"
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin ? t('switch_to_register') : t('switch_to_login')}
                </p>
            </form>
        </div>
    );
};

export default Homepage;
