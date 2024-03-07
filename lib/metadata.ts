export const siteMeta = {
  siteTitle: "MdyCode",
  siteDesc: "学習記録用のサイト！",
  siteUrl: "https://hcumdy.com",
  siteLang: "ja",
  siteLocale: "ja_JP",
  siteType: "website",
  siteIcon: "/favicon.ico",
};

export const eyecatchLocal = {
  url: "/noimage.png",
  width: 1920,
  height: 1280,
};

const {
  siteTitle,
  siteDesc,
  siteLang,
  siteUrl,
  siteLocale,
  siteType,
  siteIcon,
} = siteMeta;

import siteImg from "@/public/favicon.ico";

export const baseMetadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "./",
  },
  title: {
    template: `%s | ${siteTitle}`,
    default: siteTitle,
  },
  description: siteDesc,
  icons: {
    icon: siteIcon,
    apple: siteIcon,
  },
};

export const openGraphMetadata = {
  title: siteTitle,
  description: siteDesc,
  url: siteUrl,
  siteName: siteTitle,
  images: [
    {
      url: siteImg.src,
      width: siteImg.width,
      height: siteImg.height,
    },
  ],
  locale: siteLocale,
  type: siteType,
};

export const twitterMetadata = {
  card: "summary_large_image",
  title: siteTitle,
  description: siteDesc,
  images: [siteImg.src],
};
