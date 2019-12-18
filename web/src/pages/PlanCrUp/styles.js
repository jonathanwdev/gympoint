import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Container = styled.div`
  max-width: 850px;
  width: 100%;
  margin: 30px auto;

  header {
    display: flex;
    justify-content: space-between;

    h2 {
      color: #444;
    }

    div {
      display: flex;

      a {
        display: block;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 36px;
        background: #cccccc;
        width: 112px;
        border-radius: 4px;
        color: #fff;
        font-weight: bold;
        margin-left: 20px;
        transition: 0.2s ease;

        &:hover {
          background: ${darken(0.06, '#cccccc')};
        }
      }
      button {
        background: #ee4d64;
        display: flex;
        border: 0;
        align-items: center;
        justify-content: center;
        height: 36px;
        width: 112px;
        border-radius: 4px;
        color: #fff;
        font-weight: bold;
        margin-left: 20px;
        transition: 0.2s ease;

        &:hover {
          background: ${darken(0.06, '#ee4d64')};
        }
      }
    }
  }
`;

export const Content = styled.div`
  background: #fff;
  padding: 20px 30px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;

  label {
    font-weight: bold;
    color: #444;
    margin: 10px 0;
  }

  input {
    height: 45px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 10px;
    padding: 0 15px;
  }

  span {
    color: ${lighten(0.03, '#ee4d64')};
  }

  footer {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 15px;

    div {
      display: flex;
      flex-direction: column;
    }
    div:nth-child(3) {
      input {
        background: #f5f5f5;
      }
    }
  }
`;
