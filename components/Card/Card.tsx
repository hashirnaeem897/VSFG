import Image from "next/image";
import Link from "next/link";
import s from "./card.module.scss";

type props = {
  href: string;
  title: string;
  date: string;
  imgUrl: string;
};

const Card: React.FC<props> = ({ title, href, date, imgUrl }) => {
  return (
    <Link href={`/newsroom/${href}`}>
      <div className={s.main}>
        <h3>{date}</h3>
        <h3>
          <span>{title}</span>
        </h3>
        <div className={s.main_img}>
          <Image
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={imgUrl}
            alt={title}
            fill
          />
        </div>
      </div>
    </Link>
  );
};

export default Card;
