import React, { useRef } from 'react';
import { useAppSelector } from '../../../store';
import { Download, Share2, Mail, Printer, FolderArchive } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const InvoicePreview = () => {
	const invoiceData = useAppSelector((state) => state.invoice);
	const invoiceRef = useRef<HTMLDivElement>(null);

	const calculateSubtotal = () => {
		return invoiceData.items.reduce((sum, item) => sum + parseFloat(String(item.amount) || '0'), 0);
	};

	const calculateTotalTax = () => {
		return invoiceData.items.reduce(
			(sum, item) => sum + parseFloat(String(item.cgst) || '0') + parseFloat(String(item.sgst) || '0'),
			0,
		);
	};

	const calculateDiscount = () => {
		if (invoiceData.totals.discountType === 'total' && invoiceData.totals.totalDiscount > 0) {
			if (invoiceData.totals.totalDiscountType === 'percentage') {
				return (calculateSubtotal() * invoiceData.totals.totalDiscount) / 100;
			}
			return invoiceData.totals.totalDiscount;
		}
		return 0;
	};

	const calculateFinalTotal = () => {
		let total = calculateSubtotal() + calculateTotalTax() - calculateDiscount();
		invoiceData.totals.additionalCharges.forEach((charge) => {
			total += parseFloat(String(charge.amount) || '0');
		});
		return total;
	};

	const formatFileSize = (bytes: number) => {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
	};

	const handlePrint = () => {
		window.print();
	};

	const handleDownloadPDF = async () => {
		if (!invoiceRef.current) return;

		try {
			// Store original styles
			const originalWidth = invoiceRef.current.style.width;
			const originalMaxWidth = invoiceRef.current.style.maxWidth;
			const originalTransform = invoiceRef.current.style.transform;

			// Force desktop view for PDF generation
			invoiceRef.current.style.width = '210mm'; // A4 width
			invoiceRef.current.style.maxWidth = '210mm';
			invoiceRef.current.style.transform = 'scale(1)';

			// Wait for layout to settle
			await new Promise((resolve) => setTimeout(resolve, 100));

			// Capture the invoice content
			const canvas = await html2canvas(invoiceRef.current, {
				scale: 2,
				useCORS: true,
				logging: false,
				backgroundColor: '#ffffff',
				windowHeight: invoiceRef.current.scrollHeight,
				windowWidth: 794, // A4 width in pixels at 96 DPI
			});

			// Restore original styles
			invoiceRef.current.style.width = originalWidth;
			invoiceRef.current.style.maxWidth = originalMaxWidth;
			invoiceRef.current.style.transform = originalTransform;

			const imgData = canvas.toDataURL('image/png');
			const pdf = new jsPDF({
				orientation: 'portrait',
				unit: 'mm',
				format: 'a4',
			});

			const pageWidth = 210; // A4 width in mm
			const pageHeight = 297; // A4 height in mm
			const margin = 10; // Margin in mm for page breaks
			const contentWidth = pageWidth - margin * 2;
			const imgWidth = contentWidth;
			const imgHeight = (canvas.height * imgWidth) / canvas.width;

			let heightLeft = imgHeight;
			let position = margin; // Start with top margin

			// Add first page with margins
			pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
			heightLeft -= pageHeight - margin * 2; // Account for top and bottom margins

			// Add additional pages if content is longer than one page
			while (heightLeft > 0) {
				position = -(imgHeight - heightLeft) + margin; // Add top margin for new page
				pdf.addPage();
				pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
				heightLeft -= pageHeight - margin * 2; // Account for margins on each page
			}

			// Add attachments as additional pages
			if (invoiceData.attachments.length > 0) {
				for (const attachment of invoiceData.attachments) {
					if (attachment.url) {
						const fileExtension = attachment.name.split('.').pop()?.toLowerCase();

						// Handle PDF attachments
						if (fileExtension === 'pdf') {
							try {
								// Add a separator page for the attachment
								pdf.addPage();
								pdf.setFontSize(16);
								pdf.setTextColor(124, 58, 237); // Purple color
								pdf.text('Attachment:', 20, 20);
								pdf.setFontSize(12);
								pdf.setTextColor(0, 0, 0);
								pdf.text(attachment.name, 20, 30);
								pdf.setFontSize(10);
								pdf.setTextColor(100, 100, 100);
								pdf.text('(PDF attachment - please extract separately)', 20, 40);
							} catch (error) {
								console.error('Error adding PDF attachment:', error);
							}
						}
						// Handle image attachments
						else if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(fileExtension || '')) {
							try {
								pdf.addPage();

								// Add attachment header
								pdf.setFontSize(14);
								pdf.setTextColor(124, 58, 237);
								pdf.text('Attachment:', 20, 20);
								pdf.setFontSize(10);
								pdf.setTextColor(0, 0, 0);
								pdf.text(attachment.name, 20, 28);

								// Add the image
								const img = new Image();
								img.src = attachment.url;
								await new Promise((resolve) => {
									img.onload = resolve;
									img.onerror = resolve;
								});

								// Calculate image dimensions to fit on page
								const maxWidth = pageWidth - 40; // 20mm margin on each side
								const maxHeight = pageHeight - 60; // Space for header and margins
								let imgW = img.width * 0.264583; // Convert pixels to mm
								let imgH = img.height * 0.264583;

								// Scale down if too large
								if (imgW > maxWidth || imgH > maxHeight) {
									const ratio = Math.min(maxWidth / imgW, maxHeight / imgH);
									imgW *= ratio;
									imgH *= ratio;
								}

								pdf.addImage(attachment.url, (fileExtension || 'PNG').toUpperCase(), 20, 35, imgW, imgH);
							} catch (error) {
								console.error('Error adding image attachment:', error);
							}
						}
						// Handle other file types
						else {
							pdf.addPage();
							pdf.setFontSize(16);
							pdf.setTextColor(124, 58, 237);
							pdf.text('Attachment:', 20, 20);
							pdf.setFontSize(12);
							pdf.setTextColor(0, 0, 0);
							pdf.text(attachment.name, 20, 30);
							pdf.setFontSize(10);
							pdf.setTextColor(100, 100, 100);
							pdf.text(`File type: ${fileExtension?.toUpperCase() || 'Unknown'}`, 20, 40);
							pdf.text(`Size: ${formatFileSize(attachment.size)}`, 20, 48);
							pdf.text('(Please download this file separately from the invoice preview)', 20, 56);
						}
					}
				}
			}

			pdf.save(`Invoice-${invoiceData.invoiceNo}.pdf`);
		} catch (error) {
			console.error('Error generating PDF:', error);
			alert('Failed to generate PDF. Please try again.');
		}
	};

	const handleDownloadWithAttachments = async () => {
		if (!invoiceRef.current) return;

		try {
			// Create a new ZIP file
			const zip = new JSZip();

			// Store original styles
			const originalWidth = invoiceRef.current.style.width;
			const originalMaxWidth = invoiceRef.current.style.maxWidth;
			const originalTransform = invoiceRef.current.style.transform;

			// Force desktop view for PDF generation
			invoiceRef.current.style.width = '210mm'; // A4 width
			invoiceRef.current.style.maxWidth = '210mm';
			invoiceRef.current.style.transform = 'scale(1)';

			// Wait for layout to settle
			await new Promise((resolve) => setTimeout(resolve, 100));

			// Generate the invoice PDF
			const canvas = await html2canvas(invoiceRef.current, {
				scale: 2,
				useCORS: true,
				logging: false,
				backgroundColor: '#ffffff',
				windowHeight: invoiceRef.current.scrollHeight,
				windowWidth: 794, // A4 width in pixels at 96 DPI
			});

			// Restore original styles
			invoiceRef.current.style.width = originalWidth;
			invoiceRef.current.style.maxWidth = originalMaxWidth;
			invoiceRef.current.style.transform = originalTransform;

			const imgData = canvas.toDataURL('image/png');
			const pdf = new jsPDF({
				orientation: 'portrait',
				unit: 'mm',
				format: 'a4',
			});

			const pageWidth = 210;
			const pageHeight = 297;
			const margin = 10; // Margin in mm for page breaks
			const contentWidth = pageWidth - margin * 2;
			const imgWidth = contentWidth;
			const imgHeight = (canvas.height * imgWidth) / canvas.width;

			let heightLeft = imgHeight;
			let position = margin; // Start with top margin

			// Add first page with margins
			pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
			heightLeft -= pageHeight - margin * 2; // Account for top and bottom margins

			// Add additional pages if content is longer than one page
			while (heightLeft > 0) {
				position = -(imgHeight - heightLeft) + margin; // Add top margin for new page
				pdf.addPage();
				pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
				heightLeft -= pageHeight - margin * 2; // Account for margins on each page
			}

			// Add the invoice PDF to the ZIP
			const pdfBlob = pdf.output('blob');
			zip.file(`Invoice-${invoiceData.invoiceNo}.pdf`, pdfBlob);

			// Add all attachments to the ZIP
			if (invoiceData.attachments.length > 0) {
				const attachmentsFolder = zip.folder('Attachments');

				for (const attachment of invoiceData.attachments) {
					if (attachment.url && attachmentsFolder) {
						try {
							// Convert data URL to blob
							const response = await fetch(attachment.url);
							const blob = await response.blob();
							attachmentsFolder.file(attachment.name, blob);
						} catch (error) {
							console.error(`Error adding attachment ${attachment.name}:`, error);
						}
					}
				}
			}

			// Generate and download the ZIP file
			const zipBlob = await zip.generateAsync({ type: 'blob' });
			saveAs(zipBlob, `Invoice-${invoiceData.invoiceNo}-with-attachments.zip`);
		} catch (error) {
			console.error('Error generating ZIP:', error);
			alert('Failed to generate ZIP file. Please try again.');
		}
	};

	const selectedClientData = invoiceData.clients.find((c) => c.name === invoiceData.selectedClient);

	return (
		<div className="min-h-screen bg-gray-50 py-4 sm:py-8">
			{/* Add print styles to prevent content cutting */}
			<style>{`
				@media print {
					.page-break-avoid {
						page-break-inside: avoid;
						break-inside: avoid;
					}
					.page-break-before {
						page-break-before: always;
						break-before: always;
					}
					table {
						page-break-inside: auto;
					}
					tr {
						page-break-inside: avoid;
						page-break-after: auto;
					}
					thead {
						display: table-header-group;
					}
					tfoot {
						display: table-footer-group;
					}
				}
			`}</style>
			<div className="max-w-6xl mx-auto px-2 sm:px-4">
				{/* Action Buttons */}
				<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-6 mb-4 sm:mb-6 print:hidden">
					<div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0">
						<h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-0">Purchase Order Preview</h2>
						<div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
							<button
								onClick={handlePrint}
								className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all text-sm sm:text-base"
							>
								<Printer size={16} className="text-gray-600 sm:w-[18px] sm:h-[18px]" />
								<span className="text-gray-700">Print</span>
							</button>
							<button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all text-sm sm:text-base">
								<Mail size={16} className="text-gray-600 sm:w-[18px] sm:h-[18px]" />
								<span className="text-gray-700">Email</span>
							</button>
							<button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all text-sm sm:text-base">
								<Share2 size={16} className="text-gray-600 sm:w-[18px] sm:h-[18px]" />
								<span className="text-gray-700">Share</span>
							</button>
							<button
								onClick={handleDownloadPDF}
								className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all shadow-sm hover:shadow-md text-sm sm:text-base"
							>
								<Download size={16} className="sm:w-[18px] sm:h-[18px]" />
								<span>Download PDF</span>
							</button>
							{invoiceData.attachments.length > 0 && (
								<button
									onClick={handleDownloadWithAttachments}
									className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-sm hover:shadow-md text-sm sm:text-base"
								>
									<FolderArchive size={16} className="sm:w-[18px] sm:h-[18px]" />
									<span>Download with Attachments</span>
								</button>
							)}
						</div>
					</div>
				</div>

				{/* Invoice Document */}
				<div ref={invoiceRef} className="bg-white shadow-lg p-4 sm:p-8 lg:p-12 print:p-12">
					{/* Header Section */}
					<div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 sm:mb-8 print:flex-row print:mb-8">
						<div className="flex-1">
							<h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-purple-600 mb-2 sm:mb-3 print:text-4xl print:mb-3">
								Purchase Order
							</h1>
							{invoiceData.subtitle && (
								<p className="text-base sm:text-lg text-gray-600 print:text-lg">
									{invoiceData.subtitle}
								</p>
							)}
						</div>
						{invoiceData.logo && (
							<img
								src={invoiceData.logo}
								alt="Business Logo"
								className="max-h-20 sm:max-h-28 lg:max-h-32 rounded-lg print:max-h-32"
							/>
						)}
					</div>

					{/* Invoice Details - Single Left Column */}
					<div className="mb-4 sm:mb-6 print:mb-6">
						<div className="flex flex-col gap-1.5 sm:gap-2 max-w-md print:gap-2">
							<div className="flex text-sm sm:text-base print:text-base">
								<span className="text-gray-600 w-28 sm:w-32 print:w-32">Invoice No</span>
								<span className="font-semibold text-gray-900">{invoiceData.invoiceNo}</span>
							</div>

							<div className="flex text-sm sm:text-base print:text-base">
								<span className="text-gray-600 w-28 sm:w-32 print:w-32">Invoice Date</span>
								<span className="font-semibold text-gray-900">
									{new Date(invoiceData.invoiceDate).toLocaleDateString('en-US', {
										month: 'short',
										day: '2-digit',
										year: 'numeric',
									})}
								</span>
							</div>

							{invoiceData.dueDate && (
								<div className="flex text-sm sm:text-base print:text-base">
									<span className="text-gray-600 w-28 sm:w-32 print:w-32">Due Date</span>
									<span className="font-semibold text-gray-900">
										{new Date(invoiceData.dueDate).toLocaleDateString('en-US', {
											month: 'short',
											day: '2-digit',
											year: 'numeric',
										})}
									</span>
								</div>
							)}

							{invoiceData.customFields.map((field) => (
								<div key={field.id} className="flex text-sm sm:text-base print:text-base">
									<span className="text-gray-600 w-28 sm:w-32 print:w-32">{field.label}</span>
									<span className="font-semibold text-gray-900">{field.value}</span>
								</div>
							))}
						</div>
					</div>

					{/* Billing Details */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 print:grid-cols-2 print:gap-8 print:mb-8 page-break-avoid">
						{/* Billed By */}
						<div>
							<h3 className="text-base sm:text-lg font-bold text-purple-600 mb-2 sm:mb-3 print:text-lg print:mb-3">
								Billed By
							</h3>
							<div className="bg-purple-50 p-3 sm:p-4 lg:p-5 rounded-lg print:p-5">
								<p className="font-bold text-gray-900 text-base sm:text-lg mb-1.5 sm:mb-2 print:text-lg print:mb-2">
									{invoiceData.businessDetails.vendorName}
								</p>
								{invoiceData.businessDetails.streetAddress && (
									<p className="text-gray-700 text-xs sm:text-sm mb-0.5 sm:mb-1 print:text-sm print:mb-1">
										{invoiceData.businessDetails.streetAddress},
									</p>
								)}
								<p className="text-gray-700 text-xs sm:text-sm mb-0.5 sm:mb-1 print:text-sm print:mb-1">
									{[invoiceData.businessDetails.addressCity, invoiceData.businessDetails.state]
										.filter(Boolean)
										.join(', ')}
									{invoiceData.businessDetails.addressCity || invoiceData.businessDetails.state
										? ','
										: ''}
								</p>
								<p className="text-gray-700 text-xs sm:text-sm mb-1.5 sm:mb-2 print:text-sm print:mb-2">
									{invoiceData.businessDetails.addressCountry}
									{invoiceData.businessDetails.postalCode &&
										` - ${invoiceData.businessDetails.postalCode}`}
								</p>
								{invoiceData.businessDetails.pan && (
									<p className="text-gray-700 text-xs sm:text-sm print:text-sm">
										<span className="font-semibold">PAN:</span> {invoiceData.businessDetails.pan}
									</p>
								)}
								{invoiceData.businessDetails.gstin && (
									<p className="text-gray-700 text-xs sm:text-sm print:text-sm">
										<span className="font-semibold">GSTIN:</span>{' '}
										{invoiceData.businessDetails.gstin}
									</p>
								)}
							</div>
						</div>

						{/* Billed To */}
						<div>
							<h3 className="text-base sm:text-lg font-bold text-purple-600 mb-2 sm:mb-3 print:text-lg print:mb-3">
								Billed To
							</h3>
							{selectedClientData ? (
								<div className="bg-purple-50 p-3 sm:p-4 lg:p-5 rounded-lg print:p-5">
									<p className="font-bold text-gray-900 text-base sm:text-lg mb-1.5 sm:mb-2 print:text-lg print:mb-2">
										{selectedClientData.name}
									</p>
									{selectedClientData.company && (
										<p className="text-gray-700 text-xs sm:text-sm mb-0.5 sm:mb-1 print:text-sm print:mb-1">
											{selectedClientData.company},
										</p>
									)}
									{selectedClientData.streetAddress && (
										<p className="text-gray-700 text-xs sm:text-sm mb-0.5 sm:mb-1 print:text-sm print:mb-1">
											{selectedClientData.streetAddress},
										</p>
									)}
									{(selectedClientData.addressCity || selectedClientData.state) && (
										<p className="text-gray-700 text-xs sm:text-sm mb-0.5 sm:mb-1 print:text-sm print:mb-1">
											{[selectedClientData.addressCity, selectedClientData.state]
												.filter(Boolean)
												.join(', ')}
											{selectedClientData.addressCity || selectedClientData.state ? ',' : ''}
										</p>
									)}
									<p className="text-gray-700 text-xs sm:text-sm mb-1.5 sm:mb-2 print:text-sm print:mb-2">
										{selectedClientData.addressCountry || 'India'}
										{selectedClientData.postalCode && ` - ${selectedClientData.postalCode}`}
									</p>
									{selectedClientData.pan && (
										<p className="text-gray-700 text-xs sm:text-sm print:text-sm">
											<span className="font-semibold">PAN:</span> {selectedClientData.pan}
										</p>
									)}
									{selectedClientData.gstin && (
										<p className="text-gray-700 text-xs sm:text-sm print:text-sm">
											<span className="font-semibold">GSTIN:</span> {selectedClientData.gstin}
										</p>
									)}
								</div>
							) : (
								<div className="bg-gray-50 p-3 sm:p-4 lg:p-5 rounded-lg print:p-5">
									<p className="text-gray-500 text-sm">No client selected</p>
								</div>
							)}
						</div>
					</div>

					{/* Shipping Details - Shipped From and Shipped To */}
					{invoiceData.addShippingDetails &&
						(invoiceData.shippingDetails.shippedFrom.businessName ||
							invoiceData.shippingDetails.shippedTo.clientBusinessName) && (
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 print:grid-cols-2 print:gap-8 print:mb-8 page-break-avoid">
								{/* Shipped From */}
								{invoiceData.shippingDetails.shippedFrom.businessName && (
									<div>
										<h3 className="text-base sm:text-lg font-bold text-purple-600 mb-2 sm:mb-3 print:text-lg print:mb-3">
											Shipped From
										</h3>
										<div className="bg-purple-50 p-3 sm:p-4 lg:p-5 rounded-lg print:p-5">
											<p className="font-bold text-gray-900 text-base sm:text-lg mb-1.5 sm:mb-2 print:text-lg print:mb-2">
												{invoiceData.shippingDetails.shippedFrom.businessName}
											</p>
											{invoiceData.shippingDetails.shippedFrom.address && (
												<p className="text-gray-700 text-xs sm:text-sm mb-0.5 sm:mb-1 print:text-sm print:mb-1">
													{invoiceData.shippingDetails.shippedFrom.address},
												</p>
											)}
											<p className="text-gray-700 text-xs sm:text-sm mb-0.5 sm:mb-1 print:text-sm print:mb-1">
												{[
													invoiceData.shippingDetails.shippedFrom.city,
													invoiceData.shippingDetails.shippedFrom.state,
												]
													.filter(Boolean)
													.join(', ')}
												{invoiceData.shippingDetails.shippedFrom.city ||
													invoiceData.shippingDetails.shippedFrom.state
													? ','
													: ''}
											</p>
											<p className="text-gray-700 text-xs sm:text-sm print:text-sm">
												{invoiceData.shippingDetails.shippedFrom.country}
												{invoiceData.shippingDetails.shippedFrom.postalCode &&
													` - ${invoiceData.shippingDetails.shippedFrom.postalCode}`}
											</p>
										</div>
									</div>
								)}

								{/* Shipped To */}
								{invoiceData.shippingDetails.shippedTo.clientBusinessName && (
									<div>
										<h3 className="text-base sm:text-lg font-bold text-purple-600 mb-2 sm:mb-3 print:text-lg print:mb-3">
											Shipped To
										</h3>
										<div className="bg-purple-50 p-3 sm:p-4 lg:p-5 rounded-lg print:p-5">
											<p className="font-bold text-gray-900 text-base sm:text-lg mb-1.5 sm:mb-2 print:text-lg print:mb-2">
												{invoiceData.shippingDetails.shippedTo.clientBusinessName}
											</p>
											{invoiceData.shippingDetails.shippedTo.address && (
												<p className="text-gray-700 text-xs sm:text-sm mb-0.5 sm:mb-1 print:text-sm print:mb-1">
													{invoiceData.shippingDetails.shippedTo.address},
												</p>
											)}
											<p className="text-gray-700 text-xs sm:text-sm mb-0.5 sm:mb-1 print:text-sm print:mb-1">
												{[
													invoiceData.shippingDetails.shippedTo.city,
													invoiceData.shippingDetails.shippedTo.state,
												]
													.filter(Boolean)
													.join(', ')}
												{invoiceData.shippingDetails.shippedTo.city ||
													invoiceData.shippingDetails.shippedTo.state
													? ','
													: ''}
											</p>
											<p className="text-gray-700 text-xs sm:text-sm print:text-sm">
												{invoiceData.shippingDetails.shippedTo.country}
												{invoiceData.shippingDetails.shippedTo.postalCode &&
													` - ${invoiceData.shippingDetails.shippedTo.postalCode}`}
											</p>
										</div>
									</div>
								)}
							</div>
						)}

					{/* Transport Details */}
					{invoiceData.addShippingDetails &&
						(invoiceData.transportDetails.transportMode ||
							invoiceData.transportDetails.distance ||
							invoiceData.transportDetails.challanNumber ||
							invoiceData.transportDetails.vehicleType) && (
							<div className="mb-6 sm:mb-8 print:mb-8 page-break-avoid">
								<h3 className="text-base sm:text-lg font-bold text-purple-600 mb-2 sm:mb-3 print:text-lg print:mb-3">
									Transport Details
								</h3>
								<div className="bg-purple-50 p-3 sm:p-4 lg:p-5 rounded-lg print:p-5">
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-1.5 sm:gap-y-2 print:grid-cols-2 print:gap-x-8 print:gap-y-2">
										{invoiceData.transportDetails.transportMode && (
											<div className="flex text-xs sm:text-sm print:text-sm">
												<span className="font-semibold text-gray-700 w-32 sm:w-40 print:w-40">
													Transport Mode:
												</span>
												<span className="text-gray-900 capitalize">
													{invoiceData.transportDetails.transportMode}
												</span>
											</div>
										)}
										{invoiceData.transportDetails.distance && (
											<div className="flex text-xs sm:text-sm print:text-sm">
												<span className="font-semibold text-gray-700 w-32 sm:w-40 print:w-40">
													Distance:
												</span>
												<span className="text-gray-900">
													{invoiceData.transportDetails.distance} km
												</span>
											</div>
										)}
										{invoiceData.transportDetails.challanDate && (
											<div className="flex text-xs sm:text-sm print:text-sm">
												<span className="font-semibold text-gray-700 w-32 sm:w-40 print:w-40">
													Challan Date:
												</span>
												<span className="text-gray-900">
													{new Date(
														invoiceData.transportDetails.challanDate,
													).toLocaleDateString('en-US', {
														month: 'short',
														day: '2-digit',
														year: 'numeric',
													})}
												</span>
											</div>
										)}
										{invoiceData.transportDetails.challanNumber && (
											<div className="flex text-xs sm:text-sm print:text-sm">
												<span className="font-semibold text-gray-700 w-32 sm:w-40 print:w-40">
													Challan Number:
												</span>
												<span className="text-gray-900">
													{invoiceData.transportDetails.challanNumber}
												</span>
											</div>
										)}
										{invoiceData.transportDetails.vehicleType && (
											<div className="flex text-xs sm:text-sm print:text-sm">
												<span className="font-semibold text-gray-700 w-32 sm:w-40 print:w-40">
													Vehicle Type:
												</span>
												<span className="text-gray-900 capitalize">
													{invoiceData.transportDetails.vehicleType}
												</span>
											</div>
										)}
										{invoiceData.transportDetails.vehicleNumber && (
											<div className="flex text-xs sm:text-sm print:text-sm">
												<span className="font-semibold text-gray-700 w-32 sm:w-40 print:w-40">
													Vehicle Number:
												</span>
												<span className="text-gray-900">
													{invoiceData.transportDetails.vehicleNumber}
												</span>
											</div>
										)}
									</div>
								</div>
							</div>
						)}

					{/* Country and Place of Supply */}
					{!invoiceData.advancedOptions.hidePlaceCountry && (
						<div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-between mb-4 sm:mb-6 text-xs sm:text-sm print:flex-row print:mb-6 print:text-sm">
							<div>
								<span className="font-semibold text-gray-700">Country of Supply:</span>{' '}
								<span className="text-gray-600">{invoiceData.businessDetails.country}</span>
							</div>
							<div>
								<span className="font-semibold text-gray-700">Place of Supply:</span>{' '}
								<span className="text-gray-600">
									{invoiceData.businessDetails.state || invoiceData.businessDetails.country}
								</span>
							</div>
						</div>
					)}

					{/* Items Table */}
					<div className="mb-6 sm:mb-8 print:mb-8">
						{/* Mobile Card View */}
						<div className="block sm:hidden space-y-4">
							{invoiceData.items.map((item, index) => {
								// Calculate cell values
								const getColumnValue = (column: { name: string; type?: string }) => {
									const columnNameLower = column.name.toLowerCase();
									let cellValue = '';

									if (columnNameLower === 'item') {
										cellValue = item.name || 'Unnamed Item';
									} else if (columnNameLower === 'hsn/sac' || columnNameLower === 'hsn') {
										cellValue = item.hsn;
									} else if (
										columnNameLower.includes('rate') &&
										(columnNameLower.includes('gst') ||
											columnNameLower.includes('vat') ||
											columnNameLower.includes('ppn') ||
											columnNameLower.includes('sst') ||
											columnNameLower.includes('hst') ||
											columnNameLower.includes('tax'))
									) {
										cellValue = `${item.gstRate}%`;
									} else if (columnNameLower === 'quantity') {
										cellValue = String(item.quantity);
									} else if (columnNameLower === 'rate') {
										cellValue = `${invoiceData.currency.symbol}${parseFloat(String(item.rate) || '0').toFixed(2)}`;
									} else if (columnNameLower === 'amount') {
										cellValue = `${invoiceData.currency.symbol}${parseFloat(String(item.amount) || '0').toFixed(2)}`;
									} else if (columnNameLower === 'cgst') {
										cellValue = `${invoiceData.currency.symbol}${parseFloat(String(item.cgst) || '0').toFixed(2)}`;
									} else if (columnNameLower === 'sgst') {
										cellValue = `${invoiceData.currency.symbol}${parseFloat(String(item.sgst) || '0').toFixed(2)}`;
									} else if (columnNameLower === 'igst') {
										const igst =
											parseFloat(String(item.cgst) || '0') + parseFloat(String(item.sgst) || '0');
										cellValue = `${invoiceData.currency.symbol}${igst.toFixed(2)}`;
									} else if (
										columnNameLower === 'vat' ||
										columnNameLower === 'ppn' ||
										columnNameLower === 'sst' ||
										columnNameLower === 'hst' ||
										columnNameLower === 'tax'
									) {
										const totalTax =
											parseFloat(String(item.cgst) || '0') + parseFloat(String(item.sgst) || '0');
										cellValue = `${invoiceData.currency.symbol}${totalTax.toFixed(2)}`;
									} else if (columnNameLower === 'total') {
										cellValue = `${invoiceData.currency.symbol}${parseFloat(String(item.total) || '0').toFixed(2)}`;
									} else {
										// Custom column
										const customValue = item.customFields?.[column.name];
										if (customValue !== undefined && customValue !== null && customValue !== '') {
											if (column.type === 'CURRENCY') {
												cellValue = `${invoiceData.currency.symbol}${parseFloat(String(customValue) || '0').toFixed(2)}`;
											} else {
												cellValue = customValue;
											}
										} else {
											cellValue = '-';
										}
									}
									return cellValue;
								};

								return (
									<div
										key={item.id}
										className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
									>
										<div className="font-semibold text-purple-600 mb-3 text-sm">
											Item #{index + 1}
										</div>

										{/* Item Details */}
										<div className="space-y-2">
											{invoiceData.columnConfiguration
												.filter((col) => col.visible)
												.map((column) => {
													const value = getColumnValue(column);
													const columnNameLower = column.name.toLowerCase();
													const isTotalColumn = columnNameLower === 'total';

													return (
														<div
															key={column.id}
															className="flex justify-between items-center py-1 border-b border-gray-100 last:border-0"
														>
															<span className="text-xs text-gray-600 font-medium">
																{column.name}:
															</span>
															<span
																className={`text-xs ${isTotalColumn ? 'font-bold text-gray-900' : 'text-gray-800'}`}
															>
																{value}
															</span>
														</div>
													);
												})}
										</div>

										{/* Description and Image */}
										{(item.description || item.image) && (
											<div className="mt-3 pt-3 border-t border-gray-200">
												{item.image && (
													<img
														src={item.image}
														alt={item.name || 'Item'}
														className="w-full max-w-[200px] h-auto object-cover rounded border border-gray-300 mb-2"
													/>
												)}
												{item.description && (
													<div
														className="text-xs text-gray-600 prose prose-sm max-w-none"
														dangerouslySetInnerHTML={{ __html: item.description }}
													/>
												)}
											</div>
										)}
									</div>
								);
							})}
						</div>

						{/* Desktop Table View */}
						<div className="hidden sm:block overflow-x-auto -mx-4 sm:mx-0 print:block print:overflow-visible print:mx-0">
							<div className="inline-block min-w-full align-middle px-4 sm:px-0 print:px-0">
								<table className="w-full border-collapse min-w-[640px] print:min-w-0">
									<thead>
										<tr className="bg-purple-600 text-white">
											{invoiceData.columnConfiguration
												.filter((col) => col.visible)
												.map((column) => {
													const isFirstColumn = column.name.toLowerCase() === 'item';
													const columnNameLower = column.name.toLowerCase();
													const isNumericColumn =
														columnNameLower === 'quantity' ||
														columnNameLower === 'rate' ||
														columnNameLower === 'amount' ||
														columnNameLower === 'cgst' ||
														columnNameLower === 'sgst' ||
														columnNameLower === 'igst' ||
														columnNameLower === 'vat' ||
														columnNameLower === 'ppn' ||
														columnNameLower === 'sst' ||
														columnNameLower === 'hst' ||
														columnNameLower === 'tax' ||
														columnNameLower === 'total' ||
														columnNameLower.includes('rate');

													return (
														<th
															key={column.id}
															className={`py-2.5 sm:py-3 lg:py-4 px-2 sm:px-3 lg:px-4 font-semibold text-xs sm:text-sm print:py-4 print:px-4 print:text-sm ${isFirstColumn
																? 'text-left'
																: isNumericColumn
																	? 'text-right'
																	: 'text-center'
																}`}
														>
															{column.name}
														</th>
													);
												})}
										</tr>
									</thead>
									<tbody>
										{invoiceData.items.map((item, index) => (
											<React.Fragment key={item.id}>
												{/* Main Item Row */}
												<tr className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
													{invoiceData.columnConfiguration
														.filter((col) => col.visible)
														.map((column) => {
															const columnNameLower = column.name.toLowerCase();
															const isFirstColumn = columnNameLower === 'item';
															const isNumericColumn = ['gst rate', 'quantity', 'rate', 'amount', 'cgst', 'sgst', 'total'].includes(columnNameLower);

															// Get cell value
															let cellValue = '';
															if (columnNameLower === 'item') {
																cellValue = item.name || 'Unnamed Item';
															} else if (columnNameLower === 'hsn/sac' || columnNameLower === 'hsn') {
																cellValue = item.hsn;
															} else if (columnNameLower.includes('rate') && (
																columnNameLower.includes('gst') || columnNameLower.includes('vat') ||
																columnNameLower.includes('ppn') || columnNameLower.includes('sst') ||
																columnNameLower.includes('hst') || columnNameLower.includes('tax')
															)) {
																cellValue = `${item.gstRate}%`;
															} else if (columnNameLower === 'quantity') {
																cellValue = String(item.quantity);
															} else if (columnNameLower === 'rate') {
																cellValue = `${invoiceData.currency.symbol}${parseFloat(String(item.rate) || '0').toFixed(2)}`;
															} else if (columnNameLower === 'amount') {
																cellValue = `${invoiceData.currency.symbol}${parseFloat(String(item.amount) || '0').toFixed(2)}`;
															} else if (columnNameLower === 'cgst') {
																cellValue = `${invoiceData.currency.symbol}${parseFloat(String(item.cgst) || '0').toFixed(2)}`;
															} else if (columnNameLower === 'sgst') {
																cellValue = `${invoiceData.currency.symbol}${parseFloat(String(item.sgst) || '0').toFixed(2)}`;
															} else if (columnNameLower === 'igst') {
																const igst = parseFloat(String(item.cgst) || '0') + parseFloat(String(item.sgst) || '0');
																cellValue = `${invoiceData.currency.symbol}${igst.toFixed(2)}`;
															} else if (columnNameLower === 'vat' || columnNameLower === 'ppn' ||
																columnNameLower === 'sst' || columnNameLower === 'hst' || columnNameLower === 'tax') {
																const totalTax = parseFloat(String(item.cgst) || '0') + parseFloat(String(item.sgst) || '0');
																cellValue = `${invoiceData.currency.symbol}${totalTax.toFixed(2)}`;
															} else if (columnNameLower === 'total') {
																cellValue = `${invoiceData.currency.symbol}${parseFloat(String(item.total) || '0').toFixed(2)}`;
															} else {
																// Custom column
																const customValue = item.customFields?.[column.name];
																if (customValue !== undefined && customValue !== null && customValue !== '') {
																	if (column.type === 'CURRENCY') {
																		cellValue = `${invoiceData.currency.symbol}${parseFloat(String(customValue) || '0').toFixed(2)}`;
																	} else {
																		cellValue = customValue;
																	}
																} else {
																	cellValue = '-';
																}
															}

															return (
																<td
																	key={column.id}
																	className={`py-2.5 sm:py-3 lg:py-4 px-2 sm:px-3 lg:px-4 border-b border-gray-200 text-xs sm:text-sm print:py-4 print:px-4 print:text-sm ${isFirstColumn
																		? 'text-gray-900'
																		: isNumericColumn || column.type === 'CURRENCY'
																			? 'text-right text-gray-700'
																			: 'text-center text-gray-700'
																		} ${columnNameLower === 'total' ? 'font-semibold' : ''}`}
																>
																	{isFirstColumn ? (
																		<div className="flex items-center gap-1.5 sm:gap-2 print:gap-2">
																			<span className="font-medium">{index + 1}.</span>
																			<span className="font-medium">{cellValue}</span>
																		</div>
																	) : (
																		cellValue
																	)}
																</td>
															);
														})}
												</tr>

												{/* Description and Image Row - Below item name, left side only */}
												{(item.description || item.image) && (
													<tr className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
														<td
															colSpan={Math.ceil(invoiceData.columnConfiguration.filter((col) => col.visible).length / 2)}
															className="py-2 sm:py-3 px-2 sm:px-3 lg:px-4 border-b border-gray-200 print:py-3 print:px-4"
														>
															<div className="flex gap-2 sm:gap-3 items-start ml-3 sm:ml-5 print:gap-3 print:ml-5">
																{/* Image - small size */}
																{item.image && (
																	<img
																		src={item.image}
																		alt={item.name || 'Item'}
																		className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded border border-gray-300 flex-shrink-0 print:w-16 print:h-16"
																	/>
																)}
																{/* Description - Render HTML */}
																{item.description && (
																	<div
																		className="text-xs sm:text-sm text-gray-600 flex-1 prose prose-sm max-w-none print:text-sm"
																		dangerouslySetInnerHTML={{ __html: item.description }}
																	/>
																)}
															</div>
														</td>
														{/* Empty cells for right columns */}
														{Array.from({
															length: invoiceData.columnConfiguration.filter((col) => col.visible).length - Math.ceil(invoiceData.columnConfiguration.filter((col) => col.visible).length / 2)
														}).map((_, idx) => (
															<td key={idx} className="py-2 sm:py-3 px-2 sm:px-3 lg:px-4 border-b border-gray-200 print:py-3 print:px-4"></td>
														))}
													</tr>
												)}
											</React.Fragment>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>

					{/* Total in Words and Totals Section */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 print:grid-cols-2 print:gap-8 print:mb-8 page-break-avoid">
						{/* Total in Words */}
						<div>
							<p className="font-bold text-gray-900 mb-1.5 sm:mb-2 text-sm sm:text-base print:text-base print:mb-2">
								{invoiceData.totals.totalInWordsLabel}
							</p>
							<p className="text-gray-700 text-xs sm:text-sm print:text-sm">
								{invoiceData.totals.totalInWordsValue}
							</p>
						</div>

						{/* Totals */}
						<div className="space-y-2 sm:space-y-3 print:space-y-3">
							<div className="flex justify-between py-1.5 sm:py-2 text-sm sm:text-base print:py-2 print:text-base">
								<span className="text-gray-700">Amount</span>
								<span className="font-semibold text-gray-900">{invoiceData.currency.symbol}{calculateSubtotal().toFixed(2)}</span>
							</div>

							{/* Show tax based on GST configuration */}
							{invoiceData.gstConfiguration.taxType === 'GST (India)' && invoiceData.gstConfiguration.gstType === 'IGST' ? (
								// Show IGST only
								<div className="flex justify-between py-1.5 sm:py-2 text-sm sm:text-base print:py-2 print:text-base">
									<span className="text-gray-700">IGST</span>
									<span className="font-semibold text-gray-900">{invoiceData.currency.symbol}{calculateTotalTax().toFixed(2)}</span>
								</div>
							) : invoiceData.gstConfiguration.taxType === 'GST (India)' && invoiceData.gstConfiguration.gstType === 'CGST & SGST' ? (
								// Show CGST and SGST separately
								<>
									<div className="flex justify-between py-1.5 sm:py-2 text-sm sm:text-base print:py-2 print:text-base">
										<span className="text-gray-700">CGST</span>
										<span className="font-semibold text-gray-900">
											{invoiceData.currency.symbol}{(calculateTotalTax() / 2).toFixed(2)}
										</span>
									</div>
									<div className="flex justify-between py-1.5 sm:py-2 text-sm sm:text-base print:py-2 print:text-base">
										<span className="text-gray-700">SGST</span>
										<span className="font-semibold text-gray-900">
											{invoiceData.currency.symbol}{(calculateTotalTax() / 2).toFixed(2)}
										</span>
									</div>
								</>
							) : invoiceData.gstConfiguration.taxType !== 'None' ? (
								// Show other tax types (VAT, PPN, SST, HST, TAX)
								<div className="flex justify-between py-1.5 sm:py-2 text-sm sm:text-base print:py-2 print:text-base">
									<span className="text-gray-700">
										{invoiceData.gstConfiguration.taxType === 'VAT' ? 'VAT' :
											invoiceData.gstConfiguration.taxType === 'PPN' ? 'PPN' :
												invoiceData.gstConfiguration.taxType === 'SST' ? 'SST' :
													invoiceData.gstConfiguration.taxType === 'HST' ? 'HST' :
														invoiceData.gstConfiguration.taxType === 'TAX' ? 'TAX' : 'Tax'}
									</span>
									<span className="font-semibold text-gray-900">{invoiceData.currency.symbol}{calculateTotalTax().toFixed(2)}</span>
								</div>
							) : null}

							{calculateDiscount() > 0 && (
								<div className="flex justify-between py-1.5 sm:py-2 text-sm sm:text-base print:py-2 print:text-base">
									<span className="text-gray-700">Discounts</span>
									<span className="font-semibold text-gray-900">
										({invoiceData.currency.symbol}{calculateDiscount().toFixed(2)})
									</span>
								</div>
							)}

							{invoiceData.totals.additionalCharges.map((charge) => (
								<div key={charge.id} className="flex justify-between py-1.5 sm:py-2 text-sm sm:text-base print:py-2 print:text-base">
									<span className="text-gray-700">{charge.name}</span>
									<span className="font-semibold text-gray-900">
										{invoiceData.currency.symbol}{parseFloat(String(charge.amount)).toFixed(2)}
									</span>
								</div>
							))}

							<div className="border-t-2 border-gray-900 pt-2 sm:pt-3 print:pt-3">
								<div className="flex justify-between py-1.5 sm:py-2 print:py-2">
									<span className="text-base sm:text-lg font-bold text-gray-900 print:text-lg">Total ({invoiceData.currency.code})</span>
									<span className="text-base sm:text-lg font-bold text-gray-900 print:text-lg">
										{invoiceData.currency.symbol}{calculateFinalTotal().toFixed(2)}
									</span>
								</div>
							</div>

							{/* Signature - Under Total */}
							{invoiceData.signature.image && (
								<div className="flex justify-end mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200 print:mt-6 print:pt-4">
									<div className="text-center">
										<img
											src={invoiceData.signature.image}
											alt="Signature"
											className="max-h-16 sm:max-h-20 mb-1.5 sm:mb-2 mx-auto print:max-h-20 print:mb-2"
										/>
										<p className="text-xs sm:text-sm text-gray-600 print:text-sm">Authorized Signature</p>
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Terms and Conditions */}
					{invoiceData.terms.length > 0 && (
						<div className="mb-6 sm:mb-8 print:mb-8 page-break-avoid">
							<h3 className="text-base sm:text-lg font-bold text-purple-600 mb-2 sm:mb-3 print:text-lg print:mb-3">
								Terms and Conditions
							</h3>
							<ol className="list-decimal list-inside space-y-1.5 sm:space-y-2 print:space-y-2">
								{invoiceData.terms.map((term) => (
									<li key={term.id} className="text-xs sm:text-sm text-gray-700 print:text-sm">
										{term.text}
									</li>
								))}
							</ol>
						</div>
					)}

					{/* Additional Information */}
					{invoiceData.additionalInfo.length > 0 && (
						<div className="mb-3 sm:mb-4 print:mb-4">
							<h3 className="text-base sm:text-lg font-bold text-purple-600 mb-2 sm:mb-3 print:text-lg print:mb-3">
								Additional Information
							</h3>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 print:grid-cols-2 print:gap-4">
								{invoiceData.additionalInfo.map((info) => (
									<div key={info.id} className="flex gap-2 sm:gap-4 text-xs sm:text-sm print:gap-4 print:text-sm">
										<span className="text-gray-700">{info.label}</span>
										<span className="text-gray-900">{info.value}</span>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Notes */}
					{invoiceData.notes && invoiceData.notes.trim() !== '' && (
						<div className="mb-3 sm:mb-4 print:mb-4">
							<h3 className="text-base sm:text-lg font-bold text-purple-600 mb-2 sm:mb-3 print:text-lg print:mb-3">
								Notes
							</h3>
							<div
								className="text-xs sm:text-sm text-gray-700 prose prose-sm max-w-none bg-white p-0 rounded-lg print:text-sm"
								dangerouslySetInnerHTML={{ __html: invoiceData.notes }}
							/>
						</div>
					)}

					{/* Attachments */}
					{invoiceData.attachments.length > 0 && (
						<div className="mb-6 sm:mb-8 print:mb-8">
							<h3 className="text-base sm:text-lg font-bold text-purple-600 mb-2 sm:mb-3 print:text-lg print:mb-3">
								Attachments
							</h3>
							<ol className="list-decimal list-inside space-y-1.5 sm:space-y-2 print:space-y-2">
								{invoiceData.attachments.map((attachment) => (
									<li key={attachment.id} className="text-xs sm:text-sm print:text-sm">
										{attachment.url ? (
											<a
												href={attachment.url}
												download={attachment.name}
												target="_blank"
												rel="noopener noreferrer"
												className="text-purple-600 underline hover:text-purple-800 cursor-pointer transition-colors"
											>
												{attachment.name}
											</a>
										) : (
											<span className="text-purple-600">{attachment.name}</span>
										)}
										<span className="text-gray-500 text-xs ml-1 sm:ml-2 print:ml-2">
											({formatFileSize(attachment.size)})
										</span>
									</li>
								))}
							</ol>
						</div>
					)}

					{/* Contact Details Footer */}
					<div className="text-center pt-6 sm:pt-8 border-t border-gray-200 print:pt-8">
						<p className="text-xs sm:text-sm text-gray-600 print:text-sm">
							For any enquiry, reach out via email at{' '}
							<span className="font-semibold text-gray-900">Contact@elite8digital.in</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InvoicePreview;

