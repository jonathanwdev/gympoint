import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #ee4d64;
  display: flex;
  max-width: 1400px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  background: #fff;
  height: 448px;
  text-align: center;
  max-width: 360px;
  width: 100%;
  justify-content: center;
  display: flex;
  flex-direction: column;

  img {
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    padding: 0 30px;
    align-items: flex-start;

    label {
      font-weight: bold;
      color: #444444;
      margin: 10px 0;
    }

    input {
      background: #fff;
      border-radius: 4px;
      border: 1px solid #ddd;
      width: 100%;
      color: #444;
      height: 45px;
      padding: 0 15px;
      font-size: 16px;
      margin: 0 0 10px;

      &::placeholder {
        color: #999;
        font-size: 16px;
      }
    }
    span {
      color: red;
      font-size: 12px;
      color: ${lighten(0.02, '#f64c75')};
      align-self: flex-start;
      font-weight: bold;
    }

    button {
      height: 45px;
      background: #ee4d64;
      font-weight: bold;
      width: 100%;
      color: #fff;
      border: 0;
      border-radius: 4px;
      margin-top: 5px;
      transition: 0.2s ease;

      &:hover {
        background: ${darken(0.05, '#ee4d64')};
      }
    }
  }
`;
