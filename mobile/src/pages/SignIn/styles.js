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

export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;

export const TextInput = styled.TextInput`
  margin-bottom: 10px;
  padding: 0 15px;
  height: 45px;
  border-radius: 4px;
  border: 1px solid #eee;
  color: #999999;
  font-size: 16px;
`;
