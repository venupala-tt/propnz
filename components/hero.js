// components/hero.js
import React from 'react'
import Image from 'next/image'

export default function Hero({ data }) {
  if (!data) return null

  const { name, shortBio, title, heroImage } = data
  const imageUrl = heroImage?.fields?.file?.url
    ? `https:${heroImage.fields.file.url}`
    : null

  return (
    <div className="hero">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={name}
          width={1180}
          height={480}
          style={{ objectFit: 'cover' }}
        />
      )}
      <div className="hero-text">
        <h1>{name}</h1>
        <h2>{title}</h2>
        {shortBio?.shortBio && <p>{shortBio.shortBio}</p>}
      </div>
    </div>
  )
}
