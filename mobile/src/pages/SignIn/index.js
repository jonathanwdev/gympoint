import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Image, Alert } from 'react-native';
import { signInRequest } from '~/store/modules/auth/actions';

import Logo from '~/assets/logo.png';

import { Container, Form, FormInput, SubmitButton } from './styles';

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const [userId, setUserId] = useState('');

  function handleSubmit() {
    dispatch(signInRequest(userId));
  }

  return (
    <Container>
      <Image source={Logo} />
      <Form>
        <FormInput
          icon="person"
          autoCorrect={false}
          keyboardType="numeric"
          autoCapitalize="none"
          placeholder="Seu numero de identificação"
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={userId}
          onChangeText={setUserId}
        />
        <SubmitButton loading={loading} onPress={handleSubmit}>
          Entrar no sistema
        </SubmitButton>
      </Form>
    </Container>
  );
}
