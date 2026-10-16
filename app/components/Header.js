import Nav from "./header/Nav";
import HeroSection from "./header/HeroSection";
export default function Header() {
  return (
    <header id="top" className="relative isolate min-h-screen pt-8 lg:pt-12 flex flex-col">
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10"></div>
      <Nav />
      <HeroSection />
    </header>
  );
}
