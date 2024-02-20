import { Client } from "@notionhq/client";
import {
  DatabaseObjectResponse,
  PageObjectResponse,
  PartialDatabaseObjectResponse,
  PartialPageObjectResponse,
  QueryDatabaseParameters,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { NotionToMarkdown } from "notion-to-md";
import { cache } from "react";

//export const revalidate: number = 60 * 60 * 2;

export type Post = {
  id: string;
  title: string;
  description: string;
  date: string;
  slug: string;
  tags: string[];
  thumbnail: string | null;
};

const notion: Client = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

n2m.setCustomTransformer("image", async (block) => {
  const { image } = block as any;
  if (
    image?.file?.url.includes("prod-files-secure.s3.us-west-2.amazonaws.com")
  ) {
    const expiryTime = Date.parse(image.file.expiry_time);
    const now = Date.now();

    if (expiryTime < now) {
      return await getLatestBlockByID(image.id);
    }
  }
  return image;
});

const isValidPost = (page: any): boolean => {
  if (typeof page.properties === "undefined") {
    return false;
  }
  const prop = page.properties;
  return (
    prop.Page?.title[0]?.plain_text?.length >= 0 &&
    prop.slug?.rich_text[0]?.plain_text?.length >= 0 &&
    !!prop.Date?.date?.start
  );
};

const buildPost = (pageObject: any): Post => {
  const getTags = (tags: any) => {
    const allTags = tags.map((tag: any) => {
      return tag.name;
    });

    return allTags;
  };

  // const file = pageObject.properties.Thumbnail.files[0] !== undefined
  // ? pageObject.properties.Thumbnail.files[0].file.url
  // : null;

  // console.log(file)

  const post: Post = {
    id: pageObject.id,
    title: pageObject.properties.Page.title[0].plain_text,
    description: pageObject.properties.Detail.rich_text[0].plain_text,
    date: pageObject.properties.Date.date.start,
    slug: pageObject.properties.slug.rich_text[0].plain_text,
    tags: getTags(pageObject.properties.Tag.multi_select),
    thumbnail:
      pageObject.properties.Thumbnail.files[0] !== undefined
        ? pageObject.properties.Thumbnail.files[0].file.url
        : null,
  };

  return post;
};

export const getAllPosts = cache(async (): Promise<Post[]> => {
  let results: Array<
    | PageObjectResponse
    | PartialPageObjectResponse
    | PartialDatabaseObjectResponse
    | DatabaseObjectResponse
  > = [];

  const params: QueryDatabaseParameters = {
    database_id: String(process.env.NOTION_DATABASE_ID),
    page_size: 100,
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "Date",
        timestamp: "created_time",
        direction: "descending",
      },
    ],
  };

  while (true) {
    const databaseResponse: QueryDatabaseResponse =
      await notion.databases.query(params);

    results = results.concat(databaseResponse.results);

    if (!databaseResponse.has_more) {
      break;
    }

    params["start_cursor"] = databaseResponse.next_cursor
      ? databaseResponse.next_cursor
      : undefined;
  }

  const allPosts = results
    .filter((pageObject) => isValidPost(pageObject))
    .map((pageObject) => buildPost(pageObject));

  return allPosts;
});

export const getPosts = cache(
  async (
    pageSize: number = 10,
    startIndex: string | undefined = undefined
  ): Promise<Post[]> => {
    if (pageSize <= 0) {
      return [];
    }

    const params: QueryDatabaseParameters = {
      database_id: String(process.env.NOTION_DATABASE_ID),
      page_size: pageSize,
      start_cursor: startIndex,
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "Date",
          timestamp: "created_time",
          direction: "descending",
        },
      ],
    };

    const databaseResponse: QueryDatabaseResponse =
      await notion.databases.query(params);

    const posts = databaseResponse.results
      .filter((pageObject) => isValidPost(pageObject))
      .map((pageObject) => buildPost(pageObject));

    return posts;
  }
);

export const getPostBySlug = cache(async (slug: string) => {
  const databaseResponse: QueryDatabaseResponse = await notion.databases.query({
    database_id: String(process.env.NOTION_DATABASE_ID),
    filter: {
      property: "slug",
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  });

  const res = databaseResponse.results[0];

  // if (!isValidPost(res)) {
  //   return null;
  // }

  return buildPost(res);
});

export const getLatestBlockByID = async (blockID: string) => {
  return await notion.blocks.retrieve({ block_id: blockID });
};

export const getAllBlocksByID = cache(async (blockID: string) => {
  return await notion.blocks.children.list({
    block_id: blockID,
  });
});

// export const getPostContentByID = cache(async (pageID: string) => {
//   const mdBlocks = await n2m.pageToMarkdown(pageID);
//   const mdString = n2m.toMarkdownString(mdBlocks).parent;
//   return mdString;
// });

export const getPostContentByID = async (pageID: string) => {
  const { results } = await getAllBlocksByID(pageID);

  const mdBlocks = await n2m.blocksToMarkdown(results);
  const mdString = n2m.toMarkdownString(mdBlocks).parent;
  const now = new Date(Date.now());

  return {mdString, now};
};
