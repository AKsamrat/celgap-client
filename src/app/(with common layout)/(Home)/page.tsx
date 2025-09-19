import AboutSection from "@/components/home/About";
import EventsSection from "@/components/home/Events";
import HowWork from "@/components/home/HowWork";
import ProgramsSection from "@/components/home/Programs-sectins";
import HeroSlider from "@/components/home/SLider";

const page = () => {
  return (
    <div>
      {/* <Hero></Hero> */}
      <HeroSlider></HeroSlider>
      <HowWork></HowWork>
      <ProgramsSection></ProgramsSection>
      <AboutSection></AboutSection>
      <EventsSection></EventsSection>
    </div>
  );
};

export default page;
