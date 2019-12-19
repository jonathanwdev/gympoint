/* eslint-disable no-alert */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import {
  IoMdAdd,
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from 'react-icons/io';

import api from '~/services/api';

import { Container, StudentTable, ChangePage, Button } from './styles';

export default function Students() {
  const [username, setUsername] = useState('');
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadStudents() {
      try {
        const response = await api.get('/students', {
          params: {
            page,
            username,
          },
        });
        setStudents(response.data.rows);
      } catch (err) {
        toast.error(err.response.data.error || 'Erro ao carregar alunos');
      }
    }
    loadStudents();
  }, [page, username]);

  function handleNext() {
    setPage(page + 1);
  }
  function handlePrev() {
    if (page === 1) return;
    setPage(page - 1);
  }

  async function handleDelete(id) {
    if (window.confirm(`Tem certeza que deseja excluir este aluno  ?`)) {
      try {
        await api.delete(`students/${id}`);
        const removing = students.filter(student => student.id !== id);
        setStudents(removing);
        toast.success('Usuario deletado com sucesso !!');
      } catch (err) {
        toast.error(err.response.data.error);
      }
    }
  }

  return (
    <Container>
      <header>
        <h2>Gerenciar alunos</h2>
        <div>
          <Link to="/students/create">
            <IoMdAdd color="#fff" size={20} />
            CADASTRAR
          </Link>
          <Form>
            <Input
              onChange={e => setUsername(e.target.value)}
              type="text"
              name="search"
              placeholder="Buscar aluno"
            />
          </Form>
        </div>
      </header>
      <StudentTable>
        <thead>
          <tr>
            <th>NOME</th>
            <th>E-MAIL</th>
            <th>IDADE</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td>
                <div>
                  <Link to={`/students/update/${student.id}`}>Editar</Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(student.id)}
                  >
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </StudentTable>
      <ChangePage>
        <Button type="button" onClick={handlePrev} disabled={page === 1}>
          <IoIosArrowDropleftCircle size={30} color="#de3b3b" />
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          disabled={students.length < 10}
        >
          <IoIosArrowDroprightCircle size={30} color="#de3b3b" />
        </Button>
      </ChangePage>
    </Container>
  );
}
