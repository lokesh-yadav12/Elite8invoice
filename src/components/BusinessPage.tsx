import { useState } from 'react';
import { BarChart3, FileText, Shield, CreditCard, Package, Receipt, TrendingUp, Users } from 'lucide-react';
import React from 'react';

type FeatureKey = 'Accounting' | 'Invoicing' | 'Compliance' | 'Payments' | 'Inventory' | 'Expenses' | 'Sales' | 'Vendors';

interface Feature {
    title: string;
    description: string;
    icon: React.ReactElement;
    color: string;
}

const BusinessPage = () => {
    const [activeTab, setActiveTab] = useState<FeatureKey>('Invoicing');

    const features: Record<FeatureKey, Feature> = {
        
        Invoicing: {
            title: 'Invoicing',
            description: 'Create professional invoices in seconds, customize templates to match your brand, send automated payment reminders, track invoice status in real-time, accept online payments, and manage recurring invoices effortlessly.',
            icon: <FileText className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56" />,
            color: '#06B6D4'
        },
        Accounting: {
            title: 'Accounting',
            description: 'Automatically update your books when you make a sale or record a purchase, generate financial reports, automate bank reconciliation, access audit trails, create E-invoices & E-way Bills, generate GSTR-1 & GSTR-2B Reports, and automate GSTR-2B reconciliation.',
            icon: <BarChart3 className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56" />,
            color: '#8B5CF6'
        },
        
        Payments: {
            title: 'Payments',
            description: 'Accept payments through multiple channels, process credit cards and digital wallets, automate payment tracking, send payment links, reconcile payments automatically, and reduce payment collection time.',
            icon: <CreditCard className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56" />,
            color: '#F59E0B'
        },
        Compliance: {
            title: 'Compliance',
            description: 'Stay compliant with tax regulations, automate GST filing, generate tax reports, maintain digital records, track compliance deadlines, and get alerts for upcoming submissions to avoid penalties.',
            icon: <Shield className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56" />,
            color: '#10B981'
        },
        Inventory: {
            title: 'Inventory',
            description: 'Track stock levels in real-time, set up low stock alerts, manage multiple warehouses, automate reordering, track batch and serial numbers, and generate inventory valuation reports.',
            icon: <Package className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56" />,
            color: '#EF4444'
        },
        Expenses: {
            title: 'Expenses',
            description: 'Track business expenses effortlessly, capture receipts on the go, categorize expenses automatically, manage employee reimbursements, set budget limits, and generate expense reports for better financial control.',
            icon: <Receipt className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56" />,
            color: '#EC4899'
        },
        Sales: {
            title: 'Sales',
            description: 'Manage your sales pipeline, track leads and opportunities, create quotes and estimates, convert quotes to invoices, analyze sales performance, and forecast revenue with powerful analytics.',
            icon: <TrendingUp className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56" />,
            color: '#6366F1'
        },
        Vendors: {
            title: 'Vendors',
            description: 'Manage vendor relationships, track purchase orders, maintain vendor databases, monitor vendor performance, automate vendor payments, and streamline procurement processes for better supplier management.',
            icon: <Users className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56" />,
            color: '#14B8A6'
        }
    };

    const currentFeature = features[activeTab];

    const handleTryForFree = () => {
        if (activeTab === 'Invoicing') {
            window.location.href = '/templete';
        }
    };

    const handleExplore = () => {
        if (activeTab === 'Invoicing') {
            window.location.href = '/invoice/invoice-generator';
        }
    };

    const handleComingSoon = () => {
        alert(`${activeTab} feature is coming soon! Stay tuned for updates.`);
    };

    return (
        <div className="min-h-screen my-6 sm:my-8 lg:my-12 bg-gradient-to-br from-blue-200 via-white to-purple-200">
            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 mt-4 sm:mt-6 lg:mt-8">
                <h1 className="text-xl sm:text-2xl md:text-3xl py-4 sm:py-6 lg:py-8 font-bold text-gray-900 text-center mb-4 sm:mb-6 lg:mb-8">
                    Everything You Need To Grow Your Business
                </h1>

                {/* Navigation Tabs */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    {(Object.keys(features) as FeatureKey[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-full text-xs sm:text-sm lg:text-base font-medium transition-all duration-300 ${activeTab === tab
                                ? 'bg-white text-gray-900 shadow-lg'
                                : 'bg-white/50 text-gray-800 hover:bg-white hover:shadow-md'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Content Section */}
                <div className="rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 lg:p-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center mx-0 sm:mx-4 md:mx-8 lg:mx-20">
                        {/* Left Content */}
                        <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
                                {currentFeature.title}
                            </h2>
                            <p className="text-sm sm:text-base lg:text-lg text-black leading-relaxed">
                                {currentFeature.description}
                            </p>
                            
                            {/* Conditional Buttons */}
                            {activeTab === 'Invoicing' ? (
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-3 lg:pt-4">
                                    <button
                                        onClick={handleTryForFree}
                                        className="w-full sm:w-auto px-4 sm:px-5 lg:px-6 py-2 sm:py-2 bg-purple-600 hover:bg-black text-white font-semibold rounded-xl transition-colors duration-300 shadow-lg text-sm sm:text-base"
                                    >
                                        Try for Free
                                    </button>
                                    <button
                                        onClick={handleExplore}
                                        className="w-full sm:w-auto px-4 sm:px-5 lg:px-6 py-2 sm:py-2 bg-white hover:bg-blue-300 text-blue-900 font-semibold rounded-xl border-2 border-blue-200 transition-colors duration-300 text-sm sm:text-base"
                                    >
                                        Explore {currentFeature.title}
                                    </button>
                                </div>
                            ) : (
                                <div className="pt-2 sm:pt-3 lg:pt-4">
                                    <button
                                        onClick={handleComingSoon}
                                        className="w-full sm:w-auto px-4 sm:px-5 lg:px-6 py-2 sm:py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg text-sm sm:text-base flex items-center justify-center gap-2"
                                    >
                                        <svg 
                                            className="w-5 h-5" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={2} 
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                                            />
                                        </svg>
                                        Coming Soon - Stay Tuned!
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Right Icon */}
                        <div className="flex justify-center items-center mt-6 md:mt-0">
                            <div
                                className="transition-all text-blue-500 duration-500 transform hover:scale-105"
                            >
                                {currentFeature.icon}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessPage;