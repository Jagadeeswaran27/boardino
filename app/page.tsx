import { auth } from "@/auth";
import CTA from "@/components/home/CTA";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import Pricing from "@/components/home/Pricing";
import Solutions from "@/components/home/Solutions";
import Testimonials from "@/components/home/Testimonials";

const Home = async () => {
  const session = await auth();
  console.log("Session:", session);
  return (
    <div className="min-h-screen flex flex-col">
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Features Section */}
        <Features />

        {/* Solutions Section */}
        <Solutions />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Pricing Section */}
        <Pricing />

        {/* CTA Section */}
        <CTA />
      </main>
    </div>
  );
};

export default Home;
