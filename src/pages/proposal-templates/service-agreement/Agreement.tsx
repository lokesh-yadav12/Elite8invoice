import React, { useState } from 'react';
import { useAppDispatch } from '../../../store';
import { updateInvoiceData } from '../../../store/invoiceSlice';

const Agreement = () => {
    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState({
        subject: 'Agreement on Services and Key Terms for Your Website Development Project',
        greeting: 'Dear Reclipse Photography & Films,',
        intro: 'Thanks for choosing Elite8 Digital for your website development. This letter outlines the core terms for our engagement on your project. Your signature below confirms your agreement to these essential terms.',
        scopeTitle: '1. Scope of Services & Deliverables',
        scopeContent: 'Elite8 Digital will design and develop your website as detailed in the attached Project Proposal. Any services not explicitly listed in the Project Proposal are excluded from this agreement',
        timelineTitle: '2. Project Timeline & Client Responsibilities',
        timelineContent: 'The estimated project completion timeline will be communicated upon project commencement. This timeline is subject to your timely provision of all necessary content, images, feedback, and approvals. Delays caused by the client will extend the project timeline.',
        paymentTitle: '3. Payment Terms',
        paymentCost: '40,000',
        paymentTerms: [
            '50% (non-refundable): Due upon signing this agreement. Website development will commence only after receipt of this payment.',
            '25%: Due upon completion of the development phase.',
            '25%: Due upon final launch of the website.'
        ],
        paymentNote: 'All invoices are due within 7 days of receipt.',
        revisionsTitle: '4. Design & Content Revisions',
        revisionsContent: [
            'During the initial development phase, feedback on design and content will be incorporated.',
            'Clients must provide consolidated design change requests during scheduled demo sessions; continuous, fragmented requests won\'t be accommodated as they significantly delay the project.',
            'Once the development phase is completed, any major changes to requirements, design, or core content pages will be considered outside the initial scope and will incur additional charges.',
            'Website content and images are to be provided by the client.'
        ],
        supportTitle: '5. Post-Launch Support & Maintenance',
        supportContent: [
            'Upon website launch, Elite8 Digital will conduct a 7-day bug fixing and final review period to address any technical issues directly attributable to our development.',
            'After this 7-day period, Elite8 Digital isn\'t responsible for making any further changes, updates, or maintenance, unless a separate maintenance package is agreed upon.',
            'Any requested modifications, content changes, or support after this period will be subject to additional charges.'
        ],
        ipTitle: '6. Intellectual Property (IP) Ownership',
        ipContent: [
            'Upon full and final payment, Reclipse Photography & Films will own the intellectual property rights to the completed website.',
            'This excludes any third-party tools, frameworks, or Elite8 Digital\'s proprietary code libraries used in the development.',
            'Elite8 Digital reserves the right to display the completed work in its portfolio and marketing materials.'
        ],
        confidentialityTitle: '7. Confidentiality',
        confidentialityContent: 'Both Elite8 Digital and Reclipse Photography & Films agree to maintain the confidentiality of all proprietary and confidential information disclosed during the course of this project.',
        liabilityTitle: '8. Limitation of Liability',
        liabilityContent: 'Elite8 Digital warrants that services will be performed professionally Elite8 Digital\'s total liability under this agreement shall not exceed the total fees paid by [Client Name] for this specific project.',
        acceptanceTitle: 'Acceptance of Terms:',
        acceptanceContent: 'By signing below, you acknowledge that you have read, understood, and agree to the terms and conditions outlined in this letter. This document, along with the attached Project Proposal, constitutes the entire agreement between Elite8 Digital and Reclipse Photography & Films for this project.',
        signatureLabel: 'For Reclipse Photography & Films:',
        signatureName: '[Name]',
        signatureText: '[Signature]',
        signatureDate: 'Date: 18th Sep.25'
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleArrayInputChange = (field: string, index: number, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: (prev[field as keyof typeof prev] as string[]).map((item, i) => i === index ? value : item)
        }));
    };

    const handleSaveAndContinue = () => {
        dispatch(updateInvoiceData({ agreementData: formData }));
        const event = new Event('switchToPreview');
        window.dispatchEvent(event);
    };

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-[210mm] mx-auto bg-white shadow-lg">
                <div className="p-10 border-4 border-orange-500">
                    <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">📄 PAGE 1 - EDIT MODE</h2>
                    <div className="space-y-4 text-[13px]">
                        <input type="text" value={formData.subject} onChange={(e) => handleInputChange('subject', e.target.value)} className="w-full px-2 py-1 border-2 border-orange-300 rounded focus:ring-2 focus:ring-orange-500 bg-orange-50 font-bold" />
                        <input type="text" value={formData.greeting} onChange={(e) => handleInputChange('greeting', e.target.value)} className="w-full px-2 py-1 border-2 border-orange-300 rounded focus:ring-2 focus:ring-orange-500 bg-orange-50" />
                        <textarea value={formData.intro} onChange={(e) => handleInputChange('intro', e.target.value)} rows={3} className="w-full px-2 py-1 border-2 border-orange-300 rounded focus:ring-2 focus:ring-orange-500 bg-orange-50" />
                        <input type="text" value={formData.scopeTitle} onChange={(e) => handleInputChange('scopeTitle', e.target.value)} className="w-full px-2 py-1 border-2 border-orange-300 rounded focus:ring-2 focus:ring-orange-500 bg-orange-50 font-bold" />
                        <textarea value={formData.scopeContent} onChange={(e) => handleInputChange('scopeContent', e.target.value)} rows={2} className="w-full px-2 py-1 border border-orange-300 rounded focus:ring-2 focus:ring-orange-500 bg-orange-50" />
                        <input type="text" value={formData.timelineTitle} onChange={(e) => handleInputChange('timelineTitle', e.target.value)} className="w-full px-2 py-1 border-2 border-orange-300 rounded focus:ring-2 focus:ring-orange-500 bg-orange-50 font-bold" />
                        <textarea value={formData.timelineContent} onChange={(e) => handleInputChange('timelineContent', e.target.value)} rows={3} className="w-full px-2 py-1 border border-orange-300 rounded focus:ring-2 focus:ring-orange-500 bg-orange-50" />
                        <input type="text" value={formData.paymentTitle} onChange={(e) => handleInputChange('paymentTitle', e.target.value)} className="w-full px-2 py-1 border-2 border-orange-300 rounded focus:ring-2 focus:ring-orange-500 bg-orange-50 font-bold" />
                        <div className="flex gap-2"><span>Cost:</span><input type="text" value={formData.paymentCost} onChange={(e) => handleInputChange('paymentCost', e.target.value)} className="w-32 px-2 py-1 border-2 border-orange-300 rounded bg-orange-50" /></div>
                        {formData.paymentTerms.map((term, i) => <textarea key={i} value={term} onChange={(e) => handleArrayInputChange('paymentTerms', i, e.target.value)} rows={2} className="w-full px-2 py-1 border border-orange-300 rounded bg-orange-50" />)}
                        <input type="text" value={formData.paymentNote} onChange={(e) => handleInputChange('paymentNote', e.target.value)} className="w-full px-2 py-1 border border-orange-300 rounded bg-orange-50" />
                        <input type="text" value={formData.revisionsTitle} onChange={(e) => handleInputChange('revisionsTitle', e.target.value)} className="w-full px-2 py-1 border-2 border-orange-300 rounded bg-orange-50 font-bold" />
                        {formData.revisionsContent.map((item, i) => <textarea key={i} value={item} onChange={(e) => handleArrayInputChange('revisionsContent', i, e.target.value)} rows={2} className="w-full px-2 py-1 border border-orange-300 rounded bg-orange-50" />)}
                    </div>
                </div>
                <div className="p-10 border-4 border-purple-500 mt-8">
                    <h2 className="text-2xl font-bold text-purple-600 mb-6 text-center">📄 PAGE 2 - EDIT MODE</h2>
                    <div className="space-y-4 text-[13px]">
                        <input type="text" value={formData.supportTitle} onChange={(e) => handleInputChange('supportTitle', e.target.value)} className="w-full px-2 py-1 border-2 border-purple-300 rounded bg-purple-50 font-bold" />
                        {formData.supportContent.map((item, i) => <textarea key={i} value={item} onChange={(e) => handleArrayInputChange('supportContent', i, e.target.value)} rows={2} className="w-full px-2 py-1 border border-purple-300 rounded bg-purple-50" />)}
                        <input type="text" value={formData.ipTitle} onChange={(e) => handleInputChange('ipTitle', e.target.value)} className="w-full px-2 py-1 border-2 border-purple-300 rounded bg-purple-50 font-bold" />
                        {formData.ipContent.map((item, i) => <textarea key={i} value={item} onChange={(e) => handleArrayInputChange('ipContent', i, e.target.value)} rows={2} className="w-full px-2 py-1 border border-purple-300 rounded bg-purple-50" />)}
                        <input type="text" value={formData.confidentialityTitle} onChange={(e) => handleInputChange('confidentialityTitle', e.target.value)} className="w-full px-2 py-1 border-2 border-purple-300 rounded bg-purple-50 font-bold" />
                        <textarea value={formData.confidentialityContent} onChange={(e) => handleInputChange('confidentialityContent', e.target.value)} rows={2} className="w-full px-2 py-1 border border-purple-300 rounded bg-purple-50" />
                        <input type="text" value={formData.liabilityTitle} onChange={(e) => handleInputChange('liabilityTitle', e.target.value)} className="w-full px-2 py-1 border-2 border-purple-300 rounded bg-purple-50 font-bold" />
                        <textarea value={formData.liabilityContent} onChange={(e) => handleInputChange('liabilityContent', e.target.value)} rows={2} className="w-full px-2 py-1 border border-purple-300 rounded bg-purple-50" />
                        <input type="text" value={formData.acceptanceTitle} onChange={(e) => handleInputChange('acceptanceTitle', e.target.value)} className="w-full px-2 py-1 border-2 border-purple-300 rounded bg-purple-50 font-bold" />
                        <textarea value={formData.acceptanceContent} onChange={(e) => handleInputChange('acceptanceContent', e.target.value)} rows={3} className="w-full px-2 py-1 border border-purple-300 rounded bg-purple-50" />
                        <input type="text" value={formData.signatureLabel} onChange={(e) => handleInputChange('signatureLabel', e.target.value)} className="w-full px-2 py-1 border-2 border-purple-300 rounded bg-purple-50 font-bold" />
                        <input type="text" value={formData.signatureName} onChange={(e) => handleInputChange('signatureName', e.target.value)} className="w-full px-2 py-1 border border-purple-300 rounded bg-purple-50" />
                        <input type="text" value={formData.signatureText} onChange={(e) => handleInputChange('signatureText', e.target.value)} className="w-full px-2 py-1 border border-purple-300 rounded bg-purple-50" />
                        <input type="text" value={formData.signatureDate} onChange={(e) => handleInputChange('signatureDate', e.target.value)} className="w-full px-2 py-1 border border-purple-300 rounded bg-purple-50" />
                    </div>
                </div>
                <div className="p-6 bg-gray-100">
                    <button onClick={handleSaveAndContinue} className="w-full px-6 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-bold text-lg">💾 Save & Switch to Preview</button>
                </div>
            </div>
        </div>
    );
};

export default Agreement;
