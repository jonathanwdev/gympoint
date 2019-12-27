import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';

import {
  Container,
  Content,
  HelpButton,
  HelpBox,
  Header,
  Status,
  DateTime,
  Message,
  HelpList,
  HIcon,
  HText,
  Loading,
} from './styles';

function HelpOrder({ navigation, isFocused }) {
  const userId = useSelector(state => state.user.profile.id);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadList, setLoadList] = useState(false);
  const [helpOrders, setHelpOrders] = useState([]);

  async function handleLoadMore() {
    const newPage = page + 1;
    if (helpOrders.length >= 5) {
      setLoading(true);
      setPage(newPage);
      if (total < 1) {
        setLoading(false);
        return;
      }
      const response = await api.get(`/students/${userId}/help-orders`, {
        params: {
          page,
        },
      });
      const data = response.data.map(help => ({
        ...help,
        questionDate: formatRelative(parseISO(help.createdAt), new Date(), {
          locale: pt,
          addSuffix: true,
        }),
        answerDate: help.answer_at
          ? formatRelative(parseISO(help.answer_at), new Date(), {
              locale: pt,
              addSuffix: true,
            })
          : null,
      }));
      setHelpOrders(data);
      setLoading(false);
      setTotal(response.data.length);
      setHelpOrders(page > 1 ? [...helpOrders, ...data] : data);
    }
  }

  async function loadHelpOrder() {
    try {
      setLoadList(true);
      const response = await api.get(`/students/${userId}/help-orders`, {
        params: {
          page,
        },
      });
      const data = response.data.map(help => ({
        ...help,
        questionDate: formatRelative(parseISO(help.createdAt), new Date(), {
          locale: pt,
          addSuffix: true,
        }),
        answerDate: help.answer_at
          ? formatRelative(parseISO(help.answer_at), new Date(), {
              locale: pt,
              addSuffix: true,
            })
          : null,
      }));
      setHelpOrders(data);
      setTotal(response.data.length);
      setLoadList(false);
    } catch (err) {
      Alert.alert('Erro', err.response.data.error);
    }
  }

  useEffect(() => {
    if (isFocused) {
      loadHelpOrder();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  function handleReadMore(item) {
    navigation.navigate('MyOrder', {
      item,
    });
  }

  async function handleRefresh() {
    setRefreshing(true);
    loadHelpOrder();
    setRefreshing(false);
  }

  return (
    <Container>
      <Content>
        <HelpButton onPress={() => navigation.navigate('NewOrder')}>
          Novo pedido de auxílio
        </HelpButton>
        {loadList ? (
          <Loading />
        ) : (
          <HelpList
            data={helpOrders}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            onEndReachedThreshold={0.2}
            onEndReached={handleLoadMore}
            ListFooterComponent={loading && <Loading />}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <HelpBox onPress={() => handleReadMore(item)}>
                <Header>
                  <Status>
                    <HIcon status={item.answer} name="check-circle" size={14} />
                    <HText status={item.answer}>
                      {item.answer ? 'Respondido' : 'Sem resposta'}
                    </HText>
                  </Status>
                  <DateTime>
                    {item.answer ? item.answerDate : item.questionDate}
                  </DateTime>
                </Header>
                <Message>{item.question}</Message>
              </HelpBox>
            )}
          />
        )}
      </Content>
    </Container>
  );
}

HelpOrder.navigationOptions = {
  tabBarLabel: 'Pedir ajuda',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="live-help" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(HelpOrder);
