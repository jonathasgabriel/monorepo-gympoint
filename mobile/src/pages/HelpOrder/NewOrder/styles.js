import styled from 'styled-components/native';
import { Platform } from 'react-native';
import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  padding: 0 30px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 20px;
  margin-bottom: 10px;
  align-self: stretch;
`;

export const QuestionInput = styled.TextInput`
  font-size: 16px;
  padding: 20px;
  background: #ffffff;
  margin-top: 25px;
  height: 300px;
  align-self: stretch;
  width: 350px;
  border: 1px solid #dddddd;
`;
