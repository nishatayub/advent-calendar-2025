import { AdventCalendar } from "@/components/AdventCalendar";
import { SnowfallEffect } from "@/components/Snowflake";
import cottageBg from "@/assets/cottage-bg.png";

const Index = () => {
  return (
    <main 
      className="min-h-screen py-8 md:py-12 relative overflow-hidden"
      style={{
        backgroundImage: `url(${cottageBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px]" />
      
      {/* Snowfall animation */}
      <SnowfallEffect />
      
      {/* Main content */}
      <div className="relative z-20">
        <AdventCalendar />
      </div>

      {/* Decorative bottom border */}
      <div className="fixed bottom-0 left-0 right-0 h-4 bg-deep-brown/20 backdrop-blur-sm z-30" />
    </main>
  );
};

export default Index;
