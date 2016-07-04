jest.unmock('../app/components/Incrementer');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Incrementer from '../app/components/Incrementer';

describe('Incrementer', () => {
  it('renders prop value into span', () => {
    // parameters
    let incFunction = () => {};
    let value = '5';
    
    // wraps stateless component 
    const inc = TestUtils.renderIntoDocument(
      <div><Incrementer value={value} increment={incFunction} /></div>
    );

    const span = ReactDOM.findDOMNode(inc)
    	.getElementsByTagName('span')[0];

    // Verify that renders what was given by prop
    expect(span.textContent).toEqual(value);
  });
});
