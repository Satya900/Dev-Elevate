import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export async function fetchPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
}

export async function fetchPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();
    
  if (error) throw error;
  return data;
}

export async function createPost(post: {
  title: string;
  content: string;
  author: string;
  excerpt?: string;
  category: string;
  tags?: string[];
}) {
  const slug = post.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const { data, error } = await supabase
    .from('posts')
    .insert([{ ...post, slug }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updatePost(slug: string, post: Partial<{
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
}>) {
  const { data, error } = await supabase
    .from('posts')
    .update(post)
    .eq('slug', slug)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePost(slug: string) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('slug', slug);

  if (error) throw error;
}