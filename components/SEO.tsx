import Head from "next/head";

type SEOProps = {
  title: string;
  description: string;
  keywords?: string;
  url?: string;
  image?: string;
};

export default function SEO({
  title,
  description,
  keywords,
  url = "https://www.propmatics.com",
  image = "https://www.propmatics.com/og-image.png",
}: SEOProps) {
  return (
    <Head>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content="index, follow" />

      {/* Open Graph / Social */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Propmatics",
            url: "https://www.propmatics.com",
            logo: "https://www.propmatics.com/logo.png",
          }),
        }}
      />
    </Head>
  );
}
