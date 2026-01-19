import { useState, useEffect } from 'react';
import { Calendar, Plus, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { updateInvoiceData } from '../../../store/invoiceSlice';

interface CustomField {
  id: number;
  label: string;
  value: string;
  isDefault: boolean;
}

export default function InvoiceDetailsForm() {
  const dispatch = useAppDispatch();
  const invoiceData = useAppSelector((state) => state.invoice);
  const [invoiceNo, setInvoiceNo] = useState(invoiceData.invoiceNo);
  const [invoiceDate, setInvoiceDate] = useState(invoiceData.invoiceDate);
  const [showDueDate, setShowDueDate] = useState(!!invoiceData.dueDate);
  const [dueDate, setDueDate] = useState(invoiceData.dueDate);
  const [logo, setLogo] = useState(invoiceData.logo);
  const [showCustomFieldsModal, setShowCustomFieldsModal] = useState(false);
  const [showAddFieldModal, setShowAddFieldModal] = useState(false);
  const [customFields, setCustomFields] = useState<CustomField[]>(invoiceData.customFields);
  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [newFieldValue, setNewFieldValue] = useState('');
  const [setAsDefault, setSetAsDefault] = useState(false);

  // Save to Redux whenever data changes
  useEffect(() => {
    dispatch(updateInvoiceData({
      invoiceNo,
      invoiceDate,
      dueDate,
      logo,
      customFields,
    }));
  }, [invoiceNo, invoiceDate, dueDate, logo, customFields, dispatch]);

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
  };

  const handleAddDueDate = () => {
    setShowDueDate(true);
    setDueDate(invoiceDate);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          setLogo(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveCustomField = () => {
    if (newFieldLabel.trim()) {
      setCustomFields([
        ...customFields,
        {
          id: Date.now(),
          label: newFieldLabel,
          value: newFieldValue,
          isDefault: setAsDefault,
        },
      ]);
      setNewFieldLabel('');
      setNewFieldValue('');
      setSetAsDefault(false);
      setShowAddFieldModal(false);
      setShowCustomFieldsModal(true);
    }
  };

  const handleDeleteCustomField = (id: number) => {
    setCustomFields(customFields.filter((field) => field.id !== id));
  };

  return (
    <div className="p-2 sm:p-3 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-12 lg:px-8 xl:px-20">
          {/* Left Column - Form Fields */}
          <div className="flex-1 space-y-3 sm:space-y-4 md:space-y-6 flex flex-col">
            {/* Invoice Number */}
            <div className="flex flex-col sm:flex-row sm:gap-3 md:gap-4 lg:gap-8 items-start">
              <label className="text-gray-700 text-xs sm:text-sm md:text-base font-medium sm:w-28 md:w-32 lg:w-32 sm:pt-2 mb-1.5 sm:mb-0">
                Challan No<span className="text-red-500">*</span>
              </label>
              <div className="flex-1 w-full">
                <div className="border-b-2 border-dotted border-gray-300 w-full sm:w-60 hover:border-purple-400 transition-colors">
                  <input
                    type="text"
                    value={invoiceNo}
                    onChange={(e) => setInvoiceNo(e.target.value)}
                    className="text-xs sm:text-sm text-gray-900 outline-none border-none bg-transparent w-full"
                  />
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-2">Last No: A00001 (Jan 5, 2026)</p>
              </div>
            </div>

            {/* Invoice Date */}
            <div className="flex flex-col sm:flex-row sm:gap-3 md:gap-4 lg:gap-8 items-start">
              <label className="text-gray-700 text-xs sm:text-sm md:text-base font-medium sm:w-28 md:w-32 lg:w-32 sm:pt-2 mb-1.5 sm:mb-0">
                Delivery Challan Date<span className="text-red-500">*</span>
              </label>
              <div className="flex-1 w-full">
                <div className="border-b-2 border-dotted border-gray-300 pb-1 w-full sm:w-60 hover:border-purple-400 transition-colors">
                  <input
                    type="date"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                    className="text-xs sm:text-sm text-gray-900 outline-none border-none bg-transparent cursor-pointer w-full"
                  />
                </div>
              </div>
            </div>

            {/* Due Date (conditional) */}
            {showDueDate && (
              <div className="flex flex-col sm:flex-row sm:gap-3 md:gap-4 lg:gap-8 items-start">
                <label className="text-gray-700 text-xs sm:text-sm md:text-base font-medium sm:w-28 md:w-32 lg:w-32 sm:pt-2 mb-1.5 sm:mb-0">
                  Due Date
                </label>
                <div className="flex-1 w-full">
                  <div className="border-b-2 border-dotted border-gray-300 pb-1 w-full sm:w-60 hover:border-purple-400 transition-colors">
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="text-xs sm:text-sm text-gray-900 outline-none border-none bg-transparent cursor-pointer w-full"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Add due date button */}
            {!showDueDate && (
              <button
                onClick={handleAddDueDate}
                className="flex items-center gap-1.5 sm:gap-2 text-purple-600 hover:text-purple-700 transition-colors sm:ml-32 md:ml-36 lg:ml-40 font-medium text-xs sm:text-sm md:text-base"
              >
                <Plus size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span>Add due date</span>
              </button>
            )}

            {/* Custom Fields */}
            {customFields.map((field) => (
              <div key={field.id} className="flex flex-col sm:flex-row sm:gap-3 md:gap-4 lg:gap-8 items-start">
                <label className="text-gray-700 text-xs sm:text-sm md:text-base font-medium sm:w-28 md:w-32 lg:w-32 sm:pt-2 mb-1.5 sm:mb-0">
                  {field.label}
                </label>
                <div className="flex-1 w-full">
                  <div className="border-b-2 border-dotted border-gray-300 pb-1 hover:border-purple-400 transition-colors">
                    <div className="flex items-center justify-between gap-1.5 sm:gap-2">
                      <input
                        type="text"
                        value={field.value}
                        onChange={(e) => {
                          const updated = customFields.map((f) =>
                            f.id === field.id ? { ...f, value: e.target.value } : f
                          );
                          setCustomFields(updated);
                        }}
                        className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-900 outline-none bg-transparent flex-1"
                      />
                      <button
                        onClick={() => handleDeleteCustomField(field.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                      >
                        <X size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Custom Fields */}
            <button
              onClick={() => setShowCustomFieldsModal(true)}
              className="flex items-center gap-1.5 sm:gap-2 text-purple-600 hover:text-purple-700 transition-colors mt-3 sm:mt-4 md:mt-6 sm:ml-32 md:ml-36 lg:ml-40 font-medium text-xs sm:text-sm md:text-base"
            >
              <Plus size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
              <span>Add Custom Fields</span>
            </button>
          </div>

          {/* Right Column - Logo Upload */}
          <div className="w-full sm:w-60 h-auto sm:h-48 mt-4 sm:mt-6 lg:mt-0">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-3 sm:p-4 text-center hover:border-purple-400 transition-all duration-200 bg-purple-50/30">
              <input
                type="file"
                id="logo-upload"
                accept="image/png,image/jpeg"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <label htmlFor="logo-upload" className="cursor-pointer">
                {logo ? (
                  <div className="space-y-2 sm:space-y-3">
                    <img src={logo} alt="Business Logo" className="max-h-24 sm:max-h-32 mx-auto rounded-lg" />
                    <p className="text-[10px] sm:text-xs text-purple-600 font-medium hover:text-purple-700">Change Logo</p>
                  </div>
                ) : (
                  <div className="space-y-2 sm:space-y-3 py-3 sm:py-0">
                    <div className="flex justify-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center border-2 border-purple-200">
                        <svg
                          className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-xs sm:text-sm font-medium text-gray-700">Add Business Logo</h3>
                    <p className="text-[10px] sm:text-xs text-gray-500">
                      Resolution up to 1080×1080px.
                      <br />
                      PNG or JPEG file.
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Fields List Modal */}
      {showCustomFieldsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-3 sm:p-4 md:p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
              <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">Custom Fields</h2>
              <button
                onClick={() => setShowCustomFieldsModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
              >
                <X size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </button>
            </div>

            <div className="p-3 sm:p-4 md:p-6">
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 max-h-60 sm:max-h-96 overflow-y-auto">
                {customFields.length === 0 ? (
                  <p className="text-gray-500 text-center py-6 sm:py-8 text-xs sm:text-sm md:text-base">No custom fields added yet</p>
                ) : (
                  customFields.map((field) => (
                    <div
                      key={field.id}
                      className="flex items-center justify-between p-2.5 sm:p-3 md:p-4 bg-purple-50 rounded-lg border border-purple-100 hover:border-purple-200 transition-colors"
                    >
                      <div className="flex-1 min-w-0 pr-2">
                        <p className="font-medium text-gray-900 truncate text-xs sm:text-sm md:text-base">{field.label}</p>
                        <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 truncate">{field.value || 'No value'}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteCustomField(field.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                      >
                        <X size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              <button
                onClick={() => {
                  setShowCustomFieldsModal(false);
                  setShowAddFieldModal(true);
                }}
                className="w-full py-2 sm:py-2.5 md:py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md text-xs sm:text-sm md:text-base"
              >
                Add New Custom Field
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Custom Field Modal */}
      {showAddFieldModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-3 sm:p-4 md:p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
              <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">Add Custom Field</h2>
              <button
                onClick={() => {
                  setShowAddFieldModal(false);
                  setNewFieldLabel('');
                  setNewFieldValue('');
                  setSetAsDefault(false);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
              >
                <X size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </button>
            </div>

            <div className="p-3 sm:p-4 md:p-6">
              <div className="space-y-4 sm:space-y-5 md:space-y-6">
                {/* Label */}
                <div>
                  <label className="block text-gray-900 font-medium mb-1.5 sm:mb-2 text-xs sm:text-sm md:text-base">
                    Label<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter field label"
                    value={newFieldLabel}
                    onChange={(e) => setNewFieldLabel(e.target.value)}
                    className="w-full px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all text-xs sm:text-sm md:text-base"
                  />
                </div>

                {/* Value */}
                <div>
                  <label className="block text-gray-900 font-medium mb-1.5 sm:mb-2 text-xs sm:text-sm md:text-base">Value</label>
                  <input
                    type="text"
                    placeholder="Enter field value"
                    value={newFieldValue}
                    onChange={(e) => setNewFieldValue(e.target.value)}
                    className="w-full px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all text-xs sm:text-sm md:text-base"
                  />
                </div>

                {/* Set as default */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <input
                    type="checkbox"
                    id="default-value"
                    checked={setAsDefault}
                    onChange={(e) => setSetAsDefault(e.target.checked)}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 rounded border-gray-300 focus:ring-purple-500 cursor-pointer flex-shrink-0"
                  />
                  <label htmlFor="default-value" className="text-gray-700 cursor-pointer text-xs sm:text-sm md:text-base">
                    Set as default value
                  </label>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-6 sm:mt-8">
                <button
                  onClick={() => {
                    setShowAddFieldModal(false);
                    setNewFieldLabel('');
                    setNewFieldValue('');
                    setSetAsDefault(false);
                  }}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-xs sm:text-sm md:text-base order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCustomField}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md text-xs sm:text-sm md:text-base order-1 sm:order-2"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}