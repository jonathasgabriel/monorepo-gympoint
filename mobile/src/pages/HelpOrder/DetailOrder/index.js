import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import headerLogo from '~/assets/headerLogo.png';

import Background from '~/components/Background';

import {
  Container,
  QuestionHeader,
  TitleText,
  QuestionTime,
  MainText,
  InfoWrapper,
} from './styles';

export default function DetailOrder({ navigation }) {
  const helpOrder = navigation.getParam('item');

  return (
    <Background>
      <Container>
        <InfoWrapper>
          <QuestionHeader>
            <TitleText>QUESTION</TitleText>
            <QuestionTime>{helpOrder.formattedDate}</QuestionTime>
          </QuestionHeader>
          <MainText>{helpOrder.question}</MainText>
          <TitleText marginTop={20}>ANSWER</TitleText>
          <MainText>
            {helpOrder.answer ? helpOrder.answer : 'Not answered yet'}
          </MainText>
        </InfoWrapper>
      </Container>
    </Background>
  );
}

DetailOrder.navigationOptions = ({ navigation }) => ({
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

DetailOrder.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
