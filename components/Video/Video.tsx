import useLayout from "@/hooks/useLayout";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";
import s from "./video.module.scss";

type props = {
  focusRoot: React.RefObject<HTMLElement>;
  updateRoot: React.RefObject<HTMLElement>;
};

const Video: React.FC<props> = ({ focusRoot, updateRoot }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayout(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (innerWidth > 640) {
      gsap.set(videoRef.current, { scale: 0 });
      gsap.to(videoRef.current, {
        scale: 0.88,
        y: innerWidth > 1536 ? 0 : -40,
        delay: 1.2,
      });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: focusRoot.current,
            toggleActions: "play none none reverse",
          },
        })
        .to(videoRef.current, { x: -900 });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: updateRoot.current,
            toggleActions: "play none none reverse",
          },
        })
        .to(videoRef.current, { x: 900 });
    } else {
      gsap.set(videoRef.current, { scale: 0 });
      gsap.timeline().to(videoRef.current, {
        x: 0,
        scale: 2,
        delay: 1.2,
      });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: focusRoot.current,
            toggleActions: "play none none reverse",
            start: "center bottom",
          },
        })
        .to(videoRef.current, { x: -200 });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: updateRoot.current,
            toggleActions: "play none none reverse",
            start: "70% bottom",
          },
        })
        .to(videoRef.current, { x: 200 });
    }
  }, [focusRoot.current, updateRoot.current]);

  return (
    <div className={s.main}>
      <video ref={videoRef} src="/sphere.webm" autoPlay muted loop />
    </div>
  );
};

export default Video;
