
export type Tag = {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  revisedAt?: string;
  name: string;
}

export type Eyecatch = {
  url: string;
  height: number;
  width: number;
}

export type Post = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  eyecatch: Eyecatch;
  tags: Tag[];
  slug: string;
}

export type PostMetaData = {
  id: string;
  publishedAt: string;
  title: string;
  eyecatch: Eyecatch;
  tags: Tag[];
  slug: string;
}