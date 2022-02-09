import { Flex, HStack, SimpleGrid, useToast, VStack } from '@chakra-ui/react';

import Button from 'components/form/Button';
import FormGroup from 'components/form/FormGroup';
import TituloPagina from 'components/TituloPagina';
import React from 'react';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import api from 'services/api';
import { Container } from 'components/form/FormGroup/styles';
import BoxContent from 'components/BoxContent';
import { Form } from 'components/ModalAssinatura/styles';
import Row from 'components/form/Row';
import PanelBottomActions from 'components/PanelBottomActions';
import { FaEraser, FaSave, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../../contexts/auth';
import FormInput from '../../../components/form/FormInput';

type IFormLegislacao = {
  decreto_leg: string;
};

const schemaLegislacao = Yup.object().shape({
  decreto_leg: Yup.string().required('Campo obrigatório'),
});

type IProps = {
  disabled: boolean;
  action: 'editar' | 'cadastrar';
};

const LegislacaoNovo: React.FC<IProps> = ({ disabled }) => {
  const history = useHistory();
  const toast = useToast();
  const { signOut } = useAuth();
  const { control, handleSubmit, errors, reset } = useForm<IFormLegislacao>({
    resolver: yupResolver(schemaLegislacao),
    defaultValues: {
      decreto_leg: '',
    },
  });

  const onSubmit = async (data: IFormLegislacao): Promise<void> => {
    const { decreto_leg } = data;

    try {
      await api.post('legislacaonovo', {
        decreto_leg,
      });

      toast({
        title: 'Sucesso!',
        description: 'Cadastro realizado com sucesso.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      history.push('/home');
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            signOut();
            break;
          default:
            toast({
              title: 'Erro inesperado.',
              description: error.response.data.message,
              status: 'error',
              duration: 5000,
              isClosable: true,
              position: 'top-right',
            });
            break;
        }
      }
    }
  };

  return (
    <Container>
      <TituloPagina title="Cadastro de Legislação" />
      <BoxContent>
        <div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <FormGroup cols={[6, 9, 12]} name="Legislação" required>
                <Controller
                  name="decreto_leg"
                  control={control}
                  as={<FormInput error={errors.decreto_leg?.message} />}
                />
              </FormGroup>
            </Row>
            <PanelBottomActions>
              <Button
                color="red"
                icon={FaTimes}
                onClick={() => history.push('/home')}
              >
                Cancelar
              </Button>
              <Button
                color="yellow"
                icon={FaEraser}
                type="button"
                onClick={() => {
                  reset();
                }}
              >
                Limpar
              </Button>
              <Button color="green" icon={FaSave} type="submit">
                Salvar
              </Button>
            </PanelBottomActions>
          </Form>
        </div>
      </BoxContent>
    </Container>
  );
};
export default LegislacaoNovo;
