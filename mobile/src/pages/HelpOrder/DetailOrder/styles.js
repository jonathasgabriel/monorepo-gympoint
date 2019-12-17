import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  align-items: center;
  padding: 0 30px;
`;

export const QuestionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TitleText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  margin-top: ${props => (props.marginTop ? `${props.marginTop}px` : 0)};
`;

export const QuestionTime = styled.Text`
  font-size: 14px;
  color: #666666;
`;

export const MainText = styled.Text`
  margin-top: 15px;
  font-size: 14px;
  color: #666666;
  line-height: 20;
`;

export const InfoWrapper = styled.View`
  flex-direction: column;
  margin-top: 25px;
  border-radius: 4px;
  width: 355px;
  border-radius: 4px;
  background: #ffffff;
  border: 1px solid #dddddd;
  padding: 15px;
`;
