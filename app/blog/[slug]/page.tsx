import Container from "@/components/container/container";
import PostBody from "@/components/post-body/post-body";
import PostHeader from "@/components/post-header/post-header";
import PostTags from "@/components/post-tags/post-tags";
import {
  TwoColumn,
  TwoColumnMain,
  TwoColumnSidebar,
} from "@/components/two-column/two-column";
import {
  Post,
  getAllPosts,
  getPostBySlug,
  getPostContentByID,
} from "@/lib/notionAPI";
import "katex/dist/katex.min.css";
import Image from "next/legacy/image";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

export const dynamicParams = true;

export const generateStaticParams = async () => {
  const allPosts: Post[] = await getAllPosts();
  return allPosts.map((post) => ({ slug: post.slug }));
};

const Post = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const post: Post = await getPostBySlug(slug);

  const { title, date, description, tags, id, thumbnail } = post;

  const postContent = await getPostContentByID(id);

  return (
    <>
    <div>
    {postContent.now.toString()}
    </div>
    <Container>
      <article>
        <PostHeader title={title} subtitle="Blog Article" date={date} />

        <figure>
          <Image
            key={thumbnail}
            src={thumbnail ? thumbnail : "/vercel.svg"}
            width={500}
            height={200}
            alt=""
            layout="responsive"
            sizes="(min-width: 1152px) 1152px, 100vw"
            priority
          />
        </figure>

        <TwoColumn>
          <TwoColumnMain>
            <PostBody>
              <Markdown
                components={{
                  code({
                    children,
                    className,
                    node,
                    ...rest
                  }: {
                    children?: React.ReactNode;
                    className?: any;
                    node?: any;
                  }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return match ? (
                      <SyntaxHighlighter
                        {...rest}
                        PreTag="div"
                        language={match[1]}
                        style={oneDark}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code {...rest} className={className}>
                        {children}
                      </code>
                    );
                  },
                  img({ src, ...rest }) {
                    return (
                      <Image
                        key={src}
                        src={src ? src : "/vercel.svg"}
                        width={500}
                        height={200}
                        alt=""
                        layout="responsive"
                        sizes="(min-width: 1152px) 1152px, 100vw"
                        priority
                      />
                    );
                  },
                }}
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {postContent.mdString}
              </Markdown>
            </PostBody>
          </TwoColumnMain>
          <TwoColumnSidebar>
            <PostTags tags={tags} />
          </TwoColumnSidebar>
        </TwoColumn>
      </article>
    </Container>
    </>
  );
};

export default Post;
