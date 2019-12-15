import React from 'react';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import Logo from '~/assets/logoHome.svg';

import { Container } from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um email valido')
    .required('O email é obrigatorio'),
  password: Yup.string().required('A senha é obrigatoria'),
});

export default function SignIn() {
  function handleSubmit(data) {
    console.tron.log(data);
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
        <button type="submit">Entrar no sistema</button>
      </Form>
    </>
  );
}
