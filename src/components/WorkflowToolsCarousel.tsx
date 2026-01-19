import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ArrowRight, X } from 'lucide-react';

const HorizontalScrollWorkflow = () => {
	const [scrollProgress, setScrollProgress] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);
	const sectionRef = useRef<HTMLDivElement>(null);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [pendingRoute, setPendingRoute] = useState('');
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	// Login form state
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const tools = [
		{
			title: 'Invoice Generator',
			description: 'Create professional invoices with customizable templates for your business.',
			buttonText: 'Create Invoice',
			route: '/invoice/invoice-generator',
			icon: (
				<div className="w-24 sm:w-28 md:w-32 h-32 sm:h-36 md:h-40 mb-2 bg-white rounded-lg shadow-md p-3 md:p-4">
					<div className="text-[10px] sm:text-xs font-semibold text-gray-700 mb-2 md:mb-3">Invoice</div>
					<div className="space-y-1.5 md:space-y-2">
						<div className="flex gap-1">
							<div className="h-1 md:h-1.5 w-8 md:w-12 bg-red-500 rounded"></div>
							<div className="h-1 md:h-1.5 w-4 md:w-6 bg-gray-400 rounded"></div>
							<div className="h-1 md:h-1.5 w-4 md:w-6 bg-gray-400 rounded"></div>
						</div>
						<div className="h-1 md:h-1.5 w-12 md:w-16 bg-red-200 rounded"></div>
						<div className="h-1 md:h-1.5 w-16 md:w-20 bg-gray-200 rounded"></div>
						<div className="h-1 md:h-1.5 w-10 md:w-14 bg-gray-200 rounded"></div>
						<div className="h-1.5 md:h-2 w-16 md:w-20 bg-gray-500 rounded mt-3 md:mt-4"></div>
					</div>
					<button className="mt-2 md:mt-3 w-full bg-gray-600 text-white text-[9px] md:text-[10px] py-1 md:py-1.5 rounded-md flex items-center justify-center gap-1">
						<span className="text-xs md:text-sm">+</span> Create
						<ChevronRight className="w-2 h-2" />
					</button>
				</div>
			),
		},
		{
			title: 'Purchase Order Generator',
			description: 'Easily create and manage purchase orders for streamlined procurement.',
			buttonText: 'Create Purchase Order',
			route: '/invoice/purchase-order',
			featured: true,
			icon: (
				<div className="w-24 sm:w-28 md:w-32 h-32 sm:h-36 md:h-40 bg-white rounded-lg shadow-md p-3 md:p-4">
					<div className="text-[10px] sm:text-xs font-semibold text-gray-700 mb-2 md:mb-3">Purchase Order</div>
					<div className="space-y-1.5 md:space-y-2">
						<div className="flex gap-1">
							<div className="h-1 md:h-1.5 w-8 md:w-12 bg-red-400 rounded"></div>
							<div className="h-1 md:h-1.5 w-4 md:w-6 bg-gray-200 rounded"></div>
							<div className="h-1 md:h-1.5 w-4 md:w-6 bg-gray-200 rounded"></div>
						</div>
						<div className="h-1 md:h-1.5 w-10 md:w-14 bg-red-200 rounded"></div>
						<div className="flex gap-1">
							<div className="h-1 md:h-1.5 w-2 md:w-3 bg-gray-500 rounded-full"></div>
							<div className="h-1 md:h-1.5 w-2 md:w-3 bg-gray-500 rounded-full"></div>
						</div>
					</div>
					<button className="mt-4 md:mt-6 w-full bg-white text-red-500 text-[9px] md:text-[10px] py-1 md:py-1.5 rounded-md border border-red-200">
						Convert
					</button>
				</div>
			),
		},
		{
			title: 'Quotation Generator',
			description: 'Quickly generate accurate quotations with detailed pricing.',
			buttonText: 'Create Quotation',
			route: '/invoice/quotation',
			icon: (
				<div className="w-32 sm:w-36 md:w-40 h-38 sm:h-42 md:h-48 mb-2 bg-white rounded-xl shadow-lg p-4 md:p-6">
					<div className="text-xs sm:text-sm font-semibold text-gray-700 mb-3 md:mb-4">Quotation</div>
					<div className="space-y-2 md:space-y-3">
						<div className="flex gap-1.5 md:gap-2">
							<div className="h-1.5 md:h-2 w-20 md:w-24 bg-gray-200 rounded"></div>
							<div className="h-1.5 md:h-2 w-6 md:w-8 bg-blue-300 rounded"></div>
						</div>
						<div className="h-1.5 md:h-2 w-16 md:w-20 bg-gray-200 rounded"></div>
						<div className="h-5 md:h-6 w-24 md:w-32 bg-blue-500 rounded flex items-center justify-center mt-3 md:mt-4">
							<div className="h-2.5 md:h-3 w-16 md:w-20 bg-blue-400 rounded"></div>
						</div>
						<div className="text-xl md:text-2xl font-bold text-blue-500 mt-1 md:mt-2">$$$$</div>
						<div className="h-1.5 md:h-2 w-16 md:w-20 bg-blue-400 rounded"></div>
					</div>
				</div>
			),
		},
		{
			title: 'GST Invoice Generator',
			description: 'GST-compliant invoices, ensuring accuracy & tax regulation compliance',
			buttonText: 'Create GST Invoice',
			route: '/invoice/gst-invoice',
			featured: true,
			icon: (
				<div className="w-24 sm:w-28 md:w-32 h-32 sm:h-36 md:h-40 mb-2 bg-white rounded-lg shadow-md p-3 md:p-4">
					<div className="text-[10px] sm:text-xs font-semibold text-gray-700 mb-2 md:mb-3">GST Invoice</div>
					<div className="space-y-1.5 md:space-y-2">
						<div className="flex items-center gap-1 text-[9px] md:text-[10px] text-gray-600">
							<div className="w-1.5 md:w-2 h-1.5 md:h-2 border border-gray-600 rounded"></div>
							<span>Generate E-invoice</span>
						</div>
						<div className="flex items-center gap-1 text-[9px] md:text-[10px] text-blue-600">
							<div className="w-1.5 md:w-2 h-1.5 md:h-2 border border-blue-600 rounded"></div>
							<span>Generate E-way Bil...</span>
						</div>
						<div className="h-1 md:h-1.5 w-16 md:w-20 bg-orange-200 rounded mt-2 md:mt-3"></div>
					</div>
				</div>
			),
		},
		{
			title: 'Delivery Challan Generator',
			description: 'Simplify delivery documentation with a user-friendly delivery challan creation.',
			buttonText: 'Create Delivery Challan',
			route: '/invoice/delivery-challan',
			icon: (
				<div className="w-24 sm:w-28 md:w-32 h-32 sm:h-36 md:h-40 mb-4 md:mb-7 bg-white rounded-lg shadow-md p-3 md:p-4">
					<div className="text-[10px] sm:text-xs font-semibold text-gray-700 mb-2 md:mb-3">Delivery Challan</div>
					<div className="space-y-1.5 md:space-y-2">
						<div className="flex gap-1 items-center">
							<div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-orange-400 rounded-full"></div>
							<div className="h-1 md:h-1.5 w-16 md:w-20 bg-orange-200 rounded"></div>
						</div>
						<div className="flex gap-1 items-center">
							<div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-orange-400 rounded-full"></div>
							<div className="h-1 md:h-1.5 w-14 md:w-18 bg-orange-200 rounded"></div>
						</div>
						<div className="flex gap-1 items-center mt-2 md:mt-3">
							<div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-green-400 rounded-full"></div>
							<div className="h-1 md:h-1.5 w-16 md:w-20 bg-green-200 rounded"></div>
						</div>
						<div className="flex gap-1 items-center">
							<div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-green-400 rounded-full"></div>
							<div className="h-1 md:h-1.5 w-12 md:w-16 bg-green-200 rounded"></div>
						</div>
					</div>
					<button className="mt-3 md:mt-4 w-full bg-white text-gray-600 text-[8px] md:text-[10px] py-1 md:py-1.5 rounded-md border border-gray-200 flex items-center justify-center gap-1">
						<div className="w-1.5 md:w-2 h-1.5 md:h-2 border border-gray-600 rounded"></div>
						Interstate
					</button>
				</div>
			),
		},
		{
			title: 'Proforma Invoice Generator',
			description: 'Generate detailed proforma invoices for cost estimation & transaction.',
			buttonText: 'Create Proforma Invoice',
			route: '/invoice/proforma-invoice',
			icon: (
				<div className="w-32 sm:w-36 md:w-40 h-38 sm:h-42 md:h-48 mb-2 bg-white rounded-xl shadow-lg p-4 md:p-6">
					<div className="text-xs sm:text-sm font-semibold text-gray-700 mb-3 md:mb-4">Proforma Invoice</div>
					<div className="space-y-2 md:space-y-3">
						<div className="flex gap-1.5 md:gap-2">
							<div className="h-1.5 md:h-2 w-16 md:w-20 bg-gray-500 rounded"></div>
							<div className="h-1.5 md:h-2 w-6 md:w-8 bg-gray-400 rounded-full"></div>
							<div className="h-1.5 md:h-2 w-6 md:w-8 bg-gray-400 rounded-full"></div>
						</div>
						<div className="h-1.5 md:h-2 w-20 md:w-24 bg-gray-200 rounded"></div>
						<div className="h-1.5 md:h-2 w-22 md:w-28 bg-gray-200 rounded"></div>
						<div className="text-xl md:text-2xl font-bold text-gray-600 mt-3 md:mt-4">$$$</div>
					</div>
				</div>
			),
		},
		{
			title: 'Service Proposal',
			description: 'Create professional service proposals with project scope and pricing details.',
			buttonText: 'Create Proposal',
			route: '/proposal/service-proposal',
			featured: true,
			icon: (
				<div className="w-32 sm:w-36 md:w-40 h-38 sm:h-42 md:h-48 mb-2 bg-white rounded-xl shadow-lg p-4 md:p-6">
					<div className="text-xs sm:text-sm font-semibold text-gray-700 mb-3 md:mb-4">Service Proposal</div>
					<div className="space-y-2 md:space-y-3">
						<div className="h-1.5 md:h-2 w-20 md:w-24 bg-cyan-500 rounded"></div>
						<div className="h-1 md:h-1.5 w-16 md:w-20 bg-gray-300 rounded"></div>
						<div className="h-1 md:h-1.5 w-18 md:w-22 bg-gray-300 rounded"></div>
						<div className="flex gap-1 mt-2">
							<div className="h-1 md:h-1.5 w-2 md:w-3 bg-green-500 rounded-full"></div>
							<div className="h-1 md:h-1.5 w-12 md:w-16 bg-gray-200 rounded"></div>
						</div>
						<div className="text-lg md:text-xl font-bold text-cyan-600 mt-2">📄</div>
					</div>
				</div>
			),
		},
		{
			title: 'Service Agreement',
			description: 'Generate service agreements with terms, conditions, and legal clauses.',
			buttonText: 'Create Agreement',
			route: '/proposal/service-agreement',
			icon: (
				<div className="w-32 sm:w-36 md:w-40 h-38 sm:h-42 md:h-48 mb-2 bg-white rounded-xl shadow-lg p-4 md:p-6">
					<div className="text-xs sm:text-sm font-semibold text-gray-700 mb-3 md:mb-4">Service Agreement</div>
					<div className="space-y-2 md:space-y-3">
						<div className="h-1.5 md:h-2 w-20 md:w-24 bg-slate-700 rounded"></div>
						<div className="h-1 md:h-1.5 w-16 md:w-20 bg-gray-300 rounded"></div>
						<div className="h-1 md:h-1.5 w-18 md:w-22 bg-gray-300 rounded"></div>
						<div className="flex gap-1 mt-2">
							<div className="text-xs">1.</div>
							<div className="h-1 md:h-1.5 w-14 md:w-18 bg-gray-200 rounded"></div>
						</div>
						<div className="flex gap-1">
							<div className="text-xs">2.</div>
							<div className="h-1 md:h-1.5 w-14 md:w-18 bg-gray-200 rounded"></div>
						</div>
						<div className="text-lg md:text-xl font-bold text-slate-700 mt-2">📋</div>
					</div>
				</div>
			),
		},
	];

	useEffect(() => {
		// Comment out auth check - no login required
		// const checkAuth = () => {
		// 	const token = localStorage.getItem('authToken');
		// 	setIsLoggedIn(!!token);
		// };
		// checkAuth();

		const handleScroll = () => {
			if (!sectionRef.current) return;

			const sectionTop = sectionRef.current.offsetTop;
			const sectionHeight = sectionRef.current.offsetHeight;
			const scrollTop = window.scrollY;
			const windowHeight = window.innerHeight;

			const sectionStart = sectionTop;
			const sectionEnd = sectionTop + sectionHeight;

			if (scrollTop >= sectionStart && scrollTop <= sectionEnd) {
				const scrollWithinSection = scrollTop - sectionStart;
				const scrollableHeight = sectionHeight - windowHeight;
				const progress = Math.min(Math.max(scrollWithinSection / scrollableHeight, 0), 1);
				setScrollProgress(progress);
			} else if (scrollTop < sectionStart) {
				setScrollProgress(0);
			}
		};

		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({
				x: (e.clientX / window.innerWidth) * 100,
				y: (e.clientY / window.innerHeight) * 100,
			});
		};

		window.addEventListener('scroll', handleScroll);
		window.addEventListener('mousemove', handleMouseMove);
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('mousemove', handleMouseMove);
		};
	}, []);

	const getCardWidth = () => {
		if (typeof window !== 'undefined') {
			if (window.innerWidth < 640) return 280;
			if (window.innerWidth < 768) return 320;
			if (window.innerWidth < 1024) return 360;
			return 400;
		}
		return 400;
	};

	const maxTranslate = (tools.length - 1) * getCardWidth();
	const translateX = -(scrollProgress * maxTranslate);

	const handleNavigation = (route: string) => {
		// Navigate directly to the route
		window.location.href = route;

		// Comment out login check - open form instead
		// if (!isLoggedIn) {
		// 	setPendingRoute(route);
		// 	setShowLoginModal(true);
		// } else {
		// 	window.location.href = route;
		// }
	};

	const handleOpenForm = () => {
		// TODO: Open signup/registration form here
		console.log('Opening form...');
		setShowLoginModal(true);
	};

	const handleLogin = () => {
		// Comment out login logic - form submission will be handled separately
		// Validate inputs
		// if (!email || !password) {
		// 	alert('Please enter both email and password');
		// 	return;
		// }

		// Here you would typically make an API call to verify credentials
		// For demo purposes, we'll just simulate a successful login

		console.log('Form submission:', { email, password });

		// Comment out auth token storage
		// localStorage.setItem('authToken', 'demo-token-12345');

		// Comment out login state update
		// setIsLoggedIn(true);

		// Close modal
		setShowLoginModal(false);

		// Comment out navigation
		// if (pendingRoute) {
		// 	window.location.href = pendingRoute;
		// }

		// Reset form
		setEmail('');
		setPassword('');
	};

	const closeModal = () => {
		setShowLoginModal(false);
		setPendingRoute('');
		setEmail('');
		setPassword('');
	};

	return (
		<>
			<div ref={sectionRef} className="min-h-[300vh] bg-gradient-to-br from-blue-100 via-white to-purple-200 sm:min-h-[400vh] md:min-h-[500vh] lg:min-h-[600vh] relative">
				{/* Animated Background */}
				<div className="fixed inset-0 overflow-hidden pointer-events-none">
					<div
						className="absolute inset-0 opacity-5"
						style={{
							backgroundImage: `linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)`,
							backgroundSize: '50px 50px',
							transform: `translateX(${scrollProgress * 50}px)`,
						}}
					/>
				</div>

				{/* Sticky Container */}
				<div className="sticky top-0 h-screen flex items-center overflow-hidden">
					<div className="w-full px-4 sm:px-6 md:px-8 lg:px-16">
						{/* Section Title */}
						<div className="mb-4 sm:mb-6 md:mb-6 mt-2 sm:mt-3 md:mt-3">
							<h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-2 sm:mb-3 md:mb-4">
								Simplified Workflow Tools
							</h1>
							<p className="text-gray-600 text-center md:visible text-sm sm:text-base md:text-lg lg:text-xl px-4">
								Simple tools for freelancers, consultants, solopreneurs, and newly started businesses.
							</p>
						</div>

						{/* Horizontal Scrolling Tools */}
						<div
							ref={containerRef}
							className="flex gap-3 sm:gap-4 md:gap-6 lg:gap-8 transition-transform duration-300 ease-out"
							style={{ transform: `translateX(${translateX}px)` }}
						>
							{tools.map((tool, index) => (
								<div
									key={index}
									className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] group"
									style={{
										transform: `scale(${1 - Math.abs(scrollProgress * tools.length - index) * 0.1})`,
									}}
								>
									<div
										className={`relative h-[400px] sm:h-[400px] md:h-[440px] lg:h-[440px] rounded-xl md:rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl ${tool.featured ? 'ring-2 ring-purple-300' : ''
											}`}
									>
										{/* Content */}
										<div className="relative h-full p-10 sm:p-6 md:p-7 lg:p-4 flex flex-col items-center text-center z-10">
											<div className="mb-3 md:mb-4">{tool.icon}</div>

											<div className="flex-grow flex flex-col justify-between w-full">
												<div>
													<h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-1.5 md:mb-2 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2">
														{tool.title}
													</h3>
													<p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4 md:mb-6 line-clamp-3">
														{tool.description}
													</p>
												</div>

												{/* CTA Button */}
												<button
													onClick={() => handleNavigation(tool.route)}
													className="w-full py-2 sm:py-2.5 md:py-3 bg-gray-900 hover:bg-purple-600 text-white rounded-lg transition-all duration-300 font-semibold group-hover:shadow-lg group-hover:shadow-purple-500/30 flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base"
												>
													<span className="truncate">{tool.buttonText}</span>
													<ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
												</button>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Login Modal */}
			{showLoginModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
					<div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 relative">
						{/* Close Button */}
						<button
							onClick={closeModal}
							className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
						>
							<X className="w-6 h-6" />
						</button>

						{/* Header */}
						<div className="text-center mb-6">
							<h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Get Started</h2>
							<p className="text-gray-600 text-sm sm:text-base">Fill in your details to continue</p>
						</div>

						{/* Login Form */}
						<div className="space-y-4">
							<div>
								<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
									Email Address
								</label>
								<input
									type="email"
									id="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
									placeholder="Enter your email"
								/>
							</div>

							<div>
								<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
									Password
								</label>
								<input
									type="password"
									id="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
									placeholder="Enter your password"
									onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
								/>
							</div>

							<div className="flex items-center justify-between text-sm">
								<label className="flex items-center">
									<input type="checkbox" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
									<span className="ml-2 text-gray-600">Remember me</span>
								</label>
								<button
									onClick={handleOpenForm}
									className="text-purple-600 hover:text-purple-700 font-medium"
								>
									Forgot Password?
								</button>
							</div>

							<button
								onClick={handleLogin}
								className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
							>
								Submit
							</button>
						</div>

						{/* Divider */}
						<div className="relative my-6">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-300"></div>
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-white text-gray-500">or</span>
							</div>
						</div>

						{/* Sign Up Link */}
						<p className="text-center text-sm text-gray-600">
							Don't have an account?{' '}
							<button
								onClick={handleOpenForm}
								className="text-purple-600 hover:text-purple-700 font-semibold"
							>
								Sign up now
							</button>
						</p>
					</div>
				</div>
			)}
		</>
	);
};

export default HorizontalScrollWorkflow;