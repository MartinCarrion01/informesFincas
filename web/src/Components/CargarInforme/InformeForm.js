import React, { useState } from "react";
import {
  Box,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  FormControl,
  FormLabel,
  FormHelperText,
  Textarea,
  Button,
  Select,
  VStack,
  StackDivider,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Alert,
  AlertIcon,
  AlertTitle,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { TextField } from "@mui/material";
import frLocale from "date-fns/locale/es";
import { useNavigate } from "react-router-dom";

export function InformeForm({ fincas, variedades }) {
  const [fincaInput, setFincaInput] = useState("");
  const [variedadInput, setVariedadInput] = useState("");
  const [cantInput, setCantInput] = useState(0);
  const [dateInput, setDateInput] = useState(new Date());
  const [commentInput, setCommentInput] = useState("");
  const [fincaError, setFincaError] = useState(false);
  const [variedadError, setVariedadError] = useState(false);
  const [cantError, setCantError] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const commentError = commentInput.length === 0 || commentInput.length > 300;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      fincaInput === "" ||
      variedadInput === "" ||
      cantInput === 0 ||
      commentInput.length === 0 ||
      commentInput.length >= 300
    ) {
      setFincaError(fincaInput === "");
      setVariedadError(variedadInput === "");
      setCantError(cantInput === 0);
    } else {
      const newInforme = {
        fincaUuid: fincaInput,
        variedadUuid: variedadInput,
        cantKgEstimadoCosecha: cantInput,
        fechaEstimadaCosecha: dateInput.toISOString().slice(0, 10),
        comentarioDescripcion: commentInput,
        codInforme: new Date().getMilliseconds(),
      };
      console.log(newInforme);
      try {
        const res = await axios.post(
          "http://localhost:3001/informe",
          newInforme,
          { withCredentials: true }
        );
        console.log("res", res.status);
        navigate(`/informe/${res.data.uuid}`);
      } catch (error) {
        if (error.response.status === 400) {
          setError(error.response.data.error.sqlMessage);
        }
      }
    }
  };

  return (
    <Box bg="gray.50" p={10} mt={8} borderRadius={10} maxW={"3xl"}>
      {error ? (
        <Alert status="error" p={4} borderWidth="1px" borderRadius="lg" mt={6}>
          <AlertIcon />
          <AlertTitle mr={2}>{error}</AlertTitle>
        </Alert>
      ) : null}
      <Box bg="white" p={10} borderRadius={10} boxShadow={2}>
        <form onSubmit={handleSubmit}>
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            align="stretch"
            maxW="3xl"
          >
            <Box px={[4, 0]}>
              <Heading fontSize="lg" fontWeight="md" lineHeight="6">
                Crear un informe de recorrida
              </Heading>
              <Text
                mt={1}
                fontSize="sm"
                color={useColorModeValue("gray.600", "gray.400")}
              >
                Recuerde que si desea eliminar o editar un informe, debe
                comunicarse con un administrador
              </Text>
            </Box>
            <Box>
              <FormControl isInvalid={fincaError}>
                <FormLabel htmlFor="finca">Finca</FormLabel>
                <Select
                  placeholder="Select option"
                  onChange={(e) => setFincaInput(e.target.value)}
                  value={fincaInput}
                >
                  {fincas.map((finca) => (
                    <option key={finca.uuid} value={finca.uuid}>
                      {finca.nombreFinca}
                    </option>
                  ))}
                </Select>
                {!fincaError ? null : (
                  <FormErrorMessage>Debe elegir una finca</FormErrorMessage>
                )}
              </FormControl>
            </Box>
            <Box>
              <FormControl isInvalid={variedadError}>
                <FormLabel htmlFor="email">Variedad</FormLabel>
                <Select
                  placeholder="Seleccione una variedad"
                  onChange={(e) => setVariedadInput(e.target.value)}
                  value={variedadInput}
                >
                  {variedades.map((variedad) => (
                    <option key={variedad.uuid} value={variedad.uuid}>
                      {variedad.nombreVariedad}
                    </option>
                  ))}
                </Select>
                {!variedadError ? null : (
                  <FormErrorMessage>Debe elegir una variedad</FormErrorMessage>
                )}
              </FormControl>
            </Box>
            <Box>
              <Flex py={[0, 10, 20]} direction={{ base: "column", md: "row" }}>
                <Box>
                  <FormControl isInvalid={cantError}>
                    <Stack spacing={2}>
                      <FormLabel htmlFor="cantKgEstimadoCosecha">
                        Cantidad estimada de kg. a cosechar
                      </FormLabel>
                      <NumberInput
                        min={0}
                        clampValueOnBlur={false}
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
                    {!cantError ? null : (
                      <FormErrorMessage>
                        La cantidad de kilos a cosechar debe ser mayor a 0
                      </FormErrorMessage>
                    )}
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
              <FormControl isInvalid={commentError}>
                <FormLabel htmlFor="comentarioDescripcion">
                  Descripción de la recorrida
                </FormLabel>
                <Textarea
                  placeholder="Escriba una comentario sobre la recorrida"
                  onChange={(e) => setCommentInput(e.target.value)}
                  value={commentInput}
                />
                {!commentError ? (
                  <FormHelperText>{commentInput.length}</FormHelperText>
                ) : (
                  <FormErrorMessage>{commentInput.length}</FormErrorMessage>
                )}
              </FormControl>
            </Box>
            <Box>
              <Button colorScheme="teal" isFullWidth={true} type="submit">
                Guardar
              </Button>
            </Box>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}
