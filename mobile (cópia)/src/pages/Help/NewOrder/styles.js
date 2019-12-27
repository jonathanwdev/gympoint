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

export const FormInput = styled.TextInput.attrs({
  textAlignVertical: 'top',
  placeholderTextColor: '#999999',
  numberOfLines: 13,
})`
  height: 300px;
  font-size: 16px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.7);
  background: #fff;
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 30px;
`;
export const SubmitButton = styled(Button)``;
