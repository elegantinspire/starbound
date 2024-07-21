import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../../services/api'; // Ensure this path is correct
import { Post } from '../../types/types';
import { formatDate } from '../../helpers/common';

const PostGrid_1: React.FC<{ filter: string }> = ({ filter }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts(filter);
        setPosts(data.results);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    loadPosts();
  }, [filter]);

  return (
    <div className="container mx-auto xs:px-5 max-w-screen-lg py-5 lg:py-8">
      <div className="w-full py-3">
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
    </div>
  );
};

export default PostGrid_1;
