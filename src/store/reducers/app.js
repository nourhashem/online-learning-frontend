import appActions from 'store/actions/app';

const initialState = {
  authenticated: false,
  user: null,
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case appActions.signIn:
      return {
        ...state,
        authenticated: true,
        user: action.user,
      };
    case appActions.signOut:
      return {
        ...state,
        authenticated: false,
        user: null,
      };
    default:
      return state;
  }
}
