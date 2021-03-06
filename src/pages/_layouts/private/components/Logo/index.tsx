import React from 'react';
import { HStack, Image, Text } from '@chakra-ui/react';
import Logo from '../../../../../assets/logo-app.png';

interface IProps {
  activated: boolean;
}

const LogoComponent: React.FC<IProps> = ({ activated }) => {
  return (
    <HStack spacing="24px">
      <Text
        fontSize="2xl"
        color="#14a64f"
        fontWeight="bold"
        textShadow="1px 1px #666"
      >
        {activated
          ? process.env.REACT_APP_SIGLA || 'SIGLA'
          : process.env.REACT_APP_SIGLA2}
      </Text>
      {activated && <Image height="50px" src={Logo} />}
    </HStack>
  );
};

export default LogoComponent;
