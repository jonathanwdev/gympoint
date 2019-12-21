import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  overflow-y: scroll;
  display: ${props => (props.display ? 'block' : 'none')};
  background: rgba(0, 0, 0, 0.7);
`;
export const Content = styled.div`
  position: absolute;
  border-radius: 4px;
  min-height: 420px;
  padding: 20px 25px;
  width: 450px;
  right: calc(50% - 225px);
  top: calc(50% - 210px);
  background: #fff;

  form {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;

    div {
      min-height: 105px;
      width: 100%;

      p {
        color: #666666;
        font-size: 16px;
        line-height: 21px;
      }
    }

    textarea {
      min-width: 100%;
      max-width: 100%;
      min-height: 127px;
      max-height: 127px;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 10px;
    }
    span {
      color: red;
      font-weight: bold;
    }

    button {
      width: 100%;
      height: 45px;
      border: 0;
      color: #fff;
      margin-top: 20px;
      background: #ee4d64;
      font-weight: bold;
      border-radius: 4px;
      transition: 0.4s ease;

      &:hover {
        background: ${darken(0.04, '#ee4d64')};
      }
    }
  }
`;

export const Title = styled.h4`
  color: #444444;
  margin: 10px 0;
`;
