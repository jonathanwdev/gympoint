/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaChevronLeft, FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { addMonths, format } from 'date-fns';

import { Link, useLocation } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import AsyncSelect from 'react-select/async';
import moment from 'moment';
import Datepicker from 'react-datepicker';
import Select from 'react-select';
import { formatPrice } from '~/util/format';
import { planStyles, studentStyles } from './selectorStyle';

import 'react-datepicker/dist/react-datepicker.css';

import api from '~/services/api';
import history from '~/services/history';
import { Container, Content, InputContainer } from './styles';

export default function RegistrationCrUp({ match }) {
  const [...option] = useLocation().pathname.split('/');
  const [oldStudent, setOldStudent] = useState({});
  const [oldPlan, setOldPlan] = useState({});

  const [planOptions, setPlanOption] = useState([]);
  const [registrations, setRegistrations] = useState({});
  const [selected, setSelected] = useState(null);
  const [username, setUsername] = useState('');
  const [plan, setPlan] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  const dateWithMoment = moment(registrations.start_date).toDate();
  const endDatewithMoment = moment(registrations.end_date).toDate();

  const [newDate, setNewDate] = useState(
    option === 'update' ? dateWithMoment : ''
  );

  const endDate = format(
    addMonths(newDate || new Date(), plan.duration || 0),
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
    if (option[2] === 'create') {
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
    } else {
      try {
        await api.put(`/registrations/${match.params.id}`, {
          student_id: oldStudent.value,
          plan_id: Number(oldPlan.value),
          start_date: newDate || registrations.start_date,
        });
        toast.success('Edição efetuada com sucesso !!');
        history.push('/registrations');
      } catch (err) {
        toast.error(err.response.data.error);
      }
    }
  }

  useEffect(() => {
    async function loadRegistrations() {
      const response = await api.get(`/registrations/${match.params.id}`);

      const oldstudent = {
        value: response.data.student.id,
        label: response.data.student.name,
      };
      const oldestPlan = {
        value: response.data.plan.id,
        label: response.data.plan.title,
        duration: response.data.plan.duration,
        price: response.data.plan.price,
      };
      setTotalPrice(response.data.plan.duration * response.data.plan.price);
      setOldPlan(oldestPlan);
      setOldStudent(oldstudent);
      setRegistrations(response.data, oldestPlan);
    }

    loadRegistrations();
  }, [match.params.id]);
  return (
    <Container>
      <Form onSubmit={handleSubmit} initialData={registrations}>
        <header>
          {option[2] === 'create' ? (
            <h2>Cadastro de Matrícula</h2>
          ) : (
            <h2>Edição de Matrícula</h2>
          )}
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
          {option[2] === 'update' ? (
            <AsyncSelect
              name="student_id"
              isDisabled
              value={oldStudent}
              styles={studentStyles}
            />
          ) : (
            <AsyncSelect
              name="student_id"
              placeholder="BUSCAR ALUNO"
              styles={studentStyles}
              loadOptions={loadStudents}
              onInputChange={user => setUsername(user)}
              onChange={st => setSelected(st.id)}
            />
          )}

          <footer>
            <InputContainer>
              {option[2] === 'create' ? (
                <label>PLANO</label>
              ) : (
                <label>NOVO PLANO</label>
              )}
              <Select
                options={planOptions}
                value={oldPlan}
                name="plan"
                styles={planStyles}
                onChange={pl => {
                  setOldPlan(pl);
                  setPlan(pl);
                  setTotalPrice(pl.duration * pl.price);
                }}
              />
            </InputContainer>

            <InputContainer>
              <label htmlFor="start_date">DATA DE INÍCIO</label>

              <Datepicker
                name="start_date"
                selected={dateWithMoment && !newDate ? dateWithMoment : newDate}
                onChange={date => setNewDate(date)}
                dateFormat="dd'/'MM'/'yyyy"
                minDate={new Date()}
              />
            </InputContainer>

            <InputContainer>
              <Input
                label="DATA DE TÉRMINO"
                type="text"
                value={
                  registrations.end_date && !newDate
                    ? format(endDatewithMoment, "dd'/'MM'/'yyyy")
                    : endDate
                }
                name="end_date"
                disabled
                readOnly
              />
            </InputContainer>

            <InputContainer>
              <Input
                name="price"
                value={formatPrice(totalPrice)}
                label="VALOR FINAL"
                type="text"
                disabled
                readOnly
              />
            </InputContainer>
          </footer>
        </Content>
      </Form>
    </Container>
  );
}

RegistrationCrUp.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

RegistrationCrUp.defaultProps = {
  match: '',
};
