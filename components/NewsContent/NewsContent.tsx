import { dataType } from "@/pages/newsroom";
import Image from "next/image";
import s from "./newscontent.module.scss";
import { RichText } from "@graphcms/rich-text-react-renderer";

const NewsContent = ({ data }: { data: dataType }) => {
  return (
    <section className={s.main}>
      <div className={s.main_img}>
        <Image src={data.banner.url} fill alt={data.slug} />
      </div>
      <h3>{data.date}</h3>
      <h2>{data.title}</h2>
      <RichText content={data.description.raw} />
    </section>
  );
};

export default NewsContent;
