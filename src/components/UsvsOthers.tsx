import React, { useState } from 'react';
import { Check, X, Zap, Crown } from 'lucide-react';

type FeatureName =
  | 'Invoice Creation'
  | 'Number of Invoices'
  | 'Template Variety'
  | 'Multiple Currencies'
  | 'Client Management'
  | 'Export to PDF'
  | 'Email Invoices'
  | 'Reports & Analytics'
  // | 'Multi-user Access'
  | 'Priority Support';

interface Provider {
  name: string;
  highlight?: boolean;
  price: string;
  priceMonthly: number;
  priceYearly: number;
  tagline: string;
  features: Record<FeatureName, string | boolean>;
}

const UsvsOthers = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const features: { name: FeatureName; category: string }[] = [
    { name: 'Invoice Creation', category: 'core' },
    { name: 'Number of Invoices', category: 'core' },
    { name: 'Template Variety', category: 'core' },
    { name: 'Multiple Currencies', category: 'advanced' },
    { name: 'Client Management', category: 'advanced' },
    { name: 'Export to PDF', category: 'core' },
    { name: 'Email Invoices', category: 'core' },
    { name: 'Reports & Analytics', category: 'advanced' },
    // { name: 'Multi-user Access', category: 'team' },
    { name: 'Priority Support', category: 'support' },
  ];

  const providers: Provider[] = [
    {
      name: 'Us Free',
      highlight: true,
      price: 'Free',
      priceMonthly: 0,
      priceYearly: 0,
      tagline: ' ',
      features: {
        'Invoice Creation': true,
        'Number of Invoices': 'Unlimited',
        'Template Variety': '10+ Templates',
        'Multiple Currencies': true,
        'Client Management': true,
        'Export to PDF': true,
        'Email Invoices': true,
        'Reports & Analytics': true,
        // 'Multi-user Access': true,
        'Priority Support': true,
      }
    },
    {
      name: 'Others',
      price: '$15',
      priceMonthly: 15,
      priceYearly: 144,
      tagline: 'Basic Plan',
      features: {
        'Invoice Creation': true,
        'Number of Invoices': '50/month',
        'Template Variety': '10 Templates',
        'Multiple Currencies': true,
        'Client Management': '25 clients',
        'Export to PDF': true,
        'Email Invoices': true,
        'Reports & Analytics': false,
        // 'Multi-user Access': false,
        'Priority Support': false,
      }
    },
    // {
    //   name: 'Others',
    //   price: '$29',
    //   priceMonthly: 29,
    //   priceYearly: 290,
    //   tagline: 'Pro Plan',
    //   features: {
    //     'Invoice Creation': true,
    //     'Number of Invoices': 'Unlimited',
    //     'Template Variety': '15 Templates',
    //     'Multiple Currencies': true,
    //     'Client Management': 'Unlimited',
    //     'Export to PDF': true,
    //     'Email Invoices': true,
    //     'Reports & Analytics': true,
    //     'Multi-user Access': false,
    //     'Priority Support': false,
    //   }
    // },
    {
      name: 'Others',
      price: '$49',
      priceMonthly: 49,
      priceYearly: 470,
      tagline: 'Premium Plan',
      features: {
        'Invoice Creation': true,
        'Number of Invoices': 'Unlimited',
        'Template Variety': '15 Templates',
        'Multiple Currencies': true,
        'Client Management': 'Unlimited',
        'Export to PDF': true,
        'Email Invoices': true,
        'Reports & Analytics': true,
        // 'Multi-user Access': true,
        'Priority Support': true,
      }
    }
  ];

  const renderFeatureValue = (value: string | boolean) => {
    if (value === true) {
      return <Check className="w-5 h-5 text-green-500 mx-auto" />;
    } else if (value === false) {
      return <X className="w-5 h-5 text-gray-300 mx-auto" />;
    } else {
      return <span className="text-sm text-gray-700 font-medium">{value}</span>;
    }
  };

  const calculateSavings = (provider: Provider) => {
    // if (provider.highlight) return null;
    const price = billingCycle === 'monthly' ? provider.priceMonthly * 12 : provider.priceYearly;
    return price;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-purple-200 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Zap className="w-4 h-4" />
            100% Free 
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Why Pay When You Can Get It{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Free?
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Compare our unlimited free invoice service with paid competitors. Same features, zero cost.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 p-1 rounded-lg inline-flex">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl md:mx-8 shadow-2xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-6 bg-gray-50">
                    <div className="font-semibold text-gray-900">Features</div>
                  </th>
                  {providers.map((provider, idx) => (
                    <th key={idx} className={`p-6 ${provider.highlight ? 'bg-gradient-to-br from-blue-400 to-purple-600' : 'bg-gray-50'}`}>
                      <div className="text-center">
                        {provider.highlight && (
                          <div className="inline-flex items-center gap-1 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold mb-2">
                            <Crown className="w-3 h-3" />
                            BEST VALUE
                          </div>
                        )}
                        <div className={`font-bold text-lg ${provider.highlight ? 'text-white' : 'text-gray-900'}`}>
                          {provider.name}
                        </div>
                        <div className={`text-sm ${provider.highlight ? 'text-blue-100' : 'text-gray-500'} mb-3`}>
                          {provider.tagline}
                        </div>
                        <div className={`text-3xl font-bold ${provider.highlight ? 'text-white' : 'text-gray-900'}`}>
                          {
                          // provider.highlight ? 'FREE' :
                           `$${billingCycle === 'monthly' ? provider.priceMonthly : provider.priceYearly}`}
                        </div>
                        <div className={`text-sm ${provider.highlight ? 'text-blue-100' : 'text-gray-500'}`}>
                          {
                          // provider.highlight ? 'Forever' :
                           `/${billingCycle === 'monthly' ? 'month' : 'year'}`}
                        </div>
                        { (
                          <div className="mt-3 text-sm font-semibold text-red-600">
                            You'd pay ${calculateSavings(provider)}/year
                          </div>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, idx) => (
                  <tr key={idx} className={`border-b border-gray-100 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    <td className="p-4 font-medium text-gray-900">
                      {feature.name}
                    </td>
                    {providers.map((provider, pIdx) => (
                      <td key={pIdx} className={`p-4 text-center ${provider.highlight ? 'bg-blue-50' : ''}`}>
                        {renderFeatureValue(provider.features[feature.name])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Save Up To $588/Year
            </h2>
            <p className="text-xl mb-6 text-blue-100">
              Get all premium features completely free. No credit card required. No hidden fees. Ever.
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg">
              Start Creating Invoices Free
            </button>
            <div className="mt-4 flex items-center justify-center gap-6 text-sm text-blue-100">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                No credit card needed
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                Unlimited invoices
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                50+ templates
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsvsOthers;