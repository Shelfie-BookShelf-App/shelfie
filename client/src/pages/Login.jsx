import BookSlider from "../components/BookSlider";
import Categories from "../components/Categories";
import GoogleBooks from "../components/GoogleBooks";
import CTA from "../sections/CTA";
import FeatureList from "../sections/FeatureList";
import Features from "../sections/Features";
import Hero from "../sections/Hero";
import HowItWorks from "../sections/HowItWorks";
import Team from "../sections/Team";
import Testimonial from "../sections/Testimonial";

export default function Login() {
  return (
    <div className="px-12">
      <Hero />
      {/* <Features /> */}
      <FeatureList />
      {/* <CTA /> */}
      {/* <Testimonial /> */}
      <HowItWorks />
      <Team />
    </div>
  );
}
