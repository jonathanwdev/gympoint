import produce from 'immer';

const INITIAL_VALUE = {
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_VALUE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@auth/SIGN_IN_SUCCESS': {
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
