import useLayout from "@/hooks/useLayout";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import s from "./header.module.scss";
import { GrFacebookOption, GrTwitter, GrLinkedinOption } from "react-icons/gr";
import { FaWeibo } from "react-icons/fa";
import {
  AiOutlineWechat,
  AiFillInstagram,
  AiFillYoutube,
} from "react-icons/ai";
import useGsapContext from "@/hooks/useGsapContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPopOpen, setIsPopOpen] = useState<boolean>(false);

  const headerRef = useRef<HTMLElement>(null);
  useLayout(() => {
    gsap.set(headerRef.current, { top: -100 });
    gsap.to(headerRef.current, { top: 0, duration: 1, ease: "power1.inOut" });
  }, []);

  const root = useRef<HTMLDivElement>(null);

  const tl = useRef<GSAPTimeline>();
  const menutl = useRef<GSAPTimeline>();
  const ctx = useGsapContext(root);

  useLayout(() => {
    ctx.add(() => {
      menutl.current = gsap
        .timeline({ paused: true })
        .from(".link", { opacity: 0, y: -100, stagger: 0.2 });

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

  const handleMenuClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsPopOpen(false);
    tl.current?.reversed(true);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    menutl.current?.play();
    menutl.current?.reversed(!isOpen);
  }, [isOpen]);

  return (
    <>
      <div ref={root}>
        <header ref={headerRef} className={s.main}>
          <div className={s.container}>
            <Link onClick={handleMenuClose} href="/">
              <div className={s.container_logo}>
                <Image
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  src="/brand.png"
                  alt="logo"
                  fill
                  priority
                />
              </div>
            </Link>
            <div
              onClick={handleOpen}
              data-active={isOpen}
              className={s.menubutton}
            >
              <div className={s.menubutton_button}>
                <div />
              </div>
            </div>
          </div>
        </header>
        <div data-active={isOpen} className={s.menu}>
          <Link className="link" onClick={handleMenuClose} href="/newsroom">
            <h5>NEWSROOM</h5>
          </Link>
          <Link
            className="link"
            href="https://www.2goasp.com/vsal_portal/index"
          >
            <h5>NET TRADER</h5>
          </Link>
          <div className={s.pop}>
            <button className="link" onClick={handleClick}>
              CONNECT
            </button>
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
    </>
  );
};

export default Header;
