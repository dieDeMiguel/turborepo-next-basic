import { ImageProps } from '@/sanity/lib/customComponents'
import { imageUrl } from '@/sanity/lib/imageUrl'
import { getPageBySlug } from '@/sanity/lib/pages/getPageBySlug'
import { PortableText } from 'next-sanity'
import Image from 'next/image'
import { notFound } from 'next/navigation'

async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const content = await getPageBySlug(slug)

  const customComponents = {
    types: {
      image: (props: ImageProps) => {
        return (
          <Image
            src={imageUrl(props.value.asset).url()}
            alt={props.value.alt ?? 'Product image'}
            width={600}
            height={400}
            layout="responsive"
            className="object-contain"
          />
        )
      },
    },
  }

  if (!content) {
    return notFound()
  }

  // NEXT.JS 15 way of getting the params
  // we are not using useParams to keep it server component
  return (
    <div className="prose max-w-none mb-6">
      {Array.isArray(content?.content) && (
        <PortableText value={content?.content} components={customComponents} />
      )}
    </div>
  )
}

export default ContentPage
