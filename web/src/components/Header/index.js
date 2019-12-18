import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import logo from '~/assets/logoHeader.svg';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, Logo, Item } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.profile);
  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <Container>
      <Content>
        <nav>
          <Logo>
            <Link to="/students">
              <img src={logo} alt="gympoint" />
            </Link>
          </Logo>
          <ul>
            <Item>
              <NavLink
                activeStyle={{
                  color: '#444',
                }}
                to="/students"
              >
                Alunos
              </NavLink>
            </Item>
            <Item>
              <NavLink
                activeStyle={{
                  color: '#444',
                }}
                to="/plans"
              >
                Planos
              </NavLink>
            </Item>
            <Item>
              <NavLink
                activeStyle={{
                  color: '#444',
                }}
                to="/registrations"
              >
                Matrículas
              </NavLink>
            </Item>
            <Item>
              <NavLink
                activeStyle={{
                  color: '#444',
                }}
                to="/help"
              >
                Pedidos de auxílio
              </NavLink>
            </Item>
          </ul>
        </nav>
        <aside>
          <p>{user.name}</p>
          <button type="button" onClick={handleSignOut}>
            sair do sistema
          </button>
        </aside>
      </Content>
    </Container>
  );
}
