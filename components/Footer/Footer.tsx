import Image from "next/image";
import Link from "next/link";
import s from "./footer.module.scss";
import { GrFacebookOption, GrTwitter, GrLinkedinOption } from "react-icons/gr";
import { FaWeibo } from "react-icons/fa";
import {
  AiOutlineWechat,
  AiFillInstagram,
  AiFillYoutube,
} from "react-icons/ai";
import useGsapContext from "@/hooks/useGsapContext";
import { useRef, useState } from "react";
import useLayout from "@/hooks/useLayout";
import gsap from "gsap";

const Footer = () => {
  const [isPopOpen, setIsPopOpen] = useState<boolean>(false);

  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<GSAPTimeline>();
  const ctx = useGsapContext(root);

  useLayout(() => {
    ctx.add(() => {
      gsap.set(".icon", { scale: 0 });
      gsap.set(".box", { scaleX: 0 });
      gsap.set(".email", { opacity: 0 });
      tl.current = gsap
        .timeline({ paused: true })
        .to(".box", { scaleX: 1 })
        .to(".email", { opacity: 1 })
        .to(".icon", { scale: 1, stagger: 0.2 });
    });
    return () => ctx.revert();
  }, []);

  const handleClick = () => {
    setIsPopOpen(!isPopOpen);
    if (!isPopOpen) {
      tl.current?.play();
    }
    tl.current?.reversed(isPopOpen);
  };

  return (
    <footer className={s.main}>
      <div className={s.container}>
        <div className={s.container_logo}>
          <Image
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src="/mark.png"
            fill
            alt="logo"
          />
        </div>
        <div className={s.grid}>
          <Link href="/newsroom">
            <h5>NEWSROOM</h5>
          </Link>
          <Link href="/privacy-policy">
            <h5>LEGAL & PRIVACY</h5>
          </Link>
          <div ref={root} className={s.pop}>
            <button onClick={handleClick}>CONNECT</button>
            <div className={`${s.pop_box} box`}>
              <Link className="email" href="mailto:enquiry@vsfg.com">
                <h6>enquiry@vsfg.com</h6>
              </Link>
              <div className={s.pop_flex}>
                <div className="icon">
                  <Link href="https://www.facebook.com/VSFGhongkong/">
                    <GrFacebookOption />
                  </Link>
                </div>
                <div className="icon">
                  <Link href="https://twitter.com/vsfghongkong">
                    <GrTwitter />
                  </Link>
                </div>
                <div className="icon">
                  <Link href="http://www.weibo.com/vsmarthk">
                    <FaWeibo />
                  </Link>
                </div>
                <div className="icon">
                  <Link href="https://vsfg.com/wp-content/uploads/2020/07/VSFG_wechat_qr-2.jpg">
                    <AiOutlineWechat />
                  </Link>
                </div>
                <div className="icon">
                  <Link href="https://www.instagram.com/vsfghongkong/">
                    <AiFillInstagram />
                  </Link>
                </div>
                <div className="icon">
                  <Link href="https://www.linkedin.com/company/venturesmart">
                    <GrLinkedinOption />
                  </Link>
                </div>
                <div className="icon">
                  <Link href="https://www.youtube.com/channel/UCMqPfaMx5XhJt7aCuXqanYg">
                    <AiFillYoutube />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
