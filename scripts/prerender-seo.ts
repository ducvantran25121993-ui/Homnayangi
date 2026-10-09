import fs from 'fs';
import path from 'path';
import { getAllSeoRoutes, RouteSeoMeta } from '../src/data/seoRoutes';

function escapeXml(unsafe: string) {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function injectMeta(html: string, meta: RouteSeoMeta) {
  const fullUrl = `https://angigio.com${meta.path === "/" ? "/" : meta.path}`;
  const canonicalUrl = meta.canonicalPath
    ? `https://angigio.com${meta.canonicalPath === "/" ? "/" : meta.canonicalPath}`
    : fullUrl;
  let updatedHtml = html
    .replace(/<title>.*?<\/title>/i, `<title>${meta.title}</title>`)
    .replace(/<meta\s+name="title"\s+content=".*?"\s*\/?>/i, `<meta name="title" content="${meta.title}" />`)
    .replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${meta.description}" />`)
    .replace(/<meta\s+name="keywords"\s+content=".*?"\s*\/?>/i, `<meta name="keywords" content="${meta.keywords}" />`)
    .replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i, `<link rel="canonical" href="${canonicalUrl}" />`)
    .replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i, `<meta property="og:title" content="${meta.title}" />`)
    .replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i, `<meta property="og:description" content="${meta.description}" />`)
    .replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i, `<meta property="og:url" content="${canonicalUrl}" />`)
    .replace(/<meta\s+property="og:image"\s+content=".*?"\s*\/?>/i, `<meta property="og:image" content="${meta.image}" />`)
    .replace(/<meta\s+property="og:image:alt"\s+content=".*?"\s*\/?>/i, `<meta property="og:image:alt" content="${meta.imageAlt}" />`)
    .replace(/<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:title" content="${meta.title}" />`)
    .replace(/<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:description" content="${meta.description}" />`)
    .replace(/<meta\s+name="twitter:url"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:url" content="${canonicalUrl}" />`)
    .replace(/<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:image" content="${meta.image}" />`);

  if (meta.isArticle) {
    const publishedTime = '2026-09-28T08:00:00+07:00';
    const modifiedTime = '2026-09-30T00:00:00+07:00';
    updatedHtml = updatedHtml.replace(
      /<meta\s+property="og:type"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:type" content="article" />\n    <meta property="article:published_time" content="${publishedTime}" />\n    <meta property="article:modified_time" content="${modifiedTime}" />\n    <meta property="article:author" content="Hôm Nay Ăn Gì" />\n    <meta property="article:section" content="Bí quyết ẩm thực" />`
    );

    const articleSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BlogPosting",
          "@id": `${canonicalUrl}#article`,
          "isPartOf": {
            "@type": "WebSite",
            "@id": "https://angigio.com/#website",
            "name": "Hôm Nay Ăn Gì",
            "url": "https://angigio.com/"
          },
          "headline": meta.title,
          "description": meta.description,
          "image": [meta.image?.startsWith("http") ? meta.image : `https://angigio.com${meta.image}`],
          "datePublished": publishedTime,
          "dateModified": modifiedTime,
          "author": {
            "@type": "Person",
            "name": "Bếp Trưởng Hôm Nay Ăn Gì",
            "jobTitle": "Chuyên gia ẩm thực"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Hôm Nay Ăn Gì",
            "url": "https://angigio.com/",
            "logo": {
              "@type": "ImageObject",
              "url": "https://angigio.com/logo.png"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonicalUrl
          }
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${canonicalUrl}#breadcrumb`,
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Trang chủ",
              "item": "https://angigio.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Blog Ẩm Thực",
              "item": "https://angigio.com/blog"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": meta.title,
              "item": canonicalUrl
            }
          ]
        }
      ]
    };

    updatedHtml = updatedHtml.replace(
      '</head>',
      `    <script type="application/ld+json">\n${JSON.stringify(articleSchema, null, 2)}\n    </script>\n  </head>`
    );
  }

  // Inject initial custom posts so all devices, crawlers and SSG see posts instantaneously
  try {
    const customPostsPath = path.join(process.cwd(), 'public', 'custom_blog_posts.json');
    if (fs.existsSync(customPostsPath)) {
      const rawCustom = fs.readFileSync(customPostsPath, 'utf-8');
      const serialized = rawCustom.replace(/</g, '\\u003c');
      updatedHtml = updatedHtml.replace(
        '</head>',
        `    <script>window.__INITIAL_CUSTOM_POSTS__ = ${serialized};</script>\n  </head>`
      );
    }
  } catch {}

  return updatedHtml;
}

function generateSitemapXml(routes: Record<string, RouteSeoMeta>) {
  const urlEntries = Object.values(routes)
    .filter((meta: RouteSeoMeta) => !meta.isAlias)
    .map((meta: RouteSeoMeta) => {
    const loc = `https://angigio.com${meta.path === '/' ? '/' : meta.path}`;
    const lastmod = meta.lastmod || '2026-09-24';
    const changefreq = meta.changefreq || 'weekly';
    const priority = meta.priority !== undefined ? meta.priority.toFixed(2) : '0.80';
    const imageLoc = meta.image?.startsWith('http') ? meta.image : `https://angigio.com${meta.image}`;
    const imageTitle = escapeXml(meta.imageAlt || meta.title);

    return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <image:image>
      <image:loc>${escapeXml(imageLoc)}</image:loc>
      <image:title>${imageTitle}</image:title>
    </image:image>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlEntries.join('\n')}
</urlset>
`;
}

function generateStaticHtmlPages() {
  const distDir = path.resolve(process.cwd(), 'dist');
  const indexHtmlPath = path.join(distDir, 'index.html');

  if (!fs.existsSync(indexHtmlPath)) {
    console.error('dist/index.html not found! Run vite build first.');
    return;
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
  const routes = getAllSeoRoutes();

  let count = 0;
  for (const [routePath, meta] of Object.entries(routes)) {
    if (routePath === '/') {
      const customizedHtml = injectMeta(baseHtml, meta);
      fs.writeFileSync(indexHtmlPath, customizedHtml, 'utf-8');
      count++;
    } else {
      const cleanSub = routePath.replace(/^\//, '');
      const subDir = path.join(distDir, cleanSub);
      if (!fs.existsSync(subDir)) {
        fs.mkdirSync(subDir, { recursive: true });
      }
      const customizedHtml = injectMeta(baseHtml, meta);
      fs.writeFileSync(path.join(subDir, 'index.html'), customizedHtml, 'utf-8');
      const htmlFlatPath = path.join(distDir, `${cleanSub}.html`);
      const htmlFlatDir = path.dirname(htmlFlatPath);
      if (!fs.existsSync(htmlFlatDir)) {
        fs.mkdirSync(htmlFlatDir, { recursive: true });
      }
      fs.writeFileSync(htmlFlatPath, customizedHtml, 'utf-8');
      count++;
    }
  }

  // Generate & update sitemap.xml in dist/ and public/
  const sitemapXml = generateSitemapXml(routes);
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  const publicDir = path.resolve(process.cwd(), 'public');
  if (fs.existsSync(publicDir)) {
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  }

  // Copy vercel.json and create _redirects for static hosts
  const vercelJsonPath = path.resolve(process.cwd(), 'vercel.json');
  if (fs.existsSync(vercelJsonPath)) {
    fs.copyFileSync(vercelJsonPath, path.join(distDir, 'vercel.json'));
  }
  const redirectsContent = '/*    /index.html   200\n';
  fs.writeFileSync(path.join(distDir, '_redirects'), redirectsContent, 'utf-8');
  if (fs.existsSync(publicDir)) {
    fs.writeFileSync(path.join(publicDir, '_redirects'), redirectsContent, 'utf-8');
  }

  console.log(`Prerender SEO HTML pages completed: generated ${count} routes and updated sitemap.xml!`);
}

generateStaticHtmlPages();
