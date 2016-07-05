jest.unmock('../app/containers/Home');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Home from '../app/containers/Home';
import store from '../app/store/store';

describe('Home', () => {
  it('Change text after click incrementer', () => {
    // initialize store
    const appStore = store();
    // renders the incrementer interface
    const home = TestUtils.renderIntoDocument(
      <Home store={appStore} />
    );

    // Verify that renders default value 0
    expect(TestUtils.findRenderedDOMComponentWithTag(home, 'span').textContent).toEqual('0');

    // Simulate a button click and verify that increments by one
    TestUtils.Simulate.click(
      TestUtils.findRenderedDOMComponentWithTag(home, 'button')
    );

    // Verify that now renders 1
    expect(TestUtils.findRenderedDOMComponentWithTag(home, 'span').textContent).toEqual('1');
  });
});
