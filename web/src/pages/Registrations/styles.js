import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  padding: 0 40px;
  max-width: 1400px;
  margin: 30px auto;

  header {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      color: #444;
    }
    a {
      display: block;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 36px;
      background: #ee4d64;
      width: 142px;
      border-radius: 4px;
      color: #fff;
      font-weight: bold;
      transition: 0.2s ease;

      &:hover {
        background: ${darken(0.06, '#ee4d64')};
      }
    }
  }
`;

export const RegistrationsTable = styled.table`
  width: 100%;
  height: auto;
  background: #fff;
  padding: 15px;
  border-radius: 5px;
  margin-top: 25px;

  thead {
    tr {
      height: 40px;
      line-height: 40px;

      th {
        color: #444444;
        font-size: 16px;
        text-align: left;
        font-weight: bold;
      }
      th:nth-child(3),
      th:nth-child(4),
      th:nth-child(5) {
        text-align: center;
      }
    }
  }
  tbody {
    tr {
      height: 40px;
    }
  }
`;

export const Td = styled.td`
  color: #666666;
  font-size: 16px;

  &:nth-child(3),
  &:nth-child(4),
  &:nth-child(5) {
    text-align: center;
  }
  &:nth-child(5) {
  }
  svg {
    color: ${props => (props.active ? 'green' : '#ccc')};
  }
  div {
    display: flex;
    justify-content: space-around;

    a {
      background: none;
      color: #4d85ee;
      font-size: 15px;
      border: 0;

      &:hover {
        opacity: 0.7;
      }
    }
    button {
      color: #de3b3b;
      background: none;
      font-size: 15px;
      border: 0;
    }
  }
`;

export const ChangePage = styled.div`
  width: 70%;
  display: flex;
  height: 50px;
  background: #fff;
  border-radius: 4px;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: calc(50% - 35%);
  justify-content: space-around;
  margin: 0 auto;
`;
export const Button = styled.button`
  background: none;
  border: 0;
  svg {
    opacity: ${props => (props.disabled ? 0.4 : 1)};
  }
`;
