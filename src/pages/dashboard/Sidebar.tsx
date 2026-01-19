// import React, { useState, useEffect } from 'react';
// import { ChevronDown, ChevronUp, Diamond, DollarSign, ShoppingCart, BookOpen, Monitor, Package, BarChart3, FileText, Settings, Building2, Plus, Users, Rocket, Link2, MessageSquare, UserCircle } from 'lucide-react';

// const Sidebar = ({ isExpanded: externalExpanded = false, setIsExpanded: setExternalExpanded }: { isExpanded?: boolean; setIsExpanded?: (value: boolean) => void }) => {
//   const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [hoveredItem, setHoveredItem] = useState<string | null>(null);
//   const [hoverExpanded, setHoverExpanded] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
    
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
    
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   // On mobile, always use externalExpanded; on desktop, use hoverExpanded OR externalExpanded
//   const isExpanded = isMobile ? externalExpanded : (externalExpanded || hoverExpanded);

//   const menuItems = [
//     {
//       id: 'dashboard',
//       label: 'Dashboard',
//       icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>,
//       color: 'text-purple-600',
//       isNew: false,
//       hasSubmenu: false
//     },
//     {
//       id: 'sales',
//       label: 'invoices',
//       icon: <DollarSign className="w-5 h-5" />,
//       color: 'text-gray-700',
//       isNew: true,
//       hasSubmenu: true,
//       submenu: [
//         // { label: 'Clients & Prospects', isNew: true, hasPlus: true },
//         { label: 'Invoice Generator', isNew: true },
//         { label: 'Quotation Invoices', isNew: true },
//         { label: 'Proforma Invoices', isNew: true },
//         { label: 'Gst Invoices', isNew: true },
//        { label: 'Purchase Invoices', isNew: true },
//         { label: 'Delivery Challans', isNew: true },
//         // { label: 'Credit Notes', isNew: true }
//       ]
//     },
//     {
//       id: 'purchases',
//       label: 'Purchases',
//       icon: <ShoppingCart className="w-5 h-5" />,
//       color: 'text-gray-700',
//       isNew: true,
//       hasSubmenu: true,
//       submenu: [
//         { label: 'Vendors & Suppliers', isNew: true, hasPlus: true },
//         { label: 'Purchase Orders', isNew: true },
//         { label: 'Delivery Challan', isNew: true },
//         // { label: 'Purchase Bills', isNew: true },
//         // { label: 'Payment Made', isNew: true },
//         // { label: 'Debit Notes', isNew: true },
//         // { label: 'Purchase Returns', isNew: true },
//         // { label: 'Expenses', isNew: true },
//         // { label: 'Recurring Expenses', isNew: true }
//       ]
//     },
//     // {
//     //   id: 'accounting',
//     //   label: 'Accounting',
//     //   icon: <BookOpen className="w-5 h-5" />,
//     //   color: 'text-gray-700',
//     //   isNew: true,
//     //   hasSubmenu: true,
//     //   submenu: [
//     //     { label: 'Chart of Accounts', isNew: true },
//     //     { label: 'Journal Entries', isNew: true },
//     //     { label: 'Bank Reconciliation', isNew: true },
//     //     { label: 'Ledger Reports', isNew: true },
//     //     { label: 'Trial Balance', isNew: true },
//     //     { label: 'Balance Sheet', isNew: true },
//     //     { label: 'Profit & Loss', isNew: true },
//     //     { label: 'Cash Flow Statement', isNew: true }
//     //   ]
//     // },
//     // {
//     //   id: 'sales-crm',
//     //   label: 'Sales CRM',
//     //   icon: <Monitor className="w-5 h-5" />,
//     //   color: 'text-gray-700',
//     //   isNew: true,
//     //   hasSubmenu: true,
//     //   submenu: [
//     //     { label: 'Leads Management', isNew: true },
//     //     { label: 'Opportunities', isNew: true },
//     //     { label: 'Activities', isNew: true },
//     //     { label: 'Pipeline View', isNew: true },
//     //     { label: 'Contact Management', isNew: true },
//     //     { label: 'Email Templates', isNew: true },
//     //     { label: 'Campaign Tracking', isNew: true },
//     //     { label: 'Sales Analytics', isNew: true }
//     //   ]
//     // },
//     // {
//     //   id: 'inventory',
//     //   label: 'Inventory',
//     //   icon: <Package className="w-5 h-5" />,
//     //   color: 'text-gray-700',
//     //   isNew: true,
//     //   hasSubmenu: true,
//     //   submenu: [
//     //     { label: 'Items & Products', isNew: true },
//     //     { label: 'Stock Adjustment', isNew: true },
//     //     { label: 'Stock Transfer', isNew: true },
//     //     { label: 'Warehouses', isNew: true },
//     //     { label: 'Inventory Reports', isNew: true },
//     //     { label: 'Low Stock Alerts', isNew: true },
//     //     { label: 'Serial Numbers', isNew: true },
//     //     { label: 'Batch Tracking', isNew: true }
//     //   ]
//     // },
//     // {
//     //   id: 'accounting-reports',
//     //   label: 'Accounting Reports',
//     //   icon: <BarChart3 className="w-5 h-5" />,
//     //   color: 'text-gray-700',
//     //   isNew: true,
//     //   hasSubmenu: true,
//     //   submenu: [
//     //     { label: 'Financial Statements', isNew: true },
//     //     { label: 'Receivables Reports', isNew: true },
//     //     { label: 'Payables Reports', isNew: true },
//     //     { label: 'Tax Reports', isNew: true },
//     //     { label: 'Expense Reports', isNew: true },
//     //     { label: 'Revenue Reports', isNew: true },
//     //     { label: 'Budget vs Actual', isNew: true },
//     //     { label: 'Custom Reports', isNew: true }
//     //   ]
//     // },
//     // {
//     //   id: 'gst-reports',
//     //   label: 'GST Reports',
//     //   icon: <FileText className="w-5 h-5" />,
//     //   color: 'text-gray-700',
//     //   isNew: true,
//     //   hasSubmenu: true,
//     //   submenu: [
//     //     { label: 'GSTR-1', isNew: true },
//     //     { label: 'GSTR-2', isNew: true },
//     //     { label: 'GSTR-3B', isNew: true },
//     //     { label: 'GSTR-4', isNew: true },
//     //     { label: 'GSTR-9', isNew: true },
//     //     { label: 'GST Summary', isNew: true },
//     //     { label: 'Input Tax Credit', isNew: true },
//     //     { label: 'E-Way Bills', isNew: true }
//     //   ]
//     // },
//     // {
//     //   id: 'workflows',
//     //   label: 'Workflows',
//     //   icon: <Settings className="w-5 h-5" />,
//     //   color: 'text-gray-700',
//     //   isNew: false,
//     //   hasSubmenu: true,
//     //   submenu: [
//     //     { label: 'Approval Workflows', isNew: true },
//     //     { label: 'Automated Tasks', isNew: true },
//     //     { label: 'Email Notifications', isNew: true },
//     //     { label: 'Custom Workflows', isNew: true },
//     //     { label: 'Workflow Templates', isNew: true },
//     //     { label: 'Task Management', isNew: true },
//     //     { label: 'Workflow Reports', isNew: true },
//     //     { label: 'Integration Rules', isNew: true }
//     //   ]
//     // },
//     {
//       id: 'bank-payments',
//       label: 'Bank & Payments',
//       icon: <Building2 className="w-5 h-5" />,
//       color: 'text-gray-700',
//       isNew: true,
//       hasSubmenu: true,
//       submenu: [
//         // { label: 'Bank Accounts', isNew: true },
//         // { label: 'Bank Feeds', isNew: true },
//         { label: 'Payment Gateway', isNew: true },
//         { label: 'Online Payments', isNew: true },
//         // { label: 'Bank Transactions', isNew: true },
//         // { label: 'Cheque Management', isNew: true },
//         // { label: 'Petty Cash', isNew: true },
//         { label: 'Payment Methods', isNew: true }
//       ]
//     },
//     // {
//     //   id: 'payroll-hr',
//     //   label: 'Payroll & HR',
//     //   icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>,
//     //   color: 'text-gray-700',
//     //   isNew: true,
//     //   hasSubmenu: true,
//     //   submenu: [
//     //     { label: 'Employee Management', isNew: true },
//     //     { label: 'Payroll Processing', isNew: true },
//     //     { label: 'Attendance & Leaves', isNew: true },
//     //     { label: 'Salary Structure', isNew: true },
//     //     { label: 'Tax Declarations', isNew: true },
//     //     { label: 'Payslips', isNew: true },
//     //     { label: 'Reimbursements', isNew: true },
//     //     { label: 'HR Reports', isNew: true }
//     //   ]
//     // },
//     // {
//     //   id: 'manage-team',
//     //   label: 'Manage Team',
//     //   icon: <Users className="w-5 h-5" />,
//     //   color: 'text-gray-700',
//     //   isNew: true,
//     //   hasSubmenu: true,
//     //   submenu: [
//     //     { label: 'Team Members', isNew: true },
//     //     { label: 'Roles & Permissions', isNew: true },
//     //     { label: 'User Groups', isNew: true },
//     //     { label: 'Access Control', isNew: true },
//     //     { label: 'Team Activity', isNew: true },
//     //     { label: 'Invite Users', isNew: true },
//     //     { label: 'Team Settings', isNew: true },
//     //     { label: 'Collaboration Tools', isNew: true }
//     //   ]
//     // },
//     {
//       id: 'business-settings',
//       label: 'Business Settings',
//       icon: <Settings className="w-5 h-5" />,
//       color: 'text-gray-700',
//       isNew: false,
//       hasSubmenu: true,
//       submenu: [
//         { label: 'Company Profile', isNew: false },
//         { label: 'Tax Settings', isNew: false },
//         { label: 'Currency Settings', isNew: false },
//         { label: 'Invoice Settings', isNew: false },
//         { label: 'Email Templates', isNew: false },
//         { label: 'Notification Settings', isNew: false },
//         { label: 'Security Settings', isNew: false },
//         { label: 'Backup & Restore', isNew: false }
//       ]
//     },
//     // {
//     //   id: 'integrations',
//     //   label: 'Integrations',
//     //   icon: <Link2 className="w-5 h-5" />,
//     //   color: 'text-gray-700',
//     //   isNew: false,
//     //   hasSubmenu: true,
//     //   submenu: [
//     //     { label: 'Payment Gateways', isNew: false },
//     //     { label: 'Shipping Partners', isNew: false },
//     //     { label: 'Banking APIs', isNew: false },
//     //     { label: 'E-commerce Platforms', isNew: false },
//     //     { label: 'CRM Integration', isNew: false },
//     //     { label: 'Accounting Software', isNew: false },
//     //     { label: 'Email Services', isNew: false },
//     //     { label: 'Custom APIs', isNew: false }
//     //   ]
//     // },
//     {
//       id: 'greetings',
//       label: 'Greetings',
//       icon: <MessageSquare className="w-5 h-5" />,
//       color: 'text-gray-700',
//       isNew: true,
//       hasSubmenu: true,
//       submenu: [
//         { label: 'Festival Greetings', isNew: true },
//         { label: 'Birthday Wishes', isNew: true },
//         { label: 'Anniversary Messages', isNew: true },
//         { label: 'Thank You Notes', isNew: true },
//         { label: 'Seasonal Greetings', isNew: true },
//         { label: 'Custom Messages', isNew: true },
//         { label: 'Message Templates', isNew: true },
//         { label: 'Schedule Greetings', isNew: true }
//       ]
//     },
//     {
//       id: 'profile',
//       label: 'Profile',
//       icon: <UserCircle className="w-5 h-5" />,
//       color: 'text-gray-700',
//       isNew: true,
//       hasSubmenu: true,
//       submenu: [
//         { label: 'Personal Information', isNew: true },
//         { label: 'Change Password', isNew: true },
//         { label: 'Notification Preferences', isNew: true },
//         { label: 'Privacy Settings', isNew: true },
//         { label: 'Connected Devices', isNew: true },
//         { label: 'Two-Factor Authentication', isNew: true },
//         { label: 'Activity Log', isNew: true },
//         { label: 'Delete Account', isNew: true }
//       ]
//     },
//     // {
//     //   id: 'growth-suite',
//     //   label: 'Growth Suite',
//     //   icon: <Rocket className="w-5 h-5" />,
//     //   color: 'text-gray-700',
//     //   isNew: false,
//     //   hasSubmenu: true,
//     //   submenu: [
//     //     { label: 'Marketing Campaigns', isNew: false },
//     //     { label: 'SEO Tools', isNew: false },
//     //     { label: 'Analytics Dashboard', isNew: false },
//     //     { label: 'Social Media Manager', isNew: false },
//     //     { label: 'Email Marketing', isNew: false },
//     //     { label: 'A/B Testing', isNew: false },
//     //     { label: 'Customer Insights', isNew: false },
//     //     { label: 'Growth Reports', isNew: false }
//     //   ]
//     // }
//   ];

