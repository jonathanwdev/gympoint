import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 0 40px;
  max-width: 1400px;
  background: #fff;
`;

export const Content = styled.header`
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;

  nav {
    display: flex;
    align-items: center;

    ul {
      display: flex;
      margin: 0 20px;
    }
  }
  aside {
    display: flex;
    height: 100%;
    justify-content: center;
    flex-direction: column;
    p {
      color: #666666;
      font-weight: bold;
      font-size: 14px;
      text-align: right;
    }
    button {
      color: #de3b3b;
      text-align: right;
      border: 0;
      background: none;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;
export const Logo = styled.div`
  border-right: 1px solid #dddddd;
  padding-right: 30px;
  a {
  }
`;

export const Item = styled.li`
  margin-right: 20px;

  a {
    font-size: 15px;
    color: #999;
    font-weight: bold;
    text-transform: uppercase;
    transition: 0.2s ease;

    &:hover {
      color: #444;
    }
  }
`;
