/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { addMonths, format, parseISO } from 'date-fns';

import { Link, useLocation } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import Datepicker from 'react-datepicker';
import { formatPrice } from '~/util/format';
import { planStyles, studentStyles } from './selectorStyle';

import 'react-datepicker/dist/react-datepicker.css';

import api from '~/services/api';
import history from '~/services/history';
import { Container, Content, InputContainer } from './styles';

export default function RegistrationCrUp({ match }) {
  const [...option] = useLocation().pathname.split('/');

  const [planOptions, setPlanOption] = useState([]);
  const [registrations, setRegistrations] = useState({});
  const [selected, setSelected] = useState(null);
  const [username, setUsername] = useState('');
  const [plan, setPlan] = useState({});
  const [newDate, setNewDate] = useState(new Date());

  const totalPrice = formatPrice(plan.duration * plan.price || 0);
  const endDate = format(
    addMonths(newDate, plan.duration || 0),
    "dd'/'MM'/'yyyy"
  );

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('/plans');
      const data = response.data.map(p => ({
        ...p,
        value: p.id,
        label: p.title,
      }));
      setPlanOption(data);
    }
    loadPlans();
  }, []);

  async function loadStudents() {
    const response = await api.get('/students', {
      params: {
        username,
      },
    });
    const data = response.data.rows.map(st => ({
      ...st,
      value: st.id,
      label: st.name,
    }));
    return data;
  }

  async function handleSubmit() {
    try {
      await api.post('/registrations', {
        student_id: selected,
        plan_id: Number(plan.id),
        start_date: newDate,
      });
      toast.success('Registro efetuado com sucesso !!');
      history.push('/registrations');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  useEffect(() => {
    async function loadRegistrations() {
      const response = await api.get(`/registrations/${match.params.id}`);
      setRegistrations(response.data);
    }
    loadRegistrations();
  }, [match.params.id]);

  console.tron.log(newDate, parseISO(registrations.start_date));
  return (
    <Container>
      <Form onSubmit={handleSubmit} initialData={registrations}>
        <header>
          <h2>Cadastro de Plano</h2>
          <div>
            <Link to="/registrations">
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
          <label htmlFor="student_id">ALUNO</label>
          <AsyncSelect
            name="student_id"
            placeholder="BUSCAR ALUNO"
            styles={studentStyles}
            loadOptions={loadStudents}
            onInputChange={user => setUsername(user)}
            onChange={st => setSelected(st.id)}
          />

          <footer>
            <InputContainer>
              <label>PLANO</label>
              <Select
                options={planOptions}
                name="plan_id"
                styles={planStyles}
                label="SELECIONE O PLANO"
                onChange={pl => setPlan(pl)}
              />
            </InputContainer>

            <InputContainer>
              <label htmlFor="start_date">DATA DE INÍCIO</label>
              <Datepicker
                name="start_date"
                selected={newDate}
                onChange={date => setNewDate(date)}
                dateFormat="dd'/'MM'/'yyyy"
                minDate={new Date()}
              />
            </InputContainer>

            <InputContainer>
              <Input
                label="DATA DE TÉRMINO"
                type="text"
                value={plan.duration ? endDate : ''}
                name="end_date"
                readOnly
              />
            </InputContainer>

            <InputContainer>
              <Input
                label="VALOR FINAL"
                value={totalPrice}
                type="text"
                name="price"
                readOnly
              />
            </InputContainer>
          </footer>
        </Content>
      </Form>
    </Container>
  );
}