//   const toggleMenu = (id: string) => {
//     setExpandedMenu(expandedMenu === id ? null : id);
//   };

//   const handleMouseEnter = () => {
//     if (!isMobile) {
//       setHoverExpanded(true);
//     }
//   };

//   const handleMouseLeave = () => {
//     if (!isMobile) {
//       setHoverExpanded(false);
//       if (!externalExpanded) {
//         setExpandedMenu(null);
//         setProfileOpen(false);
//       }
//     }
//   };

//   return (
//     <div
//       className={`fixed left-0 md:top-[10px] h-[calc(100vh-68px)] bg-white border-r border-gray-200 flex flex-col transition-all duration-300 z-50 ${isExpanded ? 'w-64' : 'w-20'
//         }`}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       {/* Header */}
//       <div className="p-4 border-b border-gray-200 relative">
//         <button
//           onClick={() => setProfileOpen(!profileOpen)}
//           className="w-full flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition-colors"
//         >
//           <div className="flex items-center gap-3 min-w-0">
//             <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center flex-shrink-0">
//               <span className="text-sm">🌆</span>
//             </div>
//             {isExpanded && (
//               <div className="text-left min-w-0 overflow-hidden">
//                 <h2 className="font-semibold text-sm text-gray-900 truncate">Lokesh yadav</h2>
//                 <p className="text-xs text-gray-500">Premium Trial</p>
//               </div>
//             )}
//           </div>
//           {isExpanded && (
//             <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${profileOpen ? 'rotate-180' : ''}`} />
//           )}
//         </button>
//       </div>

