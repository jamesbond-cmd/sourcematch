export interface Post {
    _id: string
    title: string
    slug: { current: string }
    publishedAt: string
    excerpt?: string
    mainImage?: {
        asset: {
            _id: string
            url: string
        }
        alt?: string
    }
    body?: any[]
    author?: Author
    categories?: Category[]
    seo?: {
        metaTitle?: string
        metaDescription?: string
    }
}

export interface Author {
    name: string
    slug: { current: string }
    image?: {
        asset: {
            _id: string
            url: string
        }
    }
    bio?: string
}

export interface Category {
    _id: string
    title: string
    slug: { current: string }
    description?: string
}
