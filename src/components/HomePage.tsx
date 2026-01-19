import RefrensHomepage from './RefrensHomepage';
import BusinessPage from './BusinessPage';
import WorkflowToolsCarousel from './WorkflowToolsCarousel';
import Footer from './Footer';
import UsvsOthers from './UsvsOthers';
import FAQs from './FAQs';

const HomePage = () => {
    return (
        <div className='bg-gradient-to-br from-blue-50 via-white to-purple-50'>
            <RefrensHomepage />
            <div id="business-section">
                <BusinessPage />
            </div>
            <WorkflowToolsCarousel />
            <UsvsOthers/>
            <FAQs/>
            <Footer/>
        </div>
    );
};

export default HomePage;
