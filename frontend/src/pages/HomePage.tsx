// 📁 src/pages/HomePage.tsx
// import Header from '../components/Header';
import Hero from '../components/Hero';
import FeaturedHotels from '../components/FeaturedHotels';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="bg-gray-50 text-gray-900 font-sans pb-20">
      {/* <Header /> */}
      <Hero />
      <FeaturedHotels />
      <Footer />
    </div>
  );
}