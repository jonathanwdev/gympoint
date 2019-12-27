import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #f2f2f2;
`;

export const Content = styled.View`
  padding: 0 30px;
  margin-top: 30px;
`;

export const CheckInButton = styled(Button)``;

export const CheckinList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingBottom: 45 },
})`
  align-self: stretch;
  margin-top: 18px;
`;

export const Check = styled.View`
  flex-direction: row;
  height: 46px;
  margin-bottom: 15px;
  justify-content: space-between;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #dddddd;
  align-items: center;
  padding: 0 20px;
`;
export const CheckNumber = styled.Text`
  font-weight: bold;
  color: #444444;
  font-size: 14px;
`;
export const CheckDate = styled.Text`
  color: #666666;
  font-size: 14px;
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#ee4e62',
})`
  margin: 30px 0;
`;
