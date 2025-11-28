import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity/client'
import { groq } from 'next-sanity'

// Query to get all blog post slugs and dates
const sitemapPostsQuery = groq`
  *[_type == "post" && defined(publishedAt)] {
    "slug": slug.current,
    publishedAt,
    _updatedAt
  }
`

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://batchsourcing.com'

    // Fetch blog posts
    let blogPosts: MetadataRoute.Sitemap = []
    try {
        const posts = await client.fetch(sitemapPostsQuery)
        blogPosts = posts.map((post: any) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post._updatedAt || post.publishedAt),
            changeFrequency: 'daily' as const,
            priority: 0.7,
        }))
    } catch (error) {
        console.error('Error fetching blog posts for sitemap:', error)
    }

    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/how-it-works`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/buyers`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/rfi`,
            lastModified: new Date(),
            changeFrequency: 'always',
            priority: 0.9,
        },
    ]

    return [...staticPages, ...blogPosts]
}

