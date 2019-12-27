import produce from 'immer';

const INITIAL_VALUE = {
  profile: null,
};

export default function auth(state = INITIAL_VALUE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.profile = action.payload.user;
        break;
      }

      default:
    }
  });
}
