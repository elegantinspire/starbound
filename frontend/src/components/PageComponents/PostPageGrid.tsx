// src/components/PageComponents/PostPageGrid.tsx

import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../../services/api';
import { Post } from '../../types/types';
import { formatDate } from '../../helpers/common';

interface PostGridProps {
  filter: string;
}

const PostPageGrid: React.FC<PostGridProps> = ({ filter }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(4); // Number of posts per page
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const [next, setNext] = useState<string | null>(null);
  const [previous, setPrevious] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const { results, count, next, previous } = await fetchPosts(
          filter,
          page,
          pageSize
        );
        setPosts(results);
        setTotalPosts(count);
        setNext(next);
        setPrevious(previous);
        setLoading(false);
      } catch (error) {
        setError('Error fetching posts');
        setLoading(false);
      }
    };

    loadPosts();
  }, [filter, page, pageSize]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (posts.length === 0) return <div>No posts available</div>;

  return (
    <div className="container mx-auto xs:px-5 max-w-screen-lg py-5 lg:py-8">
      <div className="w-full my-6">
        <h2 className="text-gray-800 text-2xl font-bold">
          <span className="inline-block h-5 border-l-3 border-red-600 mr-2"></span>
          Trending
        </h2>
      </div>
      <div className="grid gap-10 md:grid-cols-3 lg:gap-10">
        {posts.map((post) => (
          <div key={post.id} className="group cursor-pointer">
            <div className="overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105 dark:bg-gray-800">
              <a
                className="relative block aspect-video"
                href={`/posts/${post.slug}`}
              >
                <img
                  alt={post.title}
                  className="object-cover transition-all"
                  sizes="(max-width: 768px) 30vw, 33vw"
                  src={post.featured_image}
                  style={{
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    inset: '0px',
                    color: 'transparent',
                  }}
                />
              </a>
            </div>
            <div>
              <div className="flex gap-3">
                <a href={`/category/${post.category.slug}`}>
                  <span className="inline-block text-xs font-medium tracking-wider uppercase mt-5 text-blue-600">
                    {post.category.name}
                  </span>
                </a>
              </div>
              <h2 className="text-lg font-semibold leading-snug tracking-tight mt-2 dark:text-white">
                <a href={`/posts/${post.slug}`}>
                  <span className="bg-gradient-to-r from-blue-200 to-blue-100 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px] dark:from-purple-800 dark:to-purple-900">
                    {post.title}
                  </span>
                </a>
              </h2>
              <div className="flex">
                <a href={`/posts/${post.slug}`}>
                  <p className="mt-2 line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
                    <span
                      dangerouslySetInnerHTML={{ __html: post.description }}
                    />
                  </p>
                </a>
              </div>
              <div className="mt-3 flex items-center space-x-3 text-gray-500 dark:text-gray-400">
                <a href={post.author.first_name}>
                  <div className="flex items-center gap-3">
                    <div className="relative h-5 w-5 flex-shrink-0">
                      <img
                        alt={post.author.first_name}
                        className="rounded-full object-cover"
                        sizes="20px"
                        src={post.author.profile.image}
                        style={{
                          position: 'absolute',
                          height: '100%',
                          width: '100%',
                          inset: '0px',
                          color: 'transparent',
                        }}
                      />
                    </div>
                    <span className="truncate text-sm">
                      {post.author.first_name}
                    </span>
                  </div>
                </a>
                <span className="text-xs text-gray-300 dark:text-gray-600">
                  •
                </span>
                <time className="truncate text-sm" dateTime={post.date}>
                  {formatDate(post.date)}
                </time>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination Controls */}
      <nav className="flex items-center justify-center gap-x-1 mt-8">
        <button
          type="button"
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={!previous}
          className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
        >
          <svg
            className="flex-shrink-0 size-3.5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6"></path>
          </svg>
          <span aria-hidden="true" className="sr-only">
            Previous
          </span>
        </button>
        <div className="flex items-center justify-center gap-x-1">
          {[...Array(Math.ceil(totalPosts / pageSize))].map((_, index) => (
            <button
              key={index + 1}
              type="button"
              onClick={() => setPage(index + 1)}
              className={`min-h-[38px] min-w-[38px] flex justify-center items-center border ${
                page === index + 1 ? 'border-gray-200' : 'border-transparent'
              } text-gray-800 py-2 px-3 text-sm rounded-lg focus:outline-none ${
                page === index + 1 ? 'bg-gray-50' : 'hover:bg-gray-100'
              } disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-white dark:focus:bg-white/10`}
              aria-current={page === index + 1 ? 'page' : undefined}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() =>
            setPage((prevPage) => (next ? prevPage + 1 : prevPage))
          }
          disabled={!next}
          className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
        >
          <span aria-hidden="true" className="sr-only">
            Next
          </span>
          <svg
            className="flex-shrink-0 size-3.5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </button>
      </nav>
    </div>
  );
};

export default PostPageGrid;
