import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import Footer from './Footer';

const API_URL = import.meta.env.VITE_API_URL;

const Homepage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [isLogin, setIsLogin] = useState(true);
    const [message, setMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = isLogin
                ? `${API_URL}/api/login`
                : `${API_URL}/api/register`;

            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            
            if (isLogin) {
                localStorage.setItem('token', response.data.access_token);
                setMessage(t('login_success'));
                setIsLoggedIn(true);
                navigate('/overview');
            } else {
                setMessage(response.data.msg);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage(error.response?.data?.msg || t('error_message'));
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-slate-900">
            <Navbar />
            
            <main className="flex-grow flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    <form onSubmit={handleSubmit} 
                          className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg 
                                   transform transition-all duration-300 hover:shadow-xl">
                        <h2 className="text-center text-3xl font-bold mb-8 bg-gradient-to-r 
                                     from-indigo-600 to-purple-600 dark:from-indigo-400 
                                     dark:to-purple-400 bg-clip-text text-transparent">
                            {isLogin ? t('login_title') : t('register_title')}
                        </h2>
                        
                        <div className="space-y-6">
                            <input
                                type="text"
                                placeholder={t('username_placeholder')}
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                className="block w-full p-3 border border-gray-200 rounded-lg 
                                         dark:bg-slate-700 dark:border-slate-600 dark:text-white
                                         focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                                         transition-all duration-300"
                            />
                            <input
                                type="password"
                                placeholder={t('password_placeholder')}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="block w-full p-3 border border-gray-200 rounded-lg 
                                         dark:bg-slate-700 dark:border-slate-600 dark:text-white
                                         focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                                         transition-all duration-300"
                            />
                            
                            <button 
                                type="submit" 
                                className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 
                                         text-white font-medium rounded-lg hover:opacity-90 
                                         transform transition-all duration-300 hover:scale-[1.02]"
                            >
                                {isLogin ? t('login_button') : t('register_button')}
                            </button>
                        </div>

                        {message && (
                            <p className="text-center mt-4 text-gray-600 dark:text-gray-300">
                                {message}
                            </p>
                        )}
                        
                        <button
                            type="button"
                            className="w-full mt-6 text-center text-indigo-600 dark:text-indigo-400 
                                     hover:text-indigo-500 transition-colors duration-300"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? t('switch_to_register') : t('switch_to_login')}
                        </button>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Homepage;