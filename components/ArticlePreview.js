// components/article-preview.js
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

export default function ArticlePreview({ article }) {
  if (!article) return null

  const {
    title,
    slug,
    publishDate,
    tags,
    heroImage,
    description
  } = article

  const imageUrl = heroImage?.fields?.file?.url
    ? `https:${heroImage.fields.file.url}`
    : null

  return (
    <div className="article-preview">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title}
          width={350}
          height={196}
          style={{ objectFit: 'cover' }}
        />
      )}
      <h3>
        <Link href={`/posts/${slug}`}>{title}</Link>
      </h3>
      <small>{publishDate}</small>
      {tags && tags.length > 0 && (
        <ul className="tags">
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      )}
      {description?.content ? (
        <ReactMarkdown>
          {description.content.map(block =>
            block.content.map(text => text.value).join(' ')
          ).join('\n')}
        </ReactMarkdown>
      ) : (
        description && description.childMarkdownRemark?.html && (
          <div dangerouslySetInnerHTML={{ __html: description.childMarkdownRemark.html }} />
        )
      )}
    </div>
  )
}
