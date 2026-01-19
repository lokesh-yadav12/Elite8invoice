import { useState, useEffect } from 'react';
import { ChevronDown, Edit2, Plus, X, ChevronUp } from 'lucide-react';
import ShippingDetails from '../../invoice/ShippingDetails';
import TransportDetails from '../../invoice/TransportDetails';
import { useAppDispatch, useAppSelector } from '../../../store';
import { updateInvoiceData } from '../../../store/invoiceSlice';

interface Business {
	id: number;
	name: string;
	company: string;
	country?: string;
	city?: string;
	gstin?: string;
	pan?: string;
	addressCountry?: string;
	state?: string;
	addressCity?: string;
	postalCode?: string;
	streetAddress?: string;
	updatePrevious?: boolean;
	updateFuture?: boolean;
}

interface BilledBySectionProps {
	selectedBusiness: string;
	setSelectedBusiness: (business: string) => void;
	businesses: Business[];
	setBusinesses: (businesses: Business[]) => void;
	businessForm: {
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
		updatePrevious: boolean;
		updateFuture: boolean;
	};
	setBusinessForm: (form: any) => void;
}

export default function BilledBySection({
	selectedBusiness,
	setSelectedBusiness,
	businesses,
	setBusinesses,
	businessForm,
	setBusinessForm,
}: BilledBySectionProps) {
	const dispatch = useAppDispatch();
	const invoiceData = useAppSelector((state) => state.invoice);

	const [showBusinessDropdown, setShowBusinessDropdown] = useState(false);
	const [addShippingDetails, setAddShippingDetails] = useState(invoiceData.addShippingDetails);
	const [showBusinessEditModal, setShowBusinessEditModal] = useState(false);
	const [expandBasicInfo, setExpandBasicInfo] = useState(true);
	const [expandTaxInfo, setExpandTaxInfo] = useState(true);
	const [expandAddress, setExpandAddress] = useState(true);
	const [expandAdditionalDetails, setExpandAdditionalDetails] = useState(false);

	// Save addShippingDetails to Redux
	useEffect(() => {
		dispatch(updateInvoiceData({
			addShippingDetails: addShippingDetails,
		}));
	}, [addShippingDetails, dispatch]);

	const handleSaveBusinessDetails = () => {
		// Update or add business
		if (businessForm.vendorName.trim()) {
			const existingBusinessIndex = businesses.findIndex(b => b.name === selectedBusiness);

			if (existingBusinessIndex >= 0) {
				// Update existing business
				const updatedBusinesses = [...businesses];
				updatedBusinesses[existingBusinessIndex] = {
					...updatedBusinesses[existingBusinessIndex],
					name: businessForm.vendorName,
					company: businessForm.vendorName,
					...businessForm,
				};
				setBusinesses(updatedBusinesses);
				setSelectedBusiness(businessForm.vendorName);
			} else {
				// Add new business
				const newBusiness: Business = {
					id: Date.now(),
					name: businessForm.vendorName,
					company: businessForm.vendorName,
					...businessForm,
				};
				setBusinesses([...businesses, newBusiness]);
				setSelectedBusiness(businessForm.vendorName);
			}

			// Save business details to Redux for invoice preview
			dispatch(updateInvoiceData({
				businessDetails: {
					vendorName: businessForm.vendorName,
					country: businessForm.country,
					city: businessForm.city,
					gstin: businessForm.gstin,
					pan: businessForm.pan,
					addressCountry: businessForm.addressCountry,
					state: businessForm.state,
					addressCity: businessForm.addressCity,
					postalCode: businessForm.postalCode,
					streetAddress: businessForm.streetAddress,
				},
			}));
		}
		setShowBusinessEditModal(false);
	};

	const handleEditBusiness = () => {
		const business = businesses.find((b) => b.name === selectedBusiness);
		if (business) {
			setBusinessForm({
				vendorName: business.name || '',
				country: business.country || 'India',
				city: business.city || '',
				gstin: business.gstin || '',
				pan: business.pan || '',
				addressCountry: business.addressCountry || 'India',
				state: business.state || '',
				addressCity: business.addressCity || '',
				postalCode: business.postalCode || '',
				streetAddress: business.streetAddress || '',
				updatePrevious: business.updatePrevious || false,
				updateFuture: business.updateFuture || true,
			});
			setShowBusinessEditModal(true);
		}
	};

	return (
		<div className="space-y-4 px-2 sm:px-8">
			<div>
				<h2 className="text-xl font-bold text-gray-900 inline">Billed By</h2>
				<span className="text-gray-500 text-base ml-3">Your Details</span>
				<div className="border-b-2 border-dotted border-gray-300 w-20"></div>
			</div>

			{/* Business Dropdown - COMMENTED OUT */}
			{/* <div className="relative text-sm">
				<button
					onClick={() => setShowBusinessDropdown(!showBusinessDropdown)}
					className="w-full flex items-center gap-3 rounded-lg bg-white sm:p-2 border border-gray-300 hover:border-gray-400 transition-colors"
				>
					{selectedBusiness ? (
						<>
							<div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center text-white font-semibold">
								{selectedBusiness.charAt(0).toUpperCase()}
							</div>
							<span className="flex-1 text-left text-gray-900 font-medium text-sm">
								{selectedBusiness}
							</span>
						</>
					) : (
						<span className="flex-1 text-left text-gray-500 text-sm">Select a Business</span>
					)}
					<ChevronDown className="text-gray-400" size={16} />
				</button>

				{showBusinessDropdown && (
					<div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
						{businesses.map((business) => (
							<button
								key={business.id}
								onClick={() => {
									setSelectedBusiness(business.name);
									setShowBusinessDropdown(false);
								}}
								className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
							>
								<div className="flex items-center gap-3">
									<div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center text-white font-semibold text-sm">
										{business.name.charAt(0).toUpperCase()}
									</div>
									<div>
										<div className="font-medium text-gray-900">{business.name}</div>
										<div className="text-sm text-gray-500">{business.company}</div>
									</div>
								</div>
							</button>
						))}
					</div>
				)}
			</div> */}

			{/* Add New Business Button */}
			<button
				onClick={() => setShowBusinessEditModal(true)}
				className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
			>
				<Plus size={16} />
				Add New Business
			</button>

			{/* Business Details Card */}
			{selectedBusiness && (
				<div className="border border-gray-200 rounded-lg p-6 bg-white">
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-base font-semibold text-gray-900">Business details</h3>
						<button
							onClick={handleEditBusiness}
							className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
						>
							<Edit2 size={12} />
							<span className="font-medium text-sm">Edit</span>
						</button>
					</div>

					<div className="space-y-3">
						<div className="flex text-sm">
							<span className="text-gray-600 w-32">Business Name</span>
							<span className="text-gray-900 font-medium">{businessForm.vendorName || selectedBusiness}</span>
						</div>
						<div className="flex text-sm">
							<span className="text-gray-600 w-32">Address</span>
							<span className="text-gray-900 font-medium">
								{[
									businessForm.streetAddress,
									businessForm.addressCity,
									businessForm.state,
									businessForm.country,
									businessForm.postalCode,
								]
									.filter(Boolean)
									.join(', ') || businessForm.country}
							</span>
						</div>
						{businessForm.gstin && (
							<div className="flex text-sm">
								<span className="text-gray-600 w-32">GSTIN</span>
								<span className="text-gray-900 font-medium">{businessForm.gstin}</span>
							</div>
						)}
						{businessForm.pan && (
							<div className="flex text-sm">
								<span className="text-gray-600 w-32">PAN</span>
								<span className="text-gray-900 font-medium">{businessForm.pan}</span>
							</div>
						)}
					</div>
				</div>
			)}

			{/* Add Shipping Details */}
			<div className="flex items-center gap-3 pt-2 pb-4">
				<input
					type="checkbox"
					id="shipping-details"
					checked={addShippingDetails}
					onChange={(e) => setAddShippingDetails(e.target.checked)}
					className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
				/>
				<label htmlFor="shipping-details" className="text-gray-900 font-medium text-sm">
					Add Shipping Details
				</label>
			</div>

			{addShippingDetails && (
				<div className="space-y-4">
					<ShippingDetails />
					<TransportDetails />
				</div>
			)}

			{/* Business Details Edit Modal */}
			{showBusinessEditModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
						<div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
							<h2 className="text-xl font-semibold text-gray-900">Business details</h2>
							<button
								onClick={() => setShowBusinessEditModal(false)}
								className="text-gray-400 hover:text-gray-600"
							>
								<X size={24} />
							</button>
						</div>

						<div className="p-6 space-y-6">
							{/* Basic Information */}
							<div>
								<button
									onClick={() => setExpandBasicInfo(!expandBasicInfo)}
									className="w-full flex items-center justify-between mb-4"
								>
									<h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
									{expandBasicInfo ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
								</button>

								{expandBasicInfo && (
									<div className="space-y-4">
										<div>
											<label className="block text-gray-900 font-medium mb-2">
												Vendor's Business Name<span className="text-red-500">*</span>
											</label>
											<input
												type="text"
												value={businessForm.vendorName}
												onChange={(e) =>
													setBusinessForm({ ...businessForm, vendorName: e.target.value })
												}
												className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-purple-500 transition-colors"
											/>
										</div>

										<div className="grid grid-cols-2 gap-4">
											<div>
												<label className="block text-gray-900 font-medium mb-2">
													Select Country<span className="text-red-500">*</span>
												</label>
												<div className="relative">
													<select
														value={businessForm.country}
														onChange={(e) =>
															setBusinessForm({ ...businessForm, country: e.target.value })
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
												<label className="block text-gray-900 font-medium mb-2">City/Town</label>
												<input
													type="text"
													placeholder="City/Town Name"
													value={businessForm.city}
													onChange={(e) =>
														setBusinessForm({ ...businessForm, city: e.target.value })
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
									onClick={() => setExpandTaxInfo(!expandTaxInfo)}
									className="w-full flex items-center justify-between mb-4"
								>
									<div className="flex items-center gap-2">
										<h3 className="text-lg font-semibold text-gray-900">Tax Information</h3>
										<span className="text-gray-500 text-sm">(optional)</span>
									</div>
									{expandTaxInfo ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
								</button>

								{expandTaxInfo && (
									<div className="space-y-4">
										<div className="grid grid-cols-2 gap-4">
											<div>
												<label className="block text-gray-900 font-medium mb-2">Business GSTIN</label>
												<input
													type="text"
													placeholder="Business GSTIN (Optional)"
													value={businessForm.gstin}
													onChange={(e) =>
														setBusinessForm({ ...businessForm, gstin: e.target.value })
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
													value={businessForm.pan}
													onChange={(e) =>
														setBusinessForm({ ...businessForm, pan: e.target.value })
													}
													className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-purple-500 transition-colors"
												/>
											</div>
										</div>
									</div>
								)}
							</div>

							{/* Address */}
							<div>
								<button
									onClick={() => setExpandAddress(!expandAddress)}
									className="w-full flex items-center justify-between mb-4"
								>
									<div className="flex items-center gap-2">
										<h3 className="text-lg font-semibold text-gray-900">Address</h3>
										<span className="text-gray-500 text-sm">(optional)</span>
									</div>
									{expandAddress ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
								</button>

								{expandAddress && (
									<div className="space-y-4">
										<div className="grid grid-cols-2 gap-4">
											<div>
												<label className="block text-gray-900 font-medium mb-2">Select Country</label>
												<div className="relative">
													<select
														value={businessForm.addressCountry}
														onChange={(e) =>
															setBusinessForm({
																...businessForm,
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
														value={businessForm.state}
														onChange={(e) =>
															setBusinessForm({ ...businessForm, state: e.target.value })
														}
														className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-purple-500 transition-colors appearance-none bg-white"
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
												<label className="block text-gray-900 font-medium mb-2">City/Town</label>
												<input
													type="text"
													placeholder="City/Town Name"
													value={businessForm.addressCity}
													onChange={(e) =>
														setBusinessForm({ ...businessForm, addressCity: e.target.value })
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
													value={businessForm.postalCode}
													onChange={(e) =>
														setBusinessForm({ ...businessForm, postalCode: e.target.value })
													}
													className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-purple-500 transition-colors"
												/>
											</div>
										</div>

										<div>
											<label className="block text-gray-900 font-medium mb-2">Street Address</label>
											<input
												type="text"
												placeholder="Street Address"
												value={businessForm.streetAddress}
												onChange={(e) =>
													setBusinessForm({ ...businessForm, streetAddress: e.target.value })
												}
												className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-purple-500 transition-colors"
											/>
										</div>
									</div>
								)}
							</div>

							{/* Additional Details */}
							{/* <div>
								<button
									onClick={() => setExpandAdditionalDetails(!expandAdditionalDetails)}
									className="w-full flex items-center justify-between mb-4"
								>
									<div className="flex items-center gap-2">
										<h3 className="text-lg font-semibold text-gray-900">Additional Details</h3>
										<span className="text-gray-500 text-sm">(optional)</span>
									</div>
									{expandAdditionalDetails ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
								</button>

								{expandAdditionalDetails && (
									<div className="space-y-4">
										<div className="flex items-center gap-3">
											<input
												type="checkbox"
												id="update-previous"
												checked={businessForm.updatePrevious}
												onChange={(e) =>
													setBusinessForm({ ...businessForm, updatePrevious: e.target.checked })
												}
												className="w-5 h-5 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
											/>
											<label htmlFor="update-previous" className="text-gray-900">
												Update changes for Previous and Future documents.
											</label>
										</div>

										<div className="flex items-center gap-3">
											<input
												type="checkbox"
												id="update-future"
												checked={businessForm.updateFuture}
												onChange={(e) =>
													setBusinessForm({ ...businessForm, updateFuture: e.target.checked })
												}
												className="w-5 h-5 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
											/>
											<label htmlFor="update-future" className="text-gray-900">
												Only update for Future documents
											</label>
										</div>
									</div>
								)}
							</div> */}
						</div>

						<div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
							<button
								onClick={handleSaveBusinessDetails}
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