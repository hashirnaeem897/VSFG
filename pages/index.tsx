import Focus from "@/components/Focus/Focus";
import Hero from "@/components/Hero/Hero";
import Render from "@/components/Render/Render";
import Update from "@/components/Update/Update";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { request, gql } from "graphql-request";
import Video from "@/components/Video/Video";

export type dataType = {
  id: string;
  title: string;
  date: string;
  banner: {
    url: string;
  };
  description: {
    raw: any;
  };
  slug: string;
};

export default function Home({ data }: { data: dataType[] }) {
  const focusRoot = useRef<HTMLElement>(null);
  const updateRoot = useRef<HTMLElement>(null);

  useEffect(() => {
    if (innerWidth > 640) {
      document.querySelector("html")!.style.scrollSnapType = "y mandatory";
    }
  }, []);

  return (
    <>
      <Head>
        <title>VSFG</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <div className="canvas">
        <Render focusRoot={focusRoot} updateRoot={updateRoot} />
      </div> */}
      <Hero />
      <Focus root={focusRoot} />
      <Update data={data[0]} root={updateRoot} />
      <Video focusRoot={focusRoot} updateRoot={updateRoot} />
    </>
  );
}

export const getStaticProps = async () => {
  const endpoint =
    "https://api-ap-south-1.hygraph.com/v2/cldqz7cus35l401um0na00i10/master";

  const query = gql`
    query getLastNewsContent($number: Int!) {
      newsContents(last: $number) {
        id
        date
        title
        description {
          raw
        }
        banner {
          url
        }
        slug
      }
    }
  `;

  const variable = {
    number: 1,
  };

  const data = await request(endpoint, query, variable);
  return {
    props: { data: data.newsContents },
    revalidate: 10,
  };
};
