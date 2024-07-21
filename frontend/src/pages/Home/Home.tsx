import React, { useState, useEffect } from 'react';
import BigHero from '../../components/PageComponents/BigHero';
import PostSlider from '../../components/PageComponents/PostSlider';
import PostGrid_1 from '../../components/PageComponents/PostGrid_1';
import PostGrid_2 from '../../components/PageComponents/PostGrid_2';

const Home: React.FC = () => {
  return (
    <div>
      <BigHero filter="latest" />
      <PostGrid_1 filter="trending" />
      <PostGrid_2 filter="trending" />
      <PostSlider filter="trending" />
    </div>
  );
};

export default Home;
