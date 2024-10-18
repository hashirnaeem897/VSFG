import useGsapContext from "@/hooks/useGsapContext";
import useLayout from "@/hooks/useLayout";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useRef, useState } from "react";
import s from "./focus.module.scss";

type props = {
  root: React.RefObject<HTMLElement>;
};

const Focus: React.FC<props> = ({ root }) => {
  const [paraOne, setParaOne] = useState<boolean>(true);
  const [paraTwo, setParaTwo] = useState<boolean>(false);
  const [paraThree, setParaThree] = useState<boolean>(false);

  const hoverFirst = () => {
    setParaOne(true);
    setParaTwo(false);
    setParaThree(false);
  };
  const hoverTwo = () => {
    setParaOne(false);
    setParaTwo(true);
    setParaThree(false);
  };
  const hoverThree = () => {
    setParaOne(false);
    setParaTwo(false);
    setParaThree(true);
  };

  //ANIMATION
  const ctx = useGsapContext(root);
  const tl = useRef<GSAPTimeline>();

  useLayout(() => {
    ctx.add(() => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.to(".shade", {
        y: 100,
        scale: 1.2,
        repeat: -1,
        yoyo: true,
        duration: 10,
        ease: "power1.inOut",
      });
      gsap.set(".heading", { x: -1000 });
      tl.current = gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
          },
        })
        .from(".title", { xPercent: 100, delay: 0.2 })
        .from(".focus", { x: -200 })
        .to(".heading", { x: 0, stagger: 0.3 })
        .from(".text", { opacity: 0 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className={s.main}>
      <div className={`shade ${s.main_shade}`} />
      <div className={s.container}>
        <div className={s.inside}>
          <div className={`${s.inside_flex}  hide`}>
            <h3 className="title">
              VSFG is dedicated to the research and development of products and
              services that can integrate traditional and virtual assets under a
              compliant regulatory framework, helping individuals and
              institutions to allocate assets in orderly manner in digital
              world, particularly in Web3 era.
            </h3>
          </div>
          <div data-col className={s.inside_flex}>
            <div className="hide">
              <h4 className="focus">OUR FOCUS</h4>
            </div>
            <div className={s.flex}>
              <div className={s.inside_title}>
                <div className="hide">
                  <h2
                    className="heading"
                    data-active={paraOne}
                    onPointerEnter={hoverFirst}
                    data-small
                  >
                    Digital Wealth Management
                  </h2>
                </div>
                <div className="hide">
                  <h2
                    className="heading"
                    data-active={paraTwo}
                    onPointerEnter={hoverTwo}
                    data-small
                  >
                    100% Asset Tokenization
                  </h2>
                </div>
                <div className="hide">
                  <h2
                    className="heading"
                    data-active={paraThree}
                    onPointerEnter={hoverThree}
                    data-small
                  >
                    Digital Wallets for All
                  </h2>
                </div>
              </div>
              <div className={` text ${s.text}`}>
                <p data-small data-active={paraOne}>
                  We offer one-stop hassle-free solutions for your dedicated
                  needs – no matter you are an institution or a family office, a
                  professional investor or a business intermediary.
                  <br />
                  VSFG’s all-in-one digital wealth management platform managed
                  by industry experts. Best-in-class risk management and open
                  architecture with stringent platform selection process. 24/7
                  monitoring on both on-chain and off-chain. A secure, simple
                  and direct way to gain exposure to virtual assets under a
                  regulated framework.
                </p>
                <p data-small data-active={paraTwo}>
                  Tokenization has the power to revolutionize the financial
                  landscape intrinsically, changing how investments are managed,
                  used and monetized by converting real world assets into
                  digital tokens. From traditional assets like bonds, real
                  estates and commodities to alternative assets like artwork,
                  intellectual property and music, VSFG can provide a total
                  solution to help issuers to raise capital via tokenized
                  securities, while providing a gateway to investors to
                  diversify their portfolios.
                </p>
                <p data-small data-active={paraThree}>
                  From cryptocurrencies to NFTs, VSFG provides all clients with
                  simple and secure digital wallets to manage crypto assets
                  easily and all at one glance. Within a few clicks, clients can
                  transfer, deposit and withdraw cryptocurrencies, and enjoy
                  24/7 trading, i.e. trade orders can be placed anytime,
                  anywhere, without any boundaries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Focus;
