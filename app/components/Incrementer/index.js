import React, { Component } from 'react';

const Incrementer = ({ value, increment }) => {
  return (
    <div>
      <button onClick={increment}>+</button>
      <span>
      	{value}
      </span>
    </div>
  );
};

export default Incrementer;
