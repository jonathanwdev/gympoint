import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { signInRequest } from '~/store/modules/auth/actions';
import Logo from '~/assets/logoHome.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um email valido')
    .required('O email é obrigatorio'),
  password: Yup.string().required('A senha é obrigatoria'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={Logo} alt="GymPoiny" />
      <Form onSubmit={handleSubmit} schema={schema}>
        <Input
          type="email"
          label="Seu E-mail"
          name="email"
          placeholder="exemplo@email.com"
        />
        <Input
          type="password"
          name="password"
          label="Sua senha"
          placeholder="*******"
        />
        <button type="submit">
          {loading ? 'Carregando...' : 'Entrar no sistema'}
        </button>
      </Form>
    </>
  );
}
