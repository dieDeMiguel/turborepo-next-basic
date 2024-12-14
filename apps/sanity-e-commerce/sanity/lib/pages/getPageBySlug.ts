import { defineQuery } from 'next-sanity'
import { sanityFetch } from '../live'

export const getPageBySlug = async (slug: string) => {
  const PAGE_QUERY = defineQuery(`
    *[
      _type == "page" && slug.current == $slug
    ][0] {
      title,
      "slug": slug.current,
      content[]{
        ...,
        _type == "image" => {
          ...,
          "alt": alt,
          "caption": caption
        }
      }
    }
  `)

  try {
    const page = await sanityFetch({
      query: PAGE_QUERY,
      params: { slug },
    })
    return page.data || null
  } catch (error) {
    console.log('Error fetching the page content', error)
    return null
  }
}
