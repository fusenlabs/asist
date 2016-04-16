import React, { Component } from 'react';

const Home = ({ value, increment }) => {
  return (
    <div>
      <button onClick={increment}>+</button>
      {value}
    </div>
  );
};

export default Home;
