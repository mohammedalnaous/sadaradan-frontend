import TopBar from './TopBar';
import HeroBanner from './HeroBanner';
import CategoryShortcuts from './CategoryShortcuts';
import SmartFilters from './SmartFilters';
import FeaturedGrid from './FeaturedGrid';
import PromoAds from './PromoAds';
import AdviceSection from './AdviceSection';
import PopularTags from './PopularTags';
import Footer from './Footer';
import MobileDrawer from './MobileDrawer';
import FloatingPostAd from './FloatingPostAd';
import StatsSection from './StatsSection';
import CarIntro from './CarIntro';
import SearchTool from './SearchTool';
import BrowseByBrand from './BrowseByBrand';
import CurrentlyInDemand from './CurrentlyInDemand';
import ComprehensiveServices from './ComprehensiveServices';



export default function LandingPage() {
  return (
    <main className="bg-gray-50 min-h-screen flex flex-col">
      <TopBar />
      <CarIntro />
      <HeroBanner />
      <CategoryShortcuts />
      <SearchTool />
      <PopularTags />
      <SmartFilters />
      <BrowseByBrand />
      <FeaturedGrid />
      <CurrentlyInDemand />
      <PromoAds />
      <AdviceSection />
      <ComprehensiveServices />
      <StatsSection />
      <Footer />
      <MobileDrawer />
      <FloatingPostAd />
    </main>
  );
}
