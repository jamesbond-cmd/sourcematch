import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PostCard } from "@/components/blog/PostCard"
import { client } from "@/lib/sanity/client"
import { recentPostsQuery } from "@/lib/sanity/queries"
import type { Post } from "@/lib/sanity/types"

async function getRecentPosts(): Promise<Post[]> {
    try {
        const posts = await client.fetch(recentPostsQuery)
        return posts
    } catch (error) {
        console.error('Error fetching recent posts:', error)
        return []
    }
}

export async function LatestResources() {
    const posts = await getRecentPosts()

    if (posts.length === 0) return null

    return (
        <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="space-y-4 max-w-2xl">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Latest Sourcing Insights
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Expert guides, industry trends, and tips to help you source better and faster.
                        </p>
                    </div>
                    <Button variant="outline" asChild className="hidden md:inline-flex">
                        <Link href="/blog">
                            View All Articles <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <PostCard key={post._id} post={post} />
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Button variant="outline" asChild>
                        <Link href="/blog">
                            View All Articles <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
