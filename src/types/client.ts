export interface Client {
  id: number;
  name: string;
  company: string;
  logo?: string;
  businessName?: string;
  industry?: string;
  country?: string;
  city?: string;
  gstin?: string;
  pan?: string;
  clientType?: string;
  taxTreatment?: string;
  addressCountry?: string;
  state?: string;
  addressCity?: string;
  postalCode?: string;
  streetAddress?: string;
  businessAlias?: string;
  uniqueKey?: string;
  email?: string;
  showEmailInInvoice?: boolean;
  phoneCode?: string;
  phone?: string;
  showPhoneInInvoice?: boolean;
  defaultDueDays?: string;
}
