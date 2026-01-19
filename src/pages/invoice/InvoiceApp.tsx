// import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { ChevronRight } from 'lucide-react';
// import { useAppSelector, useAppDispatch } from '../../store';
// import { setCurrentStep } from '../../store/invoiceSlice';

// // Import all invoice templates
// import InvoiceGeneratorForm from '../invoice-templates/invoice-generator/Invoice';
// import InvoiceGeneratorPreview from '../invoice-templates/invoice-generator/InvoicePreview';

// import PurchaseOrderForm from '../invoice-templates/purchase-order/Invoice';
// import PurchaseOrderPreview from '../invoice-templates/purchase-order/InvoicePreview';

// import QuotationForm from '../invoice-templates/quotation/Invoice';
// import QuotationPreview from '../invoice-templates/quotation/InvoicePreview';

// import GSTInvoiceForm from '../invoice-templates/gst-invoice/Invoice';
// import GSTInvoicePreview from '../invoice-templates/gst-invoice/InvoicePreview';

// import DeliveryChallanForm from '../invoice-templates/delivery-challan/Invoice';
// import DeliveryChallanPreview from '../invoice-templates/delivery-challan/InvoicePreview';

// import ProformaInvoiceForm from '../invoice-templates/proforma-invoice/Invoice';
// import ProformaInvoicePreview from '../invoice-templates/proforma-invoice/InvoicePreview';

// interface TemplateConfig {
//     FormComponent: React.ComponentType;
//     PreviewComponent: React.ComponentType;
//     label: string;
// }

// const InvoiceApp = () => {
//     const dispatch = useAppDispatch();
//     const currentStep = useAppSelector((state) => state.invoice.currentStep);
//     const { templateType } = useParams<{ templateType: string }>();

//     // Scroll to top when component mounts
//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, []);

//     // Map template types to their components and labels
//     const templateConfig: Record<string, TemplateConfig> = {
//         'invoice-generator': {
//             FormComponent: InvoiceGeneratorForm,
//             PreviewComponent: InvoiceGeneratorPreview,
//             label: 'Invoice'
//         },
//         'purchase-order': {
//             FormComponent: PurchaseOrderForm,
//             PreviewComponent: PurchaseOrderPreview,
//             label: 'Purchase Order'
//         },
//         'quotation': {
//             FormComponent: QuotationForm,
//             PreviewComponent: QuotationPreview,
//             label: 'Quotation'
//         },
//         'gst-invoice': {
//             FormComponent: GSTInvoiceForm,
//             PreviewComponent: GSTInvoicePreview,
//             label: 'GST Invoice'
//         },
//         'delivery-challan': {
//             FormComponent: DeliveryChallanForm,
//             PreviewComponent: DeliveryChallanPreview,
//             label: 'Delivery Challan'
//         },
//         'proforma-invoice': {
//             FormComponent: ProformaInvoiceForm,
//             PreviewComponent: ProformaInvoicePreview,
//             label: 'Proforma Invoice'
//         }
//     };

//     const config = templateConfig[templateType || 'invoice-generator'];
//     const FormComponent = config?.FormComponent || InvoiceGeneratorForm;
//     const PreviewComponent = config?.PreviewComponent || InvoiceGeneratorPreview;
//     const documentLabel = config?.label || 'Invoice';

//     const steps = [
//         { number: 1, label: `Add ${documentLabel} Details`, optional: false },
//         { number: 2, label: 'Design & Share', optional: true }
//     ];

//     const handleStepClick = (stepNumber: number) => {
//         dispatch(setCurrentStep(stepNumber));
//     };

//     return (
//         <div className='min-h-screen bg-white py-2'>
//             <div className="max-w-7xl mx-auto px-4">
//                 {/* Header Section */}
//                 <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-4 pb-8 mb-4 ">
//                     <h1 className="text-2xl font-bold text-gray-700 mb-4 text-center">
//                         Create New {documentLabel}
//                     </h1>