//       {/* Menu Items */}
//       <div className="flex-1 overflow-y-auto">
//         <nav className="px-3 py-2">
//           {menuItems.map((item) => (
//             <div key={item.id}>
//               <button
//                 onClick={() => item.hasSubmenu && isExpanded && toggleMenu(item.id)}
//                 onMouseEnter={() => setHoveredItem(item.id)}
//                 onMouseLeave={() => setHoveredItem(null)}
//                 className={`w-full flex items-center ${isExpanded ? 'justify-between' : 'justify-center'} px-3 py-2.5 rounded-lg transition-all duration-200 ${item.id === 'dashboard'
//                   ? 'bg-purple-50 text-purple-600'
//                   : hoveredItem === item.id
//                     ? 'bg-gray-50'
//                     : ''
//                   }`}
//                 title={!isExpanded ? item.label : ''}
//               >
//                 <div className="flex items-center gap-3 min-w-0">
//                   <span className={`flex-shrink-0 ${item.id === 'dashboard' ? 'text-purple-600' : item.color}`}>
//                     {item.icon}
//                   </span>
//                   {isExpanded && (
//                     <>
//                       <span className={`font-medium text-sm truncate ${item.id === 'dashboard' ? 'text-purple-600' : 'text-gray-700'
//                         }`}>
//                         {item.label}
//                       </span>
//                       {item.isNew && (
//                         <span className="text-xs font-semibold text-purple-500 flex-shrink-0">New</span>
//                       )}
//                     </>
//                   )}
//                 </div>
//                 {isExpanded && (
//                   <div className="flex items-center gap-1 flex-shrink-0">
//                     {item.id === 'accounting-reports' && !expandedMenu && (
//                       <Diamond className="w-4 h-4 text-orange-400" />
//                     )}
//                     {item.hasSubmenu && (
//                       <span className="text-gray-400">
//                         {expandedMenu === item.id ? (
//                           <ChevronUp className="w-4 h-4" />
//                         ) : (
//                           <ChevronDown className="w-4 h-4" />
//                         )}
//                       </span>
//                     )}
//                   </div>
//                 )}
//               </button>

