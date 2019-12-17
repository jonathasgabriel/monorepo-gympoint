import React, { useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/logo.png';

import { signInRequest } from '~/store/modules/auth/actions';

import { Container, Form, SubmitButton, TextInput } from './styles';

export default function SignIn() {
  const dispatch = useDispatch();

  const [enrollmentId, setEnrollmentId] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(enrollmentId));
  }

  return (
    <Container>
      <Image source={logo} />
      <Form>
        <TextInput
          keyboardType="numeric"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Type your ID"
          returnKeyType="send"
          value={enrollmentId}
          onChangeText={setEnrollmentId}
        />

        <SubmitButton loading={loading} onPress={handleSubmit}>
          Log in
        </SubmitButton>
      </Form>
    </Container>
  );
}
