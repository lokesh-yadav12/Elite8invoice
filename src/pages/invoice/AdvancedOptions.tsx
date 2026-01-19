// import React, { useState, useEffect } from 'react';
// import { ChevronDown, ChevronUp } from 'lucide-react';
// import { useAppDispatch, useAppSelector } from '../../store';
// import { updateInvoiceData } from '../../store/invoiceSlice';

// export default function AdvancedOptions() {
//   const dispatch = useAppDispatch();
//   const invoiceData = useAppSelector((state) => state.invoice);

//   const [hsnColumnView, setHsnColumnView] = useState(invoiceData.advancedOptions.hsnColumnView);
//   const [displayUnit, setDisplayUnit] = useState(invoiceData.advancedOptions.displayUnit);
//   const [taxSummary, setTaxSummary] = useState(invoiceData.advancedOptions.taxSummary);
//   const [hidePlaceCountry, setHidePlaceCountry] = useState(invoiceData.advancedOptions.hidePlaceCountry);
//   const [showHsnSummary, setShowHsnSummary] = useState(invoiceData.advancedOptions.showHsnSummary);
//   const [addOriginalImages, setAddOriginalImages] = useState(invoiceData.advancedOptions.addOriginalImages);
//   const [showThumbnails, setShowThumbnails] = useState(invoiceData.advancedOptions.showThumbnails);
//   const [showDescriptionFull, setShowDescriptionFull] = useState(invoiceData.advancedOptions.showDescriptionFull);
//   const [hideSubtotalGroup, setHideSubtotalGroup] = useState(invoiceData.advancedOptions.hideSubtotalGroup);
//   const [showSku, setShowSku] = useState(invoiceData.advancedOptions.showSku);

//   const [showHsnDropdown, setShowHsnDropdown] = useState(false);
//   const [showUnitDropdown, setShowUnitDropdown] = useState(false);
//   const [showTaxDropdown, setShowTaxDropdown] = useState(false);

//   const hsnOptions = ['Default', 'Merge', 'Split'];
//   const unitOptions = ['Merge with quantity', 'Merge with name'];
//   const taxOptions = ['Do not show', 'Invoice Summary', 'Separate Table', 'Both: Summary & Table'];

//   // Save to Redux whenever data changes
//   useEffect(() => {
//     dispatch(updateInvoiceData({
//       advancedOptions: {
//         hsnColumnView,
//         displayUnit,
//         taxSummary,
//         hidePlaceCountry,
//         showHsnSummary,
//         addOriginalImages,
//         showThumbnails,
//         showDescriptionFull,
//         hideSubtotalGroup,
//         showSku,
//       },
//     }));
//   }, [hsnColumnView, displayUnit, taxSummary, hidePlaceCountry, showHsnSummary, addOriginalImages, showThumbnails, showDescriptionFull, hideSubtotalGroup, showSku, dispatch]);

//   return (
//     <div className="p-4 sm:p-6 md:p-8">
//       <div className="max-w-3xl mx-auto">
//         <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 sm:mb-8">Advanced Options</h2>

