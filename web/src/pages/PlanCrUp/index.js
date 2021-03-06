import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { FaChevronLeft, FaCheck } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { formatPrice } from '~/util/format';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Content } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('Campo obrigatorio'),
  duration: Yup.number()
    .required('Campo obrigatorio')
    .typeError('Insira a duração'),
  price: Yup.number()
    .required('Campo obrigatorio')
    .typeError('Insira o preço'),
});

export default function PlanCrUp({ match }) {
  const [...option] = useLocation().pathname.split('/');
  const [plans, setPlans] = useState([]);

  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState(0);
  const total = formatPrice(price * duration);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get(`/plans/${match.params.id}`);
      setPlans(response.data);
      setDuration(response.data.duration);
      setPrice(response.data.price);
    }
    loadPlans();
  }, [match.params.id]);

  async function handleSubmit(data) {
    if (option[2] === 'create') {
      try {
        await api.post('/plans', data);
        history.push('/plans');
        toast.success('Plano criado com sucesso!!');
      } catch (err) {
        toast.error(err.response.data.error);
      }
    } else {
      try {
        await api.put(`/plans/${match.params.id}`, data);
        history.push('/plans');
        toast.success('Plano editado com sucesso!!');
      } catch (err) {
        toast.error(err.response.data.error);
      }
    }
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit} initialData={plans} schema={schema}>
        <header>
          {option[2] === 'create' ? (
            <h2>Cadastro de Plano</h2>
          ) : (
            <h2>Edição de Plano</h2>
          )}
          <div>
            <Link to="/plans">
              <FaChevronLeft size={20} color="#fff" />
              VOLTAR
            </Link>
            <button type="submit">
              <FaCheck size={20} color="#fff" />
              SALVAR
            </button>
          </div>
        </header>
        <Content>
          <Input label="TÍTULO DO PLANO" type="text" name="title" />
          <footer>
            <div>
              <Input
                label="DURAÇÃO(em meses)"
                type="number"
                name="duration"
                onChange={e => setDuration(e.target.value)}
              />
            </div>
            <div>
              <Input
                label="PREÇO MENSAL"
                type="number"
                name="price"
                onChange={e => setPrice(e.target.value)}
              />
            </div>
            <div>
              <Input
                label="PREÇO TOTAL"
                type="text"
                value={total}
                name="total"
                step="0.01"
                min="0"
                max="10"
                readOnly
              />
            </div>
          </footer>
        </Content>
      </Form>
    </Container>
  );
}

PlanCrUp.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

PlanCrUp.defaultProps = {
  match: '',
};
