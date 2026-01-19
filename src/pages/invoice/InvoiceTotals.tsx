import { useState, useEffect, useMemo } from 'react';
import { ChevronDown, Plus, Tag, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { updateInvoiceData } from '../../store/invoiceSlice';

interface AdditionalCharge {
	id: number;
	name: string;
	amount: number;
	type: string;
}

interface CustomField {
	id: number;
	label: string;
	value: string;
	setAsDefault: boolean;
}

export default function InvoiceTotalsSection() {
	const dispatch = useAppDispatch();
	const invoiceData = useAppSelector((state) => state.invoice);

	const [showDiscounts, setShowDiscounts] = useState(false);
	const [showAdditionalCharges, setShowAdditionalCharges] = useState(false);
	const [summarizeQuantity, setSummarizeQuantity] = useState(false);

	// Discount states
	const [discountType, setDiscountType] = useState(invoiceData.totals.discountType);
	const [totalDiscount, setTotalDiscount] = useState(invoiceData.totals.totalDiscount);
	const [totalDiscountType, setTotalDiscountType] = useState(invoiceData.totals.totalDiscountType);

	// Manual SGST and CGST overrides
	const [manualSgst, setManualSgst] = useState<number | null>(null);
	const [manualCgst, setManualCgst] = useState<number | null>(null);

	// Additional charges states
	const [additionalCharges, setAdditionalCharges] = useState<AdditionalCharge[]>(
		invoiceData.totals.additionalCharges.map(charge => ({
			...charge,
			type: charge.type || 'fixed'
		}))
	);

	// Custom fields states
	const [customFields, setCustomFields] = useState<CustomField[]>(
		invoiceData.totals.customFields.map(field => ({
			...field,
			setAsDefault: field.setAsDefault || false
		}))
	);
	const [showCustomFieldModal, setShowCustomFieldModal] = useState(false);
	const [showCustomFieldDropdown, setShowCustomFieldDropdown] = useState(false);
	const [newCustomField, setNewCustomField] = useState({
		label: '',
		value: '',
		setAsDefault: false,
	});

	const [totalLabel, setTotalLabel] = useState('Total');
	const [totalInWordsLabel, setTotalInWordsLabel] = useState(invoiceData.totals.totalInWordsLabel);
	const [totalInWordsValue, setTotalInWordsValue] = useState(invoiceData.totals.totalInWordsValue);

	// Calculate totals from items dynamically
	const calculatedTotals = useMemo(() => {
		const items = invoiceData.items;

		const amount = items.reduce((sum, item) => {
			return sum + parseFloat(String(item.amount) || '0');
		}, 0);

		const sgst = items.reduce((sum, item) => {
			return sum + parseFloat(String(item.sgst) || '0');
		}, 0);

		const cgst = items.reduce((sum, item) => {
			return sum + parseFloat(String(item.cgst) || '0');
		}, 0);

		const igst = sgst + cgst; // Combined tax

		return { amount, sgst, cgst, igst };
	}, [invoiceData.items]);

	// Get final SGST and CGST values (manual override or calculated)
	const finalSgst = manualSgst !== null ? manualSgst : calculatedTotals.sgst;
	const finalCgst = manualCgst !== null ? manualCgst : calculatedTotals.cgst;

	// Calculate functions
	const calculateDiscountedTotal = () => {
		let discountAmount = 0;
		if (discountType === 'total') {
			if (totalDiscountType === 'percentage') {
				discountAmount = (calculatedTotals.amount * totalDiscount) / 100;
			} else {
				discountAmount = totalDiscount;
			}
		}
		return calculatedTotals.amount - discountAmount + finalSgst + finalCgst;
	};

	const calculateFinalTotal = () => {
		let base = calculateDiscountedTotal();
		additionalCharges.forEach((charge) => {
			base += parseFloat(String(charge.amount)) || 0;
		});
		return base;
	};

	// Function to convert number to words
	const numberToWords = (num: number): string => {
		if (num === 0) return 'Zero';

		const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
		const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
		const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

		const convertLessThanThousand = (n: number): string => {
			if (n === 0) return '';
			if (n < 10) return ones[n];
			if (n < 20) return teens[n - 10];
			if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + ones[n % 10] : '');
			return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' ' + convertLessThanThousand(n % 100) : '');
		};

		const convertToIndianSystem = (n: number): string => {
			if (n === 0) return 'Zero';

			const crore = Math.floor(n / 10000000);
			const lakh = Math.floor((n % 10000000) / 100000);
			const thousand = Math.floor((n % 100000) / 1000);
			const remainder = n % 1000;

			let result = '';

			if (crore > 0) result += convertLessThanThousand(crore) + ' Crore ';
			if (lakh > 0) result += convertLessThanThousand(lakh) + ' Lakh ';
			if (thousand > 0) result += convertLessThanThousand(thousand) + ' Thousand ';
			if (remainder > 0) result += convertLessThanThousand(remainder);

			return result.trim();
		};

		const rupees = Math.floor(num);
		const paise = Math.round((num - rupees) * 100);

		let words = convertToIndianSystem(rupees) + ' Rupees';
		if (paise > 0) {
			words += ' and ' + convertToIndianSystem(paise) + ' Paise';
		}
		words += ' Only';

		return words;
	};

	// Calculate total in words automatically
	const calculatedTotalInWords = useMemo(() => {
		const total = calculateFinalTotal();
		return numberToWords(total);
	}, [calculatedTotals, finalSgst, finalCgst, discountType, totalDiscount, totalDiscountType, additionalCharges]);

	// Update totalInWordsValue when calculated value changes
	useEffect(() => {
		setTotalInWordsValue(calculatedTotalInWords);
	}, [calculatedTotalInWords]);

	// Save to Redux whenever data changes
	useEffect(() => {
		dispatch(updateInvoiceData({
			totals: {
				amount: calculatedTotals.amount,
				sgst: finalSgst,
				cgst: finalCgst,
				discountType,
				totalDiscount,
				totalDiscountType,
				additionalCharges,
				customFields,
				totalInWordsLabel,
				totalInWordsValue,
			},
		}));
	}, [calculatedTotals, finalSgst, finalCgst, discountType, totalDiscount, totalDiscountType, additionalCharges, customFields, totalInWordsLabel, totalInWordsValue, dispatch]);

	const addAdditionalCharge = () => {
		setAdditionalCharges([
			...additionalCharges,
			{
				id: Date.now(),
				name: '',
				amount: 0,
				type: 'fixed',
			},
		]);
	};

	const updateAdditionalCharge = (id: number, field: string, value: string | number) => {
		setAdditionalCharges(
			additionalCharges.map((charge) => (charge.id === id ? { ...charge, [field]: value } : charge)),
		);
	};

	const deleteAdditionalCharge = (id: number) => {
		setAdditionalCharges(additionalCharges.filter((charge) => charge.id !== id));
	};

	const handleSaveCustomField = () => {
		if (newCustomField.label.trim()) {
			setCustomFields([
				...customFields,
				{
					id: Date.now(),
					label: newCustomField.label,
					value: newCustomField.value,
					setAsDefault: newCustomField.setAsDefault,
				},
			]);
			setNewCustomField({ label: '', value: '', setAsDefault: false });
			setShowCustomFieldModal(false);
		}
	};

	const deleteCustomField = (id: number) => {
		setCustomFields(customFields.filter((field) => field.id !== id));
	};

	const updateCustomFieldValue = (id: number, value: string) => {
		setCustomFields(customFields.map((field) => (field.id === id ? { ...field, value } : field)));
	};

	return (
		<>
			<div className="space-y-4 sm:space-y-6">
				{/* Show Total in PDF Section */}
				<div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
					<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2">
						<h3 className="text-lg sm:text-xl font-semibold text-gray-900">Show Total in PDF</h3>
						<span className="text-lg sm:text-xl font-bold text-purple-600">{invoiceData.currency.symbol}{calculateFinalTotal().toFixed(2)}</span>
					</div>

					<div className="space-y-2">
						{/* Amount */}
						<div className="flex items-center justify-between text-sm sm:text-base">
							<span className="text-gray-700 px-2 sm:px-3 font-medium">Amount</span>
							<span className="text-gray-900 font-semibold">{invoiceData.currency.symbol}{calculatedTotals.amount.toFixed(2)}</span>
						</div>

						{/* Show IGST or CGST+SGST based on GST configuration */}
						{invoiceData.gstConfiguration.taxType === 'GST (India)' && invoiceData.gstConfiguration.gstType === 'IGST' ? (
							// Show IGST only
							<div className="flex items-center justify-between text-sm sm:text-base">
								<span className="text-gray-700 px-2 sm:px-3 font-medium">IGST</span>
								<div className="flex items-center gap-1 sm:gap-2">
									<span className="text-gray-500 text-xs sm:text-sm">{invoiceData.currency.symbol}</span>
									<input
										type="number"
										value={manualSgst !== null || manualCgst !== null ? (manualSgst || 0) + (manualCgst || 0) : calculatedTotals.igst}
										onChange={(e) => {
											const igstValue = parseFloat(e.target.value) || 0;
											// Split IGST equally between SGST and CGST for internal storage
											setManualSgst(igstValue / 2);
											setManualCgst(igstValue / 2);
										}}
										placeholder="0.00"
										className="w-20 sm:w-24 px-2 py-1 text-xs sm:text-sm text-right border border-gray-300 rounded outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
									/>
									{(manualSgst !== null || manualCgst !== null) && (
										<button
											onClick={() => {
												setManualSgst(null);
												setManualCgst(null);
											}}
											className="text-gray-400 hover:text-red-500 transition-colors"
											title="Reset to calculated value"
										>
											<X size={14} className="sm:w-4 sm:h-4" />
										</button>
									)}
								</div>
							</div>
						) : invoiceData.gstConfiguration.taxType === 'GST (India)' && invoiceData.gstConfiguration.gstType === 'CGST & SGST' ? (
							// Show CGST and SGST
							<>
								{/* SGST - Editable */}
								<div className="flex items-center justify-between text-sm sm:text-base">
									<span className="text-gray-700 px-2 sm:px-3 font-medium">SGST</span>
									<div className="flex items-center gap-1 sm:gap-2">
										<span className="text-gray-500 text-xs sm:text-sm">{invoiceData.currency.symbol}</span>
										<input
											type="number"
											value={manualSgst !== null ? manualSgst : calculatedTotals.sgst}
											onChange={(e) => setManualSgst(parseFloat(e.target.value) || 0)}
											placeholder="0.00"
											className="w-20 sm:w-24 px-2 py-1 text-xs sm:text-sm text-right border border-gray-300 rounded outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
										/>
										{manualSgst !== null && (
											<button
												onClick={() => setManualSgst(null)}
												className="text-gray-400 hover:text-red-500 transition-colors"
												title="Reset to calculated value"
											>
												<X size={14} className="sm:w-4 sm:h-4" />
											</button>
										)}
									</div>
								</div>

								{/* CGST - Editable */}
								<div className="flex items-center justify-between text-sm sm:text-base">
									<span className="text-gray-700 px-2 sm:px-3 font-medium">CGST</span>
									<div className="flex items-center gap-1 sm:gap-2">
										<span className="text-gray-500 text-xs sm:text-sm">{invoiceData.currency.symbol}</span>
										<input
											type="number"
											value={manualCgst !== null ? manualCgst : calculatedTotals.cgst}
											onChange={(e) => setManualCgst(parseFloat(e.target.value) || 0)}
											placeholder="0.00"
											className="w-20 sm:w-24 px-2 py-1 text-xs sm:text-sm text-right border border-gray-300 rounded outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
										/>
										{manualCgst !== null && (
											<button
												onClick={() => setManualCgst(null)}
												className="text-gray-400 hover:text-red-500 transition-colors"
												title="Reset to calculated value"
											>
												<X size={14} className="sm:w-4 sm:h-4" />
											</button>
										)}
									</div>
								</div>
							</>
						) : invoiceData.gstConfiguration.taxType !== 'None' ? (
							// Show other tax types (VAT, PPN, SST, HST, TAX)
							<div className="flex items-center justify-between text-sm sm:text-base">
								<span className="text-gray-700 px-2 sm:px-3 font-medium">
									{invoiceData.gstConfiguration.taxType === 'VAT' ? 'VAT' :
										invoiceData.gstConfiguration.taxType === 'PPN' ? 'PPN' :
											invoiceData.gstConfiguration.taxType === 'SST' ? 'SST' :
												invoiceData.gstConfiguration.taxType === 'HST' ? 'HST' :
													invoiceData.gstConfiguration.taxType === 'TAX' ? 'TAX' : 'Tax'}
								</span>
								<div className="flex items-center gap-1 sm:gap-2">
									<span className="text-gray-500 text-xs sm:text-sm">{invoiceData.currency.symbol}</span>
									<input
										type="number"
										value={manualSgst !== null || manualCgst !== null ? (manualSgst || 0) + (manualCgst || 0) : calculatedTotals.igst}
										onChange={(e) => {
											const taxValue = parseFloat(e.target.value) || 0;
											// Store as combined value
											setManualSgst(taxValue / 2);
											setManualCgst(taxValue / 2);
										}}
										placeholder="0.00"
										className="w-20 sm:w-24 px-2 py-1 text-xs sm:text-sm text-right border border-gray-300 rounded outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
									/>
									{(manualSgst !== null || manualCgst !== null) && (
										<button
											onClick={() => {
												setManualSgst(null);
												setManualCgst(null);
											}}
											className="text-gray-400 hover:text-red-500 transition-colors"
											title="Reset to calculated value"
										>
											<X size={14} className="sm:w-4 sm:h-4" />
										</button>
									)}
								</div>
							</div>
						) : null}

						{/* Discounts Row */}
						{discountType === 'total' && (
							<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-white rounded-lg py-2">
								<input
									type="text"
									value="Discounts"
									className="text-gray-700 text-sm sm:text-base outline-none border-b-2 border-none border-gray-400 bg-transparent font-medium w-full sm:w-auto"
									readOnly
								/>
								<div className="flex items-center gap-2 w-full sm:w-auto justify-end">
									<input
										type="number"
										value={totalDiscount}
										onChange={(e) => setTotalDiscount(parseFloat(e.target.value) || 0)}
										placeholder="0"
										className="w-16 sm:w-20 px-2 py-1 text-xs sm:text-sm text-right border border-gray-300 rounded outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
									/>
									<div className="relative">
										<select
											value={totalDiscountType}
											onChange={(e) => setTotalDiscountType(e.target.value)}
											className="appearance-none px-2 py-1 pr-6 sm:pr-9 text-xs sm:text-sm border border-gray-300 rounded outline-none focus:border-purple-500 bg-white cursor-pointer"
										>
											<option value="fixed px-6">{invoiceData.currency.symbol}</option>
											<option value="percentage">%</option>
										</select>
									</div>
									<button
										onClick={() => {
											setDiscountType('');
											setTotalDiscount(0);
										}}
										className="text-gray-400 hover:text-red-500 px-1 sm:px-2 transition-colors"
									>
										<X size={16} className="sm:w-[18px] sm:h-[18px]" />
									</button>
								</div>
							</div>
						)}

						{/* Add Discounts */}
						<div>
							<button
								onClick={() => setShowDiscounts(!showDiscounts)}
								className="flex items-center py-2 gap-2 text-purple-600 hover:text-purple-700 transition-colors w-full text-xs sm:text-sm font-xs"
							>
								<Tag size={16} className="sm:w-[18px] sm:h-[18px]" />
								<span>Add Discounts</span>
								<ChevronDown
									size={16}
									className={`sm:w-[18px] sm:h-[18px] transition-transform ${showDiscounts ? 'rotate-180' : ''}`}
								/>
							</button>

							{showDiscounts && (
								<div className="mt-4 p-3 sm:p-4 bg-purple-50 rounded-lg space-y-1 border border-purple-100">
									<button
										onClick={() => {
											setDiscountType('total');
											setShowDiscounts(false);
										}}
										className="w-full text-left px-3 sm:px-4 py-2 rounded-lg border text-xs sm:text-sm border-purple-200 bg-white text-gray-700 hover:bg-purple-50 transition-all"
									>
										Give Discount on Total
									</button>
								</div>
							)}
						</div>

						{/* Add Additional Charges */}
						<div>
							<button
								onClick={() => setShowAdditionalCharges(!showAdditionalCharges)}
								className="flex items-center gap-2 text-purple-600 text-xs sm:text-sm hover:text-purple-700 transition-colors w-full font-sm"
							>
								<Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
								<span>Add Additional Charges</span>
								<ChevronDown
									size={16}
									className={`sm:w-[18px] sm:h-[18px] transition-transform ${showAdditionalCharges ? 'rotate-180' : ''}`}
								/>
							</button>

							{showAdditionalCharges && (
								<div className="mt-4 p-3 sm:p-4 bg-purple-50 rounded-lg space-y-3 border border-purple-100">
									{additionalCharges.map((charge) => (
										<div
											key={charge.id}
											className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 bg-white p-3 rounded-lg border border-purple-200"
										>
											<input
												type="text"
												value={charge.name}
												onChange={(e) =>
													updateAdditionalCharge(charge.id, 'name', e.target.value)
												}
												placeholder="Charge name"
												className="flex-1 w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
											/>
											<div className="flex items-center gap-2 w-full sm:w-auto">
												<input
													type="number"
													value={charge.amount}
													onChange={(e) =>
														updateAdditionalCharge(
															charge.id,
															'amount',
															parseFloat(e.target.value) || 0,
														)
													}
													placeholder="0"
													className="w-24 sm:w-32 px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
												/>
												<span className="text-gray-600 text-xs sm:text-sm">{invoiceData.currency.symbol}</span>
												<button
													onClick={() => deleteAdditionalCharge(charge.id)}
													className="text-red-500 hover:text-red-600 transition-colors"
												>
													<X size={16} className="sm:w-[18px] sm:h-[18px]" />
												</button>
											</div>
										</div>
									))}

									<button
										onClick={addAdditionalCharge}
										className="w-full px-3 sm:px-4 py-2 text-xs sm:text-sm border-2 border-dashed border-purple-300 rounded-lg text-purple-600 hover:bg-purple-100 transition-all"
									>
										+ Add Charge
									</button>
								</div>
							)}
						</div>

						{/* Summarise Total Quantity */}
						<div className="flex items-center gap-3 p-2 sm:p-3 rounded-lg hover:bg-purple-50 transition-colors">
							<input
								type="checkbox"
								id="summarise-quantity"
								checked={summarizeQuantity}
								onChange={(e) => setSummarizeQuantity(e.target.checked)}
								className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 rounded border-gray-300 focus:ring-purple-500 cursor-pointer"
							/>
							<label
								htmlFor="summarise-quantity"
								className="text-gray-700 font-medium text-xs sm:text-sm md:text-base cursor-pointer"
							>
								Summarise Total Quantity
							</label>
						</div>
					</div>

					{/* Total */}
					<div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t-2 border-gray-200">
						{/* Show discount if applied */}
						{discountType === 'total' && totalDiscount > 0 && (
							<div className="flex items-center justify-between mb-3 text-green-600 font-medium text-sm sm:text-base">
								<span>Discount</span>
								<span>
									- {invoiceData.currency.symbol}
									{totalDiscountType === 'percentage'
										? ((calculatedTotals.amount * totalDiscount) / 100).toFixed(2)
										: totalDiscount.toFixed(2)}
								</span>
							</div>
						)}

						{/* Show additional charges */}
						{additionalCharges.map((charge) => (
							<div key={charge.id} className="flex items-center justify-between mb-3 text-sm sm:text-base">
								<span className="text-gray-700 font-medium">{charge.name || 'Additional Charge'}</span>
								<span className="text-gray-900 font-semibold">
									{invoiceData.currency.symbol}{parseFloat(String(charge.amount) || '0').toFixed(2)}
								</span>
							</div>
						))}

						<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-4 sm:p-6 rounded-lg gap-3">
							<div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
								<input
									type="text"
									value={totalLabel}
									onChange={(e) => setTotalLabel(e.target.value)}
									className="text-lg sm:text-xl font-bold text-gray-900 w-full sm:w-auto max-w-[120px] sm:max-w-[140px] px-2 sm:px-4 outline-none border-b-2 border-purple-100 bg-transparent"
								/>
								<span className="text-xs sm:text-sm md:text-base text-gray-500 font-medium">({invoiceData.currency.code})</span>
							</div>

							<span className="text-base sm:text-lg font-bold text-purple-500">
								{invoiceData.currency.symbol}{calculateFinalTotal().toFixed(2)}
							</span>
						</div>
					</div>

					{/* Custom Fields */}
					{customFields.map((field) => (
						<div
							key={field.id}
							className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2 border-t border-gray-100 mt-4 gap-2"
						>
							<input
								type="text"
								value={field.label}
								readOnly
								className="text-gray-700 text-sm sm:text-base outline-none border-b-2 border-dotted border-gray-400 bg-transparent font-medium w-full sm:w-auto"
							/>
							<div className="flex items-center gap-2 w-full sm:w-auto">
								<input
									type="text"
									value={field.value}
									onChange={(e) => updateCustomFieldValue(field.id, e.target.value)}
									placeholder="Enter value"
									className="w-full sm:w-40 px-2 py-1 text-xs sm:text-sm text-right border border-gray-300 rounded outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
								/>
								<button
									onClick={() => deleteCustomField(field.id)}
									className="text-gray-400 hover:text-red-500 transition-colors"
								>
									<X size={16} className="sm:w-[18px] sm:h-[18px]" />
								</button>
							</div>
						</div>
					))}

					{/* Add Custom Fields */}
					<div className="relative mt-4">
						<button
							onClick={() => setShowCustomFieldDropdown(!showCustomFieldDropdown)}
							className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors font-medium text-xs sm:text-sm"
						>
							<Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
							<span>Add Custom Fields</span>
						</button>

						{showCustomFieldDropdown && (
							<div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-purple-200 rounded-lg shadow-lg z-10 overflow-hidden">
								<div className="p-3 sm:p-4">
									{customFields.length === 0 ? (
										<div className="text-center py-4">
											<p className="text-gray-500 text-xs sm:text-sm mb-4">No options</p>
										</div>
									) : (
										<div className="mb-4">
											<select className="w-full px-3 sm:px-4 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg outline-none focus:border-purple-500">
												<option>Select any custom field</option>
												{customFields.map((field) => (
													<option key={field.id} value={field.id}>
														{field.label}
													</option>
												))}
											</select>
										</div>
									)}
									<button
										onClick={() => {
											setShowCustomFieldDropdown(false);
											setShowCustomFieldModal(true);
										}}
										className="w-full px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
									>
										Add New Custom Field
									</button>
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Show Total In Words Section */}
				<div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
					<div className="flex items-center justify-between mb-4 sm:mb-6">
						<h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">Show Total In Words</h3>
					</div>

					<div className="space-y-3 sm:space-y-4">
						<div>
							<input
								type="text"
								value={totalInWordsLabel}
								onChange={(e) => setTotalInWordsLabel(e.target.value)}
								className="text-gray-900 font-medium text-xs sm:text-sm outline-none border-b-2 border-dotted border-gray-400 bg-transparent hover:border-purple-400 transition-colors w-full max-w-full sm:max-w-md px-2"
							/>
						</div>

						<div>
							<input
								type="text"
								value={totalInWordsValue}
								onChange={(e) => setTotalInWordsValue(e.target.value)}
								className="text-gray-900 outline-none border-b-2 border-dotted border-gray-400 bg-transparent text-xs sm:text-sm hover:border-purple-400 transition-colors w-full max-w-full sm:max-w-md px-2"
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Add Custom Field Modal */}
			{showCustomFieldModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
						<div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
							<h2 className="text-lg sm:text-xl font-semibold text-gray-900">Add Custom Field</h2>
							<button
								onClick={() => {
									setShowCustomFieldModal(false);
									setNewCustomField({ label: '', value: '', setAsDefault: false });
								}}
								className="text-gray-400 hover:text-gray-600 transition-colors"
							>
								<X size={20} className="sm:w-6 sm:h-6" />
							</button>
						</div>

						<div className="p-4 sm:p-6">
							<div className="space-y-4 sm:space-y-6">
								{/* Label */}
								<div>
									<label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
										Label<span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										placeholder="Enter field label"
										value={newCustomField.label}
										onChange={(e) =>
											setNewCustomField({ ...newCustomField, label: e.target.value })
										}
										className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
									/>
								</div>

								{/* Value */}
								<div>
									<label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">Value</label>
									<input
										type="text"
										placeholder="Enter field value"
										value={newCustomField.value}
										onChange={(e) =>
											setNewCustomField({ ...newCustomField, value: e.target.value })
										}
										className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
									/>
								</div>

								{/* Set as default */}
								<div className="flex items-center gap-2 sm:gap-3">
									<input
										type="checkbox"
										id="custom-field-default"
										checked={newCustomField.setAsDefault}
										onChange={(e) =>
											setNewCustomField({ ...newCustomField, setAsDefault: e.target.checked })
										}
										className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 rounded border-gray-300 focus:ring-purple-500 cursor-pointer"
									/>
									<label htmlFor="custom-field-default" className="text-gray-700 cursor-pointer text-xs sm:text-sm">
										Set as default value
									</label>
								</div>
							</div>

							{/* Buttons */}
							<div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-6 sm:mt-8">
								<button
									onClick={() => {
										setShowCustomFieldModal(false);
										setNewCustomField({ label: '', value: '', setAsDefault: false });
									}}
									className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
								>
									Cancel
								</button>
								<button
									onClick={handleSaveCustomField}
									className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
								>
									Save
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
