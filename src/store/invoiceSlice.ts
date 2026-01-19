import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InvoiceData {
  // Title Section
  title: string;
  subtitle: string;
  
  // Invoice Details
  invoiceNo: string;
  invoiceDate: string;
  dueDate: string;
  logo: string | null;
  customFields: Array<{
    id: number;
    label: string;
    value: string;
    isDefault: boolean;
  }>;
  
  // Business Details
  businessDetails: {
    vendorName: string;
    country: string;
    city: string;
    gstin: string;
    pan: string;
    addressCountry: string;
    state: string;
    addressCity: string;
    postalCode: string;
    streetAddress: string;
  };
  
  // Client Details
  selectedClient: string;
  clients: Array<{
    id: number;
    name: string;
    company: string;
    logo?: string | null;
    businessName?: string;
    industry?: string;
    country?: string;
    city?: string;
    gstin?: string;
    pan?: string;
    email?: string;
    phone?: string;
    phoneCode?: string;
    addressCountry?: string;
    state?: string;
    addressCity?: string;
    postalCode?: string;
    streetAddress?: string;
  }>;
  
  // Items
  items: Array<{
    id: number;
    name: string;
    hsn: string;
    gstRate: number;
    quantity: number;
    rate: number;
    amount: number;
    cgst: number;
    sgst: number;
    total: number;
    unit: string;
    description: string;
    image: string | null;
    groupId: number | null;
    customFields?: { [key: string]: any }; // Store custom column values
  }>;
  
  groups: Array<{
    id: number;
    name: string;
    isCollapsed: boolean;
  }>;
  
  // Totals
  totals: {
    amount: number;
    sgst: number;
    cgst: number;
    discountType: string;
    totalDiscount: number;
    totalDiscountType: string;
    additionalCharges: Array<{
      id: number;
      name: string;
      amount: number;
      type: string;
    }>;
    customFields: Array<{
      id: number;
      label: string;
      value: string;
      setAsDefault: boolean;
    }>;
    totalInWordsLabel: string;
    totalInWordsValue: string;
  };
  
  // Document Actions
  signature: {
    image: string | null;
    label: string;
  };
  terms: Array<{
    id: number;
    text: string;
  }>;
  notes: string;
  attachments: Array<{
    id: number;
    name: string;
    size: number;
    url?: string; // Data URL or file URL for opening
  }>;
  contactDetails: {
    email: string;
    phone: string;
    phoneCode: string;
  };
  additionalInfo: Array<{
    id: number;
    label: string;
    value: string;
  }>;
  
  // Advanced Options
  advancedOptions: {
    hsnColumnView: string;
    displayUnit: string;
    taxSummary: string;
    hidePlaceCountry: boolean;
    showHsnSummary: boolean;
    addOriginalImages: boolean;
    showThumbnails: boolean;
    showDescriptionFull: boolean;
    hideSubtotalGroup: boolean;
    showSku: boolean;
  };
  
  // Column Configuration
  columnConfiguration: Array<{
    id: number;
    name: string;
    type: string;
    editable: boolean;
    deletable: boolean;
    formula?: string;
    visible: boolean;
  }>;
  
  // GST Configuration
  gstConfiguration: {
    taxType: string;
    placeOfSupply: string;
    gstType: string; // 'IGST' or 'CGST & SGST'
    isReverseCharge: boolean;
  };
  
  // Currency Configuration
  currency: {
    code: string;
    symbol: string;
    name: string;
  };
  
  // Shipping Details
  addShippingDetails: boolean;
  shippingDetails: {
    shippedFrom: {
      warehouse: string;
      businessName: string;
      country: string;
      address: string;
      city: string;
      postalCode: string;
      state: string;
    };
    shippedTo: {
      clientBusinessName: string;
      country: string;
      address: string;
      city: string;
      postalCode: string;
      state: string;
    };
  };
  
  // Transport Details
  transportDetails: {
    transportMode: string;
    distance: string;
    challanNumber: string;
    challanDate: string;
    vehicleType: string;
    vehicleNumber: string;
  };
  
  // Status
  status: 'draft' | 'completed' | null;
  currentStep: number;
  
  // Proposal Templates Data
  proposalData?: any;
  agreementData?: any;
}

