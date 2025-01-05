import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Overview = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const [stats, setStats] = useState({
		children: 0,
		caregivers: 0,
		attendance: 0,
		revenue: 0,
		totalEnrollments: 0,
		activePrograms: 0
	});
	const [revenueData, setRevenueData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			await new Promise(resolve => setTimeout(resolve, 800));
			setStats({
				children: 59,
				caregivers: 51,
				attendance: 76,
				revenue: 45600,
				totalEnrollments: 90,
				activePrograms: 5
			});
			setRevenueData([
				{ month: 'Jan', revenue: 35000 },
				{ month: 'Feb', revenue: 38000 },
				{ month: 'Mar', revenue: 42000 },
				{ month: 'Apr', revenue: 40000 },
				{ month: 'May', revenue: 45600 },
			]);
			setIsLoading(false);
		};
		fetchData();
	}, []);

	const features = [
		{
			key: 'child_management',
			icon: '👶',
			color: 'bg-rose-100 dark:bg-rose-900/40',
			title: t('child_management'),
			description: t('child_management_desc'),
			stats: '156 active children'
		},
		{
			key: 'caregiver_coordination',
			icon: '👥',
			color: 'bg-indigo-100 dark:bg-indigo-900/40',
			title: t('caregiver_coordination'),
			description: t('caregiver_coordination_desc'),
			stats: '24 qualified caregivers'
		},
		{
			key: 'financial_tracking',
			icon: '💰',
			color: 'bg-emerald-100 dark:bg-emerald-900/40',
			title: t('financial_tracking'),
			description: t('financial_tracking_desc'),
			stats: '$17,656 monthly revenue'
		},
		{
			key: 'attendance_monitoring',
			icon: '📊',
			color: 'bg-violet-100 dark:bg-violet-900/40',
			title: t('attendance_monitoring'),
			description: t('attendance_monitoring_desc'),
			stats: '92% attendance rate'
		}
	];

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
			</div>
		);
	}

	return (
		<>
		<Navbar />
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-slate-900">
			{/* Hero Section */}
			<div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-20 relative overflow-hidden">
				<div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
					<div className="text-center">
						<h1 className="text-5xl font-extrabold mb-6 text-white">
							{t('welcome_to_nurturetech')}
						</h1>
						<p className="text-xl text-white/90 max-w-3xl mx-auto mb-10">
							{t('hero_description')}
						</p>
						<div className="flex justify-center gap-6">
							<button
								onClick={() => navigate('/dashboard')}
								className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-bold text-lg 
                                         hover:bg-indigo-50 transform hover:scale-105 transition-all duration-300 
                                         shadow-lg hover:shadow-xl"
							>
								{t('get_started')}
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Key Statistics Section */}
			<div className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-slate-800 dark:to-slate-900">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 
                                     dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
							{t('our_impact')}
						</h2>
						<p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
							{t('impact_description')}
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						<StatCard title={t('total_children')} value={stats.children} icon="👶" />
						<StatCard title={t('total_caregivers')} value={stats.caregivers} icon="👥" />
						<StatCard title={t('attendance_rate')} value={`${stats.attendance}%`} icon="📊" />
						<StatCard title={t('monthly_revenue')} value={`$${stats.revenue}`} icon="💰" />
					</div>
				</div>
			</div>

			{/* Mission Section */}
			<div className="py-20 bg-white dark:bg-slate-800 relative">
				<div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 
                              dark:from-slate-800/50 dark:to-slate-900/50 opacity-60"></div>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
						<div>
							<h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 
                                         dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
								{t('our_mission')}
							</h2>
							<p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
								{t('mission_description_1')}
							</p>
							<p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
								{t('mission_description_2')}
							</p>
							<ul className="space-y-6">
								{[1, 2, 3].map((item) => (
									<li key={item} className="flex items-center text-gray-600 dark:text-gray-300">
										<span className="mr-4 text-emerald-500 text-xl">✓</span>
										<span className="text-lg">{t(`mission_point_${item}`)}</span>
									</li>
								))}
							</ul>
						</div>
						<div className="space-y-8">
							{features.map(({ key, icon, color, title, description }) => (
								<div key={key}
									className={`${color} p-6 rounded-xl shadow-lg backdrop-blur-sm 
                                               transform hover:scale-[1.02] transition-all duration-300`}>
									<div className="flex items-center mb-4">
										<span className="text-3xl mr-4">{icon}</span>
										<h3 className="text-xl font-bold dark:text-white">{title}</h3>
									</div>
									<p className="text-gray-700 dark:text-gray-200">{description}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Benefits Section */}
			<div className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-slate-800">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 
                                     dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
							{t('why_choose_us')}
						</h2>
						<p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
							{t('benefits_description')}
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[1, 2, 3, 4, 5, 6].map((item) => (
							<div key={item}
								className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg 
                                          hover:shadow-xl transition-all duration-300 
                                          transform hover:scale-[1.02]">
								<h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 
                                             dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
									{t(`benefit_${item}_title`)}
								</h3>
								<p className="text-gray-600 dark:text-gray-300">
									{t(`benefit_${item}_description`)}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Call to Action Section */}
			<div className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 relative">
				<div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
					<h2 className="text-4xl font-bold text-white mb-6">
						{t('ready_to_start')}
					</h2>
					<p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
						{t('cta_description')}
					</p>
					<button
						onClick={() => navigate('/dashboard')}
						className="bg-white text-indigo-600 px-10 py-4 rounded-lg font-bold text-lg 
                                 hover:bg-indigo-50 transform hover:scale-105 transition-all duration-300 
                                 shadow-lg hover:shadow-xl"
					>
						{t('get_started_now')}
					</button>
				</div>
			</div>
		</div>
		<Footer />
		</>
	);
};

const StatCard = ({ title, value, icon }) => (
	<div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-xl 
                    transform hover:scale-[1.02] transition-all duration-300">
		<div className="flex items-center justify-between mb-4">
			<span className="text-4xl">{icon}</span>
			<span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 
                           dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
				{value}
			</span>
		</div>
		<h3 className="text-gray-600 dark:text-gray-300 text-lg font-medium">{title}</h3>
	</div>
);

export default Overview;