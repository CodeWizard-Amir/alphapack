'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FaCalendarAlt, FaUser, FaClock, FaEye, FaTag, FaShareAlt, FaArrowRight } from 'react-icons/fa';
import blogData from '../../../server/blog.json';

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const found = blogData.posts.find(p => p.slug === slug);
    setPost(found);
    if (found) {
      const related = blogData.posts.filter(p => p.category === found.category && p.slug !== slug).slice(0, 2);
      setRelatedPosts(related);
    }
  }, [slug]);

  if (!post) {
    return (
      <main className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">مقاله یافت نشد</h2>
          <Link href="/blog" className="text-indigo-600 mt-4 inline-block">بازگشت به وبلاگ</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 md:pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-indigo-600">خانه</Link> /{' '}
          <Link href="/blog" className="hover:text-indigo-600">وبلاگ</Link> /{' '}
          <span className="text-gray-800">{post.title}</span>
        </div>

        {/* Header */}
        <h1 className="text-3xl md:text-5xl font-extrabold mb-5">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mb-8 pb-4 border-b">
          <span className="flex items-center gap-1"><FaCalendarAlt /> {post.date}</span>
          <span className="flex items-center gap-1"><FaUser /> {post.author}</span>
          <span className="flex items-center gap-1"><FaClock /> {post.readTime} دقیقه مطالعه</span>
          <span className="flex items-center gap-1"><FaEye /> {post.views} بازدید</span>
        </div>

        {/* Featured Image */}
        <div className="rounded-2xl overflow-hidden shadow-lg mb-8 h-64 md:h-96 bg-gray-200">
          {/* <Image src={post.image} alt={post.title} width={800} height={400} className="w-full h-full object-cover" /> */}
          <div className="w-full h-full bg-gradient-to-br from-indigo-300 to-purple-300 flex items-center justify-center text-gray-700">
            [تصویر شاخص مقاله]
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-8 pt-4 border-t">
          {post.tags.map((tag, idx) => (
            <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <FaTag className="h-3 w-3" /> {tag}
            </span>
          ))}
        </div>

        {/* Author Box */}
        <div className="bg-indigo-50 p-6 rounded-2xl mt-10 flex items-center gap-4 flex-wrap">
          <div className="w-16 h-16 rounded-full bg-indigo-200 flex items-center justify-center">
            {/* <Image src={post.authorAvatar} alt={post.author} width={64} height={64} className="rounded-full" /> */}
            <span className="text-xs">[عکس]</span>
          </div>
          <div>
            <p className="font-bold text-lg">{post.author}</p>
            <p className="text-gray-600 text-sm">نویسنده و مدرس آکادمی‌آنلاین</p>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">مقالات مرتبط</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map(related => (
                <Link key={related.id} href={`/blog/${related.slug}`} className="bg-white p-4 rounded-xl shadow hover:shadow-md transition flex gap-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0">
                    {/* <Image src={related.image} alt={related.title} width={96} height={96} className="rounded-lg object-cover" /> */}
                    <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100"></div>
                  </div>
                  <div>
                    <h4 className="font-bold line-clamp-2">{related.title}</h4>
                    <p className="text-gray-500 text-xs mt-1">{related.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back to Blog */}
        <div className="text-center mt-12">
          <Link href="/blog" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition">
            بازگشت به وبلاگ
            <FaArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}