import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 20px;
  margin-bottom: 10px;
  align-self: stretch;
`;

export const HelpOrderList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const HelpOrder = styled(RectButton)`
  flex-direction: column;
  margin-top: 15px;
  border-radius: 4px;
  width: 355px;
  border-radius: 4px;
  height: 150px;
  background: #ffffff;
  border: 1px solid #dddddd;
  padding: 15px;
`;

export const HelpOrderHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const HelpOrderText = styled.Text.attrs({
  numberOfLines: 3,
})`
  margin-top: 15px;
  font-size: 14px;
  color: #666666;
  line-height: 20;
`;

export const HelpOrderInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HelpOrderReadText = styled.Text`
  margin-left: 5px;
  font-size: 14px;
  font-weight: bold;
  color: ${props => (props.answer ? '#42CB59' : '#999999')};
`;

export const HelpOrderTime = styled.Text`
  font-size: 14px;
  color: #666666;
`;