//         <div className="space-y-4 sm:space-y-6">
//           {/* Select HSN column view */}
//           <div>
//             <label className="block text-sm sm:text-base text-gray-700 font-medium mb-2 sm:mb-3">
//               Select HSN column view
//             </label>
//             <div className="relative">
//               <button
//                 onClick={() => {
//                   setShowHsnDropdown(!showHsnDropdown);
//                   setShowUnitDropdown(false);
//                   setShowTaxDropdown(false);
//                 }}
//                 className="w-full sm:w-96 px-3 sm:px-4 py-2 sm:py-1 border-2 text-sm border-black/10 rounded-lg bg-white text-left flex items-center justify-between hover:border-purple-400 transition-all focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
//               >
//                 <span className="text-gray-700">{hsnColumnView}</span>
//                 {showHsnDropdown ? (
//                   <ChevronUp className="w-5 h-5 text-gray-600" />
//                 ) : (
//                   <ChevronDown className="w-5 h-5 text-gray-600" />
//                 )}
//               </button>
//               {showHsnDropdown && (
//                 <div className="absolute z-10 w-full sm:w-96 mt-2 bg-white border-2 border-black/10 rounded-lg shadow-lg overflow-hidden">
//                   {hsnOptions.map((option) => (
//                     <button
//                       key={option}
//                       onClick={() => {
//                         setHsnColumnView(option);
//                         setShowHsnDropdown(false);
//                       }}
//                       className={`w-full px-4 py-3 text-left transition-colors ${option === hsnColumnView
//                         ? 'bg-purple-100 text-purple-700 font-medium'
//                         : 'hover:bg-purple-50 text-gray-800'
//                         }`}
//                     >
//                       {option}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Display unit as */}
//           <div>
//             <label className="block text-sm sm:text-base text-gray-700 font-medium mb-1 mt-1">
//               Display unit as
//             </label>
//             <div className="relative">
//               <button
//                 onClick={() => {
//                   setShowUnitDropdown(!showUnitDropdown);
//                   setShowHsnDropdown(false);
//                   setShowTaxDropdown(false);
//                 }}
//                 className="w-full sm:w-96 px-3 sm:px-4 py-2 sm:py-1 border-2 text-sm border-black/10 rounded-lg bg-white text-left flex items-center justify-between hover:border-purple-400 transition-all focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
//               >
//                 <span className="text-gray-700">{displayUnit}</span>
//                 {showUnitDropdown ? (
//                   <ChevronUp className="w-5 h-5 text-gray-600" />
//                 ) : (
//                   <ChevronDown className="w-5 h-5 text-gray-600" />
//                 )}
//               </button>
//               {showUnitDropdown && (
//                 <div className="absolute z-10 w-full sm:w-96 mt-2 bg-white border-2 border-black/10 rounded-lg shadow-lg overflow-hidden">
//                   {unitOptions.map((option) => (
//                     <button
//                       key={option}
//                       onClick={() => {
//                         setDisplayUnit(option);
//                         setShowUnitDropdown(false);
//                       }}
//                       className={`w-full px-4 py-3 text-left transition-colors ${option === displayUnit
//                         ? 'bg-purple-100 text-purple-700 font-medium'
//                         : 'hover:bg-purple-50 text-gray-800'
//                         }`}
//                     >
//                       {option}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Show tax summary in invoice */}
//           <div>
//             <label className="block text-sm sm:text-base text-gray-700 font-medium mb-2 sm:mb-3">
//               Show tax summary in invoice
//             </label>
//             <div className="relative">
//               <button
//                 onClick={() => {
//                   setShowTaxDropdown(!showTaxDropdown);
//                   setShowHsnDropdown(false);
//                   setShowUnitDropdown(false);
//                 }}
//                 className="w-full sm:w-96 px-3 sm:px-4 py-2 sm:py-1 border-2 text-sm border-black/10 rounded-lg bg-white text-left flex items-center justify-between hover:border-purple-400 transition-all focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
//               >
//                 <span className="text-gray-700">{taxSummary}</span>
//                 {showTaxDropdown ? (
//                   <ChevronUp className="w-5 h-5 text-gray-600" />
//                 ) : (
//                   <ChevronDown className="w-5 h-5 text-gray-600" />
//                 )}
//               </button>
//               {showTaxDropdown && (
//                 <div className="absolute z-10 w-full sm:w-96 mt-2 bg-white border-2 border-purple-200 rounded-lg shadow-lg overflow-hidden">
//                   {taxOptions.map((option) => (
//                     <button
//                       key={option}
//                       onClick={() => {
//                         setTaxSummary(option);
//                         setShowTaxDropdown(false);
//                       }}
//                       className={`w-full px-4 py-3 text-left transition-colors ${option === taxSummary
//                         ? 'bg-purple-100 text-purple-700 font-medium'
//                         : 'hover:bg-purple-50 text-gray-800'
//                         }`}
//                     >
//                       {option}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>






//           {/* Checkboxes */}
//           <div className="space-y-0 pt-4">
//             {/* Hide place/country of supply */}
//             <label className="flex items-center gap-3 text-sm cursor-pointer group p-1 rounded-lg hover:bg-purple-50 transition-colors">
//               <input
//                 type="checkbox"
//                 checked={hidePlaceCountry}
//                 onChange={(e) => setHidePlaceCountry(e.target.checked)}
//                 className="w-4 h-4 text-purple-600 border-gray-300 text-xs rounded focus:ring-2 focus:ring-purple-500 cursor-pointer"
//               />
//               <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
//                 Hide place/country of supply
//               </span>
//             </label>

//             {/* Show HSN summary in invoice */}
//             <label className="flex items-center gap-3 text-sm cursor-pointer group p-1 rounded-lg hover:bg-purple-50 transition-colors">
//               <input
//                 type="checkbox"
//                 checked={showHsnSummary}
//                 onChange={(e) => setShowHsnSummary(e.target.checked)}
//                 className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-2 focus:ring-purple-500 cursor-pointer"
//               />
//               <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
//                 Show HSN summary in invoice
//               </span>
//             </label>

//             {/* Add original images in line items */}
//             <label className="flex items-center gap-3 text-sm cursor-pointer group p-1 rounded-lg hover:bg-purple-50 transition-colors">
//               <input
//                 type="checkbox"
//                 checked={addOriginalImages}
//                 onChange={(e) => setAddOriginalImages(e.target.checked)}
//                 className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-2 focus:ring-purple-500 cursor-pointer"
//               />
//               <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
//                 Add original images in line items
//               </span>
//             </label>

