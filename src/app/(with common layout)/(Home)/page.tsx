import AboutSection from "@/components/home/About";
import EventsSection from "@/components/home/Events";
import HeroSlider from "@/components/home/SLider";

const page = () => {
  return (
    <div>
      {/* <Hero></Hero> */}
      <HeroSlider></HeroSlider>
      <AboutSection></AboutSection>
      <EventsSection></EventsSection>
    </div>
  );
};

export default page;
