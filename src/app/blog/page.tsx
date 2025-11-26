import { Header } from "@/components/landing/Header"
import { Footer } from "@/components/landing/Footer"
import { PostCard } from "@/components/blog/PostCard"
import { client } from "@/lib/sanity/client"
import { postsQuery, categoriesQuery } from "@/lib/sanity/queries"
import type { Post, Category } from "@/lib/sanity/types"
import { Metadata } from "next"

export const revalidate = 60 // Revalidate every 60 seconds

async function getPosts(): Promise<Post[]> {
    try {
        const posts = await client.fetch(postsQuery)
        return posts
    } catch (error) {
        console.error('Error fetching posts:', error)
        return []
    }
}

async function getCategories(): Promise<Category[]> {
    try {
        const categories = await client.fetch(categoriesQuery)
        return categories
    } catch (error) {
        console.error('Error fetching categories:', error)
        return []
    }
}

export const metadata: Metadata = {
    title: "Blog - Batch Sourcing",
    description: "Insights, tips, and news about food and beverage sourcing, manufacturing trends, and supply chain management.",
}

export default async function BlogPage() {
    const [posts, categories] = await Promise.all([
        getPosts(),
        getCategories()
    ])

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
                <div className="max-w-6xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Batch Sourcing Blog</h1>
                        <p className="text-xl text-muted-foreground">
                            Insights, tips, and news about food and beverage sourcing
                        </p>
                    </div>

                    {/* Categories */}
                    {categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 justify-center mb-12">
                            <button className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                                All Posts
                            </button>
                            {categories.map((category) => (
                                <button
                                    key={category._id}
                                    className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 text-sm font-medium transition-colors"
                                >
                                    {category.title}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Posts Grid */}
                    {posts.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {posts.map((post) => (
                                <PostCard key={post._id} post={post} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-muted-foreground text-lg">
                                No blog posts yet. Check back soon for insights on food and beverage sourcing!
                            </p>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}
