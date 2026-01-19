import { Routes, Route } from 'react-router-dom';

// Components
import ScrollToTop from './components/ScrollToTop';
//import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './components/HomePage';
import WorkflowToolsCarousel from './components/WorkflowToolsCarousel';

// Auth Pages
import { Login, Signup, ForgotPassword } from './pages/auth';

// Dashboard Pages
import Sidebar from './pages/dashboard/Sidebar';
import Dashboard from './pages/dashboard/Dashboard';

// Invoice App
import InvoiceApp from './pages/invoice/InvoiceApp';
//import { User } from 'lucide-react';
import UserSettings from './pages/dashboard/UserSettings';
import BusinessDetails from './pages/auth/BusinessDetails';
import ProposalApp from './pages/proposal/ProposalApp';

/**
 * Main App Component
 * Handles all application routing
 */
const App = () => {
  return (
    <>
      {/* <ScrollToTop /> */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/templete" element={<WorkflowToolsCarousel />} />

        {/* Dashboard Routes */}
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/user-settings" element={<UserSettings />} />
        <Route path="/business-details" element={<BusinessDetails />} />
        {/* Protected Invoice Routes */}
        <Route
          path="/invoice/:templateType"
          element={
            // <ProtectedRoute>
            //   <InvoiceApp />
            // </ProtectedRoute>
            <InvoiceApp />
          }
        />

        {/* Proposal Routes */}
        <Route
          path="/proposal/:templateType"
          element={<ProposalApp />}
        />
      </Routes>
    </>
  );
};

export default App;
