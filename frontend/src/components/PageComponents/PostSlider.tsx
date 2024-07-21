// src/components/PageComponents/SliderNews.tsx

import React, { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { fetchPosts } from '../../services/api'; // Ensure this path is correct
import { Post } from '../../types/types';

const SliderNews: React.FC<{ filter: string }> = ({ filter }) => {
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

  return (
    <div
      className="relative bg-gray-50"
      style={{
        backgroundImage: "url('/images/bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="bg-black bg-opacity-70">
        <div className="container mx-auto xs:px-5 max-w-screen-lg py-5 lg:py-8">
          <div className="flex flex-row flex-wrap">
            <div className="flex-shrink max-w-full w-full py-12 overflow-hidden">
              <div className="w-full py-3">
                <h2 className="text-white text-2xl font-bold text-shadow-black">
                  <span className="inline-block h-5 border-l-3 border-red-600 mr-2"></span>
                  Latest News
                </h2>
              </div>
              <Splide
                options={{
                  type: 'loop',
                  perPage: 3,
                  gap: '1rem',
                  autoplay: true,
                }}
              >
                {posts.map((news) => (
                  <SplideSlide key={news.id}>
                    <div className="w-full pb-10">
                      <div className="hover-img bg-white">
                        <a href="#">
                          <div className="relative w-full h-64 overflow-hidden">
                            <img
                              className="absolute inset-0 w-full h-full object-cover"
                              src={news.featured_image}
                              alt={news.title}
                            />
                          </div>
                        </a>
                        <div className="py-3 px-6">
                          <h3 className="text-lg font-semibold leading-snug tracking-tight mt-2 dark:text-white">
                            <a href="#">
                              <span className="bg-gradient-to-r from-blue-200 to-blue-100 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_10px] group-hover:bg-[length:100%_10px] dark:from-purple-800 dark:to-purple-900">
                                {news.title}
                              </span>
                            </a>
                          </h3>
                          <a className="text-gray-500" href="#">
                            <span className="inline-block h-3 border-l-2 border-red-600 mr-2"></span>
                            {news.category.name}
                          </a>
                        </div>
                      </div>
                    </div>
                  </SplideSlide>
                ))}
              </Splide>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderNews;
