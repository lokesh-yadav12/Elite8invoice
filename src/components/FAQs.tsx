import React, { useState } from 'react';
import { ChevronDown, Search, HelpCircle, FileText, DollarSign, Users, Settings, Zap, Clock } from 'lucide-react';

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('getting-started');

  const categories = [
    { id: 'getting-started', name: 'Getting Started', icon: Zap },
    { id: 'creating', name: 'Creating Invoices', icon: FileText },
    { id: 'payment', name: 'Payments & Pricing', icon: DollarSign },
    { id: 'features', name: 'Features', icon: Settings },
    { id: 'clients', name: 'Client Management', icon: Users },
    { id: 'technical', name: 'Technical', icon: Clock },
  ];

  const faqs = [
    {
      category: 'getting-started',
      question: 'Is your invoice service really free?',
      answer: 'Yes, absolutely! Our invoice service is 100% free with no hidden fees, no trial periods, and no credit card required. You get unlimited invoices, all templates, and all premium features completely free forever.'
    },
    {
      category: 'getting-started',
      question: 'Do I need to create an account?',
      answer: 'You can create invoices without an account, but we recommend signing up (free) to save your invoices, track payments, manage clients, and access your invoice history from any device.'
    },
    {
      category: 'getting-started',
      question: 'How quickly can I create my first invoice?',
      answer: 'You can create a professional invoice in under 2 minutes! Simply choose a template, fill in your business details and invoice items, and download or send it immediately.'
    },
    {
      category: 'creating',
      question: 'How many invoice templates do you offer?',
      answer: 'We offer 50+ professionally designed invoice templates covering various industries and styles including modern, classic, minimal, creative, and industry-specific designs. All templates are fully customizable and free to use.'
    },
    {
      category: 'creating',
      question: 'Can I customize the invoice templates?',
      answer: 'Yes! You can customize colors, fonts, logo placement, add your branding, adjust layouts, include custom fields, and modify any element to match your business identity perfectly.'
    },
    {
      category: 'creating',
      question: 'What information should I include in an invoice?',
      answer: 'A proper invoice should include: your business name and contact details, client information, unique invoice number, issue date and due date, itemized list of products/services with quantities and prices, subtotal, taxes, total amount due, and payment terms/methods.'
    },
    {
      category: 'creating',
      question: 'Can I add my company logo?',
      answer: 'Absolutely! You can upload your company logo in various formats (PNG, JPG, SVG) and position it anywhere on the invoice. The logo will be saved for future invoices.'
    },
    {
      category: 'creating',
      question: 'How many invoices can I create?',
      answer: 'Unlimited! There are no restrictions on the number of invoices you can create. Whether you need 5 or 5,000 invoices per month, it is all completely free.'
    },
    {
      category: 'payment',
      question: 'Do you charge any fees or commissions?',
      answer: 'No, we never charge any fees, commissions, or transaction costs. Our service is completely free. You keep 100% of your payments.'
    },
    {
      category: 'payment',
      question: 'Can I accept payments through your platform?',
      answer: 'You can add payment instructions and links to your preferred payment methods (PayPal, bank transfer, credit card processors, etc.) on your invoices. We provide the invoicing, you choose your payment processor.'
    },
    {
      category: 'payment',
      question: 'What currencies are supported?',
      answer: 'We support 150+ currencies including USD, EUR, GBP, INR, AUD, CAD, and many more. You can easily switch between currencies and the invoice will automatically format amounts correctly.'
    },
    {
      category: 'payment',
      question: 'Can I set up recurring invoices?',
      answer: 'Yes! You can set up recurring invoices for subscriptions or regular services. Choose weekly, monthly, quarterly, or yearly billing, and we will automatically generate and send invoices on schedule.'
    },
    {
      category: 'payment',
      question: 'How do I track payment status?',
      answer: 'Our dashboard shows all invoice statuses: unpaid, paid, overdue, and partially paid. You can update payment status manually or mark invoices as paid when you receive payment. You will also get visual indicators and can filter by status.'
    },
    {
      category: 'features',
      question: 'Can I calculate taxes automatically?',
      answer: 'Yes! Add tax rates (VAT, GST, sales tax, etc.) and we will automatically calculate totals. You can set multiple tax rates, compound taxes, and save them for future use.'
    },
    {
      category: 'features',
      question: 'Can I add discounts to invoices?',
      answer: 'Absolutely! Add discounts as a percentage or fixed amount. You can apply discounts to individual line items or the entire invoice, and the total will be calculated automatically.'
    },
    {
      category: 'features',
      question: 'What file formats can I download invoices in?',
      answer: 'You can download invoices as PDF (most common), PNG, JPG, or Excel/CSV for record-keeping. PDFs are print-ready and professional-looking for sending to clients.'
    },
    {
      category: 'features',
      question: 'Can I send invoices directly to clients?',
      answer: 'Yes! Send invoices via email directly from our platform. You can customize the email message, and clients will receive a professional email with the invoice attached as PDF.'
    },
    {
      category: 'features',
      question: 'Do you offer automatic payment reminders?',
      answer: 'Yes! Set up automatic reminders that are sent to clients before and after the due date. Customize reminder timing and messages to maintain good client relationships while ensuring timely payment.'
    },
    {
      category: 'clients',
      question: 'Can I manage multiple clients?',
      answer: 'Yes! Save unlimited client information including contact details, billing addresses, payment terms, and invoice history. Quickly select clients when creating new invoices.'
    },
    {
      category: 'clients',
      question: 'Can multiple team members access the account?',
      answer: 'Yes! Add team members with different permission levels. Control who can create, edit, send invoices, and access financial data. Perfect for growing businesses.'
    },
    {
      category: 'clients',
      question: 'How do I track which client owes what?',
      answer: 'Our dashboard provides a complete overview showing outstanding balances per client, aging reports, and payment history. Filter and sort by client to see their complete invoice history.'
    },
    {
      category: 'technical',
      question: 'Is my data secure?',
      answer: 'Yes! We use bank-level encryption (SSL/TLS) to protect your data. All information is encrypted in transit and at rest. We never sell your data to third parties and comply with data protection regulations.'
    },
    {
      category: 'technical',
      question: 'Can I access my invoices from mobile devices?',
      answer: 'Absolutely! Our platform is fully responsive and works perfectly on smartphones and tablets. Create, edit, and send invoices on the go from any device.'
    },
    {
      category: 'technical',
      question: 'Do I need to install any software?',
      answer: 'No installation needed! Our invoice generator works entirely in your web browser. Just visit our website and start creating invoices immediately from any computer or device.'
    },
    {
      category: 'technical',
      question: 'What if I accidentally delete an invoice?',
      answer: 'Deleted invoices are moved to trash where they stay for 30 days before permanent deletion. You can restore them anytime within this period. After 30 days, they are permanently removed.'
    },
    {
      category: 'features',
      question: 'Can I create estimates or quotes?',
      answer: 'Yes! Use the same templates to create professional estimates and quotes. When the client approves, you can convert the estimate to an invoice with one click.'
    },
    {
      category: 'features',
      question: 'Do you provide invoice numbering?',
      answer: 'Yes! We automatically generate sequential invoice numbers (customizable format like INV-001, 2025-001, etc.). You can also set your own numbering scheme and starting number.'
    },
    {
      category: 'creating',
      question: 'Can I create invoices in multiple languages?',
      answer: 'Yes! Our templates support multiple languages. You can create invoices in English, Spanish, French, German, Hindi, and many more languages with proper formatting for each.'
    },
    {
      category: 'features',
      question: 'Can I export my invoice data?',
      answer: 'Yes! Export all your invoice data as CSV or Excel for accounting software, tax filing, or analysis. You can also backup all your invoices as PDFs in bulk.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    // If there's a search query, search across all categories
    if (searchQuery !== '') {
      return matchesSearch;
    }
    
    // Otherwise, filter by selected category
    const matchesCategory = faq.category === selectedCategory;
    return matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-purple-200 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <HelpCircle className="w-4 h-4" />
            Help Center
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about creating professional invoices
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:pl-12 sm:pr-4 pl-10 py-2 sm:py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-lg"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex gap-3 justify-center min-w-max px-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-2 sm:px-5 py-2 sm:py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results count */}
        {searchQuery && (
          <div className="text-center mb-6 text-gray-600">
            Found {filteredFAQs.length} result{filteredFAQs.length !== 1 ? 's' : ''} for "{searchQuery}"
          </div>
        )}

        {/* FAQ Items */}
        <div className="space-y-2">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 sm:py-4 py-2 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="test:md sm:text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                      openIndex === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 sm:pb-5 pb-3 pt-2">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">Try adjusting your search or browse all categories</p>
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Still have questions?</h2>
          <p className="text-md sm:text-xl mb-6 text-blue-100">
            Our support team is here to help you create perfect invoices
          </p>
          <div className="flex flex-wrap sm:gap-4 gap-2 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors">
              Contact Support
            </button>
            <button className="bg-blue-700 text-white px-4 sm:px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors border-2 border-blue-400">
              View Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;