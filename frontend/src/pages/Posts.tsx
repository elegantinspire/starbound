// src/pages/Posts.tsx

import React from 'react';
import PostPageGrid from '../components/PageComponents/PostPageGrid';

const Posts: React.FC = () => {
  return (
    <div>
      <PostPageGrid filter="trending" />
    </div>
  );
};

export default Posts;
