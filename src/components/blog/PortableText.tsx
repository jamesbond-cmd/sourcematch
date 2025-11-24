import { PortableText as PortableTextComponent, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'

const components: PortableTextComponents = {
    types: {
        image: ({ value }) => {
            if (!value?.asset?._ref) {
                return null
            }
            return (
                <div className="my-8">
                    <Image
                        src={urlFor(value).width(800).url()}
                        alt={value.alt || ' '}
                        width={800}
                        height={450}
                        className="rounded-lg"
                    />
                    {value.alt && (
                        <p className="text-sm text-muted-foreground text-center mt-2">{value.alt}</p>
                    )}
                </div>
            )
        },
    },
    block: {
        h1: ({ children }) => <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>,
        h2: ({ children }) => <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>,
        h3: ({ children }) => <h3 className="text-2xl font-bold mt-6 mb-3">{children}</h3>,
        h4: ({ children }) => <h4 className="text-xl font-bold mt-6 mb-3">{children}</h4>,
        normal: ({ children }) => <p className="mb-4 leading-7">{children}</p>,
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
    },
    listItem: {
        bullet: ({ children }) => <li className="ml-4">{children}</li>,
        number: ({ children }) => <li className="ml-4">{children}</li>,
    },
    marks: {
        strong: ({ children }) => <strong className="font-bold">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        code: ({ children }) => (
            <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
        ),
        link: ({ value, children }) => {
            const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
            return (
                <a
                    href={value?.href}
                    target={target}
                    rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                    className="text-primary hover:underline"
                >
                    {children}
                </a>
            )
        },
    },
}

interface PortableTextProps {
    value: any
}

export function PortableText({ value }: PortableTextProps) {
    return <PortableTextComponent value={value} components={components} />
}
