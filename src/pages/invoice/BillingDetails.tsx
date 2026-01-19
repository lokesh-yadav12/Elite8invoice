import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { updateInvoiceData } from '../../store/invoiceSlice';

interface BillingDetailsSectionProps {
	BilledBySection: React.ComponentType<any>;
	BilledToSection: React.ComponentType<any>;
}

export default function BillingDetails({ BilledBySection, BilledToSection }: BillingDetailsSectionProps) {
	const dispatch = useAppDispatch();
	const invoiceData = useAppSelector((state) => state.invoice);

	const [selectedClient, setSelectedClient] = useState(invoiceData.selectedClient);
	const [selectedBusiness, setSelectedBusiness] = useState(invoiceData.businessDetails.vendorName);

	// Business form state - this is the source of truth
	const [businessForm, setBusinessForm] = useState(invoiceData.businessDetails);

	const [clientForm, setClientForm] = useState({
		logo: null,
		businessName: '',
		industry: '',
		country: 'India',
		city: '',
		gstin: '',
		pan: '',
		clientType: 'individual',
		taxTreatment: '',
		addressCountry: 'India',
		state: '',
		addressCity: '',
		postalCode: '',
		streetAddress: '',
		businessAlias: '',
		uniqueKey: Math.floor(Math.random() * 10000000000000).toString(),
		email: '',
		showEmailInInvoice: false,
		phoneCode: '+91',
		phone: '',
		showPhoneInInvoice: false,
		defaultDueDays: '',
	});

	const [businesses, setBusinesses] = useState([{ id: 1, name: invoiceData.businessDetails.vendorName, company: 'Lokesh Business' }]);

	const [clients, setClients] = useState(invoiceData.clients);

	// Save to Redux whenever data changes
	useEffect(() => {
		dispatch(updateInvoiceData({
			businessDetails: businessForm,
			selectedClient,
			clients,
		}));
	}, [businessForm, selectedClient, clients, dispatch]);

	return (
		<div className="p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 max-w-7xl mx-auto">

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-1 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-16 2xl:gap-44">
				{/* Billed By Section */}
				<BilledBySection
					selectedBusiness={selectedBusiness}
					setSelectedBusiness={setSelectedBusiness}
					businesses={businesses}
					setBusinesses={setBusinesses}
					businessForm={businessForm}
					setBusinessForm={setBusinessForm}
				/>

				{/* Billed To Section */}
				<BilledToSection
					selectedClient={selectedClient}
					setSelectedClient={setSelectedClient}
					clients={clients}
					setClients={setClients}
					clientForm={clientForm}
					setClientForm={setClientForm}
				/>
			</div>
		</div>
	);
}