//                     {/* Stepper */}
//                     <div className="flex items-center justify-center gap-4">
//                         {steps.map((step, index) => (
//                             <div key={step.number} className="flex text-sm items-center gap-4">
//                                 <div
//                                     className="flex items-center gap-3 cursor-pointer"
//                                     onClick={() => handleStepClick(step.number)}
//                                 >
//                                     <div
//                                         className={`w-6 h-6 rounded-full flex items-center justify-center font-semibold text-xs transition-all duration-300 ${currentStep === step.number
//                                             ? 'bg-purple-600 text-white shadow-lg shadow-purple-300'
//                                             : currentStep > step.number
//                                                 ? 'bg-purple-600 text-white cursor-pointer hover:shadow-lg'
//                                                 : 'bg-gray-200 text-gray-500'
//                                             }`}
//                                     >
//                                         {step.number}
//                                     </div>

//                                     <div className="flex items-center gap-2">
//                                         <span
//                                             className={`text-base font-medium transition-colors ${currentStep === step.number
//                                                 ? 'text-purple-700'
//                                                 : 'text-gray-500'
//                                                 }`}
//                                         >
//                                             {step.label}
//                                         </span>
//                                         {step.optional
//                                             && (
//                                                 <span className="text-sm text-gray-400">(optional)</span>
//                                             )
//                                         }
//                                     </div>
//                                 </div>

//                                 {index < steps.length - 1 && (
//                                     <ChevronRight className="text-gray-300" size={20} />
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Content based on current step */}
//                 {currentStep === 1 ? <FormComponent /> : <PreviewComponent />}
//             </div>
//         </div>
//     );
// };

// export default InvoiceApp;

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../store';
import { setCurrentStep } from '../../store/invoiceSlice';

// Import all invoice templates
import InvoiceGeneratorForm from '../invoice-templates/invoice-generator/Invoice';
import InvoiceGeneratorPreview from '../invoice-templates/invoice-generator/InvoicePreview';

import PurchaseOrderForm from '../invoice-templates/purchase-order/Invoice';
import PurchaseOrderPreview from '../invoice-templates/purchase-order/InvoicePreview';

import QuotationForm from '../invoice-templates/quotation/Invoice';
import QuotationPreview from '../invoice-templates/quotation/InvoicePreview';

import GSTInvoiceForm from '../invoice-templates/gst-invoice/Invoice';
import GSTInvoicePreview from '../invoice-templates/gst-invoice/InvoicePreview';

import DeliveryChallanForm from '../invoice-templates/delivery-challan/Invoice';
import DeliveryChallanPreview from '../invoice-templates/delivery-challan/InvoicePreview';

import ProformaInvoiceForm from '../invoice-templates/proforma-invoice/Invoice';
import ProformaInvoicePreview from '../invoice-templates/proforma-invoice/InvoicePreview';

interface TemplateConfig {
    FormComponent: React.ComponentType;
    PreviewComponent: React.ComponentType;
    label: string;
}

