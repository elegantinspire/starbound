import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../../services/api'; // Ensure this path is correct
import { Post } from '../../types/types';

const HeroBigGrid: React.FC<{ filter: string }> = ({ filter }) => {
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
  }, []);

  if (posts.length === 0) {
    return <div>Loading...</div>; // You can replace this with a proper loading indicator
  }

  return (
    <div className="container mx-auto xs:px-5 max-w-screen-lg py-5 lg:py-8">
      <div className="xl:container mx-auto xs:px-4">
        {/* Big Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:gap-5">
          {/* Start left cover */}
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-xl bg-gray-100 transition-all dark:bg-gray-800 h-full">
              <a href={`posts/${posts[0].slug}`}>
                <div className="h-full">
                  <img
                    className="w-full h-full object-cover rounded-xl"
                    src={posts[0].featured_image}
                    alt="Image description"
                  />
                </div>
              </a>
              <div className="absolute px-5 pt-8 pb-5 bottom-0 w-full bg-gradient-cover">
                <a href={`posts/${posts[0].slug}`}>
                  <h2 className="text-xl font-bold capitalize text-white mb-3">
                    {posts[0].title}
                  </h2>
                </a>
                <p
                  className="text-gray-100 hidden sm:inline-block"
                  dangerouslySetInnerHTML={{ __html: posts[0].description }}
                ></p>
                <div className="pt-2">
                  <div className="text-gray-100">
                    <div className="inline-block h-3 border-l-2 border-red-600 mr-2"></div>
                    <a href={`category/${posts[0].slug}`}>
                      {posts[0].category.name}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Start box news */}
          <div className="grid gap-3 md:grid-cols-2 lg:gap-4">
            {posts.slice(1).map((article) => (
              <article
                key={article.id}
                className="group cursor-pointer flex flex-col"
              >
                <div className="relative overflow-hidden rounded-xl bg-gray-100 transition-all dark:bg-gray-800 flex-1">
                  <a href={`post/${posts[0].slug}`}>
                    <div className="h-60">
                      <img
                        className="w-full h-full object-cover rounded-xl"
                        src={article.featured_image}
                        alt="Image description"
                      />
                    </div>
                  </a>
                  <div className="absolute px-4 pt-7 pb-4 bottom-0 w-full bg-gradient-cover">
                    <a href={`post/${posts[0].slug}`}>
                      <h2 className="text-sm font-semibold capitalize leading-tight text-white mb-1">
                        {article.title}
                      </h2>
                    </a>
                    <div className="pt-1">
                      <div className="text-gray-100">
                        <div className="inline-block h-3 border-l-2 border-red-600 mr-2"></div>
                        <a href={`category/${posts[0].slug}`}>
                          {article.category.name}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBigGrid;
