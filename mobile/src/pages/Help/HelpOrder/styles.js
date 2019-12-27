import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #f2f2f2;
`;

export const Content = styled.View`
  padding: 0 30px;
  margin-top: 30px;
`;

export const HelpButton = styled(Button)``;

export const HelpList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingBottom: 45 },
})`
  align-self: stretch;
  margin-top: 18px;
`;

export const HelpBox = styled.TouchableOpacity`
  height: 150px;
  padding: 20px 20px;
  background: #fff;
  border: 1px solid #dddddd;
  border-radius: 4px;
  margin-bottom: 20px;
`;
export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const HIcon = styled(Icon)`
  font-size: 15px;
  color: ${props => (props.status ? '#42CB59' : '#999999')};
`;

export const HText = styled.Text`
  font-size: 14px;
  margin-left: 15px;
  font-weight: bold;
  color: ${props => (props.status ? '#42CB59' : '#999999')};
`;

export const Status = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const DateTime = styled.Text`
  font-size: 14px;
  color: #666666;
`;

export const Message = styled.Text.attrs({
  numberOfLines: 4,
})`
  font-size: 14px;
  line-height: 20px;
  color: #666666;
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#ee4e62',
})`
  margin: 20px 0;
`;
