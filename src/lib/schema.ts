// Schema Markup Utilities for SEO

// Business Information
export const BUSINESS_INFO = {
  name: 'SNC Gutachter',
  legalName: 'SNC Sachverständigenbüro',
  foundingDate: '2025-01-01',
  founder: 'Ilker Sancar',
  email: 'kontakt@snc-svb.de',
  telephone: '+4915209423739',
  url: 'https://snc-svb.de',
  logo: 'https://snc-svb.de/images/snclogo.png',
  image: 'https://snc-svb.de/images/sncportrait.png',
  address: {
    streetAddress: 'Rohrackerstraße 5',
    addressLocality: 'Stuttgart',
    postalCode: '73029',
    addressRegion: 'Baden-Württemberg',
    addressCountry: 'DE'
  },
  geo: {
    latitude: '48.7758',
    longitude: '9.1829'
  },
  openingHours: 'Mo-Su 08:00-22:00',
  priceRange: '€€',
  serviceArea: [
    'Stuttgart',
    'Esslingen',
    'Ludwigsburg',
    'Böblingen',
    'Waiblingen',
    'Sindelfingen',
    'Leonberg',
    'Filderstadt',
    'Kornwestheim',
    'Ostfildern'
  ]
}

// LocalBusiness Schema (AutomotiveBusiness)
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutomotiveBusiness',
    '@id': `${BUSINESS_INFO.url}#business`,
    name: BUSINESS_INFO.name,
    legalName: BUSINESS_INFO.legalName,
    foundingDate: BUSINESS_INFO.foundingDate,
    url: BUSINESS_INFO.url,
    logo: BUSINESS_INFO.logo,
    image: BUSINESS_INFO.image,
    email: BUSINESS_INFO.email,
    telephone: BUSINESS_INFO.telephone,
    priceRange: BUSINESS_INFO.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_INFO.address.streetAddress,
      addressLocality: BUSINESS_INFO.address.addressLocality,
      postalCode: BUSINESS_INFO.address.postalCode,
      addressRegion: BUSINESS_INFO.address.addressRegion,
      addressCountry: BUSINESS_INFO.address.addressCountry
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS_INFO.geo.latitude,
      longitude: BUSINESS_INFO.geo.longitude
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      opens: '08:00',
      closes: '22:00'
    },
    areaServed: BUSINESS_INFO.serviceArea.map(area => ({
      '@type': 'City',
      name: area,
      '@id': `https://www.wikidata.org/wiki/${area}`
    })),
    founder: {
      '@type': 'Person',
      name: BUSINESS_INFO.founder,
      jobTitle: 'KFZ-Sachverständiger',
      description: 'Öffentlich bestellt und vereidigt'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '300',
      bestRating: '5',
      worstRating: '1'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'KFZ-Gutachten Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Unfallgutachten',
            description: 'Unabhängige Schadensbegutachtung nach Unfällen'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Wertgutachten',
            description: 'Ermittlung des Fahrzeugwertes'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Wertminderungsberechnung',
            description: 'Berechnung der merkantilen Wertminderung'
          }
        }
      ]
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '300'
    }
  }
}

// Organization Schema
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BUSINESS_INFO.url}#organization`,
    name: BUSINESS_INFO.name,
    url: BUSINESS_INFO.url,
    logo: BUSINESS_INFO.logo,
    description: 'Unabhängige KFZ-Gutachten in Stuttgart. Öffentlich bestellt & vereidigt. Über 300 zufriedene Kunden.',
    foundingDate: BUSINESS_INFO.foundingDate,
    founder: {
      '@type': 'Person',
      name: BUSINESS_INFO.founder
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: BUSINESS_INFO.telephone,
      contactType: 'customer service',
      email: BUSINESS_INFO.email,
      availableLanguage: ['de', 'German']
    },
    sameAs: [
      // Add social media profiles here when available
    ]
  }
}

// Service Schema
export function generateServiceSchema(service: {
  name: string
  description: string
  serviceType: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.serviceType,
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'AutomotiveBusiness',
      name: BUSINESS_INFO.name,
      telephone: BUSINESS_INFO.telephone,
      email: BUSINESS_INFO.email
    },
    areaServed: BUSINESS_INFO.serviceArea.map(area => ({
      '@type': 'City',
      name: area
    })),
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      availableAtOrFrom: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: BUSINESS_INFO.address.addressLocality,
          addressRegion: BUSINESS_INFO.address.addressRegion,
          addressCountry: BUSINESS_INFO.address.addressCountry
        }
      }
    }
  }
}

// BreadcrumbList Schema
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

// FAQPage Schema
export function generateFAQPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}

// WebPage Schema
export function generateWebPageSchema(page: {
  title: string
  description: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': page.url,
    url: page.url,
    name: page.title,
    description: page.description,
    publisher: {
      '@type': 'Organization',
      name: BUSINESS_INFO.name,
      logo: BUSINESS_INFO.logo
    },
    inLanguage: 'de-DE'
  }
}
