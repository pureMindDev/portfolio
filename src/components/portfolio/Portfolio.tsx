import { motion, useScroll, useTransform } from "framer-motion";
import CustomCursor from "./Customer";
import StarField from "./StarField";
import Nav from "./Nav";
import Hero from "./Hero";
import Skills from "./Skills";
import Projects from "./Projects";
import Services from "./Services";
import Contact from "./Contact";
import Footer from "./Footer";

export default function Portfolio() {
    const { scrollY } = useScroll();
    const starsY = useTransform(scrollY, [0, 3000], [0, -120]);
    const blobsY = useTransform(scrollY, [0, 3000], [0, -60]);

    return (
        <>
            <CustomCursor />

            <div className="relative min-h-screen">
                {/* fixed ambient starfield / constellation background, behind every section */}
                <motion.div style={{ y: starsY }} className="absolute inset-0">
                    <StarField density={95} />
                </motion.div>

                {/* soft animated light blobs behind every section for extra depth */}
                <motion.div
                    style={{ y: blobsY }}
                    aria-hidden
                    className="pointer-events-none fixed inset-0 -z-[1] overflow-hidden"
                >
                    <span className="animate-blob absolute -left-40 top-1/4 h-[36rem] w-[36rem] rounded-full bg-brand/20 blur-[130px] mix-blend-screen" />
                    <span className="animate-blob-slow absolute right-[-10rem] top-[55%] h-[32rem] w-[32rem] rounded-full bg-brand-cyan/15 blur-[140px] mix-blend-screen" />
                    <span className="animate-blob absolute left-1/3 bottom-[-8rem] h-[28rem] w-[28rem] rounded-full bg-brand-glow/15 blur-[120px] mix-blend-screen" />
                </motion.div>

                <div className="relative z-10">
                    <Nav />
                    <main>
                        <Hero />
                        <Skills />
                        <Projects />
                        <Services />
                        <Contact />
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    );
}
