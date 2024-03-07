import Container from "@/components/container/container";
import Hero from "@/components/hero/hero";
import PostBody from "@/components/post-body/post-body";
import Social from "@/components/social/social";
import {
  TwoColumn,
  TwoColumnMain,
  TwoColumnSidebar,
} from "@/components/two-column/two-column";
import { openGraphMetadata, siteMeta, twitterMetadata } from "@/lib/metadata";
import Image from "next/legacy/image";

const About = async () => {
  return (
    <>
      <Container>
        <Hero title="About" subtitle="私(mdy)の紹介" />
        <figure>
          <Image
            key={1}
            src={"/kame01.png"}
            width={1920}
            height={1080}
            alt=""
            layout="responsive"
            sizes="(min-width: 1152px) 1152px, 100vw"
            priority
          />
        </figure>
        <TwoColumn>
          <TwoColumnMain>
            <PostBody>
              <p>
                初めまして、大学2年生のmdyです。このサイトは、私が書きたいことを自由に書きますが、主にプログラミング関係の勉強記録です(多分)。
              </p>
              <h2>プログラミング歴</h2>
              <p>
                まず、高校1年生の時に、C++でプログラミングデビューをしました。私がプログラミングを始めた理由は、いまいち覚えてないのですが、ゲームがどのようにして
                描画されているのか気になったからだった気がします。その時は、「ゲームを作るならC++とDirectXだろ！」と書いてある記事が多かったので何となくC++にしました。
                そして、簡単なゲームを作りながら1年くらい経ち、受験勉強でプログラミングを休止。大学入学後、授業でPythonによるデータ分析やKaggleを勉強。んで、
                2年後半になってなんとなくWeb開発にも手を出した。←今ここ
              </p>

              <h2>今後の目標</h2>
              <p>
                今年は、機械学習と統計学、競技プログラミング辺りを主に勉強していきたいと思ってはいます。ただ、私は気が変わり易いので、突然「ゲーム作りたい」などと考え、
                別の内容を始めているかもしれません。
              </p>

              <h2>最後に</h2>
              <p>
                Stable
                Diffusionって面白いですよね。PCスペック足りたのでローカルで動かしてみました(RTX4070)。亀が好きなので亀を生成。
              </p>
              <Image
                key={2}
                src={"/kame02.png"}
                width={1920}
                height={1080}
                alt=""
                layout="responsive"
                sizes="(min-width: 1152px) 1152px, 100vw"
                priority
              />
              <p>
                これは、ケルベロスみたいなのを作ろうと思ってthree
                headsって入力したんですけど、どちらかというとヤマタノオロチになりました。
              </p>
              <Image
                key={3}
                src={"/kame03.png"}
                width={1920}
                height={1080}
                alt=""
                layout="responsive"
                sizes="(min-width: 1152px) 1152px, 100vw"
                priority
              />
              <p>
                これは天使みたいな亀を生成しようとしてかっこいい感じになっちゃったやつです。羽から顔が生えてなければ割と良い。
              </p>
              <Image
                key={4}
                src={"/kame04.png"}
                width={1920}
                height={1080}
                alt=""
                layout="responsive"
                sizes="(min-width: 1152px) 1152px, 100vw"
                priority
              />
              <p>これはさっきののリベンジで割と気に入ってる亀です。</p>
            </PostBody>
          </TwoColumnMain>
          <TwoColumnSidebar>
            <p>Contact</p>
            <br />
            <Social />
          </TwoColumnSidebar>
        </TwoColumn>
      </Container>
    </>
  );
};

const { siteTitle, siteUrl } = siteMeta;
const pageTitle = "About";
const pageDesc = "About";
const ogpTitle = `${pageTitle} | ${siteTitle}`;
const ogpUrl = new URL("/about", siteUrl).toString();

export const metadata = {
  title: pageTitle,
  description: pageDesc,

  openGraph: {
    ...openGraphMetadata,
    title: ogpTitle,
    description: pageDesc,
    url: ogpUrl,
  },
  twitter: {
    ...twitterMetadata,
    title: ogpTitle,
    description: pageDesc,
  },
};

export default About;
