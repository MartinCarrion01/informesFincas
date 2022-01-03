import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spacer,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import frLocale from "date-fns/locale/es";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const EditarEliminarInformeForm = ({ informe, setInforme }) => {
  const [cantInput, setCantInput] = useState(0);
  const [dateInput, setDateInput] = useState(new Date());
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!informe) return;
    setCantInput(informe.informeCosechasEstimadas[0].cantKgEstimadoCosecha);
    setDateInput(informe.informeCosechasEstimadas[0].fechaEstimadaCosecha);
    return () => setInforme(null);
  }, [informe, setInforme]);

  const handleEdit = async (e) => {
    e.preventDefault();
    const body = {
      fechaEstimadaCosecha: dateInput.toISOString().slice(0, 10),
      cantKgEstimadoCosecha: cantInput,
    };
    try {
      const res = await axios.put(
        `http://localhost:3001/api/v1/admin/informe/${informe.uuid}`,
        body,
        { withCredentials: true }
      );
      navigate(`/informe/${res.data.uuid}`);
    } catch (error) {
      setError(error.response.data.mensaje);
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(
        `http://localhost:3001/api/v1/admin/informe/${informe.uuid}`,
        { withCredentials: true }
      );
      navigate(`/`);
    } catch (error) {
      setError(error.response.data.mensaje);
    }
  };
  return (
    <Box bg="white" p={10} borderRadius={10} boxShadow={2}>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
        maxW="3xl"
      >
        {error ? (
          <Alert my={5} status="error">
            <AlertIcon />
            {error}
          </Alert>
        ) : null}
        <form onSubmit={handleEdit}>
          <VStack spacing={4} align="stretch" maxW="3xl">
            <Box px={[4, 0]}>
              <Heading fontSize="lg" fontWeight="md" lineHeight="6">
                Editar un informe de recorrida
              </Heading>
              <Text
                mt={1}
                fontSize="sm"
                color={useColorModeValue("gray.600", "gray.400")}
              >
                Recuerde que si desea editar otros atributos del informe, debe
                comunicarse con el súper-administrador
              </Text>
            </Box>
            <Box>
              <Flex py={[0, 10, 20]} direction={{ base: "column", md: "row" }}>
                <Box>
                  <FormControl>
                    <Stack spacing={2}>
                      <FormLabel htmlFor="cantKgEstimadoCosecha">
                        Cantidad estimada de kg. a cosechar
                      </FormLabel>
                      <NumberInput
                        min={0}
                        clampValueOnBlur={false}
                        step={1000}
                        id="cantKgEstimadoCosecha"
                        onChange={(valueString) =>
                          setCantInput(Number(valueString))
                        }
                        value={cantInput}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </Stack>
                  </FormControl>
                </Box>
                <Spacer />
                <Box>
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    locale={frLocale}
                  >
                    <FormControl>
                      <Stack spacing={2}>
                        <FormLabel htmlFor="Fecha estimada de cosecha">
                          Fecha estimada de cosecha
                        </FormLabel>
                        <DatePicker
                          value={dateInput}
                          onChange={(newValue) => {
                            setDateInput(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Stack>
                    </FormControl>
                  </LocalizationProvider>
                </Box>
              </Flex>
            </Box>
            <Box>
              <Button
                colorScheme="teal"
                isFullWidth={true}
                type="submit"
                disabled={
                  cantInput ===
                    informe.informeCosechasEstimadas[0].cantKgEstimadoCosecha
                }
              >
                Guardar cambios
              </Button>
            </Box>
          </VStack>
        </form>
        <VStack spacing={4} align="stretch" maxW="3xl">
          <Box px={[4, 0]}>
            <Heading fontSize="lg" fontWeight="md" lineHeight="6">
              Eliminar un informe de recorrida
            </Heading>
            <Text
              mt={1}
              fontSize="sm"
              color={useColorModeValue("gray.600", "gray.400")}
            >
              Recuerde que si desea eliminar un informe de recorrida, este no
              podrá volver a ser dado de alta ni editado.
            </Text>
          </Box>
          <Box>
            <Button colorScheme="red" isFullWidth={true} onClick={onOpen}>
              Eliminar
            </Button>
          </Box>
          {isOpen ? (
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  ¿Está seguro de eliminar este informe?
                </ModalHeader>
                <ModalCloseButton />
                <ModalFooter>
                  <Button variant="ghost" onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button colorScheme="red" mr={3} onClick={handleDelete}>
                    Eliminar
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          ) : null}
        </VStack>
      </VStack>
    </Box>
  );
};
