import React from 'react';
import { useAppSelector } from '../../../store';

const ProposalPreview = () => {
    const proposalData = useAppSelector((state) => state.invoice.proposalData) || {
        date: 'September 2nd, 2025',
        clientName: 'Reclipse Photography & Films',
        subject: 'Quotation for Wedding Photography Website Design, Development & Maintenance',
        greeting: 'Dear Reclipse Photography & Films,',
        intro: 'Thank you for considering Elite8 Digital as your digital partner. Please find below the detailed quotation for your wedding photography website project including development and complimentary maintenance.',
        projectScopeTitle: 'Project Scope & Inclusions',
        projectScopeItems: [
            { service: 'Website Design & Integration', description: 'Fully responsive website (mobile, tablet, desktop)', cost: 'Included' },
            { service: 'Basic SEO Optimization', description: 'Meta tags, responsive layout, fast loading, mobile-first performance tuning', cost: 'Included' },
            { service: 'Testing & Deployment', description: 'QA, device compatibility, bug fixing, and final deployment', cost: 'Included' }
        ],
        websiteStructureTitle: 'Website Structure:',
        websiteStructure: [
            'Landing Page - Eye-catching hero section with best work showcase',
            'Home Page - Complete overview of services and portfolio highlights',
            'Films Page - Wedding videography portfolio and video samples',
            'Photography Page - Wedding photography portfolio organized by style',
            'Gallery Page - Comprehensive collection of your finest work',
            'Stories Page - Behind-the-scenes content and wedding stories',
            'Testimonials Page - Dedicated section for client reviews and feedback',
            'Contact Us Page - Professional contact form and business information'
        ],
        maintenanceTitle: 'Complimentary Maintenance Package (2 Months)',
        maintenanceSubtitle: 'Maintenance Services Included:',
        maintenanceServices: [
            'Bug Fixes - Resolution of any technical issues',
            'Content Updates - Gallery additions, text modifications, testimonials',
            'Performance Checks - Regular speed and functionality testing',
            'Mobile Responsiveness - Ensuring optimal mobile experience'
        ],
        maintenanceLimitation: 'Maintenance Limitations: New page additions not included in maintenance package',
        developmentCost: '₹45,000/-',
        gstNote: 'Note: 18% GST will be charged extra on the final invoice amount.',
        domainHostingTitle: 'Domain & Hosting (Can discuss on a call for more details):',
        domainHostingContent: 'We will provide assistance in setting up the domain and hosting, However, the cost must be borne by the client directly through the provider.',
        closingMessage: 'Please let us know if you have any queries or would like to proceed. We\'re excited to build something impactful and lasting for your business.',
        signature: 'Warm regards,\nElite8 Digital\n+91 62608 9497\ncontact@elite8digital.in\nwww.elite8digital.in'
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
                        <div style={{ width: '120px', height: '100px' }}>
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
                    <div className="mb-4">
                        <p>Date: {proposalData.date}</p>
                        <p>Client Name: {proposalData.clientName}</p>
                        <p className="mt-2">Subject: {proposalData.subject}</p>
                    </div>
                    <p className="mb-3">{proposalData.greeting}</p>
                    <p className="mb-6">{proposalData.intro}</p>
                    <div className="flex items-center justify-center text-center gap-2 mb-4">
                        <h3 className="text-lg font-bold underline">{proposalData.projectScopeTitle}</h3>
                    </div>
                    <table className="w-full border-2 border-gray-900 mb-6">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border-2 border-gray-900 px-4 py-3 text-center font-bold">Service</th>
                                <th className="border-2 border-gray-900 px-4 py-3 text-center font-bold">Description</th>
                                <th className="border-2 border-gray-900 px-4 py-3 text-center font-bold">Cost (INR)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {proposalData.projectScopeItems.map((item: any, i: number) => (
                                <tr key={i}>
                                    <td className="border-2 border-gray-900 px-4 py-4 text-center">{item.service}</td>
                                    <td className="border-2 border-gray-900 px-4 py-4 text-center">{item.description}</td>
                                    <td className="border-2 border-gray-900 px-4 py-4 text-center">{item.cost}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h3 className="font-bold mb-3">{proposalData.websiteStructureTitle}</h3>
                    <div className="space-y-1">
                        {proposalData.websiteStructure.map((item: string, i: number) => <p key={i}>{item}</p>)}
                    </div>
                </div>
                <Footer />
            </div>

            <div className="page-container" style={{ width: '210mm', height: '297mm', position: 'relative', margin: '0 auto', backgroundColor: 'white', lineHeight: 'normal', fontSize: '14px' }}>
                <Header />
                <div className="px-10 py-8 text-sm" style={{ maxHeight: 'calc(297mm - 280px)', overflow: 'hidden', paddingTop: '32px' }}>
                    <h2 className="text-xl font-bold mb-2">{proposalData.maintenanceTitle}</h2>
                    <p className="font-bold mb-3">{proposalData.maintenanceSubtitle}</p>
                    <div className="space-y-2 mb-6">
                        {proposalData.maintenanceServices.map((s: string, i: number) => (
                            <div key={i} className="flex gap-2">
                                <span className="text-green-600 font-bold text-lg">✓</span>
                                <span>{s}</span>
                            </div>
                        ))}
                    </div>
                    <p className="font-bold mb-8">{proposalData.maintenanceLimitation}</p>
                    <div className="my-8">
                        <p className="text-lg font-bold mb-1">Total Development Cost (One-Time): {proposalData.developmentCost}</p>
                        <p className="font-bold">{proposalData.gstNote}</p>
                    </div>
                    <div className="my-8">
                        <p className="font-bold mb-2">• {proposalData.domainHostingTitle}</p>
                        <p className="ml-4">{proposalData.domainHostingContent}</p>
                    </div>
                    <div className="mt-12 mb-8">
                        <p>{proposalData.closingMessage}</p>
                    </div>
                    <div className="mt-8">
                        <p className="whitespace-pre-line">{proposalData.signature}</p>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default ProposalPreview;
