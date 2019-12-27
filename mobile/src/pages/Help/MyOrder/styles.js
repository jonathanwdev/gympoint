import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #f2f2f2;
`;

export const Content = styled.View`
  padding: 0 30px;
  margin-top: 30px;
`;

export const QuestionBox = styled.View`
  min-height: 359px;
  padding: 20px;
  border: 1px solid #ddd;
  background: #fff;
`;
export const ContentQuestion = styled.View``;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Type = styled.Text`
  color: #444444;
  font-size: 15px;
  font-weight: bold;
`;
export const Datetime = styled.Text`
  color: #666666;
  font-size: 14px;
`;
export const Message = styled.Text`
  min-height: 156px;
  font-size: 15px;
  line-height: 19px;
  margin-top: 7px;
  color: #666666;
`;
