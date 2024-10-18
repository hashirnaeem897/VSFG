import s from "./hero.module.scss";
import { useRef } from "react";
import useGsapContext from "@/hooks/useGsapContext";
import useLayout from "@/hooks/useLayout";
import gsap from "gsap";

const Hero = () => {
  const root = useRef<HTMLElement>(null);
  const ctx = useGsapContext(root);
  const tl = useRef<GSAPTimeline>();

  useLayout(() => {
    ctx.add(() => {
      gsap.to(".shade", {
        scaleX: 1.4,
        repeat: -1,
        yoyo: true,
        duration: 10,
        ease: "power1.inOut",
      });
      tl.current = gsap
        .timeline()
        .from(".shade", { opacity: 0, duration: 0.8, delay: 0.5 })
        .from(".heading", { y: 260 })
        .from(".subone", { xPercent: -100 })
        .from(".subtwo", { xPercent: -100 });
    });
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} className={s.main}>
      <div className={`${s.main_shade} shade`} />
      <div className="hide">
        <h1 className="heading">
          FUTURE
          <br /> OF
          <br /> FINANCE
        </h1>
      </div>
      <div className={s.sidetext}>
        <div className="hide">
          <h3 className="subone">
            Hong Kong’s First SFC-Approved Virtual Asset Manager
          </h3>
        </div>
        <div className="hide">
          <h3 className="subtwo">
            Bridging Traditional & Virtual Assets via Our All-in-one Financial
            Services Platform
          </h3>
        </div>
      </div>
    </section>
  );
};

export default Hero;