//             {/* Show thumbnails in separate column */}
//             <label className="flex items-center gap-3 text-sm cursor-pointer group p-1 rounded-lg hover:bg-purple-50 transition-colors">
//               <input
//                 type="checkbox"
//                 checked={showThumbnails}
//                 onChange={(e) => setShowThumbnails(e.target.checked)}
//                 className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-2 focus:ring-purple-500 cursor-pointer"
//               />
//               <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
//                 Show thumbnails in separate column
//               </span>
//             </label>

//             {/* Show description in full width */}
//             <label className="flex items-center gap-3 text-sm cursor-pointer group p-1 rounded-lg hover:bg-purple-50 transition-colors">
//               <input
//                 type="checkbox"
//                 checked={showDescriptionFull}
//                 onChange={(e) => setShowDescriptionFull(e.target.checked)}
//                 className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-2 focus:ring-purple-500 cursor-pointer"
//               />
//               <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
//                 Show description in full width
//               </span>
//             </label>

//             {/* Hide subtotal for group items */}
//             <label className="flex items-center gap-3 text-sm cursor-pointer group p-1 rounded-lg hover:bg-purple-50 transition-colors">
//               <input
//                 type="checkbox"
//                 checked={hideSubtotalGroup}
//                 onChange={(e) => setHideSubtotalGroup(e.target.checked)}
//                 className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-2 focus:ring-purple-500 cursor-pointer"
//               />
//               <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
//                 Hide subtotal for group items
//               </span>
//             </label>

//             {/* Show SKU in Invoice */}
//             <label className="flex items-center gap-3 text-sm cursor-pointer group p-1 rounded-lg hover:bg-purple-50 transition-colors">
//               <input
//                 type="checkbox"
//                 checked={showSku}
//                 onChange={(e) => setShowSku(e.target.checked)}
//                 className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-2 focus:ring-purple-500 cursor-pointer"
//               />
//               <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
//                 Show SKU in Invoice
//               </span>
//             </label>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { updateInvoiceData } from '../../store/invoiceSlice';

