import React, { useState, useEffect } from 'react';
import api from '~/services/api';

import { Container, BigBox } from './styles';
import Modal from './Modal';

export default function HelpOrders() {
  const [dblock, setDblock] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState(null);

  function handleDisplay(id) {
    setDblock(true);
    setOrderId(id);
  }
  function handleDisplayNone(id) {
    setDblock(false);
    setOrders(orders.filter(or => or.id !== id));
  }
  useEffect(() => {
    async function loadOrders() {
      const response = await api.get('/help-orders');
      setOrders(response.data);
    }
    loadOrders();
  }, []);

  return (
    <Container>
      <Modal
        display={dblock}
        order={orderId}
        handleDisplayNone={handleDisplayNone}
      />

      <h2>Pedidos de Auxílio</h2>
      <BigBox>
        <h3>ALUNO</h3>

        {orders.map(order => (
          <div key={order.id}>
            <p>{order.Student.name}</p>
            <button type="button" onClick={() => handleDisplay(order.id)}>
              responder
            </button>
          </div>
        ))}
      </BigBox>
    </Container>
  );
}
