import Container from "@/components/container/container";
import Hero from "@/components/hero/hero";
import Posts from "@/components/posts/posts";
import { getAllPosts } from "@/lib/api";
import { PostMetaData } from "@/lib/types";

const Home = async () => {
  const test: PostMetaData[] = await getAllPosts();
  return (
    <main>
      <Container>
        <Hero
          title="Mdy"
          subtitle="広島市立大学情報科学部2年生のMdyです."
          imageOn
        />
        <Posts posts={test} />
      </Container>
    </main>
  );
};

export default Home;
