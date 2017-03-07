import TodoistAPI from 'todoist-js';
import config from 'appConfig';
import * as utils from './../utils';
import { hashHistory } from 'react-router';

const todoist = new TodoistAPI();

export const authorize = () => {
  // configure the API
  todoist.session.config({
    app_token: config.APP_TOKEN,
    client_id: config.CLIENT_ID,
    scope: 'data:read_write',
    state: utils.generateState(),
    client_secret: config.CLIENT_SECRET,
  });

  window.location.href = todoist.session.requestAuthorizationUrl();
  return {
    type: 'TODOIST_AUTH_REDIRECT',
  };
};

export const setToken = (token) => {
  todoist.session.accessToken = token;
  return (dispatch) => {
    todoist.sync().then((r) => {
      dispatch({
        type: 'TODOIST_STATUS_OK',
      });
    });
  };
};

export const getToken = (code) => {
  return (dispatch) => {
    todoist.session.config({
      app_token: config.APP_TOKEN,
      client_id: config.CLIENT_ID,
      client_secret: config.CLIENT_SECRET,
    });
    todoist.session.code = code;
    todoist.session.getAccessToken().then((response) => {
      localStorage.access_token = response.access_token;
      dispatch(setToken(response.access_token));
      window.location.href = `/${window.location.hash}`;
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
    todoist.query(['today']).then(r => {
      dispatch(setTodayList(r[0].data));
    });
  };
};
