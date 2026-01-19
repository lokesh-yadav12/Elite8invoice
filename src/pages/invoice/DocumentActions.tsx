import React, { useState, useRef, useEffect } from 'react';
import { Plus, FileText, Paperclip, Phone, PenTool, X, Upload, Edit3, Trash2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { updateInvoiceData } from '../../store/invoiceSlice';

export default function DocumentActions() {
	const dispatch = useAppDispatch();
	const invoiceData = useAppSelector((state) => state.invoice);

	const [showSignatureModal, setShowSignatureModal] = useState(false);
	const [signatureLabel, setSignatureLabel] = useState(invoiceData.signature.label || 'Authorised Signatory');
	const [signatureMode, setSignatureMode] = useState<'pad' | 'upload' | null>(null);
	const [uploadedImage, setUploadedImage] = useState<string | null>(null);
	const [isDrawing, setIsDrawing] = useState(false);
	const [savedSignature, setSavedSignature] = useState(invoiceData.signature.image);
	const [savedLabel, setSavedLabel] = useState(invoiceData.signature.label);
	const [showTermsModal, setShowTermsModal] = useState(false);
	const [terms, setTerms] = useState(invoiceData.terms);
	const [showNotesModal, setShowNotesModal] = useState(false);
	const [notesContent, setNotesContent] = useState(invoiceData.notes);
	const [isBold, setIsBold] = useState(false);
	const [isItalic, setIsItalic] = useState(false);
	const [isStrikethrough, setIsStrikethrough] = useState(false);
	const [showAttachmentsModal, setShowAttachmentsModal] = useState(false);
	const [attachments, setAttachments] = useState(invoiceData.attachments);
	const [showContactModal, setShowContactModal] = useState(false);
	const [contactEmail, setContactEmail] = useState(invoiceData.contactDetails.email);
	const [contactPhone, setContactPhone] = useState(invoiceData.contactDetails.phone);
	const [phoneCode, setPhoneCode] = useState(invoiceData.contactDetails.phoneCode || '+91');
	const [showAdditionalInfoModal, setShowAdditionalInfoModal] = useState(false);
	const [showCustomFieldDropdown, setShowCustomFieldDropdown] = useState(false);
	const [showAddCustomFieldModal, setShowAddCustomFieldModal] = useState(false);
	const [customFields, setCustomFields] = useState(invoiceData.additionalInfo);
	const [newFieldLabel, setNewFieldLabel] = useState('');
	const [newFieldValue, setNewFieldValue] = useState('');
	const [setAsDefault, setSetAsDefault] = useState(false);

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const notesTextareaRef = useRef<HTMLDivElement>(null);
	const attachmentInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (signatureMode === 'pad' && canvasRef.current) {
			const canvas = canvasRef.current;
			const ctx = canvas.getContext('2d');
			if (ctx) {
				ctx.strokeStyle = '#000';
				ctx.lineWidth = 2;
				ctx.lineCap = 'round';
			}
		}
	}, [signatureMode]);

	// Save signature to Redux
	useEffect(() => {
		dispatch(
			updateInvoiceData({
				signature: {
					image: savedSignature,
					label: savedLabel,
				},
			}),
		);
	}, [savedSignature, savedLabel, dispatch]);

	// Save terms to Redux
	useEffect(() => {
		dispatch(
			updateInvoiceData({
				terms: terms,
			}),
		);
	}, [terms, dispatch]);

	// Save notes to Redux
	useEffect(() => {
		dispatch(
			updateInvoiceData({
				notes: notesContent,
			}),
		);
	}, [notesContent, dispatch]);

	// Save attachments to Redux
	useEffect(() => {
		dispatch(
			updateInvoiceData({
				attachments: attachments,
			}),
		);
	}, [attachments, dispatch]);

	// Save contact details to Redux
	useEffect(() => {
		dispatch(
			updateInvoiceData({
				contactDetails: {
					email: contactEmail,
					phone: contactPhone,
					phoneCode: phoneCode,
				},
			}),
		);
	}, [contactEmail, contactPhone, phoneCode, dispatch]);

	// Save additional info to Redux
	useEffect(() => {
		dispatch(
			updateInvoiceData({
				additionalInfo: customFields,
			}),
		);
	}, [customFields, dispatch]);

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file && file.type.startsWith('image/')) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setUploadedImage(e.target?.result as string);
				setSignatureMode('upload');
			};

			reader.readAsDataURL(file);
		}
	};

	const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
		setIsDrawing(true);
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		ctx.beginPath();
		ctx.moveTo(x, y);
	};

	const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
		if (!isDrawing) return;
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		ctx.lineTo(x, y);
		ctx.stroke();
	};

	const stopDrawing = () => {
		setIsDrawing(false);
	};

	// Touch event handlers for mobile devices
	const startDrawingTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
		e.preventDefault(); // Prevent scrolling while drawing
		setIsDrawing(true);
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		const rect = canvas.getBoundingClientRect();
		const touch = e.touches[0];
		const x = touch.clientX - rect.left;
		const y = touch.clientY - rect.top;
		ctx.beginPath();
		ctx.moveTo(x, y);
	};

	const drawTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
		e.preventDefault(); // Prevent scrolling while drawing
		if (!isDrawing) return;
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		const rect = canvas.getBoundingClientRect();
		const touch = e.touches[0];
		const x = touch.clientX - rect.left;
		const y = touch.clientY - rect.top;
		ctx.lineTo(x, y);
		ctx.stroke();
	};

	const stopDrawingTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
		e.preventDefault();
		setIsDrawing(false);
	};

	const clearCanvas = () => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	};

	const saveSignature = () => {
		if (signatureMode === 'upload' && uploadedImage) {
			setSavedSignature(uploadedImage);
			setSavedLabel(signatureLabel);
			setShowSignatureModal(false);
		} else if (signatureMode === 'pad') {
			const canvas = canvasRef.current;
			if (!canvas) return;
			const signatureData = canvas.toDataURL();
			setSavedSignature(signatureData);
			setSavedLabel(signatureLabel);
			setShowSignatureModal(false);
		}
		setShowSignatureModal(false); // ✅ ONLY THIS
	};

	const deleteSignature = () => {
		setSavedSignature(null);
		setSavedLabel('');
	};

	const addNewTerm = () => {
		const newId = terms.length > 0 ? Math.max(...terms.map((t) => t.id)) + 1 : 1;
		setTerms([...terms, { id: newId, text: '' }]);
	};

	const addNewGroup = () => {
		// Add functionality for adding a new group if needed
		alert('Add New Group functionality');
	};

	const updateTerm = (id: number, newText: string) => {
		setTerms(terms.map((term) => (term.id === id ? { ...term, text: newText } : term)));
	};

	const deleteTerm = (id: number) => {
		setTerms(terms.filter((term) => term.id !== id));
	};

	const moveTermUp = (id: number) => {
		const index = terms.findIndex((t) => t.id === id);
		if (index > 0) {
			const newTerms = [...terms];
			[newTerms[index], newTerms[index - 1]] = [newTerms[index - 1], newTerms[index]];
			setTerms(newTerms);
		}
	};

	const moveTermDown = (id: number) => {
		const index = terms.findIndex((t) => t.id === id);
		if (index < terms.length - 1) {
			const newTerms = [...terms];
			[newTerms[index], newTerms[index + 1]] = [newTerms[index + 1], newTerms[index]];
			setTerms(newTerms);
		}
	};


	const insertTextFormatting = (command: string) => {
		const editor = notesTextareaRef.current;
		if (!editor) return;

		editor.focus();

		// ✅ Ensure editor has a paragraph (required for lists)
		if (editor.innerHTML.trim() === '') {
			editor.innerHTML = '<p><br/></p>';
		}

		switch (command) {
			case 'bold':
				document.execCommand('bold', false, undefined);
				break;

			case 'italic':
				document.execCommand('italic', false, undefined);
				break;

			case 'strikethrough':
				document.execCommand('strikeThrough', false, undefined);
				break;

			case 'quote':
				document.execCommand('formatBlock', false, 'blockquote');
				break;

			case 'bullet':
				document.execCommand('insertUnorderedList', false, undefined);
				break;

			case 'number':
				document.execCommand('insertOrderedList', false, undefined);
				break;

			case 'line':
				document.execCommand('insertHorizontalRule', false, undefined);
				break;

			case 'link': {
				const url = prompt('Enter URL (https://...)');
				if (!url) return;

				document.execCommand('createLink', false, url);

				// ✅ Make link open in new tab + underline
				setTimeout(() => {
					const links = editor.querySelectorAll('a');
					links.forEach((link) => {
						link.setAttribute('target', '_blank');
						link.setAttribute('rel', 'noopener noreferrer');
						link.style.textDecoration = 'underline';
						link.style.color = '#2563eb'; // blue
					});
				}, 0);
				break;
			}

			default:
				break;
		}
	};


	const handleAttachmentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		const validFiles = files.filter((file: File) => file.size <= 10 * 1024 * 1024); // 10MB max

		// Convert files to data URLs for storage and preview
		validFiles.forEach((file: File, index) => {
			const reader = new FileReader();
			reader.onload = (event) => {
				const newAttachment = {
					id: Date.now() + index,
					name: file.name,
					size: file.size,
					url: event.target?.result as string, // Store data URL
				};
				setAttachments((prev) => [...prev, newAttachment]);
			};
			reader.readAsDataURL(file);
		});
	};

	const removeAttachment = (id: number) => {
		setAttachments(attachments.filter((att) => att.id !== id));
	};

	const formatFileSize = (bytes: number) => {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
	};

	const saveCustomField = () => {
		if (newFieldLabel && newFieldValue) {
			const newField = {
				id: Date.now(),
				label: newFieldLabel,
				value: newFieldValue,
				isDefault: setAsDefault,
			};
			setCustomFields([...customFields, newField]);
			setNewFieldLabel('');
			setNewFieldValue('');
			setSetAsDefault(false);
			setShowAddCustomFieldModal(false);
			setShowCustomFieldDropdown(false);
		}
	};

	const deleteCustomField = (id: number) => {
		setCustomFields(customFields.filter((field) => field.id !== id));
	};

	const resetModal = () => {
		setSignatureMode(null);
		setUploadedImage(null);
		setSignatureLabel('Authorised Signatory');
		if (canvasRef.current) {
			clearCanvas();
		}
	};

	return (
		<div className="bg-gray-50 p-2 sm:p-4">
			<div className="max-w-6xl mx-auto">
				{/* Saved Signature Display */}
				{savedSignature && (
					<div className="mb-4 bg-white rounded-lg border-2 border-purple-200 py-8 sm:py-12 px-4">
						<div className="flex items-start justify-between mb-3">
							<h3 className="text-xs font-semibold text-gray-900">{savedLabel}</h3>
							<button
								onClick={deleteSignature}
								className="text-red-500 hover:text-red-700 transition-colors"
								title="Delete signature"
							>
								<Trash2 className="w-5 h-5" />
							</button>
						</div>
						<div className="border border-gray-200 rounded-lg p-2 bg-gray-50 flex items-center justify-center">
							<img src={savedSignature} alt={savedLabel} className="max-w-full h-auto max-h-20" />
						</div>
					</div>
				)}

				{/* Top Row - Add Signature */}
				<div className="mb-4 sm:mb-6">
					<button
						onClick={() => setShowSignatureModal(true)}
						className="w-full border-2 border-dashed text-xs sm:text-sm border-gray-300 rounded-lg px-4 sm:px-6 py-2 bg-white hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3 text-gray-700 font-medium"
					>
						<PenTool className="w-5 h-5 text-purple-600" />
						<span>Add Signature</span>
					</button>
				</div>

				{/* Middle Row - Three Columns */}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
					<button
						onClick={() => setShowTermsModal(true)}
						className="border-2 border-dashed text-xs sm:text-sm border-gray-300 rounded-lg px-4 sm:px-6 py-2 bg-white hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3 text-gray-700 font-medium"
					>
						<Plus className="w-5 h-5 text-gray-600" />
						<span>Add Terms & Conditions</span>
					</button>

					<button
						onClick={() => setShowNotesModal(true)}
						className="border-2 border-dashed text-xs sm:text-sm border-gray-300 rounded-lg px-4 sm:px-6 py-2 bg-white hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3 text-gray-700 font-medium"
					>
						<FileText className="w-5 h-5 text-purple-600" />
						<span>Add Notes</span>
					</button>

					<button
						onClick={() => setShowAttachmentsModal(true)}
						className="border-2 border-dashed text-xs sm:text-sm border-gray-300 rounded-lg px-4 sm:px-6 py-2 bg-white hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3 text-gray-700 font-medium"
					>
						<Paperclip className="w-5 h-5 text-purple-600" />
						<span>Add Attachments</span>
					</button>
				</div>

				{/* Bottom Row - Two Columns */}
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
					<button
						onClick={() => setShowAdditionalInfoModal(true)}
						className="border-2 border-dashed border-gray-300 text-xs sm:text-sm rounded-lg px-4 sm:px-6 py-2 bg-white hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3 text-gray-700 font-medium"
					>
						<FileText className="w-5 h-5 text-purple-600" />
						<span>Add Additional Info</span>
					</button>

					<button
						onClick={() => setShowContactModal(true)}
						className="border-2 border-dashed border-gray-300 text-xs sm:text-sm rounded-lg px-4 sm:px-6 py-2 bg-white hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3 text-gray-700 font-medium"
					>
						<Phone className="w-5 h-5 text-purple-600" />
						<span>Add Contact Details</span>
					</button>
				</div>
			</div>

			{/* Signature Modal */}
			{showSignatureModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
						{/* Header */}
						<div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
							<h2 className="text-2xl font-semibold text-gray-900">Signature</h2>
							<button
								onClick={() => {
									setShowSignatureModal(false);
									resetModal();
								}}
								className="text-gray-400 hover:text-gray-600 transition-colors"
							>
								<X className="w-6 h-6" />
							</button>
						</div>

						{/* Content */}
						<div className="p-6">
							{!signatureMode && (
								<>
									{/* Upload Icon */}
									<div className="flex flex-col items-center justify-center py-12 mb-8">
										<div className="relative mb-4">
											<svg
												className="w-16 h-16 text-purple-600"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M7 18C4.23858 18 2 15.7614 2 13C2 10.2386 4.23858 8 7 8C7.16762 8 7.33366 8.00784 7.49772 8.02311C8.06568 5.08302 10.7361 3 13.9 3C17.4242 3 20.3 5.87579 20.3 9.4C20.3 9.56264 20.2932 9.72372 20.2799 9.88311C22.1164 10.5327 23.4 12.3354 23.4 14.4C23.4 17.0509 21.2509 19.2 18.6 19.2"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<path
													d="M12 12L12 21M12 12L9 15M12 12L15 15"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</div>
										<p className="text-gray-700 font-medium">Upload</p>
									</div>

									{/* Upload Signature Button */}
									<input
										type="file"
										ref={fileInputRef}
										onChange={handleFileUpload}
										accept="image/*"
										className="hidden"
									/>
									<div className="flex flex-col py-2">
										<button
											className="flex items-center py-3 justify-center border-2 my-1 gap-3 text-gray-600 font-medium border-dotted "
											onClick={() => fileInputRef.current?.click()}
										>
											<Upload className="w-5 h-5 text-purple-600" />
											<span>Upload Signature</span>
										</button>
									</div>
									{/* Use Signature Pad Button */}
									<button
										onClick={() => setSignatureMode('pad')}
										className="w-full border-2 border-dashed border-gray-300 rounded-lg px-6 py-2 mb-5 bg-white hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 flex items-center justify-center gap-3 text-gray-600 font-medium"
									>
										<Edit3 className="w-5 h-5 text-purple-600" />
										<span>Use Signature Pad</span>
									</button>
								</>
							)}

							{/* Upload Mode */}
							{signatureMode === 'upload' && (
								<div className="mb-8">
									<div className="border-2 border-gray-300 rounded-lg mb-4 bg-white p-4">
										{uploadedImage ? (
											<div className="flex items-center justify-center min-h-[200px]">
												<img
													src={uploadedImage}
													alt="Uploaded signature"
													className="max-w-full h-auto max-h-48"
												/>
											</div>
										) : (
											<div className="flex items-center justify-center min-h-[200px]">
												<p className="text-gray-500">No image uploaded yet</p>
											</div>
										)}
									</div>
									<div className="flex gap-3">
										<button
											onClick={() => fileInputRef.current?.click()}
											className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
										>
											Choose File
										</button>
										<button
											onClick={() => {
												setSignatureMode(null);
												setUploadedImage(null);
											}}
											className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
										>
											Cancel
										</button>
									</div>
								</div>
							)}

							{/* Signature Pad Mode */}
							{signatureMode === 'pad' && (
								<div className="mb-8">
									<div className="border-2 border-gray-300 rounded-lg mb-4 bg-white">
										<canvas
											ref={canvasRef}
											width={450}
											height={200}
											onMouseDown={startDrawing}
											onMouseMove={draw}
											onMouseUp={stopDrawing}
											onMouseLeave={stopDrawing}
											onTouchStart={startDrawingTouch}
											onTouchMove={drawTouch}
											onTouchEnd={stopDrawingTouch}
											onTouchCancel={stopDrawingTouch}
											className="w-full cursor-crosshair touch-none"
											style={{ touchAction: 'none' }}
										/>
									</div>
									<div className="flex gap-3">
										<button
											onClick={clearCanvas}
											className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
										>
											Clear
										</button>
										<button
											onClick={() => {
												setSignatureMode(null);
												clearCanvas();
											}}
											className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
										>
											Cancel
										</button>
									</div>
								</div>
							)}

							{/* Add Signature Label */}
							<div className="mb-6">
								<label className="block text-lg font-semibold text-gray-900 mb-3">
									Add signature label
								</label>
								<div className="relative">
									<input
										type="text"
										value={signatureLabel}
										onChange={(e) => setSignatureLabel(e.target.value)}
										className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
										placeholder="Enter signature label"
									/>
									{signatureLabel && (
										<button
											onClick={() => setSignatureLabel('')}
											className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
										>
											<X className="w-5 h-5" />
										</button>
									)}
								</div>
							</div>

							{/* Save Button */}
							{signatureMode && (
								<button
									onClick={saveSignature}
									disabled={signatureMode === 'upload' && !uploadedImage}
									className="w-full bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
								>
									Save Signature
								</button>
							)}
						</div>
					</div>
				</div>
			)}

			{/* Terms and Conditions Modal */}
			{showTermsModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
					<div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
						{/* Header */}
						<div className="flex items-center justify-between p-4 sm:p-6 border-b sticky top-0 bg-white z-10">
							<h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">Terms and Conditions</h2>
							<button
								onClick={() => setShowTermsModal(false)}
								className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
							>
								<X className="w-5 h-5 sm:w-6 sm:h-6" />
							</button>
						</div>

						{/* Content */}
						<div className="p-3 sm:p-4 md:p-6">
							{/* Terms List */}
							<div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
								{terms.map((term, index) => (
									<div key={term.id} className="flex items-start gap-2 sm:gap-3 md:gap-4 group">
										<span className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mt-2 sm:mt-3 min-w-[30px] sm:min-w-[40px] flex-shrink-0">
											{String(index + 1).padStart(2, '0')}
										</span>
										<input
											type="text"
											value={term.text}
											onChange={(e) => updateTerm(term.id, e.target.value)}
											className="flex-1 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-w-0"
											placeholder="Enter term or condition"
										/>
										<div className="flex items-center gap-1 sm:gap-2 mt-2 flex-shrink-0">
											<button
												onClick={() => deleteTerm(term.id)}
												className="text-gray-400 hover:text-red-600 transition-colors p-1"
												title="Delete term"
											>
												<X className="w-4 h-4 sm:w-5 sm:h-5" />
											</button>
											<button
												onClick={() => moveTermDown(term.id)}
												disabled={index === terms.length - 1}
												className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed p-1"
												title="Move down"
											>
												<svg
													className="w-4 h-4 sm:w-5 sm:h-5"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M19 9l-7 7-7-7"
													/>
												</svg>
											</button>
											<button
												onClick={() => moveTermUp(term.id)}
												disabled={index === 0}
												className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed p-1"
												title="Move up"
											>
												<svg
													className="w-4 h-4 sm:w-5 sm:h-5"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M5 15l7-7 7 7"
													/>
												</svg>
											</button>
										</div>
									</div>
								))}
							</div>

							{/* Action Buttons */}
							<div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
								<button
									onClick={addNewTerm}
									className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm md:text-base text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
								>
									<Plus className="w-3 h-3 sm:w-4 sm:h-4" />
									<span>Add New Term</span>
								</button>
								<button
									onClick={addNewGroup}
									className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm md:text-base text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
								>
									<Plus className="w-3 h-3 sm:w-4 sm:h-4" />
									<span>Add New Group</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Additional Notes Modal */}
			{showNotesModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
						{/* Header */}
						<div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
							<h2 className="text-2xl font-semibold text-gray-900">Additional Notes</h2>
							<button
								onClick={() => setShowNotesModal(false)}
								className="text-gray-400 hover:text-gray-600 transition-colors"
							>
								<X className="w-6 h-6" />
							</button>
						</div>

						{/* Content */}
						<div className="p-6">
							{/* Formatting Toolbar */}
							<div className="border border-gray-300 rounded-t-lg bg-gray-50 px-4 py-3 flex items-center gap-4">
								{/* Bold */}
								<button
									onClick={() => insertTextFormatting('bold')}
									className="text-gray-600 hover:text-gray-900 transition-colors p-1"
									title="Bold"
								>
									<span className="font-bold text-xl">B</span>
								</button>

								{/* Italic */}
								<button
									onClick={() => insertTextFormatting('italic')}
									className="text-gray-600 hover:text-gray-900 transition-colors p-1"
									title="Italic"
								>
									<span className="italic text-xl">I</span>
								</button>

								{/* Strikethrough */}
								<button
									onClick={() => insertTextFormatting('strikethrough')}
									className="text-gray-600 hover:text-gray-900 transition-colors p-1"
									title="Strikethrough"
								>
									<span className="line-through text-xl">S</span>
								</button>

								<div className="w-px h-6 bg-gray-300"></div>

								{/* Horizontal Line */}
								<button
									onClick={() => insertTextFormatting('line')}
									className="text-gray-600 hover:text-gray-900 transition-colors p-1"
									title="Horizontal Line"
								>
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 12h14"
										/>
									</svg>
								</button>

								{/* Quote */}
								<button
									onClick={() => insertTextFormatting('quote')}
									className="text-gray-600 hover:text-gray-900 transition-colors p-1"
									title="Quote"
								>
									<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
										<path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
									</svg>
								</button>

								{/* Link */}
								<button
									onClick={() => insertTextFormatting('link')}
									className="text-gray-600 hover:text-gray-900 transition-colors p-1"
									title="Link"
								>
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
										/>
									</svg>
								</button>

								<div className="w-px h-6 bg-gray-300"></div>

								{/* Bullet List */}
								<button
									onClick={() => insertTextFormatting('bullet')}
									className="text-gray-600 hover:text-gray-900 transition-colors p-1"
									title="Bullet List"
								>
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4 6h16M4 12h16M4 18h16"
										/>
									</svg>
								</button>

								{/* Numbered List */}
								<button
									onClick={() => insertTextFormatting('number')}
									className="text-gray-600 hover:text-gray-900 transition-colors p-1"
									title="Numbered List"
								>
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4 6h16M4 12h16m-7 6h7"
										/>
									</svg>
								</button>
							</div>

							{/* Text Area */}
							<div
								ref={notesTextareaRef}
								contentEditable
								suppressContentEditableWarning
								className="w-full min-h-[300px] border border-t-0 border-gray-300 rounded-b-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
								style={{
									listStylePosition: 'inside',
								}}
								onInput={(e) => setNotesContent(e.currentTarget.innerHTML)}
								onClick={(e) => {
									const target = e.target as HTMLElement;
									if (target.tagName === 'A') {
										e.preventDefault();
										window.open((target as HTMLAnchorElement).href, '_blank');
									}
								}}
							></div>


							{/* Save Button */}
							<div className="mt-6 flex justify-end gap-3">
								<button
									onClick={() => {
										setShowNotesModal(false);
										setNotesContent('');
									}}
									className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
								>
									Cancel
								</button>
								<button
									onClick={() => {
										// Save notes functionality
										alert('Notes saved!');
										setShowNotesModal(false);
									}}
									className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
								>
									Save Notes
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Attachments Modal */}
			{showAttachmentsModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
						{/* Header */}
						<div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
							<div>
								<h2 className="text-2xl font-semibold text-gray-900">Attachments</h2>
								<p className="text-sm text-gray-600 mt-1">
									Attachments will not appear as separate documents; instead, they will be available
									as clickable links within the invoice.
								</p>
								<p className="text-sm text-gray-600">The maximum file size is 10 MB.</p>
							</div>
							<button
								onClick={() => setShowAttachmentsModal(false)}
								className="text-gray-400 hover:text-gray-600 transition-colors"
							>
								<X className="w-6 h-6" />
							</button>
						</div>

						{/* Content */}
						<div className="p-6">
							{/* Upload Button */}
							<input
								type="file"
								ref={attachmentInputRef}
								onChange={handleAttachmentUpload}
								multiple
								className="hidden"
							/>
							<button
								onClick={() => attachmentInputRef.current?.click()}
								className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg bg-white hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 flex items-center justify-center"
							>
								<Plus className="w-8 h-8 text-gray-400" />
							</button>

							{/* Attachments List */}
							{attachments.length > 0 && (
								<div className="mt-6 space-y-3">
									{attachments.map((attachment) => (
										<div
											key={attachment.id}
											className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
										>
											<div className="flex items-center gap-3 flex-1 min-w-0">
												<Paperclip className="w-5 h-5 text-gray-400 flex-shrink-0" />
												<div className="flex-1 min-w-0">
													<p className="text-sm font-medium text-gray-900 truncate">
														{attachment.name}
													</p>
													<p className="text-xs text-gray-500">
														{formatFileSize(attachment.size)}
													</p>
												</div>
											</div>
											<button
												onClick={() => removeAttachment(attachment.id)}
												className="text-gray-400 hover:text-red-600 transition-colors ml-2"
											>
												<X className="w-5 h-5" />
											</button>
										</div>
									))}
								</div>
							)}

							{/* Save Button */}
							<div className="mt-6 flex justify-end gap-3">
								<button
									onClick={() => {
										setShowAttachmentsModal(false);
									}}
									className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
								>
									Cancel
								</button>
								<button
									onClick={() => {
										alert(`${attachments.length} attachment(s) saved!`);
										setShowAttachmentsModal(false);
									}}
									className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
								>
									Save Attachments
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Contact Details Modal */}
			{showContactModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-lg shadow-xl w-full max-w-3xl">
						{/* Header */}
						<div className="flex items-center justify-between p-4 sm:p-6 border-b">
							<h2 className="text-lg sm:text-2xl font-semibold text-gray-900">Your Contact Details</h2>
							<button
								onClick={() => setShowContactModal(false)}
								className="text-gray-400 hover:text-gray-600 transition-colors"
							>
								<X className="w-6 h-6" />
							</button>
						</div>

						{/* Content */}
						<div className="p-4 sm:p-6 w-full max-w-[600px] mx-auto">
							<div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm sm:text-base text-gray-700">
								<span>For any enquiry, reach out via</span>

								{/* Email Input */}
								<div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
									<span className="text-xs sm:text-sm">email at</span>
									<div className="flex items-center gap-2 px-2 sm:px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 flex-1 sm:flex-initial min-w-0">
										<svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
											<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
											<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
										</svg>
										<input
											type="email"
											value={contactEmail}
											onChange={(e) => setContactEmail(e.target.value)}
											placeholder="Your Email (optional)"
											className="bg-transparent border-none outline-none text-sm sm:text-base text-gray-700 placeholder-gray-400 w-full min-w-0 sm:min-w-[200px]"
										/>
									</div>
								</div>

								{/* Phone Input */}
								<div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
									<span className="text-xs sm:text-sm">call on</span>
									<div className="flex items-center gap-2 flex-1 sm:flex-initial">
										{/* Country Code Dropdown */}
										<div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
											<span className="text-xl">🇮🇳</span>
											<select
												value={phoneCode}
												onChange={(e) => setPhoneCode(e.target.value)}
												className="bg-transparent border-none outline-none text-gray-700 cursor-pointer"
											>
												<option value="+91">+91</option>
												<option value="+1">+1</option>
												<option value="+44">+44</option>
												<option value="+86">+86</option>
												<option value="+81">+81</option>
												<option value="+49">+49</option>
												<option value="+33">+33</option>
												<option value="+61">+61</option>
												<option value="+971">+971</option>
												<option value="+65">+65</option>
											</select>
											{/* <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg> */}
										</div>

										{/* Phone Number Input */}
										<input
											type="tel"
											value={contactPhone}
											onChange={(e) => setContactPhone(e.target.value)}
											placeholder="Phone Number"
											className="px-2 sm:px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-purple-500 w-full sm:min-w-[120px]"
										/>
									</div>
								</div>
							</div>

							{/* Save Button */}
							<div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-start gap-3 sm:px-24">
								<button
									onClick={() => setShowContactModal(false)}
									className="w-full sm:w-auto px-4 sm:px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
								>
									Cancel
								</button>
								<button
									onClick={() => {
										alert('Contact details saved!');
										setShowContactModal(false);
									}}
									className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
								>
									Save Contact Details
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Additional Info Modal */}
			{showAdditionalInfoModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
						{/* Header */}
						<div className="flex items-center justify-between p-6 border-b">
							<h2 className="text-2xl font-semibold text-gray-900">Additional Info</h2>
							<button
								onClick={() => {
									setShowAdditionalInfoModal(false);
									setShowCustomFieldDropdown(false);
								}}
								className="text-gray-400 hover:text-gray-600 transition-colors"
							>
								<X className="w-6 h-6" />
							</button>
						</div>

						{/* Content */}
						<div className="p-6">
							{/* Custom Fields List */}
							{customFields.length > 0 && (
								<div className="mb-6 space-y-3">
									{customFields.map((field) => (
										<div
											key={field.id}
											className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50"
										>
											<div>
												<p className="font-medium text-gray-900">{field.label}</p>
												<p className="text-sm text-gray-600">{field.value}</p>
											</div>
											<button
												onClick={() => deleteCustomField(field.id)}
												className="text-gray-400 hover:text-red-600 transition-colors"
											>
												<X className="w-5 h-5" />
											</button>
										</div>
									))}
								</div>
							)}

							{/* Add Custom Fields Button */}
							<button
								onClick={() => setShowCustomFieldDropdown(!showCustomFieldDropdown)}
								className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
							>
								<Plus className="w-5 h-5" />
								<span>Add Custom Fields</span>
							</button>

							{/* Custom Field Dropdown */}
							{showCustomFieldDropdown && (
								<div className="mt-4 border border-gray-300 rounded-lg bg-white shadow-lg">
									<div className="relative">
										<input
											type="text"
											placeholder="Select any custom field"
											className="w-full px-4 py-3 border-b border-gray-200 outline-none"
											readOnly
										/>
										<button className="absolute right-3 top-1/2 -translate-y-1/2">
											<svg
												className="w-5 h-5 text-gray-600"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M5 15l7-7 7 7"
												/>
											</svg>
										</button>
									</div>
									<div className="p-4 text-center text-gray-400">No options</div>
									<div className="p-4 border-t border-gray-200">
										<button
											onClick={() => {
												setShowAddCustomFieldModal(true);
												setShowCustomFieldDropdown(false);
											}}
											className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
										>
											Add New Custom Field
										</button>
									</div>
								</div>
							)}

							{/* Save Button */}
							<div className="mt-6 flex justify-end gap-3">
								<button
									onClick={() => {
										setShowAdditionalInfoModal(false);
										setShowCustomFieldDropdown(false);
									}}
									className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
								>
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Add Custom Field Modal */}
			{showAddCustomFieldModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]">
					<div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
						{/* Header */}
						<div className="flex items-center justify-between p-6 border-b">
							<h2 className="text-xl font-semibold text-gray-900">Add Custom Field</h2>
							<button
								onClick={() => {
									setShowAddCustomFieldModal(false);
									setNewFieldLabel('');
									setNewFieldValue('');
									setSetAsDefault(false);
								}}
								className="text-gray-400 hover:text-gray-600 transition-colors"
							>
								<X className="w-6 h-6" />
							</button>
						</div>

						{/* Content */}
						<div className="p-6">
							{/* Label Field */}
							<div className="mb-6">
								<label className="block text-gray-900 font-medium mb-2">
									Label<span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									value={newFieldLabel}
									onChange={(e) => setNewFieldLabel(e.target.value)}
									placeholder="Enter field label"
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
								/>
							</div>

							{/* Value Field */}
							<div className="mb-6">
								<label className="block text-gray-900 font-medium mb-2">Value</label>
								<input
									type="text"
									value={newFieldValue}
									onChange={(e) => setNewFieldValue(e.target.value)}
									placeholder="Enter field value"
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
								/>
							</div>

							{/* Set as Default Checkbox */}
							<div className="mb-6 flex items-center gap-2">
								<input
									type="checkbox"
									id="setAsDefault"
									checked={setAsDefault}
									onChange={(e) => setSetAsDefault(e.target.checked)}
									className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
								/>
								<label htmlFor="setAsDefault" className="text-gray-700">
									Set as default value
								</label>
							</div>

							{/* Action Buttons */}
							<div className="flex justify-end gap-3">
								<button
									onClick={() => {
										setShowAddCustomFieldModal(false);
										setNewFieldLabel('');
										setNewFieldValue('');
										setSetAsDefault(false);
									}}
									className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
								>
									Cancel
								</button>
								<button
									onClick={saveCustomField}
									disabled={!newFieldLabel || !newFieldValue}
									className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
								>
									Save
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
