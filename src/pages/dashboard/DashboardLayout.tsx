import { useState, useEffect } from 'react';
import { Settings, LogOut, ExternalLink as LinkIcon, X, Mail, Phone, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const navigate = useNavigate();
    const [sidebarExpanded, setSidebarExpanded] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [showAccountManagerModal, setShowAccountManagerModal] = useState(false);
    const [userName, setUserName] = useState('User');
    const [userEmail, setUserEmail] = useState('user@example.com');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Load user data from localStorage
        const signupData = localStorage.getItem('signupData');
        if (signupData) {
            const parsed = JSON.parse(signupData);
            setUserName(parsed.fullName || 'User');
            setUserEmail(parsed.email || 'user@example.com');
        }

        // Check if mobile on mount and resize
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768); // md breakpoint
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('signupData');
        localStorage.removeItem('businessData');
        navigate('/');
    };

    // Handler for Elite8 logo navigation
    const handleLogoClick = () => {
        navigate('/Dashboard');
    };

    const toggleSidebar = () => {
        setSidebarExpanded(!sidebarExpanded);
    };

    return (
        <div className="h-screen bg-gray-50 flex flex-col">
            {/* Top Purple Navigation Bar - Fixed */}
            <div className="bg-purple-600 text-white z-20 fixed top-0 left-0 right-0">
                <div className="flex items-center justify-between px-3 sm:px-6 py-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <button
                            onClick={toggleSidebar}
                            className="p-1 hover:bg-purple-700 rounded"
                        >
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <button 
                            onClick={handleLogoClick}
                            className='flex gap-2 hover:opacity-80 transition-opacity'
                        > 
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded flex items-center justify-center">
                                <span className="text-purple-600 font-bold text-sm sm:text-lg">E</span>
                            </div>
                            <span className="text-base sm:text-xl pt-1 font-semibold">Elite8</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-4">
                        <button
                            onClick={() => setShowAccountManagerModal(true)}
                            className="hidden sm:flex items-center gap-2 bg-purple-700 rounded-full px-3 py-1.5 hover:bg-purple-800 transition-colors cursor-pointer"
                        >
                            <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
                                <span className="text-purple-600 font-semibold text-sm">L</span>
                            </div>
                            <div className="text-xs">
                                <div className="font-medium">Meet Lokesh Kumar</div>
                                <div className="text-purple-200 text-xxs">Your Account Manager</div>
                            </div>
                        </button>

                        {/* Mobile version - just icon */}
                        <button
                            onClick={() => setShowAccountManagerModal(true)}
                            className="sm:hidden p-1.5 bg-purple-700 rounded-full hover:bg-purple-800 transition-colors"
                        >
                            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                <span className="text-purple-600 font-semibold text-xs">L</span>
                            </div>
                        </button>

                        <button className="hidden md:block p-2 hover:bg-purple-700 rounded">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                        </button>

                        <button className="hidden md:block p-2 hover:bg-purple-700 rounded">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                            </svg>
                        </button>

                        <button className="p-1.5 sm:p-2 hover:bg-purple-700 rounded relative">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                                className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-700 rounded-full flex items-center justify-center font-semibold hover:bg-purple-800 text-base sm:text-lg transition-colors z-50 relative"
                            >
                                {userName.charAt(0).toUpperCase()}
                            </button>

                            {/* Dropdown Menu */}
                            {showProfileDropdown && (
                                <>
                                    {/* Click outside overlay to close dropdown */}
                                    <div
                                        className="fixed inset-0 z-40 pointer-events-auto"
                                        onClick={() => setShowProfileDropdown(false)}
                                    ></div>

                                    <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-[9999] pointer-events-auto">
                                        {/* User Info Section */}
                                        <div className="p-4 sm:p-6 border-b border-gray-200">
                                            <div className="flex items-center gap-3 sm:gap-4">
                                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold">
                                                    {userName.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate">{userName.toUpperCase()} -IIITK</h3>
                                                    <p className="text-xs sm:text-sm text-gray-600 truncate">{userEmail}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Feature Request Section */}
                                        <div className="p-3 sm:p-4 bg-gray-50 border-b border-gray-200">
                                            <p className="text-xs sm:text-sm text-gray-700 mb-2">Missing out on a feature? We'd love to know!</p>
                                            <button className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium text-xs sm:text-sm">
                                                <span>Request a Feature</span>
                                                <LinkIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                                            </button>
                                        </div>

                                        {/* Menu Items */}
                                        <div className="py-2">
                                            <button
                                                onMouseDown={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                }}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setShowProfileDropdown(false);
                                                    navigate('/user-settings');
                                                }}
                                                className="w-full flex items-center gap-3 px-4 sm:px-6 py-2.5 sm:py-3 text-gray-700 hover:bg-gray-50 transition-colors text-left"
                                            >
                                                <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                                                <span className="font-medium text-sm sm:text-base">User Settings</span>
                                            </button>

                                            <button
                                                onMouseDown={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                }}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setShowProfileDropdown(false);
                                                    handleLogout();
                                                }}
                                                className="w-full flex items-center gap-3 px-4 sm:px-6 py-2.5 sm:py-3 text-gray-700 hover:bg-gray-50 transition-colors text-left"
                                            >
                                                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                                                <span className="font-medium text-sm sm:text-base">Logout</span>
                                            </button>
                                        </div>

                                        {/* Footer Links */}
                                        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 bg-gray-50">
                                            <div className="flex items-center justify-center gap-2 sm:gap-4 text-xs text-gray-600">
                                                <button className="hover:text-purple-600">Blog</button>
                                                <span>•</span>
                                                <button className="hover:text-purple-600">About</button>
                                                <span>•</span>
                                                <button className="hover:text-purple-600">Privacy</button>
                                                <span>•</span>
                                                <button className="hover:text-purple-600">FAQs</button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area with Sidebar - Add top padding for fixed navbar */}
            <div className="flex flex-1 overflow-hidden pt-[52px] sm:pt-[60px]">
                {/* Sidebar - Hidden on mobile unless expanded */}
                <div className={`fixed top-[52px] sm:top-[60px] left-0 bottom-0 z-30 transition-all duration-300 ${
                    isMobile && !sidebarExpanded ? '-translate-x-full' : 'translate-x-0'
                } ${sidebarExpanded ? 'w-64' : 'w-20'}`}>
                    <Sidebar isExpanded={sidebarExpanded} setIsExpanded={setSidebarExpanded} />
                </div>

                {/* Overlay when sidebar is expanded on mobile or always when expanded on desktop */}
                {sidebarExpanded && (
                    <div
                        className="fixed inset-0 bg-black z-20 top-[52px] sm:top-[60px] md:bg-opacity-30 bg-opacity-50"
                        onClick={() => setSidebarExpanded(false)}
                    ></div>
                )}

                {/* Main Content - Full width on mobile, starts after collapsed sidebar on desktop */}
                <div className={`flex-1 overflow-auto transition-all duration-300 ${
                    isMobile ? 'ml-0' : 'ml-20'
                }`}>
                    {children}
                </div>
            </div>

            {/* Account Manager Modal */}
            {showAccountManagerModal && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
                        onClick={() => setShowAccountManagerModal(false)}
                    ></div>

                    {/* Modal */}
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] sm:w-full max-w-2xl bg-white rounded-2xl shadow-2xl z-[101] p-4 sm:p-8 max-h-[90vh] overflow-y-auto">
                        {/* Close Button */}
                        <button
                            onClick={() => setShowAccountManagerModal(false)}
                            className="absolute top-3 right-3 sm:top-6 sm:right-6 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>

                        {/* Header */}
                        <div className="flex items-start p-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white text-2xl sm:text-3xl font-bold">L</span>
                            </div>
                            <div>
                                <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">Hi, I am Lokesh Kumar</h2>
                                <p className="text-sm sm:text-lg text-gray-600">Your Account Manager</p>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-xs sm:text-base text-gray-700">
                            <p>
                                I've worked with 160+ amazing clients (just like you!) to ensure they get the most from Elite8.
                            </p>
                            <p>
                                When not working, I am usually busy reading books, traveling, or streaming Netflix:)
                            </p>
                            <p>
                                If you ever need any help with demos, setup, customisations, upgrades, extensions, or anything else, I am just a message or call away!
                            </p>
                        </div>

                        {/* Request Call Back Button */}
                        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 sm:py-4 rounded-xl mb-3 sm:mb-4 transition-colors text-sm sm:text-base">
                            Request Call Back
                        </button>

                        {/* Contact Buttons Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                            {/* Email Button */}
                            <a
                                href="mailto:lokesh.kumar@elite8.com"
                                className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 sm:py-3 rounded-lg transition-colors"
                            >
                                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span className="text-xs sm:text-sm truncate">lokesh.kumar@elite8.com</span>
                            </a>

                            {/* Phone Button 1 */}
                            <a
                                href="tel:+919664516622"
                                className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 sm:py-3 rounded-lg transition-colors"
                            >
                                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span className="text-xs sm:text-sm">+91 9664516622</span>
                            </a>

                            {/* Phone Button 2 */}
                            <a
                                href="tel:+919104043036"
                                className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 sm:py-3 rounded-lg transition-colors"
                            >
                                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span className="text-xs sm:text-sm">+91 9104043036</span>
                            </a>

                            {/* WhatsApp Button */}
                            <a
                                href="https://wa.me/919664516622"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 bg-green-100 hover:bg-green-200 text-green-700 py-2.5 sm:py-3 rounded-lg transition-colors"
                            >
                                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span className="text-xs sm:text-sm">+91 9664516622</span>
                            </a>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default DashboardLayout;