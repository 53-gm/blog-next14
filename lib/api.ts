import { createClient } from "microcms-js-sdk";
import { Post, PostMetaData, Tag } from "./types";

export const client = createClient({
  serviceDomain: String(process.env.SERVICE_DOMAIN),
  apiKey: String(process.env.API_KEY),
  customFetch: (input, init) => {
    if (typeof input === "string") {
      const newInput = new URL(input);
      const time = new Date();
      newInput.searchParams.set("cacheclearparam", `${time.getMinutes()}`);
      return fetch(newInput.href, init);
    }
    return fetch(input, init);
  },
});

export const getAllPosts = async (): Promise<PostMetaData[]> => {
  try {
    const posts: PostMetaData[] = await client.getAllContents({
      endpoint: "blogs",
      queries: {
        fields: "title,slug,eyecatch,tags,publishedAt",
        orders: "publishDate",
      },
    });
    return posts;
  } catch (err) {
    console.log("~~ getAllPosts ~~");
    console.log(err);
    process.exit(1);
  }
};

export const getAllTags = async (): Promise<Tag[]> => {
  try {
    const tags: Tag[] = await client.getAllContents({
      endpoint: "tags",
      queries: {
        fields: "name,id",
      },
    });
    return tags;
  } catch (err) {
    console.log("~~ getAllTags ~~");
    console.log(err);
    process.exit(1);
  }
};

export const getAllSlugs = async (): Promise<string[]> => {
  try {
    const slugs: string[] = await client.getAllContents({
      endpoint: "blogs",
      queries: {
        fields: "slug",
        orders: "publishDate",
      },
    });
    const res = slugs.map((slug: any) => {
      return slug.slug;
    });
    return res;
  } catch (err) {
    console.log("~~ getAllSlugs ~~");
    console.log(err);
    process.exit(1);
  }
};

export const getPostBySlug = async (slug: string): Promise<Post> => {
  try {
    const post = await client.get({
      endpoint: "blogs",
      queries: { filters: `slug[equals]${slug}` },
    });
    return post.contents[0];
  } catch (err) {
    console.log("~~ getPostBySlug ~~");
    console.log(err);
    process.exit(1);
  }
};

export const getAllPostsByTag = async (
  catID: string
): Promise<PostMetaData[]> => {
  try {
    const posts: PostMetaData[] = await client.getAllContents({
      endpoint: "blogs",
      queries: {
        filters: `tags[contains]${catID}`,
        fields: "title,slug,eyecatch,tags,publishedAt",
        orders: "publishDate",
      },
    });

    return posts;
  } catch (err) {
    console.log("~~ getAllPostsByTag ~~");
    console.log(err);
    process.exit(1);
  }
};
