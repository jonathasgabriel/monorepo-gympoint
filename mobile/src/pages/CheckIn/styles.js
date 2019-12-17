import styled from 'styled-components/native';
import { Platform } from 'react-native';
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

export const CheckinList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const Checkin = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  border-radius: 4px;
  width: 355px;
  border-radius: 4px;
  height: 46px;
  background: #ffffff;
  border: 1px solid #dddddd;
  padding: 15px;
`;

export const CheckinText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #444444;
`;

export const CheckinDate = styled.Text`
  font-size: 14px;
  color: #666666;
`;
