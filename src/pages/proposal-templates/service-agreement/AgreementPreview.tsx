import React from 'react';
import { useAppSelector } from '../../../store';

const AgreementPreview = () => {
    const data = useAppSelector((state) => state.invoice.agreementData) || {
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
    };

    const Header = () => (
        <div>
            <div className="relative h-16">
                <div style={{ position: 'absolute', top: 0, left: 0, width: '60%', height: '24px', backgroundColor: '#06b6d4' }}></div>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '24px', backgroundColor: '#1e293b' }}></div>
                <div style={{ position: 'absolute', top: '4px', left: 0, width: '60%', height: '40px' }}>
                    <svg viewBox="0 0 100 20" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                        <path d="M 0 0 Q 80 20 100 0 L 100 20 L 0 20 Z" fill="#06b6d4" />
                    </svg>
                </div>
            </div>
            <div className="px-10 pb-4">
                <div className="flex justify-between items-start pb-4 border-b-4 border-gray-900">
                    <div className="flex items-center gap-6">
                        <div style={{ width: '150px', height: '120px' }}>
                            <img src="/elite8digital-nav.png" alt="Elite8 Digital" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-center text-gray-900">ELITE8 DIGITAL</h1>
                            <p className="text-xs text-gray-600 mt-2 uppercase">FROM IMAGINATION TO INNOVATION - WE BUILD IT</p>
                        </div>
                    </div>
                    <div className="text-right text-xs border-l-4 border-gray-900 pl-6">
                        <p className="font-bold">CIN:- U62099MP2025PTC076466</p>
                        <p className="font-bold mb-3">GST:- 23AAICE8606R1Z3</p>
                        <p><b>Phone:</b> +91 6260894977</p>
                        <p><b>ADD:</b> 2/5, MIG Sant Kabir Nagar</p>
                        <p>Ujjain M.P - 456010</p>
                        <p><b>Email:</b> help@elite8digital.in</p>
                        <p><b>Website:</b> www.elite8digital.in</p>
                    </div>
                </div>
                <div className="border-b-2 border-gray-900 mt-1"></div>
            </div>
        </div>
    );

    const Footer = () => (
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '64px' }}>
            <div style={{ position: 'absolute', bottom: '0px', left: 0, width: '60%', height: '40px' }}>
                <svg viewBox="0 0 100 20" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                    <path d="M 0 20 Q 80 0 100 20 L 100 0 L 0 0 Z" fill="#06b6d4" />
                </svg>
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '60%', height: '24px', backgroundColor: '#06b6d4' }}></div>
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '40%', height: '24px', backgroundColor: '#1e293b' }}></div>
        </div>
    );

    return (
        <div style={{ lineHeight: 0, fontSize: 0 }}>
            <style>{`
                @media print {
                    body { margin: 0; padding: 0; }
                    .page-container { 
                        page-break-after: always;
                        page-break-inside: avoid;
                    }
                    .page-container:last-child { 
                        page-break-after: avoid;
                    }
                }
            `}</style>
            <div className="page-container" style={{ width: '210mm', height: '297mm', position: 'relative', margin: '0 auto', backgroundColor: 'white', lineHeight: 'normal', fontSize: '14px' }}>
                <Header />
                <div className="px-10 py-6 text-sm" style={{ maxHeight: 'calc(297mm - 280px)', overflow: 'hidden', paddingTop: '24px' }}>
                    <div className="mb-6">
                        <p className="font-bold">Subject: {data.subject}</p>
                    </div>
                    <p className="mb-3">{data.greeting}</p>
                    <p className="mb-6">{data.intro}</p>
                    <div className="mb-5">
                        <p className="font-bold mb-2">{data.scopeTitle}</p>
                        <p>{data.scopeContent}</p>
                    </div>
                    <div className="mb-5">
                        <p className="font-bold mb-2">{data.timelineTitle}</p>
                        <p>{data.timelineContent}</p>
                    </div>
                    <div className="mb-5">
                        <p className="font-bold mb-2">{data.paymentTitle}</p>
                        <p className="mb-2">The total project cost is {data.paymentCost}/-. Payment will be made in the following installments:</p>
                        <ul className="ml-4 space-y-1">
                            {data.paymentTerms.map((t: string, i: number) => (
                                <li key={i} className="flex gap-2"><span>•</span><span>{t}</span></li>
                            ))}
                        </ul>
                        <p className="mt-2">{data.paymentNote}</p>
                    </div>
                    <div className="mb-5">
                        <p className="font-bold mb-2">{data.revisionsTitle}</p>
                        <ul className="ml-4 space-y-1">
                            {data.revisionsContent.map((t: string, i: number) => (
                                <li key={i} className="flex gap-2"><span>•</span><span>{t}</span></li>
                            ))}
                        </ul>
                    </div>
                </div>
                <Footer />
            </div>

            <div className="page-container" style={{ width: '210mm', height: '297mm', position: 'relative', margin: '0 auto', backgroundColor: 'white', lineHeight: 'normal', fontSize: '14px' }}>
                <Header />
                <div className="px-10 py-6 text-sm" style={{ maxHeight: 'calc(297mm - 280px)', overflow: 'hidden', paddingTop: '24px' }}>
                    <div className="mb-5">
                        <p className="font-bold mb-2">{data.supportTitle}</p>
                        <ul className="ml-4 space-y-1">
                            {data.supportContent.map((t: string, i: number) => (
                                <li key={i} className="flex gap-2"><span>•</span><span>{t}</span></li>
                            ))}
                        </ul>
                    </div>
                    <div className="mb-5">
                        <p className="font-bold mb-2">{data.ipTitle}</p>
                        <ul className="ml-4 space-y-1">
                            {data.ipContent.map((t: string, i: number) => (
                                <li key={i} className="flex gap-2"><span>•</span><span>{t}</span></li>
                            ))}
                        </ul>
                    </div>
                    <div className="mb-5">
                        <p className="font-bold mb-2">{data.confidentialityTitle}</p>
                        <ul className="ml-4">
                            <li className="flex gap-2"><span>•</span><span>{data.confidentialityContent}</span></li>
                        </ul>
                    </div>
                    <div className="mb-6">
                        <p className="font-bold mb-2">{data.liabilityTitle}</p>
                        <ul className="ml-4">
                            <li className="flex gap-2"><span>•</span><span>{data.liabilityContent}</span></li>
                        </ul>
                    </div>
                    <div className="mb-8">
                        <p className="font-bold mb-2">{data.acceptanceTitle}</p>
                        <p>{data.acceptanceContent}</p>
                    </div>
                    <div className="mt-4">
                        <p className="font-bold mb-6">{data.signatureLabel}</p>
                        <p className="mb-2">{data.signatureName}</p>
                        <p className="mb-4">{data.signatureText}</p>
                        <p className="mt-4">{data.signatureDate}</p>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default AgreementPreview;
