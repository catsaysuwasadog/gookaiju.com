import fetch from 'isomorphic-fetch'
import actionTypes from 'modules/stores/actionTypes';

export const getNavTypes = async (dispatch, url) => {
  const res = await fetch(url);
  return dispatch({type: actionTypes.GET_NAV_TYPES, navTypesRes: await res.json()});
}

export const getNavigations = async (dispatch, url) => {
  const res = await fetch(url);
  return dispatch({type: actionTypes.GET_NAVIGATIONS, navigationsRes: await res.json()})
}
