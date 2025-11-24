import { defineQuery } from 'next-sanity'
import { sanityFetch } from "../live";
import { PageContent } from '@/types/types';

export const getPageBySlug = async (slug: string): Promise<PageContent | null> => {
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
  `);

  try {
    // Using sanityFetch for automatic live updates and tag-based revalidation
    const page = await sanityFetch({
      query: PAGE_QUERY,
      params: { slug },
    });
    return page.data ? (page.data as PageContent) : null;
  } catch (error) {
    console.log('Error fetching the page content', error);
    return null;
  }
};