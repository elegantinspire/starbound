import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPostBySlug } from '../services/api'; // Adjust the path as necessary
import { Post } from '../types/types'; // Adjust the path as necessary
import { formatDate } from '../helpers/common';

const SinglePost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const getPost = async () => {
      try {
        if (slug) {
          const fetchedPost = await fetchPostBySlug(slug);
          setPost(fetchedPost);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    getPost();
  }, [slug]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Main Post */}
      <div className="relative flex min-h-[calc(100vh-30vh)] items-center mb-10 z-0">
        <div className="absolute -z-10 h-full w-full before:absolute before:z-10 before:h-full before:w-full before:bg-black/30">
          <img
            alt={post.images[0]?.alt}
            loading="eager"
            decoding="async"
            className="object-cover w-full h-full"
            src={post.featured_image}
          />
        </div>
        <div className="text-center mx-auto max-w-screen-lg px-5 py-20">
          <h1 className="text-brand-primary mb-3 mt-2 text-3xl font-semibold tracking-tight text-white lg:text-5xl lg:leading-tight">
            {post.title}
          </h1>
          <div className="mt-8 flex justify-center space-x-3 text-gray-500">
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div className="flex gap-3">
                <div className="relative h-5 w-5 flex-shrink-0">
                  <a href="#">
                    <img
                      alt={post.author.first_name}
                      loading="lazy"
                      decoding="async"
                      className="rounded-full object-cover"
                      src={post.author.profile.image}
                    />
                  </a>
                </div>
                <p className="text-gray-100">
                  <a href="#">
                    {post.author.first_name} {post.author.last_name}
                  </a>
                  <span className="hidden pl-2 md:inline"> ·</span>
                </p>
              </div>
              <div>
                <div className="flex space-x-2 text-sm md:flex-row md:items-center">
                  <time className="text-gray-100" dateTime={post.date}>
                    {formatDate(post.date)}
                  </time>
                  <span className="text-gray-100">· 6 min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-screen-xl flex-col gap-5 px-5 md:flex-row">
        {/* Post Content */}
        <article className="flex-1">
          <div className="prose prose-lg mx-auto my-3 dark:prose-invert prose-a:text-blue-500">
            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: post.description }}
            />
          </div>
          <div className="mb-7 mt-7 flex justify-center">
            <Link
              className="bg-brand-secondary/20 rounded-full px-5 py-2 text-sm text-blue-600 dark:text-blue-500 "
              to="/"
            >
              ← View all posts
            </Link>
          </div>
          <div className="px-8 py-8 mt-3 mb-10 text-gray-500 rounded-2xl bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
            <div className="flex flex-wrap items-start sm:space-x-6 sm:flex-nowrap">
              <div className="relative flex-shrink-0 w-24 h-24 mt-1 ">
                <a href="#">
                  <img
                    alt="Author Image"
                    loading="lazy"
                    decoding="async"
                    className="rounded-full object-cover"
                    src={post.author.profile.image}
                  />
                </a>
              </div>
              <div>
                <div className="mb-3">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-300">
                    About {post.author.first_name} {post.author.last_name}
                  </h3>
                </div>
                <div>
                  <p>{post.author.profile.bio}</p>
                </div>
                <div className="mt-3">
                  <a
                    className="py-2 text-sm text-blue-600 rounded-full dark:text-blue-500 bg-brand-secondary/20 "
                    href="#"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>
        <aside className="sticky top-0 w-full self-start md:w-96">
          {/* Related Posts */}
          {/* Assuming relatedPosts is fetched separately or passed as a prop */}
        </aside>
      </div>
    </div>
  );
};

export default SinglePost;
