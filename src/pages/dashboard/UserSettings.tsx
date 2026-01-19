import { useState, useEffect } from 'react';
import { Camera, ChevronDown } from 'lucide-react';
import DashboardLayout from './DashboardLayout';
import { useNavigate } from 'react-router-dom';

const UserSettings = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('personal');
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const [personalData, setPersonalData] = useState({
        name: '',
        email: '',
        country: '',
        phone: '',
        countryCode: ''
    });

    const [notifications, setNotifications] = useState({
        general: true,
        accounting: true,
        leads: true,
        projects: true,
        payments: true
    });

    useEffect(() => {
        // Load user data from localStorage
        const signupData = localStorage.getItem('signupData');
        const businessData = localStorage.getItem('businessData');

        if (signupData) {
            const parsed = JSON.parse(signupData);
            setPersonalData(prev => ({
                ...prev,
                name: parsed.fullName || '',
                email: parsed.email || ''
            }));
        }

        if (businessData) {
            const parsed = JSON.parse(businessData);
            setPersonalData(prev => ({
                ...prev,
                country: parsed.country || '',
                phone: parsed.phoneNumber || '',
                countryCode: parsed.countryCode || ''
            }));
        }
    }, []);

    const handleSaveChanges = () => {
        // Save updated data
        const signupData = {
            fullName: personalData.name,
            email: personalData.email
        };
        localStorage.setItem('signupData', JSON.stringify(signupData));
        alert('Changes saved successfully!');
    };

    const handleLogoutAll = () => {
        localStorage.removeItem('isAuthenticated');
        navigate('/login');
    };

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setShowMobileMenu(false);
    };

    const tabs = [
        { id: 'personal', label: 'Personal Information' },
        { id: 'notifications', label: 'Notification & Alerts' },
        { id: 'security', label: 'Password & Security' },
        { id: 'configurations', label: 'Configurations' }
    ];

    return (
        <DashboardLayout>
            <div className="p-3 sm:p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto w-full min-h-screen">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8">User Settings</h1>

                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8">
                    {/* Mobile Dropdown Menu */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                            className="w-full bg-white rounded-lg border border-gray-200 px-4 py-3 flex items-center justify-between text-left"
                        >
                            <span className="font-medium text-gray-900">
                                {tabs.find(tab => tab.id === activeTab)?.label}
                            </span>
                            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showMobileMenu ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {showMobileMenu && (
                            <div className="mt-2 bg-white rounded-lg border border-gray-200 p-2 shadow-lg">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => handleTabChange(tab.id)}
                                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors text-sm ${
                                            activeTab === tab.id
                                                ? 'text-purple-600 bg-purple-50 font-medium'
                                                : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Desktop Left Sidebar Menu */}
                    <div className="hidden lg:block w-64 flex-shrink-0">
                        <div className="bg-white rounded-lg border border-gray-200 p-2 sticky top-20">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors text-sm ${
                                        activeTab === tab.id
                                            ? 'text-purple-600 bg-purple-50 font-medium'
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Content Area */}
                    <div className="flex-1 min-w-0">
                        {/* Personal Information Tab */}
                        {activeTab === 'personal' && (
                            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 md:p-8">
                                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Personal Settings</h2>

                                {/* Profile Picture */}
                                <div className="mb-6 sm:mb-8">
                                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">Personal Information</h3>
                                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
                                        <div className="relative flex-shrink-0">
                                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl font-bold">
                                                {personalData.name ? personalData.name.charAt(0).toUpperCase() : 'L'}
                                            </div>
                                            <button className="absolute bottom-0 right-0 w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50">
                                                <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
                                            </button>
                                        </div>
                                        <div className="text-center sm:text-left">
                                            <h4 className="text-base sm:text-lg font-bold text-gray-900 break-words">{personalData.name.toUpperCase()} -IIITK</h4>
                                            <p className="text-xs sm:text-sm text-gray-600">Super Admin</p>
                                            <p className="text-xs sm:text-sm text-gray-500">fsfffsfaeraras</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Name</label>
                                        <input
                                            type="text"
                                            value={personalData.name}
                                            onChange={(e) => setPersonalData({ ...personalData, name: e.target.value })}
                                            className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <input
                                            type="email"
                                            value={personalData.email}
                                            onChange={(e) => setPersonalData({ ...personalData, email: e.target.value })}
                                            className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Country</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={personalData.country}
                                                readOnly
                                                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg bg-gray-50"
                                            />
                                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Phone</label>
                                        <input
                                            type="text"
                                            value={`${personalData.countryCode} ${personalData.phone}`}
                                            readOnly
                                            className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg bg-gray-50"
                                        />
                                    </div>
                                </div>

                                {/* Active Refrens Key */}
                                <div className="mb-4 sm:mb-6">
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                        Active Refrens Key
                                        <span className="ml-2 text-gray-400 text-xs">ⓘ</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value="lokesh-kumar-iiitk"
                                            readOnly
                                            className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg bg-gray-50"
                                        />
                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                    </div>
                                </div>

                                {/* Save Button */}
                                <div className="flex justify-end">
                                    <button
                                        onClick={handleSaveChanges}
                                        className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                                    >
                                        Save Changes
                                    </button>
                                </div>

                                {/* Business Settings */}
                                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
                                    <button className="flex items-center justify-between w-full text-left">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded flex items-center justify-center">
                                                <span className="text-orange-600 text-lg sm:text-xl">🏢</span>
                                            </div>
                                            <span className="text-sm sm:text-base font-medium text-gray-900">Business Settings</span>
                                        </div>
                                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Notifications Tab */}
                        {activeTab === 'notifications' && (
                            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 md:p-8">
                                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Notifications & Alerts</h2>

                                <div className="space-y-4 sm:space-y-6">
                                    {/* General Notifications */}
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 py-3 sm:py-4 border-b border-gray-200">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                                                <h3 className="text-sm sm:text-base font-semibold text-gray-900">General Notifications</h3>
                                            </div>
                                            <p className="text-xs sm:text-sm text-gray-600 ml-5 sm:ml-6">Get Updates & alerts regarding general mails</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                                            <input
                                                type="checkbox"
                                                checked={notifications.general}
                                                onChange={(e) => setNotifications({ ...notifications, general: e.target.checked })}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                            <span className="ml-3 text-xs sm:text-sm font-medium text-gray-600 whitespace-nowrap">Enable All</span>
                                        </label>
                                    </div>

                                    {/* Accounting Notifications */}
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 py-3 sm:py-4 border-b border-gray-200">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                                                <h3 className="text-sm sm:text-base font-semibold text-gray-900">Accounting Notifications</h3>
                                            </div>
                                            <p className="text-xs sm:text-sm text-gray-600 ml-5 sm:ml-6">Get Updates & alerts regarding accounting emails</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                                            <input
                                                type="checkbox"
                                                checked={notifications.accounting}
                                                onChange={(e) => setNotifications({ ...notifications, accounting: e.target.checked })}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                            <span className="ml-3 text-xs sm:text-sm font-medium text-gray-600 whitespace-nowrap">Enable All</span>
                                        </label>
                                    </div>

                                    {/* Leads Notifications */}
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 py-3 sm:py-4 border-b border-gray-200">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                                                <h3 className="text-sm sm:text-base font-semibold text-gray-900">Leads Notifications</h3>
                                            </div>
                                            <p className="text-xs sm:text-sm text-gray-600 ml-5 sm:ml-6">Get Updates & alerts regarding lead mails</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                                            <input
                                                type="checkbox"
                                                checked={notifications.leads}
                                                onChange={(e) => setNotifications({ ...notifications, leads: e.target.checked })}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                            <span className="ml-3 text-xs sm:text-sm font-medium text-gray-600 whitespace-nowrap">Enable All</span>
                                        </label>
                                    </div>

                                    {/* Project & Escrow Notifications */}
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 py-3 sm:py-4 border-b border-gray-200">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                                                <h3 className="text-sm sm:text-base font-semibold text-gray-900">Project & Escrow Notifications</h3>
                                            </div>
                                            <p className="text-xs sm:text-sm text-gray-600 ml-5 sm:ml-6">Get Important updates on projects including milestones & payments.</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                                            <input
                                                type="checkbox"
                                                checked={notifications.projects}
                                                onChange={(e) => setNotifications({ ...notifications, projects: e.target.checked })}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                            <span className="ml-3 text-xs sm:text-sm font-medium text-gray-600 whitespace-nowrap">Enable All</span>
                                        </label>
                                    </div>

                                    {/* Payments & Verification Notifications */}
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 py-3 sm:py-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                                                <h3 className="text-sm sm:text-base font-semibold text-gray-900">Payments & Verification Notifications</h3>
                                            </div>
                                            <p className="text-xs sm:text-sm text-gray-600 ml-5 sm:ml-6">Get Important updates on payments and verification.</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                                            <input
                                                type="checkbox"
                                                checked={notifications.payments}
                                                onChange={(e) => setNotifications({ ...notifications, payments: e.target.checked })}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                            <span className="ml-3 text-xs sm:text-sm font-medium text-gray-600 whitespace-nowrap">Enable All</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Password & Security Tab */}
                        {activeTab === 'security' && (
                            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 md:p-8">
                                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Password & Security</h2>

                                <div className="space-y-4 sm:space-y-6">
                                    {/* Change Password */}
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 py-3 sm:py-4 border-b border-gray-200">
                                        <div className="flex-1">
                                            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Change Password</h3>
                                            <p className="text-xs sm:text-sm text-gray-600">Update your password frequently to stay secure</p>
                                        </div>
                                        <button className="w-full sm:w-auto px-3 sm:px-4 py-2 text-xs sm:text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">
                                            Change Password
                                        </button>
                                    </div>

                                    {/* Logout from all devices */}
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 py-3 sm:py-4">
                                        <div className="flex-1">
                                            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Logout from all devices</h3>
                                            <p className="text-xs sm:text-sm text-gray-600">This will log you out from all the devices you are logged in with</p>
                                        </div>
                                        <button
                                            onClick={handleLogoutAll}
                                            className="w-full sm:w-auto px-3 sm:px-4 py-2 text-xs sm:text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors whitespace-nowrap"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Configurations Tab */}
                        {activeTab === 'configurations' && (
                            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 md:p-8">
                                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Configurations</h2>
                                <p className="text-sm sm:text-base text-gray-600">Configuration settings will be available here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default UserSettings;