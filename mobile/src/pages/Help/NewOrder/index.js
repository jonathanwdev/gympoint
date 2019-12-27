import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import api from '~/services/api';

import { Container, Content, FormInput, SubmitButton } from './styles';

export default function NewOrder({ navigation }) {
  const userId = useSelector(state => state.user.profile.id);
  const [question, setQuestion] = useState('');

  async function handleSubmit() {
    try {
      await api.post(`/students/${userId}/help-orders`, {
        question,
      });
      navigation.navigate('HelpOrder');
    } catch (err) {
      Alert.alert('Erro', err.response.data.error);
    }
  }

  return (
    <Container>
      <Content>
        <FormInput
          multiline
          autoCapitalize="none"
          placeholder="Inclua seu novo pedido de auxílio"
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={question}
          onChangeText={setQuestion}
        />
        <SubmitButton onPress={handleSubmit}>Enviar pedido</SubmitButton>
      </Content>
    </Container>
  );
}
