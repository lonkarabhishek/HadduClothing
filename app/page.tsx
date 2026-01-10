import Blogs from "@/components/sections/Blogs";
import CategoriesSection from "@/components/sections/CategoriesSection";
import Hero from "@/components/sections/Hero";
import NewArrivals from "@/components/sections/NewArrivals";
import SimpleBanner from "@/components/sections/SimpleBanner";
import Testimonials from "@/components/sections/Testimonials";

export default function HomePage() {
    return (
        <>
            <Hero />
            <CategoriesSection />
            <NewArrivals />
            <SimpleBanner />
            <Testimonials />
            <Blogs />

        </>
    );
}
