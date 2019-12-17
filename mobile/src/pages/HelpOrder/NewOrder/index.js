import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import headerLogo from '~/assets/headerLogo.png';

import Background from '~/components/Background';

import api from '~/services/api';

import { Container, SubmitButton, QuestionInput } from './styles';

export default function NewOrder({ navigation }) {
  const [question, setQuestion] = useState([]);

  const studentId = useSelector(state => state.user.user);

  async function handleSubmitNewHelpOrder() {
    await api.post(`/students/${studentId}/help-orders`, {
      question,
    });
    navigation.navigate('ListOrder');
  }

  return (
    <Background>
      <Container>
        <QuestionInput
          multiline
          placeholder="Please type your question"
          placeholderTextColor="#999999"
          onChangeText={e => setQuestion(e)}
        />
        <SubmitButton
          onPress={() => {
            handleSubmitNewHelpOrder();
          }}
        >
          Submit help order
        </SubmitButton>
      </Container>
    </Background>
  );
}

NewOrder.navigationOptions = ({ navigation }) => ({
  headerTitle: <Image source={headerLogo} />,
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={20} color="#000000" />
    </TouchableOpacity>
  ),
});

NewOrder.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
