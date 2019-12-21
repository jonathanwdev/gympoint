import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FaCheck, FaChevronLeft } from 'react-icons/fa';
import { Form, Input } from '@rocketseat/unform';
import api from '~/services/api';
import history from '~/services/history';

import { Container, Content } from './styles';

const schema = Yup.object().shape({
  name: Yup.string()
    .required('O nome é obrigatorio')
    .min(6, 'Minimo 6 caracteres'),
  email: Yup.string()
    .email('Insira um email valido')
    .required('O email é obrigatorio'),
  age: Yup.string('Somente numeros')
    .min(2)
    .required('A idade é obrigatoria'),
  weight: Yup.string('Somente numeros')
    .min(2, 'Min 2 caracteres')
    .required('O peso é obrigatoria'),
  height: Yup.number().required('A altura é obrigatoria'),
});

export default function StudentCrUp({ match }) {
  const [...option] = useLocation().pathname.split('/');
  const [students, setStudents] = useState({});

  useEffect(() => {
    async function loadStudents() {
      try {
        const response = await api.get(`/students/${match.params.id}`);
        setStudents(response.data);
      } catch (err) {
        toast.error(err.response.data.error || 'Erro ao carregar alunos');
      }
    }
    loadStudents();
  }, [match.params.id]);

  async function handleSubmit(data) {
    if (option[2] === 'create') {
      try {
        await api.post('/students', data);
        history.push('/students');
        toast.success('Cadastro efetuado com sucesso !');
      } catch (err) {
        toast.error(err.response.data.error);
      }
    } else {
      try {
        await api.put(`/students/${match.params.id}`, data);
        toast.success('Dados atualizados com sucesso!');
        history.push('/students');
      } catch (err) {
        toast.error(err.response.data.error);
      }
    }
  }

  return (
    <Container>
      <Form schema={schema} initialData={students} onSubmit={handleSubmit}>
        <header>
          {option[2] === 'create' ? (
            <h2>Cadastro de Aluno</h2>
          ) : (
            <h2>Edição de Aluno</h2>
          )}
          <div>
            <Link to="/students">
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
          <Input label="NOME COMPLETO" type="text" name="name" />
          <Input label="ENDEREÇO DE E-MAIL" type="email" name="email" />
          <footer>
            <div>
              <Input label="IDADE" type="number" name="age" />
            </div>
            <div>
              <Input
                label="PESO(em kg)"
                defaultValue="123"
                type="number"
                name="weight"
              />
            </div>
            <div>
              <Input
                label="ALTURA"
                type="number"
                name="height"
                step="0.01"
                min="0"
                max="10"
              />
            </div>
          </footer>
        </Content>
      </Form>
    </Container>
  );
}

StudentCrUp.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

StudentCrUp.defaultProps = {
  match: '',
};
