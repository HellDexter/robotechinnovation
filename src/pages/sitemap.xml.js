const EXTERNAL_DATA_URL = 'https://rti-robotech.cz';

function generateSiteMap(products) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
           xmlns:xhtml="http://www.w3.org/1999/xhtml">
     <url>
       <loc>${EXTERNAL_DATA_URL}</loc>
       <xhtml:link 
         rel="alternate"
         hreflang="cs"
         href="${EXTERNAL_DATA_URL}/cs"
       />
       <xhtml:link
         rel="alternate"
         hreflang="en"
         href="${EXTERNAL_DATA_URL}/en"
       />
       <xhtml:link
         rel="alternate"
         hreflang="de"
         href="${EXTERNAL_DATA_URL}/de"
       />
       <xhtml:link
         rel="alternate"
         hreflang="zh"
         href="${EXTERNAL_DATA_URL}/zh"
       />
       <xhtml:link
         rel="alternate"
         hreflang="ar"
         href="${EXTERNAL_DATA_URL}/ar"
       />
     </url>
     ${products
       .map(({ slug }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/products/${slug}`}</loc>
           <xhtml:link 
             rel="alternate"
             hreflang="cs"
             href="${EXTERNAL_DATA_URL}/cs/products/${slug}"
           />
           <xhtml:link
             rel="alternate"
             hreflang="en"
             href="${EXTERNAL_DATA_URL}/en/products/${slug}"
           />
           <xhtml:link
             rel="alternate"
             hreflang="de"
             href="${EXTERNAL_DATA_URL}/de/products/${slug}"
           />
           <xhtml:link
             rel="alternate"
             hreflang="zh"
             href="${EXTERNAL_DATA_URL}/zh/products/${slug}"
           />
           <xhtml:link
             rel="alternate"
             hreflang="ar"
             href="${EXTERNAL_DATA_URL}/ar/products/${slug}"
           />
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  return null;
}

export async function getServerSideProps({ res }) {
  const products = [
    { slug: 'robotic-welding' },
    { slug: 'welding-lasers' },
    { slug: 'cleaning-lasers' },
    { slug: 'robotic-grinding' },
    { slug: 'carport' },
  ];

  const sitemap = generateSiteMap(products);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
