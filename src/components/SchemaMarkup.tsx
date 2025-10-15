import Script from 'next/script'
import {
  generateLocalBusinessSchema,
  generateOrganizationSchema,
  generateBreadcrumbSchema,
  generateFAQPageSchema,
  generateWebPageSchema,
  generateServiceSchema
} from '@/lib/schema'

// LocalBusiness Schema Component
export function LocalBusinessSchema() {
  const schema = generateLocalBusinessSchema()

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Organization Schema Component
export function OrganizationSchema() {
  const schema = generateOrganizationSchema()

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Breadcrumb Schema Component
export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = generateBreadcrumbSchema(items)

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// FAQPage Schema Component
export function FAQPageSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const schema = generateFAQPageSchema(faqs)

  return (
    <Script
      id="faq-page-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// WebPage Schema Component
export function WebPageSchema({ title, description, url }: {
  title: string
  description: string
  url: string
}) {
  const schema = generateWebPageSchema({ title, description, url })

  return (
    <Script
      id="webpage-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Service Schema Component
export function ServiceSchema({ service }: {
  service: {
    name: string
    description: string
    serviceType: string
  }
}) {
  const schema = generateServiceSchema(service)

  return (
    <Script
      id="service-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
