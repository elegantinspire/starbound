import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../../services/api'; // Ensure this path is correct
import { Post } from '../../types/types';
import { formatDate } from '../../helpers/common';

interface MegaMenuProps {
  isOpen: boolean;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts('latest', 1, 2);
        setPosts(data.results);
        setLoading(false);
      } catch (error) {
        setError('Error fetching posts');
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const menuItems = [
    {
      title: 'Portfolio',
      items: [
        { title: 'Web Development', href: '/portfolio/web-development' },
        { title: 'Mobile Apps', href: '/portfolio/mobile-apps' },
        { title: 'UI/UX Design', href: '/portfolio/ui-ux-design' },
        { title: 'Open Source Projects', href: '/portfolio/open-source' },
      ],
    },
    {
      title: 'Tutorials',
      items: [
        { title: 'JavaScript', href: '/tutorials/javascript' },
        { title: 'React', href: '/tutorials/react' },
        { title: 'CSS', href: '/tutorials/css' },
        { title: 'Python', href: '/tutorials/python' },
      ],
    },
    {
      title: 'Projects',
      items: [
        { title: 'All Projects', href: '/projects' },
        { title: 'Client Work', href: '/projects/client-work' },
        { title: 'Personal Projects', href: '/projects/personal-projects' },
        { title: 'Freelance Projects', href: '/projects/freelance-projects' },
      ],
    },
    {
      title: 'Resources',
      items: [
        { title: 'Cheat Sheets', href: '/resources/cheat-sheets' },
        { title: 'Recommended Tools', href: '/resources/recommended-tools' },
        { title: 'Code Snippets', href: '/resources/code-snippets' },
        { title: 'Books', href: '/resources/books' },
      ],
    },
  ];

  return (
    <div
      className={`${
        isOpen ? 'block' : 'invisible'
      } sub-menu absolute top-full inset-x-0 transform z-50`}
    >
      <div className="bg-white dark:bg-neutral-900 shadow-lg">
        <div className="container">
          <div className="flex text-sm border-t border-slate-200 dark:border-slate-700 py-14">
            <div className="flex-1 grid grid-cols-4 gap-6 pr-6 xl:pr-8">
              {menuItems.map((menu, index) => (
                <div key={index}>
                  <p className="font-medium text-slate-900 dark:text-neutral-200">
                    {menu.title}
                  </p>
                  <ul className="grid space-y-4 mt-4">
                    {menu.items.map((item, idx) => (
                      <li key={idx}>
                        <a
                          className="font-normal text-slate-600 hover:text-black dark:text-slate-400 dark:hover:text-white"
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="w-[40%] ">
              <div className="grid grid-cols-1 gap-10 sm:gap-8 lg:grid-cols-2">
                <h3 className="sr-only">Recent posts</h3>
                {loading && <p>Loading posts...</p>}
                {error && <p>{error}</p>}
                {!loading &&
                  !error &&
                  posts.map((post) => (
                    <article
                      key={post.id}
                      className="relative isolate flex max-w-2xl flex-col gap-x-8 gap-y-6 sm:flex-row sm:items-start lg:flex-col lg:items-stretch"
                    >
                      <div className="relative flex-none">
                        <div className="aspect-[2/1] w-full rounded-xl bg-gray-100 sm:aspect-[16/9] sm:h-32 lg:h-auto z-0">
                          <img
                            src={post.featured_image}
                            alt={post.title}
                            sizes="300px"
                            className="rounded-xl object-cover object-cover absolute inset-0 w-full h-full"
                          />
                        </div>
                        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
                      </div>
                      <div>
                        <div className="flex items-center gap-x-4">
                          <time
                            dateTime={post.date}
                            className="text-sm leading-6 text-gray-600"
                          >
                            {formatDate(post.date)}
                          </time>
                          <a
                            className="relative z-10 rounded-full bg-gray-50 py-1.5 px-1 text-xs font-medium text-gray-600 hover:bg-gray-100"
                            href={`/category/${post.category.slug}`}
                          >
                            {post.category.name}
                          </a>
                        </div>
                        <h4 className="mt-2 text-sm font-semibold leading-6 text-gray-900">
                          <a href={`/post/${post.slug}`}>
                            <span className="absolute inset-0"></span>
                            {post.title}
                          </a>
                        </h4>
                        <p className="text-sm leading-6 text-gray-600">
                          {post.description}
                        </p>
                      </div>
                    </article>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
