import Container from "@/components/container/container";
import ConvertPage from "@/components/convert-page/conver-page";
import PostBody from "@/components/post-body/post-body";
import PostHeader from "@/components/post-header/post-header";
import PostTags from "@/components/post-tags/post-tags";
import TopicsCard from "@/components/topics-card/topics-card";
import {
  TwoColumn,
  TwoColumnMain,
  TwoColumnSidebar,
} from "@/components/two-column/two-column";
import { getAllSlugs, getPostBySlug } from "@/lib/api";
import { extractText } from "@/lib/extra-text";
import {
  eyecatchLocal,
  openGraphMetadata,
  siteMeta,
  twitterMetadata,
} from "@/lib/metadata";
import { Post } from "@/lib/types";
import "katex/dist/katex.min.css";
import Image from "next/legacy/image";

export const dynamicParams = false;

export const generateStaticParams = async () => {
  const allSlugs: string[] = await getAllSlugs();
  return allSlugs.map((slug) => ({ slug: slug }));
};

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const post: Post = await getPostBySlug(slug);

  const {
    title,
    publishedAt: pubDate,
    updatedAt: upDate,
    tags,
    eyecatch,
    content,
  } = post;

  return (
    <Container>
      <article>
        <PostHeader title={title} subtitle="Blog Article" date={pubDate} />

        <figure>
          <Image
            key={eyecatch ? eyecatch.url : eyecatchLocal.url}
            src={eyecatch ? eyecatch.url : eyecatchLocal.url}
            width={eyecatch ? eyecatch.width : eyecatchLocal.width}
            height={eyecatch ? eyecatch.height : eyecatchLocal.height}
            alt=""
            layout="responsive"
            sizes="(min-width: 1152px) 1152px, 100vw"
            priority
          />
        </figure>

        <TwoColumn>
          <TwoColumnMain>
            <PostBody>
              <PostTags tags={tags} />
              <ConvertPage content={content} />
            </PostBody>
          </TwoColumnMain>
          <TwoColumnSidebar>
            <TopicsCard />
          </TwoColumnSidebar>
        </TwoColumn>
      </article>
    </Container>
  );
};

const { siteTitle, siteUrl } = siteMeta;

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const slug = params.slug;
  const post: Post = await getPostBySlug(slug);
  const {
    title: pageTitle,
    publishedAt: pubDate,
    updatedAt: upDate,
    content,
  } = post;

  const pageDesc = extractText(content);
  const eyecatch = post.eyecatch ?? eyecatchLocal;

  const ogpTitle = `${pageTitle} | ${siteTitle}`;
  const ogpUrl = new URL(`/blog/${slug}`, siteUrl).toString();

  const metadata = {
    title: pageTitle,
    description: pageDesc,

    openGraph: {
      ...openGraphMetadata,
      title: ogpTitle,
      description: pageDesc,
      url: ogpUrl,
      images: [
        {
          url: eyecatch.url,
          width: eyecatch.width,
          height: eyecatch.height,
        },
      ],
    },
    twitter: {
      ...twitterMetadata,
      title: ogpTitle,
      description: pageDesc,
      images: [eyecatch.url],
    },
  };

  return metadata;
};

export default PostPage;
