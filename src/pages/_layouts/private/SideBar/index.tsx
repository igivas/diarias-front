import React from 'react';
import { MdEdit, MdDashboard, MdSearch, MdCardTravel } from 'react-icons/md';
import {
  Accordion,
  Center,
  Flex,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';
import Logo from '../components/Logo';
import MenuItem from './Menu';
import MenuDropdown from './MenuDropdown';
import LogoCetic from '../../../../assets/logo-cetic-35px.png';
import { Container, HeaderMenu, Footer } from './styles';
import { useAuth } from '../../../../contexts/auth';

interface ISideBarProps {
  activated: boolean;
  handleActiveSideBar(): void;
}

const SideBar: React.FC<ISideBarProps> = ({
  activated,
  handleActiveSideBar,
}) => {
  const { user } = useAuth();
  const bg = useColorModeValue('green.500', '#5b5b58');
  const color = useColorModeValue('gray.500', 'white');
  const cadastroItens = [{ label: 'LEGISLAÇÃO', to: '/legislacaonovo' }];
  const consultaItens = [{ label: 'LEGISLAÇÃO', to: '/legislacao' }];

  return (
    <Container activated={activated}>
      <HeaderMenu activated={activated}>
        <Logo activated={activated} />
      </HeaderMenu>

      <Flex
        bg={bg}
        textColor="black"
        color={color}
        direction="column"
        alignItems="initial"
        flex="1"
      >
        <Accordion allowToggle>
          <MenuItem
            to="/home"
            label="INICIAL"
            icon={MdDashboard}
            activated={activated}
          />
        </Accordion>
        <Accordion allowToggle>
          <MenuDropdown
            label="CADASTRO"
            icon={MdEdit}
            items={cadastroItens}
            activated={activated}
            handleActiveSideBar={handleActiveSideBar}
          />
        </Accordion>
        <Accordion allowToggle>
          <MenuDropdown
            label="CONSULTA"
            icon={MdSearch}
            items={consultaItens}
            activated={activated}
            handleActiveSideBar={handleActiveSideBar}
          />
        </Accordion>
      </Flex>
      <Footer activated={activated}>
        <Center w="100%">
          {activated && <Image src={LogoCetic} alt="logo cetic" />}
        </Center>
      </Footer>
    </Container>
  );
};

export default SideBar;
