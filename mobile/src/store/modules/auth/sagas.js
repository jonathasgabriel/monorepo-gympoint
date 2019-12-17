import { Alert } from 'react-native';
import { all, takeLatest, call, put } from 'redux-saga/effects';
import { signInSuccess, signFailure } from './actions';

import api from '~/services/api';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.post, 'students/checkid', {
      id,
    });

    const { valid } = response.data;

    if (!valid) {
      Alert.alert('Log in error', 'Student does not exist');
      yield put(signFailure());
      return;
    }

    yield put(signInSuccess(id));
  } catch (err) {
    Alert.alert(
      'Authentication failed',
      'An error occured during Log in, please verify your data'
    );
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
