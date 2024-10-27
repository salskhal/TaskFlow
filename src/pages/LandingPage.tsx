import DashboardImage from "@/components/landing/DashboardImage";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import { SiteBanner } from "@/components/landing/SiteBanner";

export default function LandingPage() {
  return (
    <div>
      <SiteBanner />
      <Header />
      {/* Add padding-top to account for the fixed header */}
      <div className="">
        <Hero />
        <DashboardImage />
      </div>
    </div>
  );
}
