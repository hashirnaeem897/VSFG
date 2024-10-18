import useGsapContext from "@/hooks/useGsapContext";
import useLayout from "@/hooks/useLayout";
import { dataType } from "@/pages";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Arrow from "./Arrow";
import s from "./update.module.scss";

type props = {
  root: React.RefObject<HTMLElement>;
  data: dataType;
};

const Update: React.FC<props> = ({ root, data }) => {
  //ANIMATION
  const ctx = useGsapContext(root);
  const tl = useRef<GSAPTimeline>();

  useLayout(() => {
    ctx.add(() => {
      gsap.registerPlugin(ScrollTrigger);
      tl.current = gsap
        .timeline({
          scrollTrigger: { trigger: root.current },
        })
        .from(".update", { x: -200 })
        .from(".card", { scale: 0 })
        .from(".button", { opacity: 0 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className={s.main}>
      <div className={s.main_shade} />
      <div className={s.container}>
        <div className="hide">
          <h4 className="update">OUR UPDATES</h4>
        </div>
        <Link href={`/newsroom/${data.slug}`}>
          <div className="card">
            <div className={s.card}>
              <div>
                <h3>{data.date}</h3>
                <h3>{data.title}</h3>
              </div>
              <div className={s.card_img}>
                <Image
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  src={data.banner.url}
                  alt="update-card"
                  fill
                />
              </div>
            </div>
          </div>
        </Link>
        <Link href="/newsroom">
          <div className={`button ${s.button}`}>
            <p>Tap To Newsroom</p>
            <Arrow />
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Update;
