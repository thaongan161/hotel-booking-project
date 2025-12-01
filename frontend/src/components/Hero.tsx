import SearchBar from './SearchBar';
import ParallaxImage from './ParallaxImage';

export default function Hero() {
  return (
    <section className="relative h-[500px] z-10">
      <ParallaxImage src="/Travel-the-world.jpg" height={500} speed={0.3} />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 via-blue-900/30 to-transparent flex flex-col justify-center items-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white text-center">
          Enjoy 10% discounts on select car rentals
        </h1>
        <button className="mt-2 px-6 py-3 bg-green-500 text-white font-semibold rounded shadow-lg hover:bg-green-600 transition">
          Shift into genius gear
        </button>
      </div>

      {/* Search bar */}
      <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 w-full max-w-5xl px-4 mb-5">
        <SearchBar />
      </div>
    </section>
  );
}