const InvoiceApp = () => {
    const dispatch = useAppDispatch();
    const currentStep = useAppSelector((state) => state.invoice.currentStep);
    const { templateType } = useParams<{ templateType: string }>();

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Map template types to their components and labels
    const templateConfig: Record<string, TemplateConfig> = {
        'invoice-generator': {
            FormComponent: InvoiceGeneratorForm,
            PreviewComponent: InvoiceGeneratorPreview,
            label: 'Invoice'
        },
        'purchase-order': {
            FormComponent: PurchaseOrderForm,
            PreviewComponent: PurchaseOrderPreview,
            label: 'Purchase Order'
        },
        'quotation': {
            FormComponent: QuotationForm,
            PreviewComponent: QuotationPreview,
            label: 'Quotation'
        },
        'gst-invoice': {
            FormComponent: GSTInvoiceForm,
            PreviewComponent: GSTInvoicePreview,
            label: 'GST Invoice'
        },
        'delivery-challan': {
            FormComponent: DeliveryChallanForm,
            PreviewComponent: DeliveryChallanPreview,
            label: 'Delivery Challan'
        },
        'proforma-invoice': {
            FormComponent: ProformaInvoiceForm,
            PreviewComponent: ProformaInvoicePreview,
            label: 'Proforma Invoice'
        }
    };

    const config = templateConfig[templateType || 'invoice-generator'];
    const FormComponent = config?.FormComponent || InvoiceGeneratorForm;
    const PreviewComponent = config?.PreviewComponent || InvoiceGeneratorPreview;
    const documentLabel = config?.label || 'Invoice';

    const steps = [
        { number: 1, label: `Add ${documentLabel} Details`, optional: false },
        { number: 2, label: 'Design & Share', optional: true }
    ];

    const handleStepClick = (stepNumber: number) => {
        dispatch(setCurrentStep(stepNumber));
    };

    return (
        <div className='min-h-screen bg-white py-1 sm:py-2 md:py-4'>
            <div className="max-w-7xl mx-auto px-2 sm:px-3 md:px-4 lg:px-6">
                {/* Header Section */}
                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-purple-100 p-2 sm:p-3 md:p-4 lg:p-6 pb-4 sm:pb-6 md:pb-8 mb-2 sm:mb-3 md:mb-4">
                    <h1 className="text-base sm:text-lg md:text-2xl lg:text-3xl font-bold text-gray-700 mb-3 sm:mb-4 md:mb-6 text-center px-1 sm:px-2">
                        Create New {documentLabel}
                    </h1>

                    {/* Stepper - Desktop */}
                    <div className="hidden md:flex items-center justify-center gap-4">
                        {steps.map((step, index) => (
                            <div key={step.number} className="flex text-sm items-center gap-4">
                                <div
                                    className="flex items-center gap-3 cursor-pointer"
                                    onClick={() => handleStepClick(step.number)}
                                >
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${currentStep === step.number
                                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-300'
                                            : currentStep > step.number
                                                ? 'bg-purple-600 text-white cursor-pointer hover:shadow-lg'
                                                : 'bg-gray-200 text-gray-500'
                                            }`}
                                    >
                                        {step.number}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`text-base font-medium transition-colors ${currentStep === step.number
                                                ? 'text-purple-700'
                                                : 'text-gray-500'
                                                }`}
                                        >
                                            {step.label}
                                        </span>
                                        {step.optional && (
                                            <span className="text-sm text-gray-400">(optional)</span>
                                        )}
                                    </div>
                                </div>

                                {index < steps.length - 1 && (
                                    <ChevronRight className="text-gray-300" size={20} />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Stepper - Mobile & Tablet (Vertical) */}
                    <div className="md:hidden space-y-2 sm:space-y-3">
                        {steps.map((step, index) => (
                            <div key={step.number}>
                                <div
                                    className="flex items-center gap-2 sm:gap-3 cursor-pointer"
                                    onClick={() => handleStepClick(step.number)}
                                >
                                    <div
                                        className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-semibold text-xs sm:text-sm transition-all duration-300 flex-shrink-0 ${currentStep === step.number
                                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-300'
                                            : currentStep > step.number
                                                ? 'bg-purple-600 text-white cursor-pointer hover:shadow-lg'
                                                : 'bg-gray-200 text-gray-500'
                                            }`}
                                    >
                                        {step.number}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                                            <span
                                                className={`text-xs sm:text-sm md:text-base font-medium transition-colors ${currentStep === step.number
                                                    ? 'text-purple-700'
                                                    : 'text-gray-500'
                                                    }`}
                                            >
                                                {step.label}
                                            </span>
                                            {step.optional && (
                                                <span className="text-[10px] sm:text-xs text-gray-400">(optional)</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Vertical connector line */}
                                {index < steps.length - 1 && (
                                    <div className="ml-3 sm:ml-4 mt-1 sm:mt-2 mb-1 sm:mb-2">
                                        <div className="w-0.5 h-4 sm:h-6 bg-gray-300"></div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content based on current step */}
                <div className="overflow-x-hidden">
                    {currentStep === 1 ? <FormComponent /> : <PreviewComponent />}
                </div>
            </div>
        </div>
    );
};

export default InvoiceApp;