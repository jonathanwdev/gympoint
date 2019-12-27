import { Alert } from 'react-native';
import { all, takeLatest, call, put } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.get, `/students/${id}`);

    const user = response.data;

    yield put(signInSuccess(user));

    // history.push('/students');
  } catch (err) {
    Alert.alert('Erro no login', err.response.data.error);
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
