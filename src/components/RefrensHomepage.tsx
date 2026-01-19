import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Menu, X, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RefrensHomepage = () => {
	const [showProductsDropdown, setShowProductsDropdown] = useState(false);
	const [showCountryDropdown, setShowCountryDropdown] = useState(false);
	const [showPricingDropdown, setShowPricingDropdown] = useState(false);
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const [displayText, setDisplayText] = useState('');
	const [isDeleting, setIsDeleting] = useState(false);
	const [textIndex, setTextIndex] = useState(0);
	const [showComingSoonModal, setShowComingSoonModal] = useState(false);
	const [comingSoonTitle, setComingSoonTitle] = useState('');
	const productsDropdownRef = useRef<HTMLDivElement>(null);
	const countryDropdownRef = useRef<HTMLDivElement>(null);
	const pricingDropdownRef = useRef<HTMLDivElement>(null);
	const mobileMenuRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();

	const texts = [
		'Create All kind of Invoices for free',
		'Create Professional Invoices for free',
		'Create GST Invoices for free',
		'Create Custom Invoices for free',
	];

	// Typewriter effect
	useEffect(() => {
		const currentText = texts[textIndex];
		const typingSpeed = isDeleting ? 50 : 100;
		const pauseTime = isDeleting ? 500 : 2000;

		const timer = setTimeout(() => {
			if (!isDeleting && displayText === currentText) {
				setTimeout(() => setIsDeleting(true), pauseTime);
			} else if (isDeleting && displayText === '') {
				setIsDeleting(false);
				setTextIndex((prev) => (prev + 1) % texts.length);
			} else {
				setDisplayText(
					isDeleting
						? currentText.substring(0, displayText.length - 1)
						: currentText.substring(0, displayText.length + 1),
				);
			}
		}, typingSpeed);

		return () => clearTimeout(timer);
	}, [displayText, isDeleting, textIndex]);

	// Handle click outside to close dropdowns
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			// Check if click is inside mobile menu - if yes, don't close
			if (mobileMenuRef.current && mobileMenuRef.current.contains(event.target as Node)) {
				return;
			}

			// Check if click is on menu button - if yes, don't close (let button handler manage it)
			const menuButton = document.querySelector('[data-mobile-menu-button]');
			if (menuButton && menuButton.contains(event.target as Node)) {
				return;
			}

			// Close mobile menu if click is outside
			if (showMobileMenu) {
				setShowMobileMenu(false);
				setShowProductsDropdown(false);
				setShowPricingDropdown(false);
			}

			// Handle desktop dropdowns
			if (productsDropdownRef.current && !productsDropdownRef.current.contains(event.target as Node)) {
				setShowProductsDropdown(false);
			}

			if (pricingDropdownRef.current && !pricingDropdownRef.current.contains(event.target as Node)) {
				setShowPricingDropdown(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [showMobileMenu]);

	const showComingSoon = (title: string) => {
		setComingSoonTitle(title);
		setShowComingSoonModal(true);
	};

	const scrollToBusinessSection = () => {
		const businessSection = document.getElementById('business-section');
		if (businessSection) {
			businessSection.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const handleOpenForm = () => {
		// TODO: Open signup/registration form here
		console.log('Opening form...');
	};

	const productsData = {
		solutions: [
			'Invoicing Software',
			'Quotation Software',
			'e-Invoicing Software',

		],
		freeTools: [
			{ name: 'GST Invoice Maker', route: '/invoice/gst-invoice' },
			{ name: 'Invoice Generator', route: '/invoice/invoice-generator' },
			{ name: 'Quotation Generator', route: '/invoice/quotation' },
			{ name: 'Create Proforma Invoice', route: '/invoice/proforma-invoice' },
			{ name: 'Create Purchase Order', route: '/invoice/purchase-order' },
			{ name: 'Create Delivery Challan', route: '/invoice/delivery-challan' },
		],
		categories: [
			'Startups',
			'Chartered Accountant',
			'Export/Import Business',

		],
	};

	const handleMobileProductClick = (item: string, route?: string) => {
		if (route) {
			navigate(route);
			setTimeout(() => {
				setShowProductsDropdown(false);
				setShowMobileMenu(false);
			}, 0);
		} else {
			showComingSoon(item);
			setShowProductsDropdown(false);
			setShowMobileMenu(false);
		}
	};

	return (
		<div className="min-h-screen bg bg-gradient-to-b pt-20 sm:pt-24 lg:pt-28 from-blue-100 via-white to-purple-200">
			{/* Navigation Bar */}
			<nav className="bg-white/60 backdrop-blur-md shadow-sm absolute left-1/2 -translate-x-1/2  top-2 sm:top-4 lg:top-6 w-[95%] sm:w-[90%] lg:w-[80%] mx-auto rounded-xl z-[90]">
				<div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-2">
					<div className="flex items-center justify-between">
						{/* Logo */}
						<div className="flex items-center py-1 sm:py-2 gap-2">
							<img
								src="/elite8digital-nav-cropped.png"
								alt="Elite8Digital Logo"
								className="h-8 sm:h-10 lg:h-12 w-auto"
							/>
						</div>

						{/* Desktop Navigation Links */}
						<div className="hidden lg:flex items-center gap-4 md:gap-10 xl:gap-10">
							{/* Products Dropdown */}
							<div className="relative" ref={productsDropdownRef}>
								<button
									onClick={() => setShowProductsDropdown(!showProductsDropdown)}
									className="flex items-center gap-1 text-black-700 hover:text-purple-600 font-medium transition-colors text-sm md:text-base"
								>
									Products
									<ChevronDown
										className={`w-4 h-4 transition-transform ${showProductsDropdown ? 'rotate-180' : ''}`}
									/>
								</button>

								{showProductsDropdown && (
									<>
										<div
											className="hidden lg:block fixed inset-0 bg-black/20 z-50"
											style={{ top: '80px' }}
										></div>
										<div className="fixed left-1/2 transform -translate-x-1/2 mt-2 w-[90vw] max-w-[900px] bg-white rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-black-100 z-[110]">
											<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
												<div>
													<h3 className="text-medium sm:text-lg font-bold text-black-900 mb-3 sm:mb-4">
														Solutions
													</h3>
													<ul className="space-y-2 sm:space-y-4">
														{productsData.solutions.map((item, idx) => (
															<li key={idx}>
																<button
																	onClick={() => {
																		showComingSoon(item);
																		setShowProductsDropdown(false);
																	}}
																	className="text-left text-black-700 hover:text-red-600 transition-colors w-full text-md"
																>
																	{item}
																</button>
															</li>
														))}
													</ul>
												</div>
												<div>
													<h3 className="text-base md:text-lg font-bold text-black-900 mb-3 sm:mb-4">
														Free Tools
													</h3>
													<ul className="space-y-2 sm:space-y-4">
														{productsData.freeTools.map((item, idx) => (
															<li key={idx}>
																<button
																	onClick={() => {
																		if (item.route) {
																			setShowProductsDropdown(false);
																			navigate(item.route);
																		} else {
																			showComingSoon(item.name);
																			setShowProductsDropdown(false);
																		}
																	}}
																	className="text-left text-black-700 hover:text-red-600 transition-colors w-full text-md"
																>
																	{item.name}
																</button>
															</li>
														))}
													</ul>
												</div>
												<div>
													<h3 className="text-base sm:text-lg font-bold text-black-900 mb-3 sm:mb-4">
														Categories
													</h3>
													<ul className="space-y-2 sm:space-y-3">
														{productsData.categories.map((item, idx) => (
															<li key={idx}>
																<button
																	onClick={() => {
																		showComingSoon(item);
																		setShowProductsDropdown(false);
																	}}
																	className="text-left w-full text-black-700 hover:text-red-600 transition-colors text-md"
																>
																	{item}
																</button>
															</li>
														))}
													</ul>
												</div>
											</div>
										</div>
									</>
								)}
							</div>

							{/* Pricing Dropdown */}
							<div className="relative" ref={pricingDropdownRef}>
								<button
									onClick={() => {
										setShowPricingDropdown(!showPricingDropdown);
										//   navigate('/signup');
									}}
									className="flex items-center gap-1 text-black-700 hover:text-purple-600 font-medium transition-colors text-sm md:text-base"
								>
									Pricing
									<ChevronDown
										className={`w-4 h-4 transition-transform ${showPricingDropdown ? 'rotate-180' : ''}`}
									/>
								</button>

								{showPricingDropdown && (
									<>
										<div
											className="fixed inset-0 bg-black/20 z-50"
											style={{ top: '80px' }}
										></div>
										<div className="fixed left-1/2 transform -translate-x-1/2 mt-2 w-[90vw] max-w-[600px] bg-white rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-black-100 z-[110]">
											<div className="text-center">
												<div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-black-600 to-black-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
													<svg
														className="w-6 h-6 sm:w-8 sm:h-8 text-white"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
														/>
													</svg>
												</div>
												<h3 className="text-xl sm:text-2xl font-bold text-black-900 mb-2 sm:mb-3">
													Free for Everyone!
												</h3>
												<p className="text-base sm:text-lg text-black-600 mb-4 sm:mb-6">
													Currently, we are providing all services{' '}
													<span className="font-semibold text-red-600">completely free</span>{' '}
													for all users.
												</p>
												<div className="bg-purple-50 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
													<p className="text-black-700 mb-3 sm:mb-4 text-sm sm:text-base">
														Enjoy unlimited access to:
													</p>
													<ul className="space-y-2 text-left max-w-md mx-auto">
														{[
															'Invoice Generation',
															'Quotation & Purchase Orders',
															'GST & Tax Compliance',
															'All Premium Features',
														].map((feature, idx) => (
															<li
																key={idx}
																className="flex items-center gap-2 text-black-700 text-sm sm:text-base"
															>
																<svg
																	className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0"
																	fill="currentColor"
																	viewBox="0 0 20 20"
																>
																	<path
																		fillRule="evenodd"
																		d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
																		clipRule="evenodd"
																	/>
																</svg>
																{feature}
															</li>
														))}
													</ul>
												</div>
												<button
													// onClick={() => {
													// 	setShowPricingDropdown(false);
													// 	navigate('/signup');
													// }}
													className="px-6 sm:px-8 py-2.5 sm:py-3 bg-purple-300 hover:bg-purple-600 text-black font-semibold rounded-xl transition-colors shadow-lg text-sm sm:text-base"
												>
													Get Started for Free
												</button>
											</div>
										</div>
									</>
								)}
							</div>

							{/* About Us Link */}
							<button
								onClick={() => window.open('https://elite8digital.in/#/about', '_blank')}
								className="text-black-700 hover:text-purple-600 font-medium transition-colors text-sm md:text-base"
							>
								About Us
							</button>

							{/* Contact Link */}
							<button
								onClick={() => window.open('https://elite8digital.in/#/contact', '_blank')}
								className="text-black-700 hover:text-purple-600 font-medium transition-colors text-sm md:text-base"
							>
								Contact
							</button>
						</div>

						{/* Desktop Auth Buttons */}
						<div className="hidden lg:flex items-center gap-4 xl:gap-8">
							<button
								// onClick={() => (window.location.href = '/login')}
								className="text-black-700 hover:text-purple-600 font-medium transition-colors text-sm md:text-base"
							>
								Login
							</button>
							<button
								// onClick={() => (window.location.href = '/signup')}
								className="px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-400 hover:bg-purple-700 text-black font-medium rounded-xl transition-colors text-sm md:text-base"
							>
								Sign Up
							</button>
						</div>

						{/* Mobile Menu Button */}
						<button
							data-mobile-menu-button
							onClick={() => setShowMobileMenu(!showMobileMenu)}
							className="lg:hidden p-2 text-black-700 hover:text-purple-600"
						>
							{showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
						</button>
					</div>

					{/* Mobile Menu */}
					{showMobileMenu && (
						<div
							ref={mobileMenuRef}
							className="lg:hidden relative z-[200] mt-4 pb-4 border-t border-gray-200 pt-4"
						>

							<div className="flex flex-col gap-4">
								<div>
									<button
										onClick={() => setShowProductsDropdown(!showProductsDropdown)}
										className="flex items-center justify-between text-black-700 hover:text-purple-600 font-medium transition-colors w-full"
									>
										Products
										<ChevronDown
											className={`w-4 h-4 transition-transform ${showProductsDropdown ? 'rotate-180' : ''}`}
										/>
									</button>

									{showProductsDropdown && (
										<div className="pl-4 space-y-3 text-sm mt-3">
											<div>
												<h4 className="font-semibold mb-2">Solutions</h4>
												{productsData.solutions.map((item, idx) => (
													<button
														key={idx}
														onClick={() => handleMobileProductClick(item)}
														className="block py-2 text-black-600 hover:text-red-600 text-left w-full cursor-pointer active:bg-gray-100 rounded px-2"
													>
														{item}
													</button>
												))}
											</div>
											<div>
												<h4 className="font-semibold mb-2">Free Tools</h4>
												{productsData.freeTools.map((item, idx) => (
													<button
														key={idx}
														onClick={() => handleMobileProductClick(item.name, item.route)}
														className="block py-2 text-black-600 hover:text-red-600 text-left w-full cursor-pointer active:bg-gray-100 rounded px-2"
													>
														{item.name}
													</button>
												))}
											</div>
											<div>
												<h4 className="font-semibold mb-2">Categories</h4>
												{productsData.categories.map((item, idx) => (
													<button
														key={idx}
														onClick={() => handleMobileProductClick(item)}
														className="block py-2 text-black-600 hover:text-red-600 text-left w-full cursor-pointer active:bg-gray-100 rounded px-2"
													>
														{item}
													</button>
												))}
											</div>
										</div>
									)}
								</div>

								<div>
									<button
										onClick={() => setShowPricingDropdown(!showPricingDropdown)}
										className="text-left text-black-700 hover:text-purple-600 font-medium transition-colors flex items-center justify-between w-full"
									>
										Pricing
										<ChevronDown
											className={`w-4 h-4 transition-transform ${showPricingDropdown ? 'rotate-180' : ''}`}
										/>
									</button>

									{showPricingDropdown && (
										<div className="pl-4 bg-purple-50 rounded-xl p-4 space-y-3 text-sm mt-3">
											<p className="text-black-700 font-semibold">Free for Everyone!</p>
											<p className="text-black-600">
												All services are currently{' '}
												<span className="font-semibold text-red-600">completely free</span>.
											</p>
											<button
												onClick={() => {
													navigate('/signup');
													setTimeout(() => {
														setShowPricingDropdown(false);
														setShowMobileMenu(false);
													}, 0);
												}}
												className="w-full py-2 bg-purple-300 hover:bg-purple-600 text-black font-semibold rounded-xl transition-colors text-center cursor-pointer active:bg-purple-700"
											>
												Get Started for Free
											</button>
										</div>
									)}
								</div>

								{/* About Us Link - Mobile */}
								<button
									onClick={() => {
										window.open('https://elite8digital.in/#/about', '_blank');
										setTimeout(() => setShowMobileMenu(false), 0);
									}}
									className="text-black-700 hover:text-purple-600 font-medium transition-colors cursor-pointer active:bg-gray-100 rounded text-left w-full"
								>
									About Us
								</button>

								{/* Contact Link - Mobile */}
								<button
									onClick={() => {
										window.open('https://elite8digital.in/#/contact', '_blank');
										setTimeout(() => setShowMobileMenu(false), 0);
									}}
									className="text-black-700 hover:text-purple-600 font-medium transition-colors cursor-pointer active:bg-gray-100 rounded text-left w-full"
								>
									Contact
								</button>

								<div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
									<button
										onClick={() => {
											navigate('/login');
											setTimeout(() => setShowMobileMenu(false), 0);
										}}
										className="w-full py-2 text-black-700 hover:text-purple-600 font-medium transition-colors text-left"
									>
										Login
									</button>
									<button
										onClick={() => {
											navigate('/signup');
											setTimeout(() => setShowMobileMenu(false), 0);
										}}
										className="w-full py-2 bg-purple-400 hover:bg-purple-700 text-black font-medium rounded-xl transition-colors text-center"
									>
										Sign Up
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</nav>

			{/* Hero Section */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-20">
				{/* Rating Badge */}
				<div className="flex justify-center  mb-6 sm:mb-8">
					<div className="flex items-center  gap-2 bg-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-md">
						<div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
						<span className="text-black-900  font-medium text-xs sm:text-sm lg:text-base">
							Rated 4.8/5 by businesses worldwide
						</span>
					</div>
				</div>

				{/* Main Title with Typewriter Animation */}
				<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mt-10 sm:mt-8 lg:mt-12 text-black-900 mb-4 sm:mb-6 leading-tight px-4 min-h-[3em] flex items-center justify-center">
					{displayText}
					<span className="inline-block w-1 h-8 sm:h-10 lg:h-12 bg-purple-600 ml-1 animate-pulse"></span>
				</h1>

				{/* Subtitle */}
				<p className="text-base sm:text-lg lg:text-xl text-center text-black-700 mb-8 sm:mb-10 lg:mb-12 px-4">
					Trusted by 10,000+ businesses from 100+ countries.
				</p>

				{/* CTA Buttons */}
				<div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 lg:mb-20 px-4">
					<button
						onClick={() => navigate('/templete')}
						className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-purple-500 hover:bg-black text-white font-semibold rounded-xl transition-colors shadow-lg text-sm sm:text-base"
					>
						Try for Free
					</button>
					<button
						onClick={scrollToBusinessSection}
						className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/50 hover:bg-black-200 text-black-900 font-semibold rounded-xl border-2 border-black-200 transition-colors text-sm sm:text-base"
					>
						Get a Demo
					</button>
				</div>
			</div>

			{/* Coming Soon Modal */}
			{showComingSoonModal && (
				<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[200] p-4 animate-fadeIn">
					<div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all animate-slideUp">
						<div className="relative overflow-hidden">
							{/* Gradient Header */}
							<div className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 p-6 sm:p-8">
								<div className="flex justify-between items-start">
									<div className="flex-1">
										<div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 animate-bounce">
											<Rocket className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
										</div>
										<h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
											Coming Soon!
										</h3>
										<p className="text-purple-100 text-sm sm:text-base">
											We're working on something amazing
										</p>
									</div>
									<button
										onClick={() => setShowComingSoonModal(false)}
										className="text-white/80 hover:text-white transition-colors"
									>
										<X className="w-6 h-6" />
									</button>
								</div>
							</div>

							{/* Content */}
							<div className="p-6 sm:p-8">
								<div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 sm:p-6 mb-6">
									<p className="text-gray-700 text-center font-medium text-base sm:text-lg mb-2">
										{comingSoonTitle}
									</p>
									<p className="text-gray-600 text-center text-sm">
										is currently under development
									</p>
								</div>

								<div className="space-y-3 mb-6">
									<div className="flex items-center gap-3 text-gray-700">
										<div className="w-2 h-2 bg-purple-500 rounded-full"></div>
										<p className="text-sm">We're crafting this feature with care</p>
									</div>
									<div className="flex items-center gap-3 text-gray-700">
										<div className="w-2 h-2 bg-purple-500 rounded-full"></div>
										<p className="text-sm">It will be worth the wait</p>
									</div>
									<div className="flex items-center gap-3 text-gray-700">
										<div className="w-2 h-2 bg-purple-500 rounded-full"></div>
										<p className="text-sm">Stay tuned for updates</p>
									</div>
								</div>

								<button
									onClick={() => setShowComingSoonModal(false)}
									className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
								>
									Got it, thanks!
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			<style>{`
				@keyframes fadeIn {
					from { opacity: 0; }
					to { opacity: 1; }
				}
				@keyframes slideUp {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
				.animate-fadeIn {
					animation: fadeIn 0.2s ease-out;
				}
				.animate-slideUp {
					animation: slideUp 0.3s ease-out;
				}
			`}</style>
		</div>
	);
};

export default RefrensHomepage;