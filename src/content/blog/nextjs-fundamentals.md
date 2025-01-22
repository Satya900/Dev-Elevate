---
title: "Next.js Fundamentals: Building Modern Web Applications"
author: "Dev Elevate Team"
date: 2024-03-27
category: "Web Development"
excerpt: "Learn the fundamentals of Next.js for building production-ready React applications"
tags: ["Next.js", "React", "Frontend"]
---

# Next.js Fundamentals: Building Modern Web Applications

Next.js is a powerful React framework that makes building production-ready applications easier. Let's explore its key features and best practices.

## Routing in Next.js

```typescript
// pages/index.tsx
export default function Home() {
  return (
    <div>
      <h1>Welcome to Next.js</h1>
    </div>
  );
}

// pages/posts/[id].tsx
import { useRouter } from 'next/router';

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  
  return <h1>Post: {id}</h1>;
}
```

## Data Fetching Methods

```typescript
// Static Site Generation (SSG)
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();
  
  return {
    props: {
      posts,
    },
    revalidate: 60, // ISR - revalidate every 60 seconds
  };
}

// Server-Side Rendering (SSR)
export async function getServerSideProps(context) {
  const { params, req, res } = context;
  const response = await fetch(`https://api.example.com/posts/${params.id}`);
  const post = await response.json();
  
  return {
    props: {
      post,
    },
  };
}
```

## API Routes

```typescript
// pages/api/posts.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const posts = await fetchPosts();
    res.status(200).json(posts);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
```

## Image Optimization

```typescript
import Image from 'next/image';

function Avatar() {
  return (
    <Image
      src="/avatar.png"
      alt="User Avatar"
      width={64}
      height={64}
      priority
    />
  );
}
```

## Best Practices

1. Use appropriate data fetching method
2. Implement proper error boundaries
3. Optimize images using next/image
4. Leverage built-in performance optimizations
5. Follow the file-system based routing convention

## Conclusion

Next.js provides a robust framework for building modern web applications with React, offering features like automatic code splitting, server-side rendering, and more.