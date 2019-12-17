import React from 'react';

import headerLogo from '../../assets/headerLogo.png';
import { Wrapper, Logo } from './styles';

export default function Header() {
  return (
    <Wrapper>
      <Logo source={headerLogo} />
    </Wrapper>
  );
}
