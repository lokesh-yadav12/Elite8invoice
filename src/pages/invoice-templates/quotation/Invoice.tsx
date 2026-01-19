import React from 'react';
import { useState } from 'react';
import { Pencil, Plus } from 'lucide-react';
import { useAppDispatch } from '../../../store';
import { saveAsDraft, completeInvoice, updateInvoiceData } from '../../../store/invoiceSlice';
import DetailsForm from './DetailsForm';
import BilledBySection from './BilledBySection';
import BilledToSection from './BilledToSection';
import BillingDetailsSection from '../../invoice/BillingDetails';
import InvoiceItemsTable from '../../invoice/InvoiceItemsTable';
import InvoiceTotalsSection from '../../invoice/InvoiceTotals';
import DocumentActionsUI from '../../invoice/DocumentActions';
import AdvancedOptionsUI from '../../invoice/AdvancedOptions';
import ItemHeader from '../../invoice/InvoiceConfiguration';

const Invoice = () => {
	const dispatch = useAppDispatch();
	const [title, setTitle] = useState('Quotation');
	const [subtitle, setSubtitle] = useState('');
	const [isEditingTitle, setIsEditingTitle] = useState(false);
	const [isEditingSubtitle, setIsEditingSubtitle] = useState(false);
	const [showSubtitle, setShowSubtitle] = useState(false);

	const handleSaveAsDraft = () => {
		// Update title and subtitle in Redux
		dispatch(updateInvoiceData({
			title,
			subtitle,
		}));
		dispatch(saveAsDraft());

		// Show success message
		alert('Invoice saved as draft successfully!');
	};

	const handleSaveAndContinue = () => {
		// Update title and subtitle in Redux
		dispatch(updateInvoiceData({
			title,
			subtitle,
		}));
		dispatch(completeInvoice());

		// The completeInvoice action will set currentStep to 2, which will show the preview page
	};

	return (
		<div className='space-y-1.5 sm:space-y-2 md:space-y-3 px-1.5 sm:px-2 md:px-4 lg:px-6'>
			{/* Title Section Card */}
			<div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-purple-100 px-2 sm:px-3 md:px-4 lg:px-6 pt-2 sm:pt-4 md:pt-6 pb-1.5 sm:pb-2">
				<div className="max-w-3xl flex flex-col items-center justify-center mx-auto">
					{/* Title Section */}
					<div className="flex flex-row justify-center items-center gap-1.5 sm:gap-2 md:gap-3 w-full">
						{isEditingTitle ? (
							<input
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								onBlur={() => setIsEditingTitle(false)}
								onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
								className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold outline-none border-b-2 border-purple-500 bg-transparent text-gray-900 w-full text-center"
								autoFocus
							/>
						) : (
							<div className='border-b-2 border-dotted border-gray-300 mb-2 sm:mb-3 md:mb-4 flex items-center gap-1.5 sm:gap-2 md:gap-3 justify-center'>
								<h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center">{title}</h1>
								<button
									onClick={() => setIsEditingTitle(true)}
									className="text-gray-400 hover:text-purple-600 transition-colors flex-shrink-0"
								>
									<Pencil size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
								</button>
							</div>
						)}
					</div>


					{/* Subtitle Section */}
					{showSubtitle ? (
						<div className="flex items-center gap-1.5 sm:gap-2 w-full justify-center">
							{isEditingSubtitle ? (
								<input
									type="text"
									value={subtitle}
									onChange={(e) => setSubtitle(e.target.value)}
									onBlur={() => setIsEditingSubtitle(false)}
									onKeyDown={(e) => e.key === 'Enter' && setIsEditingSubtitle(false)}
									placeholder="Enter subtitle"
									className="text-lg text-gray-600 outline-none border-b-2 border-purple-500 bg-transparent flex-1"
									autoFocus
								/>
							) : (
								<>
									<span
										className="text-base text-gray-600 cursor-pointer flex-1"
										onClick={() => setIsEditingSubtitle(true)}
									>
										{subtitle || 'Click to add subtitle'}
									</span>
									<button
										onClick={() => setIsEditingSubtitle(true)}
										className="text-gray-400 hover:text-purple-600 transition-colors"
									>
										<Pencil size={16} />
									</button>
								</>
							)}
						</div>
					) : (
						<button
							onClick={() => {
								setShowSubtitle(true);
								setIsEditingSubtitle(true);
							}}
							className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors font-medium"
						>
							<Plus size={18} />
							<span>Add Subtitle</span>
						</button>
					)}
				</div>
			</div>


			{/* Invoice Details Form */}
			<div className="bg-white rounded-xl shadow-sm border border-purple-100">
				<DetailsForm />
			</div>

			{/* Billing Details */}
			<div className="bg-white rounded-xl shadow-sm border border-purple-100">
				<BillingDetailsSection
					BilledBySection={BilledBySection}
					BilledToSection={BilledToSection}
				/>
			</div>

			<div>

			</div>

			{/* Items Table */}
			<div className="bg-white rounded-xl w-full shadow-sm border border-purple-100">
				<ItemHeader />
				<InvoiceItemsTable />
			</div>

			{/* Totals Section */}
			<div className="bg-white rounded-xl shadow-sm border border-purple-100 p-8">
				<div className="max-w-3xl mx-auto">
					<InvoiceTotalsSection />
				</div>
			</div>

			{/* Document Actions */}
			<div className="bg-white rounded-xl shadow-sm border border-purple-100 p-8">
				<DocumentActionsUI />
			</div>

			{/* Advanced Options */}
			<div className="bg-white rounded-xl shadow-sm border border-purple-100">
				<AdvancedOptionsUI />
			</div>

			{/* Action Buttons */}
			<div className='flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 md:gap-4 pb-4 sm:pb-6 md:pb-8 px-2 sm:px-4'>
				<button
					onClick={handleSaveAsDraft}
					className='bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md'
				>
					Save as Draft
				</button>
				<button
					onClick={handleSaveAndContinue}
					className='bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md'
				>
					Save & Continue
				</button>
			</div>
		</div>
	);
};

export default Invoice;
