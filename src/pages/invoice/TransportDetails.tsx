import React, { useState, useEffect } from 'react';
import { ChevronDown, Plus, ExternalLink, Calendar } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { updateInvoiceData } from '../../store/invoiceSlice';

interface TransportDetailsProps {
  onClose?: () => void;
}

const TransportDetails: React.FC<TransportDetailsProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const invoiceData = useAppSelector((state) => state.invoice);

  const [transportData, setTransportData] = useState({
    transporter: '',
    distance: invoiceData.transportDetails.distance || '',
    challanNumber: invoiceData.transportDetails.challanNumber || '',
    challanDate: invoiceData.transportDetails.challanDate || '',
    vehicleType: invoiceData.transportDetails.vehicleType || '',
    vehicleNumber: invoiceData.transportDetails.vehicleNumber || '',
    transactionType: '',
    subSupplyType: '',
  });

  const [modesOfTransport, setModesOfTransport] = useState<string[]>([
    invoiceData.transportDetails.transportMode || ''
  ].filter(Boolean));

  // Save to Redux whenever transport data changes
  useEffect(() => {
    dispatch(updateInvoiceData({
      transportDetails: {
        transportMode: modesOfTransport[0] || '',
        distance: transportData.distance,
        challanNumber: transportData.challanNumber,
        challanDate: transportData.challanDate,
        vehicleType: transportData.vehicleType,
        vehicleNumber: transportData.vehicleNumber,
      },
    }));
  }, [transportData, modesOfTransport, dispatch]);

  const addModeOfTransport = () => {
    setModesOfTransport([...modesOfTransport, '']);
  };

  const updateModeOfTransport = (index: number, value: string) => {
    const updated = [...modesOfTransport];
    updated[index] = value;
    setModesOfTransport(updated);
  };

  const removeModeOfTransport = (index: number) => {
    const updated = modesOfTransport.filter((_, i) => i !== index);
    setModesOfTransport(updated);
  };

  return (
    <div className="w-full max-w-[400px] mx-auto bg-white rounded-lg border border-gray-200 p-2 sm:p-4 md:p-6 mt-2 sm:mt-4">
      <h2 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 border-b-2 border-gray-300 pb-1 sm:pb-2 mb-3 sm:mb-4 md:mb-6">
        Transport Details
      </h2>

      <div className="space-y-3 sm:space-y-4 md:space-y-6">
        {/* Transporter Details */}
        <div className="space-y-1.5 sm:space-y-2">
          <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700">
            Transporter Details
          </label>
          <div className="relative">
            <select
              value={transportData.transporter}
              onChange={(e) => setTransportData({ ...transportData, transporter: e.target.value })}
              className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-[11px] sm:text-sm md:text-base text-gray-700 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select Transporter</option>
              <option value="transporter1">DHL Express</option>
              <option value="transporter2">FedEx</option>
              <option value="transporter3">Blue Dart</option>
              <option value="transporter4">DTDC</option>
              <option value="transporter5">India Post</option>
            </select>
            {/* <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" /> */}
          </div>
        </div>

        {/* Distance */}
        <div className="space-y-1.5 sm:space-y-2">
          <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700">
            Distance (in Km)
          </label>
          <input
            type="number"
            placeholder="Enter distance"
            value={transportData.distance}
            onChange={(e) => setTransportData({ ...transportData, distance: e.target.value })}
            className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-[11px] sm:text-sm md:text-base text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          {/* <button className="flex items-center gap-1.5 sm:gap-2 text-purple-600 hover:text-purple-700 font-medium text-[10px] sm:text-xs md:text-sm transition-colors mt-1 sm:mt-2">
            Calculate distance here
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
          </button> */}
        </div>

        {/* Add Mode of Transport */}
        <button
          onClick={addModeOfTransport}
          className="flex items-center gap-1.5 sm:gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors text-[11px] sm:text-sm"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          Add Mode of Transport
        </button>

        {/* Dynamic Modes of Transport */}
        {modesOfTransport.map((mode, index) => (
          <div key={index} className="relative">
            <div className="relative">
              <select
                value={mode}
                onChange={(e) => updateModeOfTransport(index, e.target.value)}
                className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-[11px] sm:text-sm md:text-base text-gray-700 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-20"
              >
                <option value="">Select Mode</option>
                <option value="road">Road</option>
                <option value="rail">Rail</option>
                <option value="air">Air</option>
                <option value="ship">Ship</option>
              </select>
              {/* <ChevronDown className="absolute right-12 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" /> */}
              {/* <button
                onClick={() => removeModeOfTransport(index)}
                className="absolute right-8 top-1/2 transform -translate-y-1/2 text-black-500 hover:text-red-700"
              >
                ×
              </button> */}
            </div>
          </div>
        ))}

        {/* Challan Number and Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          <div className="space-y-1.5 sm:space-y-2">
            <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 border-b border-gray-300 pb-1">
              Challan Number
            </label>
            <input
              type="text"
              placeholder="Transport Doc Number (optional)"
              value={transportData.challanNumber}
              onChange={(e) => setTransportData({ ...transportData, challanNumber: e.target.value })}
              className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-[11px] sm:text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 border-b border-gray-300 pb-1">
              Challan Date
            </label>
            <div className="relative">
              <input
                type="date"
                placeholder="Transport Doc Date (optional)"
                value={transportData.challanDate}
                onChange={(e) => setTransportData({ ...transportData, challanDate: e.target.value })}
                className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-[11px] sm:text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {/* <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" /> */}
            </div>
          </div>
        </div>

        {/* Vehicle Type and Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          <div className="space-y-1.5 sm:space-y-2">
            <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 border-b border-gray-300 pb-1">
              Vehicle Type
            </label>
            <div className="relative">
              <select
                value={transportData.vehicleType}
                onChange={(e) => setTransportData({ ...transportData, vehicleType: e.target.value })}
                className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-[11px] sm:text-sm text-gray-700 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select...</option>
                <option value="truck">Truck</option>
                <option value="van">Van</option>
                <option value="car">Car</option>
                <option value="bike">Bike</option>
                <option value="other">Other</option>
              </select>
              {/* <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" /> */}
            </div>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 border-b border-gray-300 pb-1">
              Vehicle Number
            </label>
            <input
              type="text"
              placeholder="Vehicle Number (optional)"
              value={transportData.vehicleNumber}
              onChange={(e) => setTransportData({ ...transportData, vehicleNumber: e.target.value })}
              className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-[11px] sm:text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Transaction Type and Sub Supply Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          <div className="space-y-1.5 sm:space-y-2">
            <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 border-b border-gray-300 pb-1">
              Transaction Type
            </label>
            <div className="relative">
              <select
                value={transportData.transactionType}
                onChange={(e) => setTransportData({ ...transportData, transactionType: e.target.value })}
                className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-[11px] sm:text-sm text-gray-700 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select...</option>
                <option value="regular">Regular</option>
                <option value="billToShipTo">Bill To - Ship To</option>
                <option value="billFromDispatchFrom">Bill From - Dispatch From</option>
                <option value="combination">Combination of 2 and 3</option>
              </select>
              {/* <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" /> */}
            </div>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 border-b border-gray-300 pb-1">
              Sub Supply Type
            </label>
            <div className="relative">
              <select
                value={transportData.subSupplyType}
                onChange={(e) => setTransportData({ ...transportData, subSupplyType: e.target.value })}
                className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-[11px] sm:text-sm text-gray-700 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select...</option>
                <option value="supply">Supply</option>
                <option value="import">Import</option>
                <option value="export">Export</option>
                <option value="jobWork">Job Work</option>
                <option value="forOwnUse">For Own Use</option>
                <option value="jobWorkReturns">Job Work Returns</option>
                <option value="salesReturn">Sales Return</option>
                <option value="others">Others</option>
              </select>
              {/* <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportDetails;