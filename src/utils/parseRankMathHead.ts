export default function parseRankMathHead(headHtml: string) {
  function decodeHtmlEntities(input: string) {
    // Decode common HTML entities and numeric entities (e.g. &#8211; or &#x2013;)
    const named: Record<string, string> = {
      amp: '&',
      lt: '<',
      gt: '>',
      quot: '"',
      apos: "'",
      nbsp: '\u00A0',
    }

    return input.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (full, entity: string) => {
      if (entity[0] === '#') {
        const isHex = entity[1]?.toLowerCase() === 'x'
        const num = isHex ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10)
        if (Number.isFinite(num)) {
          try {
            return String.fromCodePoint(num)
          } catch {
            return full
          }
        }
        return full
      }

      return named[entity] ?? full
    })
  }

  function getMetaContent(property: string) {
    const regex = new RegExp(`<meta[^>]+${property}[^>]+content="([^"]+)"`, 'i')
    const match = headHtml.match(regex)
    return match ? decodeHtmlEntities(match[1]) : null
  }

  function getLinkHref(rel: string) {
    const regex = new RegExp(`<link[^>]+rel="${rel}"[^>]+href="([^"]+)"`, 'i')
    const match = headHtml.match(regex)
    return match ? decodeHtmlEntities(match[1]) : null
  }

  function getSchemaMarkup() {
    const regex = /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i
    const match = headHtml.match(regex)
    const raw = match?.[1]?.trim()
    if (!raw) return null
    try {
      return JSON.parse(raw)
    } catch {
      return null
    }
  }

  return {
    title: decodeHtmlEntities(headHtml.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '') || null,
    description: getMetaContent('name="description"'),
    canonical: getLinkHref('canonical'),
    openGraph: {
      title: getMetaContent('property="og:title"'),
      description: getMetaContent('property="og:description"'),
      url: getMetaContent('property="og:url"'),
      siteName: getMetaContent('property="og:site_name"'),
      locale: getMetaContent('property="og:locale"'),
      type: getMetaContent('property="og:type"'),
      image: {
        url: getMetaContent('property="og:image"'),
        width: getMetaContent('property="og:image:width"'),
        height: getMetaContent('property="og:image:height"'),
        alt: getMetaContent('property="og:image:alt"'),
      },
    },
    twitter: {
      card: getMetaContent('name="twitter:card"'),
      title: getMetaContent('name="twitter:title"'),
      description: getMetaContent('name="twitter:description"'),
      image: getMetaContent('name="twitter:image"'),
    },
    schemaMarkup: getSchemaMarkup(),
  }
}
