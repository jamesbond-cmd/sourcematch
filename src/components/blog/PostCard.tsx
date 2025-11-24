import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Calendar, User } from "lucide-react"
import type { Post } from "@/lib/sanity/types"

interface PostCardProps {
    post: Post
}

export function PostCard({ post }: PostCardProps) {
    const publishedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    return (
        <Link href={`/blog/${post.slug.current}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                {post.mainImage && (
                    <div className="relative w-full h-48">
                        <Image
                            src={post.mainImage.asset.url}
                            alt={post.mainImage.alt || post.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}
                <div className="p-6">
                    {post.categories && post.categories.length > 0 && (
                        <div className="flex gap-2 mb-3">
                            {post.categories.map((category) => (
                                <span
                                    key={category._id}
                                    className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded"
                                >
                                    {category.title}
                                </span>
                            ))}
                        </div>
                    )}
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
                    {post.excerpt && (
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                            {post.excerpt}
                        </p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{publishedDate}</span>
                        </div>
                        {post.author && (
                            <div className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                <span>{post.author.name}</span>
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </Link>
    )
}
