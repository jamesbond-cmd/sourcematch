import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/landing/Header"
import { Footer } from "@/components/landing/Footer"
import { PortableText } from "@/components/blog/PortableText"
import { client } from "@/lib/sanity/client"
import { postQuery, recentPostsQuery } from "@/lib/sanity/queries"
import type { Post } from "@/lib/sanity/types"
import { Calendar, User, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export const revalidate = 60

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

async function getPost(slug: string): Promise<Post | null> {
    try {
        console.log('Fetching post with slug:', slug)
        const post = await client.fetch(postQuery, { slug })
        console.log('Post found:', post ? 'yes' : 'no')
        return post
    } catch (error) {
        console.error('Error fetching post:', error)
        return null
    }
}

async function getRecentPosts(): Promise<Post[]> {
    try {
        const posts = await client.fetch(recentPostsQuery)
        return posts
    } catch (error) {
        console.error('Error fetching recent posts:', error)
        return []
    }
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params
    console.log('Blog post page - slug:', slug)

    const [post, recentPosts] = await Promise.all([
        getPost(slug),
        getRecentPosts()
    ])

    if (!post) {
        console.log('Post not found, returning 404')
        notFound()
    }

    const publishedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
                <div className="max-w-4xl mx-auto">
                    {/* Back Button */}
                    <Link href="/blog">
                        <Button variant="ghost" className="mb-8">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Blog
                        </Button>
                    </Link>

                    {/* Article Header */}
                    <article>
                        {post.categories && post.categories.length > 0 && (
                            <div className="flex gap-2 mb-4">
                                {post.categories.map((category) => (
                                    <span
                                        key={category._id}
                                        className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded"
                                    >
                                        {category.title}
                                    </span>
                                ))}
                            </div>
                        )}

                        <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>

                        <div className="flex items-center gap-6 mb-8 text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{publishedDate}</span>
                            </div>
                            {post.author && (
                                <div className="flex items-center gap-2">
                                    {post.author.image && (
                                        <Image
                                            src={post.author.image.asset.url}
                                            alt={post.author.name}
                                            width={24}
                                            height={24}
                                            className="rounded-full"
                                        />
                                    )}
                                    <User className="w-4 h-4" />
                                    <span>{post.author.name}</span>
                                </div>
                            )}
                        </div>

                        {/* Featured Image */}
                        {post.mainImage && (
                            <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
                                <Image
                                    src={post.mainImage.asset.url}
                                    alt={post.mainImage.alt || post.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        )}

                        {/* Excerpt */}
                        {post.excerpt && (
                            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                                {post.excerpt}
                            </p>
                        )}

                        {/* Article Body */}
                        <div className="prose prose-slate dark:prose-invert max-w-none">
                            {post.body && <PortableText value={post.body} />}
                        </div>

                        {/* Author Bio */}
                        {post.author && post.author.bio && (
                            <Card className="p-6 mt-12">
                                <div className="flex items-start gap-4">
                                    {post.author.image && (
                                        <Image
                                            src={post.author.image.asset.url}
                                            alt={post.author.name}
                                            width={64}
                                            height={64}
                                            className="rounded-full"
                                        />
                                    )}
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">About {post.author.name}</h3>
                                        <p className="text-muted-foreground">{post.author.bio}</p>
                                    </div>
                                </div>
                            </Card>
                        )}
                    </article>

                    {/* Recent Posts */}
                    {recentPosts.length > 0 && (
                        <div className="mt-16">
                            <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {recentPosts.map((recentPost) => (
                                    <Link key={recentPost._id} href={`/blog/${recentPost.slug.current}`}>
                                        <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                                            {recentPost.mainImage && (
                                                <div className="relative w-full h-32">
                                                    <Image
                                                        src={recentPost.mainImage.asset.url}
                                                        alt={recentPost.mainImage.alt || recentPost.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            )}
                                            <div className="p-4">
                                                <h3 className="font-semibold line-clamp-2">{recentPost.title}</h3>
                                            </div>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}
