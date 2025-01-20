const STRAPI_URL = import.meta.env.STRAPI_URL || 'http://localhost:1337';

export async function fetchPosts() {
  const res = await fetch(`${STRAPI_URL}/api/posts`);
  const data = await res.json();
  return data.data;
}

export async function fetchPostBySlug(slug: string) {
  const res = await fetch(`${STRAPI_URL}/api/posts?filters[slug]=${slug}`);
  const data = await res.json();
  return data.data[0];
}