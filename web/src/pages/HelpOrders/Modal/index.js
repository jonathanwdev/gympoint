import React, { useEffect, useState } from 'react';
import { Input, Form } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import api from '~/services/api';
import { Container, Content, Title } from './styles';

const schema = Yup.object().shape({
  answer: Yup.string()
    .required('Campo obrigatorio')
    .min(6, 'No minimo 6 caracteres'),
});

export default function Modal({ display, order, handleDisplayNone }) {
  const [orders, setOrders] = useState([]);
  const userOrder = orders.find(or => or.id === order);

  async function handleSubmit({ answer }) {
    try {
      await api.post(`help-orders/${order}/answer`, { answer });
      toast.success('Pergunta respondida com sucesso !');
      handleDisplayNone(order);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  useEffect(() => {
    async function loadOrders() {
      const response = await api.get('/help-orders');
      setOrders(response.data);
    }
    loadOrders();
  }, [order]);
  return (
    <Container display={display ? 1 : 0}>
      <Content>
        <Form onSubmit={handleSubmit} schema={schema}>
          <Title>PERGUNTA DO ALUNO</Title>
          <div>
            <p>{display ? userOrder.question : ''}</p>
          </div>
          <Title>SUA RESPOSTA</Title>
          <Input
            type="text"
            name="answer"
            multiline
            placeholder="Sua resposta....."
          />
          <button type="submit">Responder aluno</button>
        </Form>
      </Content>
    </Container>
  );
}
