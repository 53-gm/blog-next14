import Container from "@/components/container/container";
import PostHeader from "@/components/post-header/post-header";
import Posts from "@/components/posts/posts";
import { getAllPostsByTag, getAllTags } from "@/lib/api";
import { openGraphMetadata, siteMeta, twitterMetadata } from "@/lib/metadata";
import { PostMetaData, Tag } from "@/lib/types";

export const dynamicParams = false;

export const generateStaticParams = async () => {
  const allTags: Tag[] = await getAllTags();
  return allTags.map((tag: Tag) => ({ slug: tag.id }));
};

const TagPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const allTags: Tag[] = await getAllTags();
  const ctTag: Tag | undefined = allTags.find(({ id }) => id === slug);
  const name: string = ctTag ? ctTag.name : "";

  const posts: PostMetaData[] = await getAllPostsByTag(slug);

  return (
    <Container>
      <PostHeader title={name} subtitle="Blog Tag" date={""} />
      <Posts posts={posts} />
    </Container>
  );
};

const { siteTitle, siteUrl } = siteMeta;

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const { slug } = params;

  const allTags: Tag[] = await getAllTags();
  const ctTag: Tag | undefined = allTags.find(({ id }) => id === slug);
  const name: string = ctTag ? ctTag.name : "";

  const pageTitle = name;
  const pageDesc = `${pageTitle}に関する記事`;
  const ogpTitle = `${pageTitle} | ${siteTitle}`;
  const ogpUrl = new URL(`/blog/tag/${slug}`, siteUrl).toString();

  const metadata = {
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

  return metadata;
};

export default TagPage;
