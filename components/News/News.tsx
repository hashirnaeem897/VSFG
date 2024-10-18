import { props } from "@/pages/newsroom";
import Card from "../Card/Card";
import s from "./news.module.scss";

const News: React.FC<props> = ({ data }) => {
  return (
    <section className={s.main}>
      <h1>NewsRoom</h1>
      <div className={s.main_grid}>
        {data.reverse().map(({ id, date, title, banner, slug }) => {
          return (
            <Card
              key={id}
              date={date}
              title={title}
              href={slug}
              imgUrl={banner.url}
            />
          );
        })}
      </div>
    </section>
  );
};

export default News;
