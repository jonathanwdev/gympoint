/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { formatPrice } from '~/util/format';

import { Container, PlansTable } from './styles';

export default function Plans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('/plans');
      const data = response.data.map(plan => ({
        ...plan,
        priceFormatted: formatPrice(plan.price),
        monthFormatted:
          plan.duration === 1
            ? `${plan.duration} mês`
            : `${plan.duration} meses`,
      }));
      setPlans(data);
    }
    loadPlans();
  }, []);

  async function handleDelete(id) {
    if (window.confirm('Tem certeza que deseja excluir este plano ??')) {
      try {
        await api.delete(`/plans/${id}`);
        const removing = plans.filter(plan => plan.id !== id);
        setPlans(removing);
        toast.success('Plano deletado com sucesso !');
      } catch (err) {
        toast.error(err.response.data.error);
      }
    }
  }
  return (
    <Container>
      <header>
        <h2>Gerenciar planos</h2>
        <Link to="/create-plan">
          <IoMdAdd color="#fff" size={20} />
          CADASTRAR
        </Link>
      </header>
      <PlansTable>
        <thead>
          <tr>
            <th>TÍTULO</th>
            <th>DURAÇÃO</th>
            <th>VALOR p/ MÊS</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {plans.map(plan => (
            <tr key={plan.id}>
              <td>{plan.title}</td>
              <td>{plan.monthFormatted}</td>
              <td>{plan.priceFormatted}</td>
              <td>
                <div>
                  <Link to={`update-plan/${plan.id}`}>Editar</Link>
                  <button type="button" onClick={() => handleDelete(plan.id)}>
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </PlansTable>
    </Container>
  );
}