const initialState: InvoiceData = {
  title: 'Invoice',
  subtitle: '',
  invoiceNo: '',
  invoiceDate: '',
  dueDate: '',
  logo: null,
  customFields: [],
  businessDetails: {
    vendorName: 'Your Business Name',
    country: 'India',
    city: '',
    gstin: '',
    pan: '',
    addressCountry: 'India',
    state: '',
    addressCity: '',
    postalCode: '',
    streetAddress: '',
  },
  selectedClient: '',
  clients: [
    { id: 1, name: 'Client name', company: 'Company A' },
  
  ],
  items: [
    {
      id: 1,
      name: '',
      hsn: '',
      gstRate: 0,
      quantity: 1,
      rate: 1,
      amount: 1.0,
      cgst: 0.0,
      sgst: 0.0,
      total: 1.0,
      unit: 'Product',
      description: '',
      image: null,
      groupId: null,
      customFields: {},
    },
  ],
  groups: [],
  totals: {
    amount: 1.0,
    sgst: 0.0,
    cgst: 0.0,
    discountType: '',
    totalDiscount: 0,
    totalDiscountType: 'percentage',
    additionalCharges: [],
    customFields: [],
    totalInWordsLabel: 'Total (in words)',
    totalInWordsValue: 'One Rupee Only',
  },
  signature: {
    image: null,
    label: 'Authorised Signatory',
  },
  terms: [
    {
      id: 1,
      text: 'Please pay within 15 days from the date of invoice, overdue interest @ 14% will be charged on delayed payments.',
    },
    { id: 2, text: 'Please quote invoice number when remitting funds.' },
  ],
  notes: '',
  attachments: [],
  contactDetails: {
    email: '',
    phone: '',
    phoneCode: '+91',
  },
  additionalInfo: [],
  advancedOptions: {
    hsnColumnView: 'Default',
    displayUnit: 'Merge with quantity',
    taxSummary: 'Do not show',
    hidePlaceCountry: false,
    showHsnSummary: false,
    addOriginalImages: false,
    showThumbnails: false,
    showDescriptionFull: false,
    hideSubtotalGroup: false,
    showSku: false,
  },
  columnConfiguration: [
    { id: 1, name: 'Item', type: 'TEXT', editable: true, deletable: false, visible: true },
    { id: 2, name: 'HSN/SAC', type: 'NUMBER', editable: true, deletable: false, visible: true },
    { id: 3, name: 'GST Rate', type: 'NUMBER', editable: true, deletable: false, visible: true },
    { id: 4, name: 'Quantity', type: 'NUMBER', editable: true, deletable: false, visible: true },
    { id: 5, name: 'Rate', type: 'CURRENCY', editable: true, deletable: false, visible: true },
    { id: 6, name: 'Amount', type: 'FORMULA', formula: '(Quantity * Rate)', editable: false, deletable: false, visible: true },
    { id: 7, name: 'CGST', type: 'FORMULA', formula: '(Amount * GST) / 200', editable: false, deletable: false, visible: true },
    { id: 8, name: 'SGST', type: 'FORMULA', formula: '(Amount * GST) / 200', editable: false, deletable: false, visible: true },
    { id: 9, name: 'Total', type: 'FORMULA', formula: '(Amount + CGST + SGST)', editable: false, deletable: false, visible: true }
  ],
  gstConfiguration: {
    taxType: 'GST (India)',
    placeOfSupply: 'Andhra Pradesh',
    gstType: 'CGST & SGST',
    isReverseCharge: false,
  },
  currency: {
    code: 'INR',
    symbol: '₹',
    name: 'Indian Rupee',
  },
  addShippingDetails: false,
  shippingDetails: {
    shippedFrom: {
      warehouse: '',
      businessName: '',
      country: '',
      address: '',
      city: '',
      postalCode: '',
      state: '',
    },
    shippedTo: {
      clientBusinessName: '',
      country: '',
      address: '',
      city: '',
      postalCode: '',
      state: '',
    },
  },
  transportDetails: {
    transportMode: '',
    distance: '',
    challanNumber: '',
    challanDate: '',
    vehicleType: '',
    vehicleNumber: '',
  },
  status: null,
  currentStep: 1,
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    updateInvoiceData: (state, action: PayloadAction<Partial<InvoiceData>>) => {
      return { ...state, ...action.payload };
    },
    saveAsDraft: (state) => {
      state.status = 'draft';
    },
    completeInvoice: (state) => {
      state.status = 'completed';
      state.currentStep = 2;
    },
    resetInvoice: () => initialState,
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
  },
});

export const { updateInvoiceData, saveAsDraft, completeInvoice, resetInvoice, setCurrentStep } =
  invoiceSlice.actions;

export default invoiceSlice.reducer;
