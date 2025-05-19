import CTA from "@/components/home/CTA";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import Pricing from "@/components/home/Pricing";
import Solutions from "@/components/home/Solutions";
import Testimonials from "@/components/home/Testimonials";

const Home = async () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main>
        <Hero />

        <Features />

        <Solutions />

        <Testimonials />

        <Pricing />

        <CTA />
      </main>
    </div>
  );
};

export default Home;
