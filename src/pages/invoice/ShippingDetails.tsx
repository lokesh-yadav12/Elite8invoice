import React, { useState, useEffect } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../store';
import { updateInvoiceData } from '../../store/invoiceSlice';

interface ShippingDetailsProps {
  onClose?: () => void;
}

const ShippingDetails: React.FC<ShippingDetailsProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const invoiceData = useAppSelector((state) => state.invoice);

  // Get selected client data
  const selectedClient = invoiceData.clients.find(
    (c) => c.name === invoiceData.selectedClient
  );

  const [shippedFrom, setShippedFrom] = useState({
    warehouse: invoiceData.shippingDetails.shippedFrom.warehouse || '',
    sameAsBusinessAddress: false,
    businessName: invoiceData.shippingDetails.shippedFrom.businessName || '',
    country: invoiceData.shippingDetails.shippedFrom.country || '',
    address: invoiceData.shippingDetails.shippedFrom.address || '',
    city: invoiceData.shippingDetails.shippedFrom.city || '',
    postalCode: invoiceData.shippingDetails.shippedFrom.postalCode || '',
    state: invoiceData.shippingDetails.shippedFrom.state || '',
  });

  const [shippedTo, setShippedTo] = useState({
    shippingAddress: '',
    sameAsClientAddress: false,
    clientBusinessName: invoiceData.shippingDetails.shippedTo.clientBusinessName || '',
    country: invoiceData.shippingDetails.shippedTo.country || '',
    address: invoiceData.shippingDetails.shippedTo.address || '',
    city: invoiceData.shippingDetails.shippedTo.city || '',
    postalCode: invoiceData.shippingDetails.shippedTo.postalCode || '',
    state: invoiceData.shippingDetails.shippedTo.state || '',
    saveToClientDetails: false,
  });

  // Save to Redux whenever shipping details change
  useEffect(() => {
    dispatch(updateInvoiceData({
      shippingDetails: {
        shippedFrom: {
          warehouse: shippedFrom.warehouse,
          businessName: shippedFrom.businessName,
          country: shippedFrom.country,
          address: shippedFrom.address,
          city: shippedFrom.city,
          postalCode: shippedFrom.postalCode,
          state: shippedFrom.state,
        },
        shippedTo: {
          clientBusinessName: shippedTo.clientBusinessName,
          country: shippedTo.country,
          address: shippedTo.address,
          city: shippedTo.city,
          postalCode: shippedTo.postalCode,
          state: shippedTo.state,
        },
      },
    }));
  }, [shippedFrom, shippedTo, dispatch]);

  // Auto-fill from business address when checkbox is checked
  useEffect(() => {
    if (shippedFrom.sameAsBusinessAddress) {
      setShippedFrom({
        ...shippedFrom,
        businessName: invoiceData.businessDetails.vendorName || '',
        country: invoiceData.businessDetails.addressCountry || '',
        address: invoiceData.businessDetails.streetAddress || '',
        city: invoiceData.businessDetails.addressCity || '',
        postalCode: invoiceData.businessDetails.postalCode || '',
        state: invoiceData.businessDetails.state || '',
      });
    }
  }, [shippedFrom.sameAsBusinessAddress]);

  // Auto-fill from client address when checkbox is checked
  useEffect(() => {
    if (shippedTo.sameAsClientAddress && selectedClient) {
      setShippedTo({
        ...shippedTo,
        clientBusinessName: selectedClient.businessName || selectedClient.company || selectedClient.name || '',
        country: selectedClient.addressCountry || selectedClient.country || '',
        address: selectedClient.streetAddress || '',
        city: selectedClient.addressCity || selectedClient.city || '',
        postalCode: selectedClient.postalCode || '',
        state: selectedClient.state || '',
      });
    }
  }, [shippedTo.sameAsClientAddress]);

  return (
    <div className="w-full max-w-[800px] mx-auto bg-white rounded-lg border border-gray-200 p-2 sm:p-4 md:p-6 mt-2 sm:mt-4">
      <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 md:mb-6">
        {/* <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div> */}
        {/* <h2 className="text-xl font-semibold text-gray-900">Add Shipping Details</h2> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
        {/* Shipped From Section */}
        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 border-b-2 border-gray-300 pb-1 sm:pb-2">
            Shipped From
          </h3>

          {/* Warehouse Dropdown */}
          {/* <div className="relative">
            <select
              value={shippedFrom.warehouse}
              onChange={(e) => setShippedFrom({ ...shippedFrom, warehouse: e.target.value })}
              className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select Warehouse</option>
              <option value="warehouse1">Warehouse 1</option>
              <option value="warehouse2">Warehouse 2</option>
              <option value="warehouse3">Warehouse 3</option>
            </select>
          </div> */}

          {/* Same as Business Address Checkbox */}
          <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 rounded-lg p-1.5 sm:p-2 md:p-3">
            <input
              type="checkbox"
              id="same-business-address"
              checked={shippedFrom.sameAsBusinessAddress}
              onChange={(e) => setShippedFrom({ ...shippedFrom, sameAsBusinessAddress: e.target.checked })}
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
            />
            <label htmlFor="same-business-address" className="text-[10px] sm:text-xs md:text-sm text-gray-700">
              Same as your business address
            </label>
          </div>

          {/* Business Name */}
          <input
            type="text"
            placeholder="Business / Freelancer Name"
            value={shippedFrom.businessName}
            onChange={(e) => setShippedFrom({ ...shippedFrom, businessName: e.target.value })}
            className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 text-[11px] sm:text-sm md:text-base text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />

          {/* Country Dropdown */}
          <div className="relative">
            <select
              value={shippedFrom.country}
              onChange={(e) => setShippedFrom({ ...shippedFrom, country: e.target.value })}
              className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 text-[11px] sm:text-sm md:text-base text-gray-700 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select Country</option>
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="in">India</option>
              <option value="ca">Canada</option>
            </select>
            {/* <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" /> */}
          </div>

          {/* Address */}
          <input
            type="text"
            placeholder="Address (optional)"
            value={shippedFrom.address}
            onChange={(e) => setShippedFrom({ ...shippedFrom, address: e.target.value })}
            className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 text-[11px] sm:text-sm md:text-base text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />

          {/* City and Postal Code */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
            <input
              type="text"
              placeholder="City (optional)"
              value={shippedFrom.city}
              onChange={(e) => setShippedFrom({ ...shippedFrom, city: e.target.value })}
              className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 text-[11px] sm:text-sm md:text-base text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Postal Code / ZIP Code"
              value={shippedFrom.postalCode}
              onChange={(e) => setShippedFrom({ ...shippedFrom, postalCode: e.target.value })}
              className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 text-[11px] sm:text-sm md:text-base text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* State */}
          <input
            type="text"
            placeholder="State (optional)"
            value={shippedFrom.state}
            onChange={(e) => setShippedFrom({ ...shippedFrom, state: e.target.value })}
            className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 text-[11px] sm:text-sm md:text-base text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />

          {/* Add More Fields Button */}
          {/* <button className="flex items-center gap-1.5 sm:gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors text-[11px] sm:text-sm">
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            Add More Fields
          </button> */}
        </div>

        {/* Shipped To Section */}
        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 border-b-2 border-gray-300 pb-1 sm:pb-2">
            Shipped To
          </h3>

          {/* Shipping Address Dropdown */}
          {/* <div className="relative">
            <select
              value={shippedTo.shippingAddress}
              onChange={(e) => setShippedTo({ ...shippedTo, shippingAddress: e.target.value })}
              className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select a Shipping Address</option>
              <option value="address1">Address 1</option>
              <option value="address2">Address 2</option>
              <option value="address3">Address 3</option>
            </select>
          </div> */}

          {/* Same as Client Address Checkbox */}
          <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 rounded-lg p-1.5 sm:p-2 md:p-3">
            <input
              type="checkbox"
              id="same-client-address"
              checked={shippedTo.sameAsClientAddress}
              onChange={(e) => setShippedTo({ ...shippedTo, sameAsClientAddress: e.target.checked })}
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
            />
            <label htmlFor="same-client-address" className="text-[10px] sm:text-xs md:text-sm text-gray-700">
              Same as client's address
            </label>
          </div>

          {/* Client Business Name */}
          <input
            type="text"
            placeholder="Client's business name"
            value={shippedTo.clientBusinessName}
            onChange={(e) => setShippedTo({ ...shippedTo, clientBusinessName: e.target.value })}
            className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 text-[11px] sm:text-sm md:text-base text-gray-700 bg-white border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />

          {/* Country Dropdown */}
          <div className="relative">
            <select
              value={shippedTo.country}
              onChange={(e) => setShippedTo({ ...shippedTo, country: e.target.value })}
              className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 text-[11px] sm:text-sm md:text-base text-gray-700 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select Country</option>
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="in">India</option>
              <option value="ca">Canada</option>
            </select>
            {/* <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" /> */}
          </div>

          {/* Address */}
          <input
            type="text"
            placeholder="Address (optional)"
            value={shippedTo.address}
            onChange={(e) => setShippedTo({ ...shippedTo, address: e.target.value })}
            className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 text-[11px] sm:text-sm md:text-base text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />

          {/* City and Postal Code */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
            <input
              type="text"
              placeholder="City (optional)"
              value={shippedTo.city}
              onChange={(e) => setShippedTo({ ...shippedTo, city: e.target.value })}
              className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 text-[11px] sm:text-sm md:text-base text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Postal Code / ZIP Code"
              value={shippedTo.postalCode}
              onChange={(e) => setShippedTo({ ...shippedTo, postalCode: e.target.value })}
              className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 text-[11px] sm:text-sm md:text-base text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* State */}
          <input
            type="text"
            placeholder="State (optional)"
            value={shippedTo.state}
            onChange={(e) => setShippedTo({ ...shippedTo, state: e.target.value })}
            className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 text-[11px] sm:text-sm md:text-base text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />

          {/* Save to Client Details Checkbox */}
          <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 rounded-lg p-1.5 sm:p-2 md:p-3">
            <input
              type="checkbox"
              id="save-client-details"
              checked={shippedTo.saveToClientDetails}
              onChange={(e) => setShippedTo({ ...shippedTo, saveToClientDetails: e.target.checked })}
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
            />
            <label htmlFor="save-client-details" className="text-[10px] sm:text-xs md:text-sm text-gray-700">
              Save to client details
            </label>
          </div>

          {/* Add More Fields Button */}
          {/* <button className="flex items-center gap-1.5 sm:gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors text-[11px] sm:text-sm">
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            Add More Fields
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ShippingDetails;