import Container from "@/components/container/container";
import Hero from "@/components/hero/hero";
import Posts from "@/components/posts/posts";
import { Post, getAllPosts } from "@/lib/notionAPI";

const Home = async () => {
  const test: Post[] = await getAllPosts();
  return (
    <main>
      <Container>
        <Hero title="HERO" subtitle="test" imageOn/>
        <Posts posts={test} />
      </Container>
    </main>
  );
};

export default Home;
