import actionTypes from 'modules/stores/actionTypes';

const actionsInitialState = {
  navTypesRes: [],
  navigationsRes: [],
};

const actionsReducer = (state = actionsInitialState, action) => {
  switch (action.type) {
    case actionTypes.GET_NAV_TYPES:
      return Object.assign({}, state, {
        navTypesRes: action.navTypesRes || []
      });
    case actionTypes.GET_NAVIGATIONS:
      return Object.assign({}, state, {
        navigationsRes: action.navigationsRes || []
      });
    default:
      return state;
  }
}

export default actionsReducer;

