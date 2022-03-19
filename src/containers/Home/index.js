import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const goToURL = (url) => () => navigate(url);
  return (
    <>
      <h1>Home</h1>
      <button onClick={goToURL('/signin')}>Sign In</button>
    </>
  );
};

export default Home;
