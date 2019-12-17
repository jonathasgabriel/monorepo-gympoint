import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { parseISO, formatRelative } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import Header from '~/components/Header';

import api from '~/services/api';
import {
  Container,
  SubmitButton,
  CheckinList,
  Checkin,
  CheckinText,
  CheckinDate,
} from './styles';

export default function CheckIn() {
  const [checkins, setCheckins] = useState([]);

  const studentId = useSelector(state => state.user.user);

  async function loadCheckins() {
    const response = await api.get(`/students/${studentId}/checkins`);

    const numberOfCheckins = response.data.length;

    setCheckins(
      response.data.map(checkin => {
        return {
          ...checkin,
          checkinNumber: numberOfCheckins - response.data.indexOf(checkin),
          formattedDate: formatRelative(
            parseISO(checkin.createdAt),
            new Date(),
            {
              locale: enUS,
              addSuffix: true,
            }
          ),
        };
      })
    );
  }

  useEffect(() => {
    loadCheckins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmitCheckin() {
    try {
      await api.post(`/students/${studentId}/checkins`);
      loadCheckins();
    } catch (err) {
      Alert.alert('Checkin not available');
    }
  }

  return (
    <Background>
      <Header />
      <Container>
        <SubmitButton
          onPress={() => {
            handleSubmitCheckin();
          }}
        >
          New check-in
        </SubmitButton>
        <CheckinList
          data={checkins}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <Checkin onPress={() => {}}>
              <CheckinText>Check-in #{item.checkinNumber}</CheckinText>
              <CheckinDate>{item.formattedDate}</CheckinDate>
            </Checkin>
          )}
        />
      </Container>
    </Background>
  );
}

CheckIn.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="pin-drop" size={20} color={tintColor} />
  ),
};
