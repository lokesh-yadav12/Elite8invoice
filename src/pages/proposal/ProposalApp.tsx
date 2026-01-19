import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../store';
import { Download } from 'lucide-react';

// Import proposal templates
import { Proposal as ServiceProposal, ProposalPreview as ServiceProposalPreview } from '../proposal-templates/service-proposal';
import { Agreement as ServiceAgreement, AgreementPreview as ServiceAgreementPreview } from '../proposal-templates/service-agreement';

const ProposalApp = () => {
    const { templateType } = useParams<{ templateType: string }>();
    const currentStep = useAppSelector((state) => state.invoice.currentStep);
    const [activeStep, setActiveStep] = useState(currentStep || 1);
    const [isDownloading, setIsDownloading] = useState(false);
    const previewRef = useRef<HTMLDivElement>(null);

    // Listen for save and preview event from child components
    React.useEffect(() => {
        const handleSwitchToPreview = () => {
            setActiveStep(2);
        };

        window.addEventListener('switchToPreview', handleSwitchToPreview);

        return () => {
            window.removeEventListener('switchToPreview', handleSwitchToPreview);
        };
    }, []);



                
                    const handleDownloadPDF = async () => {
                        setIsDownloading(true);
                        try {
                            const html2pdf = (await import('html2pdf.js')).default;
                            const element = previewRef.current;
                            if (!element) return;

                            // Get all page containers
                            const pages = element.querySelectorAll('.page-container');

                            if (pages.length === 0) return;

                            // Create a temporary container with exact 2 pages and fixed height
                            const tempContainer = document.createElement('div');
                            tempContainer.style.width = '210mm';
                            tempContainer.style.height = '594mm'; // Exactly 2 A4 pages (297mm x 2)
                            tempContainer.style.lineHeight = '0';
                            tempContainer.style.fontSize = '0';
                            tempContainer.style.overflow = 'hidden'; // Prevent any overflow

                            // Clone only first 2 pages
                            for (let i = 0; i < Math.min(pages.length, 2); i++) {
                                const clonedPage = pages[i].cloneNode(true) as HTMLElement;
                                tempContainer.appendChild(clonedPage);
                            }

                            const opt = {
                                margin: 0,
                                image: { type: 'jpeg' as const, quality: 1 },
                                html2canvas: {
                                    scale: 2,
                                    useCORS: true,
                                    logging: false,
                                    letterRendering: true,
                                    allowTaint: true,
                                    height: 2245, // 594mm in pixels (2 pages)
                                    windowHeight: 2245
                                },
                                jsPDF: {
                                    unit: 'mm' as const,
                                    format: 'a4' as const,
                                    orientation: 'portrait' as const
                                }
                            };

                            // Generate PDF from temp container
                            await html2pdf()
                                .set(opt)
                                .from(tempContainer)
                                .save(`${templateType === 'service-proposal' ? 'Service-Proposal' : 'Service-Agreement'}.pdf`);

                        } catch (error) {
                            console.error('Error generating PDF:', error);
                            alert('Failed to generate PDF. Please try again.');
                        } finally {
                            setIsDownloading(false);
                        }
                    };

    // Render the appropriate template based on the route
    const renderTemplate = () => {
        if (activeStep === 2) {
            // Preview mode - wrap in ref for PDF generation
            switch (templateType) {
                case 'service-proposal':
                    return <div ref={previewRef}><ServiceProposalPreview /></div>;
                case 'service-agreement':
                    return <div ref={previewRef}><ServiceAgreementPreview /></div>;
                default:
                    return <div>Template not found</div>;
            }
        } else {
            // Edit mode
            switch (templateType) {
                case 'service-proposal':
                    return <ServiceProposal />;
                case 'service-agreement':
                    return <ServiceAgreement />;
                default:
                    return <div>Template not found</div>;
            }
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">
                        {templateType === 'service-proposal' ? 'Service Proposal' : 'Service Agreement'}
                    </h1>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setActiveStep(1)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeStep === 1
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => setActiveStep(2)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeStep === 2
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            Preview
                        </button>
                        {activeStep === 2 && (
                            <button
                                onClick={handleDownloadPDF}
                                disabled={isDownloading}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                <Download size={18} />
                                {isDownloading ? 'Downloading...' : 'Download PDF'}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            {renderTemplate()}
        </div>
    );
};

export default ProposalApp;