export default function AdvancedOptions() {
  const dispatch = useAppDispatch();
  const invoiceData = useAppSelector((state) => state.invoice);

  const [hsnColumnView, setHsnColumnView] = useState(invoiceData.advancedOptions.hsnColumnView);
  const [displayUnit, setDisplayUnit] = useState(invoiceData.advancedOptions.displayUnit);
  const [taxSummary, setTaxSummary] = useState(invoiceData.advancedOptions.taxSummary);
  const [hidePlaceCountry, setHidePlaceCountry] = useState(invoiceData.advancedOptions.hidePlaceCountry);
  const [showHsnSummary, setShowHsnSummary] = useState(invoiceData.advancedOptions.showHsnSummary);
  const [addOriginalImages, setAddOriginalImages] = useState(invoiceData.advancedOptions.addOriginalImages);
  const [showThumbnails, setShowThumbnails] = useState(invoiceData.advancedOptions.showThumbnails);
  const [showDescriptionFull, setShowDescriptionFull] = useState(invoiceData.advancedOptions.showDescriptionFull);
  const [hideSubtotalGroup, setHideSubtotalGroup] = useState(invoiceData.advancedOptions.hideSubtotalGroup);
  const [showSku, setShowSku] = useState(invoiceData.advancedOptions.showSku);

  const [showHsnDropdown, setShowHsnDropdown] = useState(false);
  const [showUnitDropdown, setShowUnitDropdown] = useState(false);
  const [showTaxDropdown, setShowTaxDropdown] = useState(false);

  const hsnOptions = ['Default', 'Merge', 'Split'];
  const unitOptions = ['Merge with quantity', 'Merge with name'];
  const taxOptions = ['Do not show', 'Invoice Summary', 'Separate Table', 'Both: Summary & Table'];

  useEffect(() => {
    dispatch(
      updateInvoiceData({
        advancedOptions: {
          hsnColumnView,
          displayUnit,
          taxSummary,
          hidePlaceCountry,
          showHsnSummary,
          addOriginalImages,
          showThumbnails,
          showDescriptionFull,
          hideSubtotalGroup,
          showSku,
        },
      })
    );
  }, [
    hsnColumnView,
    displayUnit,
    taxSummary,
    hidePlaceCountry,
    showHsnSummary,
    addOriginalImages,
    showThumbnails,
    showDescriptionFull,
    hideSubtotalGroup,
    showSku,
    dispatch,
  ]);

  return (
    <div className="p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-base sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6 md:mb-8">
          Advanced Options
        </h2>

        <div className="space-y-3 sm:space-y-5 md:space-y-6">
          {/* Select HSN column view */}
          <div>
            <label className="block text-[11px] sm:text-sm md:text-base text-gray-700 font-medium mb-1.5 sm:mb-2">
              Select HSN column view
            </label>
            <div className="relative">
              <button
                onClick={() => {
                  setShowHsnDropdown(!showHsnDropdown);
                  setShowUnitDropdown(false);
                  setShowTaxDropdown(false);
                }}
                className="w-full sm:w-96 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 border-2 text-[11px] sm:text-sm border-black/10 rounded-lg bg-white text-left flex items-center justify-between hover:border-purple-400 transition-all focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              >
                <span className="text-gray-700 truncate">{hsnColumnView}</span>
                {showHsnDropdown ? (
                  <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                )}
              </button>

              {showHsnDropdown && (
                <div className="absolute z-20 w-full sm:w-96 mt-2 bg-white border-2 border-black/10 rounded-lg shadow-lg overflow-hidden">
                  {hsnOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setHsnColumnView(option);
                        setShowHsnDropdown(false);
                      }}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-[11px] sm:text-sm text-left transition-colors ${option === hsnColumnView
                          ? 'bg-purple-100 text-purple-700 font-medium'
                          : 'hover:bg-purple-50 text-gray-800'
                        }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Display unit as */}
          <div>
            <label className="block text-[11px] sm:text-sm md:text-base text-gray-700 font-medium mb-1.5 sm:mb-2">
              Display unit as
            </label>
            <div className="relative">
              <button
                onClick={() => {
                  setShowUnitDropdown(!showUnitDropdown);
                  setShowHsnDropdown(false);
                  setShowTaxDropdown(false);
                }}
                className="w-full sm:w-96 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 border-2 text-[11px] sm:text-sm border-black/10 rounded-lg bg-white text-left flex items-center justify-between hover:border-purple-400 transition-all focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              >
                <span className="text-gray-700 truncate">{displayUnit}</span>
                {showUnitDropdown ? (
                  <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                )}
              </button>

              {showUnitDropdown && (
                <div className="absolute z-20 w-full sm:w-96 mt-2 bg-white border-2 border-black/10 rounded-lg shadow-lg overflow-hidden">
                  {unitOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setDisplayUnit(option);
                        setShowUnitDropdown(false);
                      }}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-[11px] sm:text-sm text-left transition-colors ${option === displayUnit
                          ? 'bg-purple-100 text-purple-700 font-medium'
                          : 'hover:bg-purple-50 text-gray-800'
                        }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Show tax summary */}
          <div>
            <label className="block text-[11px] sm:text-sm md:text-base text-gray-700 font-medium mb-1.5 sm:mb-2">
              Show tax summary in invoice
            </label>
            <div className="relative">
              <button
                onClick={() => {
                  setShowTaxDropdown(!showTaxDropdown);
                  setShowHsnDropdown(false);
                  setShowUnitDropdown(false);
                }}
                className="w-full sm:w-96 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 border-2 text-[11px] sm:text-sm border-black/10 rounded-lg bg-white text-left flex items-center justify-between hover:border-purple-400 transition-all focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              >
                <span className="text-gray-700 truncate">{taxSummary}</span>
                {showTaxDropdown ? (
                  <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                )}
              </button>

              {showTaxDropdown && (
                <div className="absolute z-20 w-full sm:w-96 mt-2 bg-white border-2 border-purple-200 rounded-lg shadow-lg overflow-hidden">
                  {taxOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setTaxSummary(option);
                        setShowTaxDropdown(false);
                      }}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-[11px] sm:text-sm text-left transition-colors ${option === taxSummary
                          ? 'bg-purple-100 text-purple-700 font-medium'
                          : 'hover:bg-purple-50 text-gray-800'
                        }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Checkboxes */}
          <div className="pt-2 sm:pt-4 space-y-0.5 sm:space-y-1">
            {[
              ['Hide place/country of supply', hidePlaceCountry, setHidePlaceCountry],
              ['Show HSN summary in invoice', showHsnSummary, setShowHsnSummary],
              ['Add original images in line items', addOriginalImages, setAddOriginalImages],
              ['Show thumbnails in separate column', showThumbnails, setShowThumbnails],
              ['Show description in full width', showDescriptionFull, setShowDescriptionFull],
              ['Hide subtotal for group items', hideSubtotalGroup, setHideSubtotalGroup],
              ['Show SKU in Invoice', showSku, setShowSku],
            ].map(([label, value, setter]: any) => (
              <label
                key={label}
                className="flex items-start sm:items-center gap-2 sm:gap-3 text-[11px] sm:text-sm cursor-pointer group p-1.5 sm:p-2 rounded-lg hover:bg-purple-50 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setter(e.target.checked)}
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 sm:mt-0 text-purple-600 border-gray-300 rounded focus:ring-2 focus:ring-purple-500 cursor-pointer"
                />
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                  {label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
