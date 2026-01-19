import React, { useState, useEffect } from 'react';
import { ChevronDown, X, Plus, Eye, Trash2, GripVertical, Info } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { updateInvoiceData } from '../../store/invoiceSlice';

const TAX_TYPES = ['GST (India)', 'None', 'VAT', 'PPN', 'SST', 'HST', 'TAX'];

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

const CURRENCIES = [
  { name: 'United States Dollar', code: 'USD', symbol: '$' },
  { name: 'Euro', code: 'EUR', symbol: '€' },
  { name: 'British Pound Sterling', code: 'GBP', symbol: '£' },
  { name: 'Indian Rupee', code: 'INR', symbol: '₹' },
  { name: 'Japanese Yen', code: 'JPY', symbol: '¥' },
  { name: 'Chinese Yuan', code: 'CNY', symbol: '¥' },
  { name: 'Australian Dollar', code: 'AUD', symbol: 'A$' },
  { name: 'Canadian Dollar', code: 'CAD', symbol: 'C$' },
  { name: 'Swiss Franc', code: 'CHF', symbol: 'Fr' },
  { name: 'Hong Kong Dollar', code: 'HKD', symbol: 'HK$' },
  { name: 'Singapore Dollar', code: 'SGD', symbol: 'S$' },
  { name: 'Swedish Krona', code: 'SEK', symbol: 'kr' },
  { name: 'South Korean Won', code: 'KRW', symbol: '₩' },
  { name: 'Norwegian Krone', code: 'NOK', symbol: 'kr' },
  { name: 'New Zealand Dollar', code: 'NZD', symbol: 'NZ$' },
  { name: 'Mexican Peso', code: 'MXN', symbol: '$' },
  { name: 'Brazilian Real', code: 'BRL', symbol: 'R$' },
  { name: 'South African Rand', code: 'ZAR', symbol: 'R' },
  { name: 'Russian Ruble', code: 'RUB', symbol: '₽' },
  { name: 'UAE Dirham', code: 'AED', symbol: 'د.إ' }
];

const COLUMN_TYPES = ['TEXT', 'NUMBER', 'DATE', 'CURRENCY', 'FORMULA'];

