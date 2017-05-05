import TodoistAPI from 'todoist-js';
import config from 'appConfig';
import * as utils from './../utils';
import { hashHistory } from 'react-router';

const todoist = new TodoistAPI();

// object to user server as proxy for acces token exchange
const customServer = {
  serverURL: `https://fusenlabs.com/asist/proxy.php`,
  getAccessToken: (code) => {
    let headers = {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    };
    const request_url = `${customServer.serverURL}?code=${code}`;
    return fetch(request_url, {
      method: 'GET',
      headers: headers,
      credentials: 'include',
    }).then(response => {
      return response.json();
    });
  },
};

export const setLoading = (status = true) => {
  return {
    type: 'SET_LOADING',
    status,
  };
};

export const authorize = () => {
  // configure the API
  todoist.session.config({
    app_token: config.APP_TOKEN,
    client_id: config.CLIENT_ID,
    scope: 'data:read_write',
    state: utils.generateState(),
  });

  window.location.href = todoist.session.requestAuthorizationUrl();
  return {
    type: 'TODOIST_AUTH_REDIRECT',
  };
};

export const setToken = (token) => {
  todoist.session.accessToken = token;
  return (dispatch) => {
    todoist.sync().then(() => {
      dispatch({
        type: 'TODOIST_STATUS_OK',
      });
    }).catch(() => {
      hashHistory.push('auth');
    });
  };
};

export const getToken = (code) => {
  return (dispatch) => {
    todoist.session.config({
      app_token: config.APP_TOKEN,
      client_id: config.CLIENT_ID,
    });
    todoist.session.code = code;
    // API server response is unreachable by javascript due to
    // cors restriction because of the missing header Access-Control-Allow-Origin.

    // lets use our own server as proxy for access token exchange
    customServer.getAccessToken(code).then((response) => {
      if (response.access_token) {
        localStorage.access_token = response.access_token;
        dispatch(setToken(response.access_token));
      }
      window.location.href = `${window.location.origin}${window.location.pathname}${window.location.hash}`;
    });
  };
};

const setTodayList = (data) => {
  return {
    type: 'SET_TODAY_LIST',
    data,
  };
};

export const loadTodayList = () => {
  return (dispatch) => {
    dispatch(setLoading());
    todoist.query(['today']).then(r => {
      dispatch(setTodayList(r[0].data));
      dispatch(setLoading(false));
    });
  };
};

const flagRemovedItem = (itemId) => {
  return {
    type: 'FLAG_REMOVED_ITEM',
    data: itemId,
  };
};

export const removeFlaggedItems = () => {
  return {
    type: 'REMOVE_FLAGGED_ITEMS',
  };
};

const removeItemById = (itemId) => {
  return {
    type: 'REMOVE_ITEM_BY_ID',
    data: itemId,
  };
};

export const removeItem = (itemId) => {
  return (dispatch) => {
    // dispatch event to flag removed item. (it will animate item to fade out)
    dispatch(flagRemovedItem(itemId));
    // call API to remove (server side remotion)
    todoist.items.complete([itemId]);
    // verify remotion succeded, otherwise, restore objects (should flag item as restored?)
    todoist.commit().then(response => {
      const removedItem = response.items.find(i => i.id === itemId);
      if (removeItem.checked) {
        // @TODO: should restore redux elements
        console.warn(`Something failed completing ${itemId}: ${removedItem.content}`);
      }
    });
    // dispatch event to remove items from redux
    const animationTimeout = 1500;
    setTimeout(() => {
      dispatch(removeItemById(itemId));
    }, animationTimeout);
  };
};
