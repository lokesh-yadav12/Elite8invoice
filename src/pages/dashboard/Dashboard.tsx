import { useState } from 'react';
import { Plus, ExternalLink, Calendar } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const Dashboard = () => {
  const [user] = useState({
    name: 'LOKESH KUMAR',
    company: 'Lokesh',
    email: 'admin@company.com',
    emailVerified: false
  });

  const lastInvoice = {
    invoiceNo: 'A00002',
    billedTo: 'ffasffdfsfggg',
    amount: 'HK$15,160.80',
    date: '06 Jan 2026'
  };

  const lastQuotation = {
    quotationNo: 'A00001',
    quotationFor: 'ffasffdfsfggg',
    amount: '₹1',
    date: '10 Jan 2026'
  };

  return (
    <DashboardLayout>
      {/* Main Content */}
      <div className="p-3 mt-4 sm:mt-2 sm:p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto w-full min-h-screen">
        {/* Welcome Section */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 w-full sm:w-auto">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-lg sm:text-xl md:text-xl lg:text-2xl font-bold flex-shrink-0">
                L
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-600 truncate">Hello {user.name} -IIITK</p>
                <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 truncate">Welcome to {user.company}!</h1>
              </div>
            </div>

            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors flex-shrink-0">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium whitespace-nowrap">Book A Demo</span>
            </button>
          </div>
        </div>

        {/* Getting Started Section */}
        <div className="mb-3 sm:mb-4 md:mb-6">
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Getting Started</h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {/* Your Last Invoice Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5 hover:shadow-lg transition-shadow">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">Your Last Invoice</h3>

            <div className="space-y-2.5 sm:space-y-3 mb-4 sm:mb-5">
              <div>
                <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">Invoice No.</p>
                <p className="text-xs sm:text-sm font-medium text-gray-900">{lastInvoice.invoiceNo}</p>
              </div>

              <div>
                <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">Billed To</p>
                <p className="text-xs sm:text-sm text-gray-900 break-words line-clamp-2">{lastInvoice.billedTo}</p>
              </div>

              <div>
                <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">Amount</p>
                <p className="text-xs sm:text-sm font-medium text-gray-900">{lastInvoice.amount}</p>
              </div>

              <div>
                <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">Invoice Date</p>
                <p className="text-xs sm:text-sm text-gray-900">{lastInvoice.date}</p>
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-1.5 px-3 py-2 sm:py-2.5 text-purple-600 border border-purple-600 rounded hover:bg-purple-50 transition-colors text-xs sm:text-sm font-medium mb-2 whitespace-nowrap">
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>Create New Invoice</span>
            </button>

            <button className="w-full flex items-center justify-center gap-2 text-purple-600 hover:underline text-xs sm:text-sm">
              <span>View All Invoices</span>
              <span>→</span>
            </button>
          </div>

          {/* Your Last Quotation Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5 hover:shadow-lg transition-shadow">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">Your Last Quotation</h3>

            <div className="space-y-2.5 sm:space-y-3 mb-4 sm:mb-5">
              <div>
                <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">Quotation No.</p>
                <p className="text-xs sm:text-sm font-medium text-gray-900">{lastQuotation.quotationNo}</p>
              </div>

              <div>
                <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">Quotation For</p>
                <p className="text-xs sm:text-sm text-gray-900 break-words line-clamp-2">{lastQuotation.quotationFor}</p>
              </div>

              <div>
                <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">Amount</p>
                <p className="text-xs sm:text-sm font-medium text-gray-900">{lastQuotation.amount}</p>
              </div>

              <div>
                <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">Quotation Date</p>
                <p className="text-xs sm:text-sm text-gray-900">{lastQuotation.date}</p>
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-1.5 px-3 py-2 sm:py-2.5 text-purple-600 border border-purple-600 rounded hover:bg-purple-50 transition-colors text-xs sm:text-sm font-medium mb-2 whitespace-nowrap">
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>Create New Quotation</span>
            </button>

            <button className="w-full flex items-center justify-center gap-2 text-purple-600 hover:underline text-xs sm:text-sm">
              <span>View All Quotations</span>
              <span>→</span>
            </button>
          </div>

          {/* Expenses Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5 hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1.5 sm:mb-2">Expenses</h3>

            <p className="text-[10px] sm:text-xs text-gray-600 mb-3 sm:mb-4 leading-relaxed">
              Stay on top of your expenses. Track and manage your finances with ease and accuracy.
            </p>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-2.5 sm:p-3 mb-3 sm:mb-4 border border-green-200">
              <div className="flex items-start justify-between mb-1.5 sm:mb-2">
                <div className="text-[10px] sm:text-xs font-semibold text-gray-700">Expenditure</div>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] sm:text-xs font-bold text-green-600">GOOD CAFE</span>
                  <span className="text-green-600 text-xs sm:text-sm">☺</span>
                </div>
              </div>

              <div className="space-y-0.5 text-[9px] sm:text-[10px] text-gray-600 mb-1.5 sm:mb-2">
                <div className="flex justify-between gap-2">
                  <span className="truncate">Good Cafe</span>
                  <span className="font-medium whitespace-nowrap">Date: May 12, 2021</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="truncate">Expenditure Details</span>
                  <span className="whitespace-nowrap">Item: 01</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="truncate">Invoice Type: Goods</span>
                  <span className="whitespace-nowrap">Expense Amount</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="truncate">Vendor Name</span>
                  <span className="font-semibold whitespace-nowrap">Rs2,440</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="truncate">Invoice Date: December 5, 2021</span>
                  <span className="whitespace-nowrap">Total Amount</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="truncate">Due Date: December 15, 2021</span>
                  <span className="font-semibold whitespace-nowrap">Rs2,440</span>
                </div>
              </div>

              <div className="pt-1.5 sm:pt-2 border-t border-green-200 text-center">
                <span className="text-[8px] sm:text-[9px] text-gray-500">APPROVED BY UFRGEGPZP</span>
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-1.5 px-3 py-2 sm:py-2.5 text-purple-600 border border-purple-600 rounded hover:bg-purple-50 transition-colors text-xs sm:text-sm font-medium mb-2 whitespace-nowrap">
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>Record New Purchase</span>
            </button>

            <button className="w-full flex items-center justify-center gap-2 text-purple-600 hover:underline text-xs sm:text-sm">
              <span>See How</span>
              <ExternalLink className="w-3 h-3 flex-shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;