export default function InvoiceConfiguration() {
  const dispatch = useAppDispatch();
  const invoiceData = useAppSelector((state) => state.invoice);

  const [isGSTModalOpen, setIsGSTModalOpen] = useState(false);
  const [isCessModalOpen, setIsCessModalOpen] = useState(false);
  const [isColumnsModalOpen, setIsColumnsModalOpen] = useState(false);
  const [selectedTaxType, setSelectedTaxType] = useState(invoiceData.gstConfiguration.taxType);
  const [selectedPlace, setSelectedPlace] = useState(invoiceData.gstConfiguration.placeOfSupply);
  const [selectedGSTType, setSelectedGSTType] = useState(invoiceData.gstConfiguration.gstType);
  const [isReverseCharge, setIsReverseCharge] = useState(invoiceData.gstConfiguration.isReverseCharge);
  const [showTaxTypeDropdown, setShowTaxTypeDropdown] = useState(false);
  const [showPlaceDropdown, setShowPlaceDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(
    CURRENCIES.find(c => c.code === invoiceData.currency.code) || CURRENCIES[3] // Default to INR
  );

  const [cessType, setCessType] = useState('Central Cess');
  const [cessName, setCessName] = useState('');
  const [showCessTypeDropdown, setShowCessTypeDropdown] = useState(false);

  const [columns, setColumns] = useState(invoiceData.columnConfiguration.map(col => ({
    ...col,
    showDropdown: false
  })));

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Save GST configuration to Redux
  const saveGSTConfiguration = () => {
    // Update column configuration based on tax type
    const updatedColumns = invoiceData.columnConfiguration.map(col => {
      const columnNameLower = col.name.toLowerCase();

      // Update GST Rate column based on tax type
      if (columnNameLower === 'gst rate' || columnNameLower === 'vat rate' || columnNameLower === 'ppn rate' ||
        columnNameLower === 'sst rate' || columnNameLower === 'hst rate' || columnNameLower === 'tax rate') {
        if (selectedTaxType === 'GST (India)') {
          return { ...col, name: 'GST Rate', visible: true };
        } else if (selectedTaxType === 'VAT') {
          return { ...col, name: 'VAT Rate', visible: true };
        } else if (selectedTaxType === 'PPN') {
          return { ...col, name: 'PPN Rate', visible: true };
        } else if (selectedTaxType === 'SST') {
          return { ...col, name: 'SST Rate', visible: true };
        } else if (selectedTaxType === 'HST') {
          return { ...col, name: 'HST Rate', visible: true };
        } else if (selectedTaxType === 'TAX') {
          return { ...col, name: 'Tax Rate', visible: true };
        } else if (selectedTaxType === 'None') {
          return { ...col, name: 'Tax Rate', visible: false };
        }
      }

      // Handle CGST column - This is the main tax column that gets renamed
      if (columnNameLower === 'cgst') {
        if (selectedTaxType === 'GST (India)') {
          if (selectedGSTType === 'IGST') {
            // When IGST is selected, hide CGST column
            return { ...col, name: 'CGST', visible: false };
          } else {
            // When CGST & SGST is selected, show CGST column
            return { ...col, name: 'CGST', visible: true };
          }
        } else if (selectedTaxType === 'VAT') {
          return { ...col, name: 'VAT', visible: true };
        } else if (selectedTaxType === 'PPN') {
          return { ...col, name: 'PPN', visible: true };
        } else if (selectedTaxType === 'SST') {
          return { ...col, name: 'SST', visible: true };
        } else if (selectedTaxType === 'HST') {
          return { ...col, name: 'HST', visible: true };
        } else if (selectedTaxType === 'TAX') {
          return { ...col, name: 'TAX', visible: true };
        } else if (selectedTaxType === 'None') {
          return { ...col, name: 'CGST', visible: false };
        }
        return col; // Return unchanged if no condition matches
      }

      // Handle other tax columns (VAT, PPN, SST, HST, TAX) - Hide them when not selected
      if (columnNameLower === 'vat') {
        if (selectedTaxType === 'VAT') {
          return { ...col, name: 'VAT', visible: true };
        } else {
          return { ...col, name: 'VAT', visible: false };
        }
      }
      if (columnNameLower === 'ppn') {
        if (selectedTaxType === 'PPN') {
          return { ...col, name: 'PPN', visible: true };
        } else {
          return { ...col, name: 'PPN', visible: false };
        }
      }
      if (columnNameLower === 'sst') {
        if (selectedTaxType === 'SST') {
          return { ...col, name: 'SST', visible: true };
        } else {
          return { ...col, name: 'SST', visible: false };
        }
      }
      if (columnNameLower === 'hst') {
        if (selectedTaxType === 'HST') {
          return { ...col, name: 'HST', visible: true };
        } else {
          return { ...col, name: 'HST', visible: false };
        }
      }
      if (columnNameLower === 'tax') {
        if (selectedTaxType === 'TAX') {
          return { ...col, name: 'TAX', visible: true };
        } else {
          return { ...col, name: 'TAX', visible: false };
        }
      }

      // Handle SGST column - Hide for all non-GST (India) tax types
      if (columnNameLower === 'sgst') {
        if (selectedTaxType === 'GST (India)') {
          if (selectedGSTType === 'CGST & SGST') {
            // When CGST & SGST is selected, show SGST column
            return { ...col, name: 'SGST', visible: true };
          } else {
            // When IGST is selected, hide SGST column
            return { ...col, name: 'SGST', visible: false };
          }
        } else {
          // For all other tax types (VAT, PPN, SST, HST, TAX, None), hide SGST
          return { ...col, name: 'SGST', visible: false };
        }
      }

      return col;
    });

    // Add IGST column if it doesn't exist and IGST is selected
    let finalColumns = [...updatedColumns];
    const hasIGSTColumn = finalColumns.some(col => col.name.toLowerCase() === 'igst');

    if (selectedTaxType === 'GST (India)' && selectedGSTType === 'IGST' && !hasIGSTColumn) {
      // Find the position after Amount column to insert IGST
      const amountIndex = finalColumns.findIndex(col => col.name.toLowerCase() === 'amount');
      const igstColumn = {
        id: Date.now(),
        name: 'IGST',
        type: 'FORMULA',
        formula: '(Amount * GST) / 100',
        editable: false,
        deletable: false,
        visible: true
      };
      finalColumns.splice(amountIndex + 1, 0, igstColumn);
    }

    // Hide IGST column if CGST & SGST is selected or for non-GST tax types
    if ((selectedTaxType === 'GST (India)' && selectedGSTType === 'CGST & SGST') || selectedTaxType !== 'GST (India)') {
      finalColumns = finalColumns.map(col => {
        if (col.name.toLowerCase() === 'igst') {
          return { ...col, visible: false };
        }
        return col;
      });
    }

    // Show IGST column only if GST (India) with IGST is selected
    if (selectedTaxType === 'GST (India)' && selectedGSTType === 'IGST') {
      finalColumns = finalColumns.map(col => {
        if (col.name.toLowerCase() === 'igst') {
          return { ...col, visible: true };
        }
        return col;
      });
    }

    dispatch(updateInvoiceData({
      gstConfiguration: {
        taxType: selectedTaxType,
        placeOfSupply: selectedPlace,
        gstType: selectedGSTType,
        isReverseCharge: isReverseCharge,
      },
      columnConfiguration: finalColumns,
    }));
    setIsGSTModalOpen(false);
  };

  // Save column configuration to Redux
  const saveColumnConfiguration = () => {
    const columnsToSave = columns.map(({ showDropdown, ...col }) => ({
      ...col,
      visible: true
    }));
    dispatch(updateInvoiceData({
      columnConfiguration: columnsToSave,
    }));
    setIsColumnsModalOpen(false);
  };

  const addNewColumn = () => {
    const newColumn = {
      id: Date.now(),
      name: `Column ${columns.length}`,
      type: 'TEXT',
      editable: true,
      deletable: true,
      showDropdown: false,
      formula: '',
      visible: true
    };
    setColumns([columns[0], newColumn, ...columns.slice(1)]);
  };

  const deleteColumn = (id: number) => {
    setColumns(columns.filter(col => col.id !== id));
  };

  const updateColumnName = (id: number, newName: string) => {
    setColumns(columns.map(col =>
      col.id === id ? { ...col, name: newName } : col
    ));
  };

  const updateColumnType = (id: number, newType: string) => {
    setColumns(columns.map(col =>
      col.id === id ? { ...col, type: newType, showDropdown: false, formula: newType === 'FORMULA' ? '=' : col.formula || '' } : col
    ));
  };

  const updateColumnFormula = (id: number, newFormula: string) => {
    setColumns(columns.map(col =>
      col.id === id ? { ...col, formula: newFormula } : col
    ));
  };

  const toggleDropdown = (id: number) => {
    setColumns(columns.map(col =>
      col.id === id ? { ...col, showDropdown: !col.showDropdown } : { ...col, showDropdown: false }
    ));
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newColumns = [...columns];
    const draggedItem = newColumns[draggedIndex];
    newColumns.splice(draggedIndex, 1);
    newColumns.splice(index, 0, draggedItem);

    setColumns(newColumns);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 md:px-1 pt-3 sm:pt-4 pb-2 sm:pb-3 bg-gray-50">
      {/* Buttons Row */}
      <div className="flex flex-wrap gap-2 sm:gap-3">
        <button
          onClick={() => setIsGSTModalOpen(true)}
          className="flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
        >
          {/* <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 12h6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg> */}
          <span className="text-gray-700 text-sm font-medium">% Configure GST</span>
        </button>

        <div className="mb-2 mt-2">
          <label className="text-gray-700 text-sm sm:text-base font-normal">
            Currency<span className="text-red-500">*</span>
          </label>
        </div>

        <div className="relative w-full sm:w-auto">
          <button
            onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
            className="flex items-center justify-between gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm w-full sm:min-w-[280px] md:min-w-[320px]"
          >
            <span className="text-gray-700 text-sm font-medium">
              {selectedCurrency.name} ({selectedCurrency.code}, {selectedCurrency.symbol})
            </span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
          {showCurrencyDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {CURRENCIES.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => {
                    setSelectedCurrency(currency);
                    setShowCurrencyDropdown(false);
                    // Save currency to Redux immediately
                    dispatch(updateInvoiceData({
                      currency: {
                        code: currency.code,
                        symbol: currency.symbol,
                        name: currency.name,
                      },
                    }));
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  <span className="text-gray-900">{currency.name}</span>
                  <span className="text-gray-500 ml-2">({currency.code}, {currency.symbol})</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <button className="flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
          <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="14" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="14" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="3" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-gray-700 text-sm font-medium">Number and Currency Format</span>
        </button>

        <button
          onClick={() => setIsColumnsModalOpen(true)}
          className="flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
        >
          <svg className="w-5 h-5 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="3" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="14" y1="4" x2="21" y2="4" strokeLinecap="round" />
            <line x1="14" y1="9" x2="21" y2="9" strokeLinecap="round" />
            <line x1="14" y1="15" x2="21" y2="15" strokeLinecap="round" />
            <line x1="14" y1="20" x2="21" y2="20" strokeLinecap="round" />
          </svg>
          <span className="text-gray-700 text-sm font-medium">Edit Columns/Formulas</span>
        </button>
      </div>

      {/* Configure Tax Modal */}
      {isGSTModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-2 sm:mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 border-b sticky top-0 bg-white z-10">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Configure Tax</h2>
              <button onClick={() => setIsGSTModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="px-4 sm:px-8 py-4 sm:py-6 space-y-6 sm:space-y-8">
              <div>
                <label className="block text-sm sm:text-base text-gray-900 font-medium mb-2 sm:mb-3">
                  1. Select Tax Type<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <button onClick={() => setShowTaxTypeDropdown(!showTaxTypeDropdown)} className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                    <span className="text-gray-700">{selectedTaxType}</span>
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </button>
                  {showTaxTypeDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {TAX_TYPES.map((type) => (
                        <button key={type} onClick={() => { setSelectedTaxType(type); setShowTaxTypeDropdown(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-100">
                          {type}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {selectedTaxType === 'GST (India)' && (
                <>
                  <div>
                    <label className="block text-gray-900 font-medium mb-3">
                      2. Place of Supply<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <button onClick={() => setShowPlaceDropdown(!showPlaceDropdown)} className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                        <span className="text-gray-700">{selectedPlace}</span>
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      </button>
                      {showPlaceDropdown && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          {INDIAN_STATES.map((state) => (
                            <button key={state} onClick={() => { setSelectedPlace(state); setShowPlaceDropdown(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-100">
                              {state}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-900 font-medium mb-4">
                      3. GST Type<span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-8 mb-4">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" name="gstType" value="IGST" checked={selectedGSTType === 'IGST'} onChange={(e) => setSelectedGSTType(e.target.value)} className="w-5 h-5 text-purple-600 accent-purple-600" />
                        <span className="text-gray-900">IGST</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" name="gstType" value="CGST & SGST" checked={selectedGSTType === 'CGST & SGST'} onChange={(e) => setSelectedGSTType(e.target.value)} className="w-5 h-5 text-purple-600 accent-purple-600" />
                        <span className="text-gray-900">CGST & SGST</span>
                      </label>
                    </div>
                    <button onClick={() => setIsCessModalOpen(true)} className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium">
                      <Plus className="w-5 h-5" />
                      <span>Add Cess</span>
                    </button>
                  </div>
                </>
              )}

              <div>
                <label className="block text-gray-900 font-medium mb-4">
                  {selectedTaxType === 'GST (India)' ? '4. Other Options' : '2. Other Options'}
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={isReverseCharge} onChange={(e) => setIsReverseCharge(e.target.checked)} className="w-5 h-5 text-purple-600 accent-purple-600 rounded" />
                  <span className="text-gray-900">Is Reverse Charge Applicable?</span>
                </label>
              </div>

              {selectedTaxType === 'GST (India)' && (
                <div className="bg-gray-50 px-4 py-3 rounded-lg">
                  <p className="text-gray-600 text-sm">You are billing to a Non-GST Registered client</p>
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-8 py-4 sm:py-6 border-t border-gray-200 gap-3">
              <button onClick={() => setIsGSTModalOpen(false)} className="w-full sm:w-auto text-sm sm:text-base text-gray-700 font-medium hover:text-gray-900">Cancel</button>
              <button onClick={saveGSTConfiguration} className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 shadow-sm">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Configure Additional Cess Modal */}
      {isCessModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900">Configure Additional Cess</h2>
              <button onClick={() => setIsCessModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="px-8 py-6 space-y-6">
              <div>
                <label className="block text-gray-900 font-normal mb-3">Cess Type</label>
                <div className="relative">
                  <button onClick={() => setShowCessTypeDropdown(!showCessTypeDropdown)} className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                    <span className="text-gray-700">{cessType}</span>
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </button>
                  {showCessTypeDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                      <button onClick={() => { setCessType('Central Cess'); setShowCessTypeDropdown(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-100">Central Cess</button>
                      <button onClick={() => { setCessType('State Cess'); setShowCessTypeDropdown(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-100">State Cess</button>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-gray-900 font-normal mb-3">Cess Name</label>
                <input type="text" value={cessName} onChange={(e) => setCessName(e.target.value)} placeholder="Cess Name" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" />
              </div>
              <div className="bg-gray-50 px-4 py-3 rounded-lg">
                <p className="text-gray-600 text-sm">Additional cess can be levied in addition to GST tax invoice</p>
              </div>
            </div>
            <div className="flex items-center justify-between px-8 py-6 border-t border-gray-200">
              <button onClick={() => setIsCessModalOpen(false)} className="text-gray-700 font-medium hover:text-gray-900">Cancel</button>
              <button onClick={() => setIsCessModalOpen(false)} className="px-8 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 shadow-sm">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Customize Columns & Formulas Modal */}
      {isColumnsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-semibold text-gray-900">Customize Columns & Formulas</h2>
                <span className="text-2xl">💡</span>
              </div>
              <button onClick={() => setIsColumnsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-4 sm:py-6">
              <div className="bg-purple-50 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Need Advanced Formulas?</h3>
                <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">Add custom calculations, formulae and custom fields in your columns.</p>
                <button className="px-4 sm:px-6 py-2 text-sm sm:text-base bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700">
                  Talk to an expert now
                </button>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
                <div className="grid grid-cols-2 gap-3 sm:gap-4 flex-1 w-full">
                  <div>
                    <label className="block text-gray-700 font-bold mb-2 text-xs sm:text-sm px-2 sm:px-12">Column Name</label>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-2 text-xs sm:text-sm px-2 sm:px-20">Column Type</label>
                  </div>
                </div>
                <button
                  onClick={addNewColumn}
                  className="w-full sm:w-auto sm:ml-4 flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm text-purple-600 border-2 border-purple-600 rounded-lg hover:bg-purple-50 font-medium"
                >
                  <Plus className="w-5 h-5" />
                  Add New Column
                </button>
              </div>

              <div className="space-y-4">
                {columns.map((column, index) => (
                  <div key={column.id}>
                    <div
                      className="flex items-start gap-4"
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragEnd={handleDragEnd}
                    >
                      <button className="mt-3 text-gray-400 hover:text-gray-600 cursor-move">
                        <GripVertical className="w-5 h-5" />
                      </button>

                      <div className="flex-1 grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={column.name}
                          onChange={(e) => updateColumnName(column.id, e.target.value)}
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />

                        {column.type === 'FORMULA' && !column.editable ? (
                          <div className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600">
                            {column.formula}
                          </div>
                        ) : (
                          <div className="relative">
                            <button
                              onClick={() => toggleDropdown(column.id)}
                              className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                              <span className="text-gray-700">{column.type}</span>
                              <ChevronDown className="w-5 h-5 text-gray-500" />
                            </button>
                            {column.showDropdown && (
                              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                                {COLUMN_TYPES.map((type) => (
                                  <button
                                    key={type}
                                    onClick={() => updateColumnType(column.id, type)}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                                  >
                                    {type}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mt-3">
                        <button className="p-2 text-gray-500 hover:text-gray-700">
                          <Eye className="w-5 h-5" />
                        </button>
                        {column.deletable && (
                          <button
                            onClick={() => deleteColumn(column.id)}
                            className="p-2 text-gray-500 hover:text-red-600"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {column.type === 'FORMULA' && column.editable && (
                      <div className="ml-12 mt-2 flex items-center gap-2">
                        <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
                          <span className="text-gray-600 font-mono text-sm">fx</span>
                          <span className="text-gray-400">|</span>
                          <input
                            type="text"
                            value={column.formula}
                            onChange={(e) => updateColumnFormula(column.id, e.target.value)}
                            placeholder="Enter formula..."
                            className="flex-1 bg-transparent outline-none text-gray-700 min-w-[300px]"
                          />
                        </div>
                      </div>
                    )}

                    {(column as any).makePrivate !== undefined && (
                      <div className="flex items-center gap-2 ml-12 mt-2">
                        <input type="checkbox" checked={(column as any).makePrivate} className="w-4 h-4 text-purple-600 accent-purple-600 rounded" />
                        <label className="text-gray-700 text-sm flex items-center gap-1">
                          Make private?
                          <Info className="w-4 h-4 text-gray-400" />
                        </label>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-purple-700 text-white rounded-lg p-4">
                <div className="flex items-center justify-between text-sm flex-wrap gap-2">
                  {columns.map((col) => (
                    <span key={col.id}>{col.name}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 border-t border-gray-200 bg-white">
              <button onClick={() => setIsColumnsModalOpen(false)} className="text-sm sm:text-base text-gray-700 font-medium hover:text-gray-900">
                Cancel
              </button>
              <div className="flex gap-2 sm:gap-3">
                <button className="px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50">
                  Reset to Default
                </button>
                <button onClick={saveColumnConfiguration} className="px-4 sm:px-8 py-2 sm:py-3 text-xs sm:text-sm bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700">
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