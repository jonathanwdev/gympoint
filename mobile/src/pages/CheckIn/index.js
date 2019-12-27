import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Alert } from 'react-native';
import api from '~/services/api';

import {
  Container,
  Content,
  CheckInButton,
  CheckinList,
  Check,
  CheckNumber,
  CheckDate,
  Loading,
} from './styles';

export default function CheckIn() {
  const userId = useSelector(state => state.user.profile.id);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadList, setLoadList] = useState(false);
  const [total, setTotal] = useState(0);
  const [totalLoad, setTotalLoad] = useState(0);
  const [checkins, setCheckins] = useState([]);

  async function handleLoadMore() {
    const newPage = page + 1;
    if (checkins.length >= 10) {
      setLoading(true);
      setPage(newPage);
      if (totalLoad < 1) {
        setLoading(false);
        return;
      }
      const response = await api.get(`/students/${userId}/checkins`, {
        params: {
          page,
        },
      });
      const data = response.data.rows.map(ch => ({
        ...ch,
        formattedDate: formatRelative(parseISO(ch.createdAt), new Date(), {
          locale: pt,
          addSuffix: true,
        }),
      }));

      setLoading(false);
      setTotal(response.data.count);
      setTotalLoad(response.data.rows.length);
      setCheckins(page > 1 ? [...checkins, ...data] : data);
    }
  }

  async function loadCheckins(nextPage = page) {
    try {
      setLoadList(true);
      const response = await api.get(`/students/${userId}/checkins`, {
        params: {
          page: nextPage,
        },
      });
      const data = response.data.rows.map(ch => ({
        ...ch,
        formattedDate: formatRelative(parseISO(ch.createdAt), new Date(), {
          locale: pt,
          addSuffix: true,
        }),
      }));
      setLoadList(false);
      setTotal(response.data.count);
      setTotalLoad(response.data.rows.length);
      setCheckins(data);
    } catch (err) {
      Alert.alert('Erro', err.response.data.error);
    }
  }

  useEffect(() => {
    loadCheckins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleCheckin(id) {
    try {
      await api.post(`/students/${id}/checkins`);
      loadCheckins();
    } catch (err) {
      Alert.alert('Erro', err.response.data.error);
    }
  }

  return (
    <Container>
      <Content>
        <CheckInButton onPress={() => handleCheckin(userId)}>
          Novo check-in
        </CheckInButton>
        {loadList ? (
          <Loading />
        ) : (
          <CheckinList
            data={checkins}
            onEndReachedThreshold={0.2}
            onEndReached={handleLoadMore}
            ListFooterComponent={loading && <Loading />}
            keyExtractor={item => String(item.id)}
            renderItem={({ item, index }) => (
              <Check>
                <CheckNumber>Check-in #{total - index}</CheckNumber>
                <CheckDate>{item.formattedDate}</CheckDate>
              </Check>
            )}
          />
        )}
      </Content>
    </Container>
  );
}
