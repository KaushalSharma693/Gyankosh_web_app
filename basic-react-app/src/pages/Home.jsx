import React, { useEffect, useState } from 'react';

import CursorFollower from "../components/CursorFollower";
import Loader from "../components/Loader";
import MainSection from "../components/MainSection";
import FeatureRow from "../components/FeatureRow";
import BookCarousel from "../components/BookCarousel";
import FeaturedBook from "../components/FeaturedBook";
import ShopNow from "../components/ShopNow";
import Client from "../components/Client";
import FeaturedAuthor from "../components/FeaturedAuthor";
import LatestNews from "../components/LatestNews";
import Faq from "../components/Faq";
import Final from "../components/finalfooter";

function Home() {
  const [isLoading, setIsLoading] = useState(false);

 useEffect(() => {
  const hasVisited = sessionStorage.getItem('hasVisited');

  if (!hasVisited) {
    setIsLoading(true);
    sessionStorage.setItem('hasVisited', 'true');

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  } else {
    setIsLoading(false);
  }
}, []);


  return (
    <div style={{ overflowY: 'auto', minHeight: '100vh' }}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <CursorFollower />
          <MainSection />
          <FeatureRow />
          <BookCarousel />
          <FeaturedBook />
          <Client />
          <ShopNow />
          <FeaturedAuthor />
          <LatestNews />
          <Faq />
        </>
      )}
    </div>
  );
}

export default Home;
