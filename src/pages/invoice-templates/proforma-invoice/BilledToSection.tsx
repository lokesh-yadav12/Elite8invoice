import { useState } from 'react';
import { ChevronDown, Edit2, Plus, X, ChevronUp } from 'lucide-react';
import { useAppDispatch } from '../../../store';
import { updateInvoiceData } from '../../../store/invoiceSlice';

interface Client {
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

interface BilledToSectionProps {
	selectedClient: string;
	setSelectedClient: (client: string) => void;
	clients: Client[];
	setClients: (clients: Client[]) => void;
	clientForm: {
		logo: string;
		businessName: string;
		industry: string;
		country: string;
		city: string;
		gstin: string;
		pan: string;
		clientType: string;
		taxTreatment: string;
		addressCountry: string;
		state: string;
		addressCity: string;
		postalCode: string;
		streetAddress: string;
		businessAlias: string;
		uniqueKey: string;
		email: string;
		showEmailInInvoice: boolean;
		phoneCode: string;
		phone: string;
		showPhoneInInvoice: boolean;
		defaultDueDays: string;
	};
	setClientForm: (form: any) => void;
}

export default function BilledToSection({
	selectedClient,
	setSelectedClient,
	clients,
	setClients,
	clientForm,
	setClientForm,
}: BilledToSectionProps) {
	const dispatch = useAppDispatch();
	const [showClientDropdown, setShowClientDropdown] = useState(false);
	const [showAddClientModal, setShowAddClientModal] = useState(false);
	const [isEditingClient, setIsEditingClient] = useState(false);
	const [editingClientId, setEditingClientId] = useState<number | null>(null);
	const [expandClientBasicInfo, setExpandClientBasicInfo] = useState(true);
	const [expandClientTaxInfo, setExpandClientTaxInfo] = useState(true);
	const [expandClientAddress, setExpandClientAddress] = useState(true);
	const [expandClientAdditionalDetails, setExpandClientAdditionalDetails] = useState(true);
	const [expandAccountDetails, setExpandAccountDetails] = useState(false);

	const handleClientLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => setClientForm({ ...clientForm, logo: e.target?.result });
			reader.readAsDataURL(file);
		}
	};

	const handleSaveClient = () => {
		if (clientForm.businessName.trim()) {
			if (isEditingClient && editingClientId) {
				const updatedClients = clients.map((client) => {
					if (client.id === editingClientId) {
						return {
							...client,
							...clientForm,
							name: clientForm.businessName,
							company: clientForm.businessAlias || '',
						};
					}
					return client;
				});
				setClients(updatedClients);
				setSelectedClient(clientForm.businessName);
			} else {
				const newClient = {
					id: Date.now(),
					name: clientForm.businessName,
					company: clientForm.businessAlias || '',
					...clientForm,
				};
				setClients([...clients, newClient]);
				setSelectedClient(clientForm.businessName);
			}

			// Save client to Redux for invoice preview
			dispatch(updateInvoiceData({
				selectedClient: clientForm.businessName,
				clients: isEditingClient && editingClientId
					? clients.map((client) => {
						if (client.id === editingClientId) {
							return {
								...client,
								...clientForm,
								name: clientForm.businessName,
								company: clientForm.businessAlias || '',
							};
						}
						return client;
					})
					: [...clients, {
						id: Date.now(),
						name: clientForm.businessName,
						company: clientForm.businessAlias || '',
						...clientForm,
					}],
			}));

			handleCloseClientModal();
		}
	};

	const handleEditClient = () => {
		const client = clients.find((c) => c.name === selectedClient);
		if (client) {
			setClientForm({
				logo: client.logo || '',
				businessName: client.name || '',
				industry: client.industry || '',
				country: client.country || 'India',
				city: client.city || '',
				gstin: client.gstin || '',
				pan: client.pan || '',
				clientType: client.clientType || 'individual',
				taxTreatment: client.taxTreatment || '',
				addressCountry: client.addressCountry || 'India',
				state: client.state || '',
				addressCity: client.addressCity || '',
				postalCode: client.postalCode || '',
				streetAddress: client.streetAddress || '',
				businessAlias: client.businessAlias || client.company || '',
				uniqueKey: client.uniqueKey || Math.floor(Math.random() * 10000000000000).toString(),
				email: client.email || '',
				showEmailInInvoice: client.showEmailInInvoice || false,
				phoneCode: client.phoneCode || '+91',
				phone: client.phone || '',
				showPhoneInInvoice: client.showPhoneInInvoice || false,
				defaultDueDays: client.defaultDueDays || '',
			});
			setIsEditingClient(true);
			setEditingClientId(client.id);
			setShowAddClientModal(true);
		}
	};

	const handleCloseClientModal = () => {
		setShowAddClientModal(false);
		setIsEditingClient(false);
		setEditingClientId(null);
		setClientForm({
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
	};

	return (
		<div className="space-y-4 px-2 sm:px-8">
			<div>
				<h2 className="text-xl font-bold text-gray-900 inline">Billed To</h2>
				<span className="text-gray-500 text-base ml-3">Client's Details</span>
				<div className="border-b-2 border-dotted border-gray-300 w-20"></div>
			</div>

			{/* Client Dropdown - COMMENTED OUT */}
			{/* <div className="relative text-sm">
				<button
					onClick={() => setShowClientDropdown(!showClientDropdown)}
					className="w-full flex items-center gap-3 rounded-lg bg-white p-2 border border-gray-300 hover:border-gray-400 transition-colors"
				>
					{selectedClient ? (
						<>
							<div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center text-white font-semibold">
								{selectedClient.charAt(0).toUpperCase()}
							</div>
							<span className="flex-1 text-left text-gray-900 font-medium text-sm">{selectedClient}</span>
						</>
					) : (
						<span className="flex-1 text-left text-gray-500 text-sm">Select a Client</span>
					)}
					<ChevronDown className="text-gray-400" size={16} />
				</button>

				{showClientDropdown && (
					<div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
						{clients.map((client) => (
							<button
								key={client.id}
								onClick={() => {
									setSelectedClient(client.name);
									setShowClientDropdown(false);
								}}
								className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
							>
								<div className="flex items-center gap-3">
									<div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center text-white font-semibold text-sm">
										{client.name.charAt(0).toUpperCase()}
									</div>
									<div>
										<div className="font-medium text-gray-900">{client.name}</div>
										<div className="text-sm text-gray-500">{client.company}</div>
									</div>
								</div>
							</button>
						))}
					</div>
				)}
			</div> */}

			{/* Add New Client Button */}
			<button
				onClick={() => setShowAddClientModal(true)}
				className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
			>
				<Plus size={16} />
				Add New Client
			</button>

			{/* Selected Client Details Card */}
			{selectedClient && (
				<div className="border border-gray-200 rounded-lg p-6 bg-white">
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-base font-semibold text-gray-900">Client details</h3>
						<button
							onClick={handleEditClient}
							className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
						>
							<Edit2 size={12} />
							<span className="font-medium text-sm">Edit</span>
						</button>
					</div>

					{(() => {
						const client = clients.find((c) => c.name === selectedClient);
						return client ? (
							<div className="space-y-3">
								<div className="flex text-sm">
									<span className="text-gray-600 w-32">Client Name</span>
									<span className="text-gray-900 font-medium">{client.name}</span>
								</div>
								{client.company && (
									<div className="flex text-sm">
										<span className="text-gray-600 w-32">Company</span>
										<span className="text-gray-900 font-medium">{client.company}</span>
									</div>
								)}
								{client.email && (
									<div className="flex text-sm">
										<span className="text-gray-600 w-32">Email</span>
										<span className="text-gray-900 font-medium">{client.email}</span>
									</div>
								)}
								{client.phone && (
									<div className="flex text-sm">
										<span className="text-gray-600 w-32">Phone</span>
										<span className="text-gray-900 font-medium">
											{client.phoneCode} {client.phone}
										</span>
									</div>
								)}
								<div className="flex text-sm">
									<span className="text-gray-600 w-32">Address</span>
									<span className="text-gray-900 font-medium">
										{[
											client.streetAddress,
											client.addressCity,
											client.state,
											client.addressCountry,
											client.postalCode,
										]
											.filter(Boolean)
											.join(', ') || client.addressCountry}
									</span>
								</div>
								{client.gstin && (
									<div className="flex text-sm">
										<span className="text-gray-600 w-32">GSTIN</span>
										<span className="text-gray-900 font-medium">{client.gstin}</span>
									</div>
								)}
								{client.pan && (
									<div className="flex text-sm">
										<span className="text-gray-600 w-32">PAN</span>
										<span className="text-gray-900 font-medium">{client.pan}</span>
									</div>
								)}
							</div>
						) : null;
					})()}
				</div>
			)}

			{/* Add New Client Modal */}
			{showAddClientModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
						{/* Header */}
						<div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
							<h2 className="text-xl font-semibold text-gray-900">
								{isEditingClient ? 'Edit Client' : 'Add New Client'}
							</h2>
							<button onClick={handleCloseClientModal} className="text-gray-400 hover:text-gray-600">
								<X size={24} />
							</button>
						</div>

						{/* Form Content */}
						<div className="p-6 space-y-6">
							{/* Basic Information */}
							<div>
								<button
									onClick={() => setExpandClientBasicInfo(!expandClientBasicInfo)}
									className="w-full flex items-center justify-between mb-4"
								>
									<h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
									{expandClientBasicInfo ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
								</button>

								{expandClientBasicInfo && (
									<div className="space-y-4">
										{/* Upload Logo */}
										<div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
											<input
												type="file"
												id="client-logo-upload"
												accept="image/png,image/jpeg"
												onChange={handleClientLogoUpload}
												className="hidden"
											/>
											<label htmlFor="client-logo-upload" className="cursor-pointer">
												{clientForm.logo ? (
													<img
														src={clientForm.logo}
														alt="Client Logo"
														className="max-h-32 mx-auto"
													/>
												) : (
													<div>
														<Plus className="mx-auto text-gray-400 mb-2" size={40} />
														<p className="text-gray-700 font-medium mb-1">Upload Logo</p>
														<p className="text-sm text-gray-500">
															JPG or PNG, Dimensions 1080×1080px and file size up to 20MB
														</p>
													</div>
												)}
											</label>
										</div>

										{/* Business Name and Client Industry */}
										<div className="grid grid-cols-2 gap-4">
											<div>
												<label className="block text-gray-900 font-medium mb-2">
													Client Name<span className="text-red-500">*</span>
												</label>
												<input
													type="text"
													placeholder="Client Name (Required)"
													value={clientForm.businessName}
													onChange={(e) =>
														setClientForm({ ...clientForm, businessName: e.target.value })
													}
													className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-purple-500 transition-colors"
												/>
											</div>

											<div>
												<label className="block text-gray-900 font-medium mb-2">
													Client Industry
												</label>
												<div className="relative">
													<select
														value={clientForm.industry}
														onChange={(e) =>
															setClientForm({ ...clientForm, industry: e.target.value })
														}
														className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-purple-500 transition-colors appearance-none bg-white text-gray-500"
													>
														<option value="">-Select an Industry-</option>
														<option>Technology</option>
														<option>Healthcare</option>
														<option>Finance</option>
													</select>
													<ChevronDown
														className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
														size={20}
													/>
												</div>
											</div>
										</div>

										{/* Country and City/Town */}
										<div className="grid grid-cols-2 gap-4">
											<div>
												<label className="block text-gray-900 font-medium mb-2">
													Select Country<span className="text-red-500">*</span>
												</label>
												<div className="relative">
													<select
														value={clientForm.country}
														onChange={(e) =>
															setClientForm({ ...clientForm, country: e.target.value })
														}
														className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-purple-500 transition-colors appearance-none bg-white"
													>
														<option>India</option>
														<option>USA</option>
														<option>UK</option>
													</select>
													<ChevronDown
														className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
														size={20}
													/>
												</div>
											</div>

											<div>
												<label className="block text-gray-900 font-medium mb-2">
													City/Town
												</label>
												<input
													type="text"
													placeholder="City/Town Name"
													value={clientForm.city}
													onChange={(e) =>
														setClientForm({ ...clientForm, city: e.target.value })
													}
													className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-purple-500 transition-colors"
												/>
											</div>
										</div>
									</div>
								)}
							</div>

							{/* Tax Information */}
							<div>
								<button
									onClick={() => setExpandClientTaxInfo(!expandClientTaxInfo)}
									className="w-full flex items-center justify-between mb-4"
								>
									<div className="flex items-center gap-2">
										<h3 className="text-lg font-semibold text-gray-900">Tax Information</h3>
										<span className="text-gray-500 text-sm">(optional)</span>
									</div>
									{expandClientTaxInfo ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
								</button>

								{expandClientTaxInfo && (
									<div className="space-y-4">
										<div className="grid grid-cols-2 gap-4">
											<div>
												<label className="block text-gray-900 font-medium mb-2">
													Business GSTIN
												</label>
												<input
													type="text"
													placeholder="Business GSTIN (Optional)"
													value={clientForm.gstin}
													onChange={(e) =>
														setClientForm({ ...clientForm, gstin: e.target.value })
													}
													className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-purple-500 transition-colors"
												/>
											</div>

											<div>
												<label className="block text-gray-900 font-medium mb-2">
													Business PAN Number
												</label>
												<input
													type="text"
													placeholder="Business PAN Number (Optional)"
													value={clientForm.pan}
													onChange={(e) =>
														setClientForm({ ...clientForm, pan: e.target.value })
													}
													className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-purple-500 transition-colors"
												/>
											</div>
										</div>

										{/* <button className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors">
											<span className="font-medium">Check GST Type</span>
											<span>🎓</span>
										</button> */}

										{/* Client Type */}
										<div>
											<div className="flex items-center gap-2 mb-3">
												<label className="text-gray-900 font-medium">Client Type</label>
												<div className="w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center text-xs text-gray-500">
													?
												</div>
											</div>
											<div className="flex gap-6">
												<label className="flex items-center gap-2 cursor-pointer">
													<input
														type="radio"
														name="clientType"
														value="individual"
														checked={clientForm.clientType === 'individual'}
														onChange={(e) =>
															setClientForm({ ...clientForm, clientType: e.target.value })
														}
														className="w-5 h-5 text-purple-600"
													/>
													<span className="text-gray-900">Individual</span>
												</label>
												<label className="flex items-center gap-2 cursor-pointer">
													<input
														type="radio"
														name="clientType"
														value="company"
														checked={clientForm.clientType === 'company'}
														onChange={(e) =>
															setClientForm({ ...clientForm, clientType: e.target.value })
														}
														className="w-5 h-5 text-purple-600"
													/>
													<span className="text-gray-900">Company</span>
												</label>
											</div>
										</div>

										{/* Tax Treatment */}
										<div>
											<div className="flex items-center gap-2 mb-2">
												<label className="text-gray-900 font-medium">Tax Treatment</label>
												<div className="w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center text-xs text-gray-500">
													?
												</div>
											</div>
											<div className="relative">
												<select
													value={clientForm.taxTreatment}
													onChange={(e) =>
														setClientForm({ ...clientForm, taxTreatment: e.target.value })
													}
													className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-purple-500 transition-colors appearance-none bg-white text-gray-500"
												>
													<option value="">Select Tax Treatment</option>
													<option>GST Registered</option>
													<option>Non-GST</option>
												</select>
												<ChevronDown
													className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
													size={20}
												/>
											</div>
										</div>
									</div>
								)}
							</div>

							{/* Address */}
							<div>
								<button
									onClick={() => setExpandClientAddress(!expandClientAddress)}
									className="w-full flex items-center justify-between mb-4"
								>
									<div className="flex items-center gap-2">
										<h3 className="text-lg font-semibold text-gray-900">Address</h3>
										<span className="text-gray-500 text-sm">(optional)</span>
									</div>
									{expandClientAddress ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
								</button>

								{expandClientAddress && (
									<div className="space-y-4">
										<div className="grid grid-cols-2 gap-4">
											<div>
												<label className="block text-gray-900 font-medium mb-2">
													Select Country
												</label>
												<div className="relative">
													<select
														value={clientForm.addressCountry}
														onChange={(e) =>
															setClientForm({
																...clientForm,
																addressCountry: e.target.value,
															})
														}
														className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-purple-500 transition-colors appearance-none bg-white"
													>
														<option>India</option>
														<option>USA</option>
														<option>UK</option>
													</select>
													<ChevronDown
														className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
														size={20}
													/>
												</div>
											</div>

											<div>
												<label className="block text-gray-900 font-medium mb-2">
													State / Province
												</label>
												<div className="relative">
													<select
														value={clientForm.state}
														onChange={(e) =>
															setClientForm({ ...clientForm, state: e.target.value })
														}
														className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-purple-500 transition-colors appearance-none bg-white text-gray-500"
													>
														<option value="">Select State / Province</option>
														<option>Andhra Pradesh</option>
														<option>Arunachal Pradesh</option>
														<option>Assam</option>
														<option>Bihar</option>
														<option>Chhattisgarh</option>
														<option>Goa</option>
														<option>Gujarat</option>
														<option>Haryana</option>
														<option>Himachal Pradesh</option>
														<option>Jharkhand</option>
														<option>Karnataka</option>
														<option>Kerala</option>
														<option>Madhya Pradesh</option>
														<option>Maharashtra</option>
														<option>Manipur</option>
														<option>Meghalaya</option>
														<option>Mizoram</option>
														<option>Nagaland</option>
														<option>Odisha</option>
														<option>Punjab</option>
														<option>Rajasthan</option>
														<option>Sikkim</option>
														<option>Tamil Nadu</option>
														<option>Telangana</option>
														<option>Tripura</option>
														<option>Uttar Pradesh</option>
														<option>Uttarakhand</option>
														<option>West Bengal</option>
														<option>Andaman and Nicobar Islands</option>
														<option>Chandigarh</option>
														<option>Dadra and Nagar Haveli and Daman and Diu</option>
														<option>Delhi</option>
														<option>Jammu and Kashmir</option>
														<option>Ladakh</option>
														<option>Lakshadweep</option>
														<option>Puducherry</option>
													</select>
													<ChevronDown
														className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
														size={20}
													/>
												</div>
											</div>
										</div>

										<div className="grid grid-cols-2 gap-4">
											<div>
												<label className="block text-gray-900 font-medium mb-2">
													City/Town
												</label>
												<input
													type="text"
													placeholder="City/Town Name"
													value={clientForm.addressCity}
													onChange={(e) =>
														setClientForm({ ...clientForm, addressCity: e.target.value })
													}
													className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-purple-500 transition-colors"
												/>
											</div>

											<div>
												<label className="block text-gray-900 font-medium mb-2">
													Postal Code / Zip Code
												</label>
												<input
													type="text"
													placeholder="Postal Code / Zip Code"
													value={clientForm.postalCode}
													onChange={(e) =>
														setClientForm({ ...clientForm, postalCode: e.target.value })
													}
													className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-purple-500 transition-colors"
												/>
											</div>
										</div>

										<div>
											<label className="block text-gray-900 font-medium mb-2">
												Street Address
											</label>
											<input
												type="text"
												placeholder="Street Address"
												value={clientForm.streetAddress}
												onChange={(e) =>
													setClientForm({ ...clientForm, streetAddress: e.target.value })
												}
												className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-purple-500 transition-colors"
											/>
										</div>
									</div>
								)}
							</div>

							{/* Additional Details */}
							<div>
								<button
									onClick={() => setExpandClientAdditionalDetails(!expandClientAdditionalDetails)}
									className="w-full flex items-center justify-between mb-4"
								>
									<div className="flex items-center gap-2">
										<h3 className="text-lg font-semibold text-gray-900">Additional Details</h3>
										<span className="text-gray-500 text-sm">(optional)</span>
									</div>
									{expandClientAdditionalDetails ? (
										<ChevronUp size={20} />
									) : (
										<ChevronDown size={20} />
									)}
								</button>

								{expandClientAdditionalDetails && (
									<div className="space-y-4">
										<div className="grid grid-cols-2 gap-4">
											<div>
												<label className="block text-gray-900 font-medium mb-2">
													Business Alias (Nick Name)
												</label>
												<input
													type="text"
													placeholder="Business Alias"
													value={clientForm.businessAlias}
													onChange={(e) =>
														setClientForm({ ...clientForm, businessAlias: e.target.value })
													}
													className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-purple-500 transition-colors"
												/>
											</div>

											<div>
												<label className="block text-gray-900 font-medium mb-2">
													Unique Key
												</label>
												<input
													type="text"
													value={clientForm.uniqueKey}
													readOnly
													className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
												/>
											</div>
										</div>

										<div className="grid grid-cols-2 gap-4">
											<div>
												<label className="block text-gray-900 font-medium mb-2">Email</label>
												<p className="text-sm text-gray-500 mb-2">
													Add to directly email documents from Refrens
												</p>
												<input
													type="email"
													placeholder="Email"
													value={clientForm.email}
													onChange={(e) =>
														setClientForm({ ...clientForm, email: e.target.value })
													}
													className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-purple-500 transition-colors"
												/>
												<div className="flex items-center gap-2 mt-2">
													<input
														type="checkbox"
														id="show-email"
														checked={clientForm.showEmailInInvoice}
														onChange={(e) =>
															setClientForm({
																...clientForm,
																showEmailInInvoice: e.target.checked,
															})
														}
														className="w-4 h-4 text-purple-600 rounded border-gray-300"
													/>
													<label htmlFor="show-email" className="text-gray-700 text-sm">
														Show Email in Invoice
													</label>
												</div>
											</div>

											<div>
												<label className="block text-gray-900 font-medium mb-2">
													Phone No.
												</label>
												<p className="text-sm text-gray-500 mb-2">
													Add to directly WhatsApp documents from Refrens
												</p>
												<div className="flex gap-2">
													<div className="flex items-center gap-2 px-3 py-3 border border-gray-300 rounded-lg bg-white w-24">
														<span className="text-xl">🇮🇳</span>
														<span className="text-gray-900">+91</span>
													</div>
													<input
														type="tel"
														placeholder="+91"
														value={clientForm.phone}
														onChange={(e) =>
															setClientForm({ ...clientForm, phone: e.target.value })
														}
														className="flex-1 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-purple-500 transition-colors"
													/>
												</div>
												<div className="flex items-center gap-2 mt-2">
													<input
														type="checkbox"
														id="show-phone"
														checked={clientForm.showPhoneInInvoice}
														onChange={(e) =>
															setClientForm({
																...clientForm,
																showPhoneInInvoice: e.target.checked,
															})
														}
														className="w-4 h-4 text-purple-600 rounded border-gray-300"
													/>
													<label htmlFor="show-phone" className="text-gray-700 text-sm">
														Show Phone in Invoice
													</label>
												</div>
											</div>
										</div>

										{/* <div>
											<label className="block text-gray-900 font-medium mb-2">
												Default Due Date (Days)
											</label>
											<p className="text-sm text-gray-500 mb-2">
												Documents for this client/vendor will default to this due date unless
												manually changed
											</p>
											<input
												type="text"
												placeholder="e.g., 30"
												value={clientForm.defaultDueDays}
												onChange={(e) =>
													setClientForm({ ...clientForm, defaultDueDays: e.target.value })
												}
												className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-purple-500 transition-colors"
											/>
										</div> */}
										{/* 
										<button className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors">
											<Plus size={20} />
											<span className="font-medium">Add Custom Fields</span>
										</button> */}
									</div>
								)}
							</div>

							{/* Account Details */}
							<div>
								<button
									onClick={() => setExpandAccountDetails(!expandAccountDetails)}
									className="w-full flex items-center justify-between mb-4"
								>
									<div className="flex items-center gap-2">
										<h3 className="text-lg font-semibold text-gray-900">Account Details</h3>
										<span className="text-gray-500 text-sm">(optional)</span>
									</div>
									{expandAccountDetails ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
								</button>
							</div>
						</div>

						{/* Footer */}
						<div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
							<button
								onClick={handleSaveClient}
								className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
							>
								Save
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