//               {/* Submenu */}
//               {item.hasSubmenu && expandedMenu === item.id && isExpanded && item.submenu && (
//                 <div className="ml-9 mt-1 mb-1">
//                   {item.submenu.map((subItem, index) => (
//                     <button
//                       key={index}
//                       onMouseEnter={() => setHoveredItem(`${item.id}-${index}`)}
//                       onMouseLeave={() => setHoveredItem(null)}
//                       className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-md transition-all duration-200 ${hoveredItem === `${item.id}-${index}`
//                         ? 'bg-gray-50 text-gray-900'
//                         : 'text-gray-600'
//                         }`}
//                     >
//                       <span className="text-sm truncate">{subItem.label}</span>
//                       <div className="flex items-center gap-2 flex-shrink-0">
//                         {subItem.isNew && (
//                           <span className="text-xs font-semibold text-purple-500">New</span>
//                         )}
//                         {hoveredItem === `${item.id}-${index}` && (
//                           <Plus className="w-4 h-4 text-purple-500" />
//                         )}
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </nav>

//         {/* Invite Team Members Button */}
//         {/* {isExpanded && (
//           <div className="px-4 pb-4 pt-2">
//             <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border-2 border-purple-200 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
//               <Users className="w-4 h-4" />
//               <span className="font-medium text-sm">Invite Team Members</span>
//             </button>
//           </div>
//         )} */}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Diamond, DollarSign, ShoppingCart, BookOpen, Monitor, Package, BarChart3, FileText, Settings, Building2, Plus, Users, Rocket, Link2, MessageSquare, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Sidebar = ({ isExpanded: externalExpanded = false, setIsExpanded: setExternalExpanded }: { isExpanded?: boolean; setIsExpanded?: (value: boolean) => void }) => {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoverExpanded, setHoverExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

    const navigate = useNavigate();
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isExpanded = isMobile ? externalExpanded : (externalExpanded || hoverExpanded);

  // Navigation handler - you can customize this based on your routing solution
  const handleNavigation = (path: string) => {
    // For React Router: 
     navigate(path);
    
    // For Next.js:
    // router.push(path);
    
    // For demo purposes, we'll just log and show an alert
    console.log('Navigating to:', path);
    alert(`Navigating to: ${path}`);
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>,
      color: 'text-purple-600',
      isNew: false,
      hasSubmenu: false,
      path: '/dashboard'
    },
    {
      id: 'sales',
      label: 'invoices',
      icon: <DollarSign className="w-5 h-5" />,
      color: 'text-gray-700',
      isNew: true,
      hasSubmenu: true,
      path: '/invoices',
      submenu: [
        { label: 'Invoice Generator', isNew: true, path: '/invoice/invoice-generator' },
        { label: 'Quotation Invoices', isNew: true, path: '/invoice/quotation' },
        { label: 'Proforma Invoices', isNew: true, path: '/invoice/proforma-invoice' },
        { label: 'Gst Invoices', isNew: true, path: '/invoice/gst-invoice' },
        { label: 'Purchase Invoices', isNew: true, path: '/invoice/purchase-order' },
        { label: 'Delivery Challans', isNew: true, path: '/invoice/delivery-challan' },
      ]
    },
    {
      id: 'purchases',
      label: 'Purchases',
      icon: <ShoppingCart className="w-5 h-5" />,
      color: 'text-gray-700',
      isNew: true,
      hasSubmenu: true,
      path: '/purchases',
      submenu: [
        { label: 'Vendors & Suppliers', isNew: true, hasPlus: true, path: '/purchases/vendors' },
        { label: 'Purchase Orders', isNew: true, path: '/purchases/orders' },
        { label: 'Delivery Challan', isNew: true, path: '/invoice/delivery-challan' },
      ]
    },
    {
      id: 'bank-payments',
      label: 'Bank & Payments',
      icon: <Building2 className="w-5 h-5" />,
      color: 'text-gray-700',
      isNew: true,
      hasSubmenu: true,
      path: '/bank-payments',
      submenu: [
        { label: 'Payment Gateway', isNew: true, path: '/bank-payments/gateway' },
        { label: 'Online Payments', isNew: true, path: '/bank-payments/online' },
        { label: 'Payment Methods', isNew: true, path: '/bank-payments/methods' }
      ]
    },
    {
      id: 'business-settings',
      label: 'Business Settings',
      icon: <Settings className="w-5 h-5" />,
      color: 'text-gray-700',
      isNew: false,
      hasSubmenu: true,
      path: '/settings',
      submenu: [
        { label: 'Company Profile', isNew: false, path: '/settings/company' },
        { label: 'Tax Settings', isNew: false, path: '/settings/tax' },
        { label: 'Currency Settings', isNew: false, path: '/settings/currency' },
        { label: 'Invoice Settings', isNew: false, path: '/settings/invoice' },
        { label: 'Email Templates', isNew: false, path: '/settings/email-templates' },
        { label: 'Notification Settings', isNew: false, path: '/settings/notifications' },
        { label: 'Security Settings', isNew: false, path: '/settings/security' },
        { label: 'Backup & Restore', isNew: false, path: '/settings/backup' }
      ]
    },
    {
      id: 'greetings',
      label: 'Greetings',
      icon: <MessageSquare className="w-5 h-5" />,
      color: 'text-gray-700',
      isNew: true,
      hasSubmenu: true,
      path: '/greetings',
      submenu: [
        { label: 'Festival Greetings', isNew: true, path: '/greetings/festival' },
        { label: 'Birthday Wishes', isNew: true, path: '/greetings/birthday' },
        { label: 'Anniversary Messages', isNew: true, path: '/greetings/anniversary' },
        { label: 'Thank You Notes', isNew: true, path: '/greetings/thank-you' },
        { label: 'Seasonal Greetings', isNew: true, path: '/greetings/seasonal' },
        { label: 'Custom Messages', isNew: true, path: '/greetings/custom' },
        { label: 'Message Templates', isNew: true, path: '/greetings/templates' },
        { label: 'Schedule Greetings', isNew: true, path: '/greetings/schedule' }
      ]
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: <UserCircle className="w-5 h-5" />,
      color: 'text-gray-700',
      isNew: true,
      hasSubmenu: true,
      path: '/profile',
      submenu: [
        { label: 'Personal Information', isNew: true, path: '/user-settings' },
        { label: 'Change Password', isNew: true, path: '/profile/password' },
        { label: 'Notification Preferences', isNew: true, path: '/profile/notifications' },
        { label: 'Privacy Settings', isNew: true, path: '/profile/privacy' },
        { label: 'Connected Devices', isNew: true, path: '/profile/devices' },
        { label: 'Two-Factor Authentication', isNew: true, path: '/profile/2fa' },
        { label: 'Activity Log', isNew: true, path: '/profile/activity' },
        { label: 'Delete Account', isNew: true, path: '/profile/delete' }
      ]
    }
  ];

  const toggleMenu = (id: string) => {
    setExpandedMenu(expandedMenu === id ? null : id);
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setHoverExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setHoverExpanded(false);
      if (!externalExpanded) {
        setExpandedMenu(null);
        setProfileOpen(false);
      }
    }
  };

  return (
    <div
      className={`fixed left-0 md:top-[10px] h-[calc(100vh-68px)] bg-white border-r border-gray-200 flex flex-col transition-all duration-300 z-50 ${isExpanded ? 'w-64' : 'w-20'
        }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 relative">
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className="w-full flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition-colors"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center flex-shrink-0">
              <span className="text-sm">🌆</span>
            </div>
            {isExpanded && (
              <div className="text-left min-w-0 overflow-hidden">
                <h2 className="font-semibold text-sm text-gray-900 truncate">Lokesh yadav</h2>
                <p className="text-xs text-gray-500">Premium Trial</p>
              </div>
            )}
          </div>
          {isExpanded && (
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${profileOpen ? 'rotate-180' : ''}`} />
          )}
        </button>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto">
        <nav className="px-3 py-2">
          {menuItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (item.hasSubmenu && isExpanded) {
                    toggleMenu(item.id);
                  } else if (item.path) {
                    handleNavigation(item.path);
                  }
                }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`w-full flex items-center ${isExpanded ? 'justify-between' : 'justify-center'} px-3 py-2.5 rounded-lg transition-all duration-200 ${item.id === 'dashboard'
                  ? 'bg-purple-50 text-purple-600'
                  : hoveredItem === item.id
                    ? 'bg-gray-50'
                    : ''
                  }`}
                title={!isExpanded ? item.label : ''}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`flex-shrink-0 ${item.id === 'dashboard' ? 'text-purple-600' : item.color}`}>
                    {item.icon}
                  </span>
                  {isExpanded && (
                    <>
                      <span className={`font-medium text-sm truncate ${item.id === 'dashboard' ? 'text-purple-600' : 'text-gray-700'
                        }`}>
                        {item.label}
                      </span>
                      {item.isNew && (
                        <span className="text-xs font-semibold text-purple-500 flex-shrink-0">New</span>
                      )}
                    </>
                  )}
                </div>
                {isExpanded && (
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {item.id === 'accounting-reports' && !expandedMenu && (
                      <Diamond className="w-4 h-4 text-orange-400" />
                    )}
                    {item.hasSubmenu && (
                      <span className="text-gray-400">
                        {expandedMenu === item.id ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </span>
                    )}
                  </div>
                )}
              </button>

              {/* Submenu */}
              {item.hasSubmenu && expandedMenu === item.id && isExpanded && item.submenu && (
                <div className="ml-9 mt-1 mb-1">
                  {item.submenu.map((subItem, index) => (
                    <button
                      key={index}
                      onMouseEnter={() => setHoveredItem(`${item.id}-${index}`)}
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={() => subItem.path && handleNavigation(subItem.path)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-md transition-all duration-200 ${hoveredItem === `${item.id}-${index}`
                        ? 'bg-gray-50 text-gray-900'
                        : 'text-gray-600'
                        }`}
                    >
                      <span className="text-sm truncate">{subItem.label}</span>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {subItem.isNew && (
                          <span className="text-xs font-semibold text-purple-500">New</span>
                        )}
                        {hoveredItem === `${item.id}-${index}` && subItem.path && (
                          <Plus className="w-4 h-4 text-purple-500" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;