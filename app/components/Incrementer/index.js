import React, { Component } from 'react';

const Incrementer = ({ value, increment }) => {
  return (
    <div>
      <button onClick={increment}>+</button>
      {value}
    </div>
  );
};

export default Incrementer;
