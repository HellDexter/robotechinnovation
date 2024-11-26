import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export default function SEO({
  title,
  description,
  image = '/images/logoRTI.jpg',
  article = false,
}) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const canonical = `https://rti-robotech.cz${router.asPath}`;

  const siteTitle = title 
    ? `${title} | RTI Robotech Innovation` 
    : 'RTI Robotech Innovation - Průmyslová automatizace a robotizace';
    
  const siteDescription = description || t('meta.description');

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': article ? 'Article' : 'WebSite',
    name: siteTitle,
    description: siteDescription,
    url: canonical,
    ...(article && {
      publisher: {
        '@type': 'Organization',
        name: 'RTI Robotech Innovation',
        logo: {
          '@type': 'ImageObject',
          url: 'https://rti-robotech.cz/images/logoRTI.jpg',
        },
      },
    }),
  };

  return (
    <Head>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:site_name" content="RTI Robotech Innovation" />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={`https://rti-robotech.cz${image}`} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:locale" content={router.locale} />
      {router.locales?.map((locale) => (
        <meta key={locale} property="og:locale:alternate" content={locale} />
      ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={`https://rti-robotech.cz${image}`} />

      {/* Bezpečnostní hlavičky */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta
        httpEquiv="Content-Security-Policy"
        content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;"
      />

      {/* Strukturovaná data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  );
}
