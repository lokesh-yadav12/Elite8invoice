import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Plus } from 'lucide-react';

const BusinessDetails = () => {
    const navigate = useNavigate();

    const [businessData, setBusinessData] = useState({
        businessName: '',
        brandName: '',
        teamSize: '',
        website: '',
        phoneNumber: '',
        countryCode: '+1',
        country: 'United States of America',
        currency: 'US Dollar(USD, $)',
        useFor: ''
    });

    const [showBrandName, setShowBrandName] = useState(false);
    const [showCountryCodeDropdown, setShowCountryCodeDropdown] = useState(false);
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);
    const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

    // Country to currency and phone code mapping
    const countryData: { [key: string]: { currency: string; code: string; flag: string } } = {
        'United States of America': { currency: 'US Dollar(USD, $)', code: '+1', flag: '🇺🇸' },
        'India': { currency: 'Indian Rupee(INR, ₹)', code: '+91', flag: '🇮🇳' },
        'United Kingdom': { currency: 'British Pound(GBP, £)', code: '+44', flag: '🇬🇧' },
        'Canada': { currency: 'Canadian Dollar(CAD, $)', code: '+1', flag: '🇨🇦' },
        'Australia': { currency: 'Australian Dollar(AUD, $)', code: '+61', flag: '🇦🇺' },
        'Germany': { currency: 'Euro(EUR, €)', code: '+49', flag: '🇩🇪' },
        'France': { currency: 'Euro(EUR, €)', code: '+33', flag: '🇫🇷' },
        'Japan': { currency: 'Japanese Yen(JPY, ¥)', code: '+81', flag: '🇯🇵' },
        'China': { currency: 'Chinese Yuan(CNY, ¥)', code: '+86', flag: '🇨🇳' },
        'Brazil': { currency: 'Brazilian Real(BRL, R$)', code: '+55', flag: '🇧🇷' },
        'Mexico': { currency: 'Mexican Peso(MXN, $)', code: '+52', flag: '🇲🇽' },
        'Singapore': { currency: 'Singapore Dollar(SGD, $)', code: '+65', flag: '🇸🇬' },
        'United Arab Emirates': { currency: 'UAE Dirham(AED, د.إ)', code: '+971', flag: '🇦🇪' },
        'South Africa': { currency: 'South African Rand(ZAR, R)', code: '+27', flag: '🇿🇦' },
        'New Zealand': { currency: 'New Zealand Dollar(NZD, $)', code: '+64', flag: '🇳🇿' }
    };

    const handleBusinessChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // If country, currency, or countryCode changes, update all three fields
        if (name === 'country') {
            const countryInfo = countryData[value];
            setBusinessData({
                ...businessData,
                country: value,
                currency: countryInfo.currency,
                countryCode: countryInfo.code
            });
        } else if (name === 'currency') {
            // Find country by currency
            const country = Object.keys(countryData).find(key => countryData[key].currency === value);
            if (country) {
                const countryInfo = countryData[country];
                setBusinessData({
                    ...businessData,
                    country: country,
                    currency: value,
                    countryCode: countryInfo.code
                });
            }
        } else if (name === 'countryCode') {
            // Find country by country code
            const country = Object.keys(countryData).find(key => countryData[key].code === value);
            if (country) {
                const countryInfo = countryData[country];
                setBusinessData({
                    ...businessData,
                    country: country,
                    currency: countryInfo.currency,
                    countryCode: value
                });
            }
        } else {
            setBusinessData({
                ...businessData,
                [name]: value
            });
        }
    };

    const handleBusinessSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate required fields
        if (!businessData.businessName || !businessData.teamSize || !businessData.phoneNumber ||
            !businessData.country || !businessData.currency || !businessData.useFor) {
            alert('Please fill all required fields');
            return;
        }

        // Save business data to localStorage
        localStorage.setItem('businessData', JSON.stringify(businessData));

        // Navigate to dashboard
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/Dashboard');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Tell us about your business</h1>
                    <p className="text-gray-600">This helps us personalize your experience</p>
                </div>

                {/* Business Details Card */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                    <form onSubmit={handleBusinessSubmit} className="space-y-6">
                        {/* Business Name */}
                        <div>
                            <label htmlFor="businessName" className="block text-base font-semibold text-gray-900 mb-1">
                                1. Business Name<span className="text-red-500">*</span>
                            </label>
                            <p className="text-sm text-gray-500 mb-3">Official Name used across Accounting documents and reports.</p>
                            <input
                                id="businessName"
                                name="businessName"
                                type="text"
                                required
                                value={businessData.businessName}
                                onChange={handleBusinessChange}
                                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="If you're a freelancer, add your personal name"
                            />

                            <button
                                type="button"
                                onClick={() => setShowBrandName(!showBrandName)}
                                className="mt-3 flex items-center gap-2 text-purple-600 hover:text-purple-700 text-sm font-medium"
                            >
                                <Plus className="w-4 h-4" />
                                Add Brand or Display name
                            </button>

                            {/* Brand Name Field - Shows when button is clicked */}
                            {showBrandName && (
                                <div className="mt-4">
                                    <label htmlFor="brandName" className="block text-sm font-medium text-gray-700 mb-2">
                                        Add Brand
                                    </label>
                                    <input
                                        id="brandName"
                                        name="brandName"
                                        type="text"
                                        value={businessData.brandName}
                                        onChange={handleBusinessChange}
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="Your Brand Name"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Team Size */}
                        <div>
                            <label htmlFor="teamSize" className="block text-base font-semibold text-gray-900 mb-3">
                                2. Team Size<span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    id="teamSize"
                                    name="teamSize"
                                    required
                                    value={businessData.teamSize}
                                    onChange={handleBusinessChange}
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
                                >
                                    <option value="">Select Team Size</option>
                                    <option value="1">Just me</option>
                                    <option value="2-10">2-10 employees</option>
                                    <option value="11-50">11-50 employees</option>
                                    <option value="51-200">51-200 employees</option>
                                    <option value="200+">200+ employees</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Website */}
                        <div>
                            <label htmlFor="website" className="block text-base font-semibold text-gray-900 mb-1">
                                3. Website
                            </label>
                            <p className="text-sm text-gray-500 mb-3">Add your business or work website. Helps potential clients find you faster.</p>
                            <input
                                id="website"
                                name="website"
                                type="url"
                                value={businessData.website}
                                onChange={handleBusinessChange}
                                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Your Work Website"
                            />
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label htmlFor="phoneNumber" className="block text-base font-semibold text-gray-900 mb-1">
                                4. Phone Number<span className="text-red-500">*</span>
                            </label>
                            <p className="text-sm text-gray-500 mb-3">Contact phone number associated with your business</p>
                            <div className="flex gap-2">
                                <div className="relative w-40">
                                    <button
                                        type="button"
                                        onClick={() => setShowCountryCodeDropdown(!showCountryCodeDropdown)}
                                        className="w-full flex items-center justify-between px-3 py-3 border border-gray-300 rounded-lg bg-white hover:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    >
                                        <span className="flex items-center gap-2">
                                            <span className="text-lg">{countryData[businessData.country].flag}</span>
                                            <span className="text-sm">{businessData.countryCode}</span>
                                        </span>
                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                    </button>

                                    {showCountryCodeDropdown && (
                                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-[200px] overflow-y-auto">
                                            {Object.keys(countryData).map((country) => (
                                                <button
                                                    key={country}
                                                    type="button"
                                                    onClick={() => {
                                                        handleBusinessChange({ target: { name: 'countryCode', value: countryData[country].code } } as React.ChangeEvent<HTMLSelectElement>);
                                                        setShowCountryCodeDropdown(false);
                                                    }}
                                                    className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-purple-50 ${businessData.countryCode === countryData[country].code ? 'bg-purple-50' : ''
                                                        }`}
                                                >
                                                    <span className="text-lg">{countryData[country].flag}</span>
                                                    <span className="text-sm">{country}</span>
                                                    <span className="text-sm text-gray-500 ml-auto">{countryData[country].code}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="tel"
                                    required
                                    value={businessData.phoneNumber}
                                    onChange={handleBusinessChange}
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="Phone number"
                                />
                            </div>
                        </div>

                        {/* Country and Currency */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Country */}
                            <div>
                                <label htmlFor="country" className="block text-base font-semibold text-gray-900 mb-3">
                                    5. Country<span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                                        className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-white hover:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-left"
                                    >
                                        <span className="text-sm">{businessData.country}</span>
                                        <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                    </button>

                                    {showCountryDropdown && (
                                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-[200px] overflow-y-auto">
                                            {Object.keys(countryData).map((country) => (
                                                <button
                                                    key={country}
                                                    type="button"
                                                    onClick={() => {
                                                        handleBusinessChange({ target: { name: 'country', value: country } } as React.ChangeEvent<HTMLSelectElement>);
                                                        setShowCountryDropdown(false);
                                                    }}
                                                    className={`w-full px-4 py-2 text-left text-sm hover:bg-purple-50 ${businessData.country === country ? 'bg-purple-50' : ''
                                                        }`}
                                                >
                                                    {country}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Currency */}
                            <div>
                                <label htmlFor="currency" className="block text-base font-semibold text-gray-900 mb-3">
                                    6. Currency<span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                                        className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-white hover:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-left"
                                    >
                                        <span className="text-sm">{businessData.currency}</span>
                                        <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                    </button>

                                    {showCurrencyDropdown && (
                                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-[200px] overflow-y-auto">
                                            {Array.from(new Set(Object.values(countryData).map(c => c.currency))).map((currency) => (
                                                <button
                                                    key={currency}
                                                    type="button"
                                                    onClick={() => {
                                                        handleBusinessChange({ target: { name: 'currency', value: currency } } as React.ChangeEvent<HTMLSelectElement>);
                                                        setShowCurrencyDropdown(false);
                                                    }}
                                                    className={`w-full px-4 py-2 text-left text-sm hover:bg-purple-50 ${businessData.currency === currency ? 'bg-purple-50' : ''
                                                        }`}
                                                >
                                                    {currency}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* What do you want to use Refrens for */}
                        <div>
                            <label htmlFor="useFor" className="block text-base font-semibold text-gray-900 mb-1">
                                7. What do you want to use Refrens for?<span className="text-red-500">*</span>
                            </label>
                            <p className="text-sm text-gray-500 mb-3">Help us serve you better!</p>
                            <div className="relative">
                                <select
                                    id="useFor"
                                    name="useFor"
                                    required
                                    value={businessData.useFor}
                                    onChange={handleBusinessChange}
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white text-gray-700"
                                >
                                    <option value="">Select...</option>
                                    <option value="invoicing">Invoicing & Billing</option>
                                    <option value="accounting">Accounting & Bookkeeping</option>
                                    <option value="inventory">Inventory Management</option>
                                    <option value="crm">CRM & Sales</option>
                                    <option value="all">All of the above</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full md:w-auto bg-purple-600 text-white py-3 px-8 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 font-semibold text-lg shadow-sm hover:shadow-md"
                        >
                            Save & Continue
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BusinessDetails;
