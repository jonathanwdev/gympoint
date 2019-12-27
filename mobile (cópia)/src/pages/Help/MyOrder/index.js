import React from 'react';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import {
  Container,
  Content,
  QuestionBox,
  ContentQuestion,
  Header,
  Type,
  Datetime,
  Message,
} from './styles';

export default function MyOrder({ navigation }) {
  const item = navigation.getParam('item');
  const formattedDate = formatRelative(parseISO(item.createdAt), new Date(), {
    locale: pt,
    addSuffix: true,
  });

  return (
    <Container>
      <Content>
        <QuestionBox>
          <ContentQuestion>
            <Header>
              <Type>PERGUNTA</Type>
              <Datetime>{formattedDate}</Datetime>
            </Header>
            <Message>{item.question}</Message>
          </ContentQuestion>
          <ContentQuestion>
            <Type>RESPOSTA</Type>
            <Message>
              {item.answer
                ? item.answer
                : 'Sua pergunta será respondida em breve...'}
            </Message>
          </ContentQuestion>
        </QuestionBox>
      </Content>
    </Container>
  );
}
