/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import {
  IoMdAdd,
  IoMdCheckmarkCircle,
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from 'react-icons/io';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Link } from 'react-router-dom';
import api from '~/services/api';

import {
  Container,
  RegistrationsTable,
  Td,
  ChangePage,
  Button,
} from './styles';

export default function Registrations() {
  const [registrations, setRegistrations] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadRegistrations() {
      const response = await api.get('/registrations', { params: { page } });
      const data = response.data.map(r => ({
        ...r,
        formatStart: format(parseISO(r.start_date), "dd' de 'MMMM' de' yyyy", {
          locale: pt,
        }),
        formatEnd: format(parseISO(r.end_date), "dd' de 'MMMM' de' yyyy", {
          locale: pt,
        }),
      }));
      setRegistrations(data);
    }
    loadRegistrations();
  }, [page]);
  function handleNext() {
    setPage(page + 1);
  }
  function handlePrev() {
    if (page === 1) return;
    setPage(page - 1);
  }

  async function handleDelete(id) {
    if (window.confirm('Tem certeza disso ??')) {
      try {
        await api.delete(`/registrations/${id}`);
        const removing = registrations.filter(regis => regis.id !== id);
        setRegistrations(removing);
        toast.success('Registro removido com sucesso !');
      } catch (err) {
        toast.error(err.response.data.error);
      }
    }
  }
  return (
    <Container>
      <header>
        <h2>Gerenciar planos</h2>
        <Link to="/registrations/create">
          <IoMdAdd color="#fff" size={20} />
          CADASTRAR
        </Link>
      </header>
      <RegistrationsTable>
        <thead>
          <tr>
            <th>ALUNO</th>
            <th>PLANO</th>
            <th>INICIO</th>
            <th>TÉRMINO</th>
            <th>ATIVA</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {registrations.map(regis => (
            <tr key={regis.id}>
              <Td>
                {regis.student ? regis.student.name : '--usuario removido'}
              </Td>
              <Td>{regis.plan ? regis.plan.title : '--plano removido'}</Td>
              <Td>{regis.formatStart}</Td>
              <Td>{regis.formatEnd}</Td>
              <Td active={regis.active}>
                <IoMdCheckmarkCircle size={20} />
              </Td>
              <Td>
                <div>
                  <Link
                    to={
                      !regis.student
                        ? '/registrations'
                        : `/registrations/update/${regis.id}`
                    }
                  >
                    Editar
                  </Link>
                  <button type="button" onClick={() => handleDelete(regis.id)}>
                    Excluir
                  </button>
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </RegistrationsTable>
      <ChangePage>
        <Button type="button" disabled={page === 1} onClick={handlePrev}>
          <IoIosArrowDropleftCircle size={30} color="#de3b3b" />
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          disabled={registrations.length < 10}
        >
          <IoIosArrowDroprightCircle size={30} color="#de3b3b" />
        </Button>
      </ChangePage>
    </Container>
  );
}
