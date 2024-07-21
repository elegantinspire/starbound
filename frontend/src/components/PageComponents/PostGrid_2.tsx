import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../../services/api'; // Ensure this path is correct
import { Post } from '../../types/types';

const LatestNews: React.FC<{ filter: string }> = ({ filter }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts(filter);
        setPosts(data.results);
      } catch (error) {
        console.error(`Error fetching ${filter} news:`, error);
      }
    };

    loadPosts();
  }, [filter]);

  const popularPosts = posts
    .filter((news) => news.category.slug === 'web-development')
    .map((news) => news);

  return (
    <div className="bg-gray-50 py-6">
      <div className="container mx-auto xs:px-5 max-w-screen-lg py-5 lg:py-8">
        <div className="flex flex-row flex-wrap">
          <div className="flex-shrink max-w-full w-full lg:w-2/3">
            <div className="w-full py-3">
              <h2 className="text-gray-800 text-2xl font-bold">
                <span className="inline-block h-5 border-l-3 border-red-600 mr-2"></span>
                Latest news
              </h2>
            </div>
            <div className="flex flex-row flex-wrap">
              {posts.map((news, index) => (
                <div
                  key={news.id}
                  className={`group cursor-pointer w-full px-3 ${
                    index === 0 ? '' : 'sm:w-1/3'
                  }`}
                >
                  <div
                    key={news.id}
                    className={`flex-shrink max-w-full w-full ${
                      index === 0
                        ? 'pb-5'
                        : 'pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100'
                    }`}
                  >
                    <div
                      className={`relative overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105 dark:bg-gray-800 flex flex-col`}
                      style={{ height: '300px' }} // Set a fixed height for consistency
                    >
                      <a href={`post/${news.slug}`} className="h-full">
                        <img
                          className="max-w-full w-full h-full object-cover"
                          src={news.featured_image}
                          alt="Image description"
                        />
                      </a>
                      <div className="absolute px-5 pt-8 pb-5 bottom-0 w-full bg-gradient-cover">
                        <a href={`post/${news.slug}`}>
                          <h2
                            className={`text-${
                              index === 0 ? '3xl' : 'sm'
                            } font-bold capitalize text-white mb-3`}
                          >
                            {news.title}
                          </h2>
                        </a>
                        {index === 0 && (
                          <p
                            className="text-gray-100 hidden sm:inline-block"
                            dangerouslySetInnerHTML={{
                              __html: news.description,
                            }}
                          ></p>
                        )}
                        <div className="pt-2">
                          <div className="text-gray-100">
                            <div className="inline-block h-3 border-l-2 border-red-600 mr-2"></div>
                            <a href={`category/${news.category.slug}`}>
                              {news.category.name}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-shrink max-w-full w-full lg:w-1/3 lg:pr-8 lg:pt-14 lg:pb-8 order-first">
            <div className="w-full bg-white">
              <div className="mb-6">
                <div className="p-4 bg-gray-100">
                  <h2 className="text-lg font-bold">Most Popular</h2>
                </div>
                <ul className="post-number">
                  {popularPosts.map((post, index) => (
                    <li
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <a
                        className="text-sm font-semibold px-6 py-3 flex flex-row items-center"
                        href={`posts/${post.slug}`}
                      >
                        {post.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="text-sm py-6 sticky">
              <div className="w-full text-center">
                <a className="uppercase" href="#">
                  Advertisement
                </a>
                <a href="#">
                  <img
                    className="mx-auto"
                    src="/images/ads/250.jpg"
                    alt="advertisement area"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
