import Head from "next/head";
import React from "react";

interface SEOProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  keywords?: string;
}

const SEOComponent: React.FC<SEOProps> = ({
  title,
  description,
  url,
  image,
  keywords = "TrioBridge, intern management, onboarding, HR tool, Triostack, performance tracking, intern dashboard",
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      <link rel="canonical" href={url} />
    </Head>
  );
};

export default SEOComponent;
