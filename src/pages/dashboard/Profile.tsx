import { useState, useEffect } from 'react';
import { User, Mail, Building, Phone, Globe, DollarSign, Users, Briefcase, Edit2, Save, X } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);

    // Get data from localStorage
    const [profileData, setProfileData] = useState({
        // Signup data
        fullName: '',
        email: '',
        companyName: '',
        // Business data
        businessName: '',
        brandName: '',
        teamSize: '',
        website: '',
        phoneNumber: '',
        countryCode: '',
        country: '',
        currency: '',
        useFor: ''
    });

    useEffect(() => {
        // Load data from localStorage
        const signupData = localStorage.getItem('signupData');
        const businessData = localStorage.getItem('businessData');

        if (signupData) {
            const parsed = JSON.parse(signupData);
            setProfileData(prev => ({
                ...prev,
                fullName: parsed.fullName || '',
                email: parsed.email || '',
                companyName: parsed.companyName || ''
            }));
        }

        if (businessData) {
            const parsed = JSON.parse(businessData);
            setProfileData(prev => ({
                ...prev,
                businessName: parsed.businessName || '',
                brandName: parsed.brandName || '',
                teamSize: parsed.teamSize || '',
                website: parsed.website || '',
                phoneNumber: parsed.phoneNumber || '',
                countryCode: parsed.countryCode || '',
                country: parsed.country || '',
                currency: parsed.currency || '',
                useFor: parsed.useFor || ''
            }));
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = () => {
        // Save updated data to localStorage
        const signupData = {
            fullName: profileData.fullName,
            email: profileData.email,
            companyName: profileData.companyName
        };

        const businessData = {
            businessName: profileData.businessName,
            brandName: profileData.brandName,
            teamSize: profileData.teamSize,
            website: profileData.website,
            phoneNumber: profileData.phoneNumber,
            countryCode: profileData.countryCode,
            country: profileData.country,
            currency: profileData.currency,
            useFor: profileData.useFor
        };

        localStorage.setItem('signupData', JSON.stringify(signupData));
        localStorage.setItem('businessData', JSON.stringify(businessData));

        setIsEditing(false);
        alert('Profile updated successfully!');
    };

    const handleCancel = () => {
        // Reload data from localStorage
        const signupData = localStorage.getItem('signupData');
        const businessData = localStorage.getItem('businessData');

        if (signupData) {
            const parsed = JSON.parse(signupData);
            setProfileData(prev => ({
                ...prev,
                fullName: parsed.fullName || '',
                email: parsed.email || '',
                companyName: parsed.companyName || ''
            }));
        }

        if (businessData) {
            const parsed = JSON.parse(businessData);
            setProfileData(prev => ({
                ...prev,
                businessName: parsed.businessName || '',
                brandName: parsed.brandName || '',
                teamSize: parsed.teamSize || '',
                website: parsed.website || '',
                phoneNumber: parsed.phoneNumber || '',
                countryCode: parsed.countryCode || '',
                country: parsed.country || '',
                currency: parsed.currency || '',
                useFor: parsed.useFor || ''
            }));
        }

        setIsEditing(false);
    };

    return (
        <DashboardLayout>
            <div className="p-4 sm:p-8 max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Profile</h1>
                        <p className="text-sm sm:text-base text-gray-600 mt-1">Manage your account information</p>
                    </div>

                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            <Edit2 className="w-4 h-4" />
                            Edit Profile
                        </button>
                    ) : (
                        <div className="flex gap-2 w-full sm:w-auto">
                            <button
                                onClick={handleSave}
                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                <Save className="w-4 h-4" />
                                Save
                            </button>
                            <button
                                onClick={handleCancel}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                <X className="w-4 h-4" />
                                Cancel
                            </button>
                        </div>
                    )}
                </div>

                {/* Profile Avatar */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                            {profileData.fullName ? profileData.fullName.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{profileData.fullName || 'User Name'}</h2>
                            <p className="text-gray-600">{profileData.email || 'email@example.com'}</p>
                            <p className="text-sm text-gray-500 mt-1">{profileData.businessName || profileData.companyName || 'Company Name'}</p>
                        </div>
                    </div>
                </div>

                {/* Personal Information */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-purple-600" />
                        Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="fullName"
                                    value={profileData.fullName}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg ${isEditing ? 'bg-white focus:ring-2 focus:ring-purple-500' : 'bg-gray-50'
                                        }`}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={profileData.email}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg ${isEditing ? 'bg-white focus:ring-2 focus:ring-purple-500' : 'bg-gray-50'
                                        }`}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                            <div className="relative">
                                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="companyName"
                                    value={profileData.companyName}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg ${isEditing ? 'bg-white focus:ring-2 focus:ring-purple-500' : 'bg-gray-50'
                                        }`}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Business Information */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-purple-600" />
                        Business Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                            <div className="relative">
                                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="businessName"
                                    value={profileData.businessName}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg ${isEditing ? 'bg-white focus:ring-2 focus:ring-purple-500' : 'bg-gray-50'
                                        }`}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Brand Name</label>
                            <div className="relative">
                                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="brandName"
                                    value={profileData.brandName}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg ${isEditing ? 'bg-white focus:ring-2 focus:ring-purple-500' : 'bg-gray-50'
                                        }`}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Team Size</label>
                            <div className="relative">
                                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="teamSize"
                                    value={profileData.teamSize}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg ${isEditing ? 'bg-white focus:ring-2 focus:ring-purple-500' : 'bg-gray-50'
                                        }`}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                            <div className="relative">
                                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="website"
                                    value={profileData.website}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg ${isEditing ? 'bg-white focus:ring-2 focus:ring-purple-500' : 'bg-gray-50'
                                        }`}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={`${profileData.countryCode} ${profileData.phoneNumber}`}
                                    disabled={true}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Use For</label>
                            <div className="relative">
                                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="useFor"
                                    value={profileData.useFor}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg ${isEditing ? 'bg-white focus:ring-2 focus:ring-purple-500' : 'bg-gray-50'
                                        }`}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Location & Currency */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-purple-600" />
                        Location & Currency
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                            <div className="relative">
                                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="country"
                                    value={profileData.country}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg ${isEditing ? 'bg-white focus:ring-2 focus:ring-purple-500' : 'bg-gray-50'
                                        }`}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="currency"
                                    value={profileData.currency}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg ${isEditing ? 'bg-white focus:ring-2 focus:ring-purple-500' : 'bg-gray-50'
                                        }`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Profile;
