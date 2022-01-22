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

export function InformeForm({ fincas, variedades, productores }) {
  const [fincaInput, setFincaInput] = useState("");
  const [variedadInput, setVariedadInput] = useState("");
  const [productorInput, setProductorInput] = useState("");
  const [cantInput, setCantInput] = useState(0);
  const [dateInput, setDateInput] = useState(new Date());
  const [commentInput, setCommentInput] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fincasByProd = fincas.filter(
    (finca) => finca.productor.uuid === productorInput
  );

  const variedadByFincas = variedades.filter((variedad) =>
    variedad.fincas.map((finca) => finca.uuid).includes(fincaInput)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newInforme = {
      fincaUuid: fincaInput,
      variedadUuid: variedadInput,
      cantKgEstimadoCosecha: cantInput,
      fechaEstimadaCosecha: dateInput.toISOString().slice(0, 10),
      comentarioDescripcion: commentInput,
    };
    try {
      const res = await axios.post(
        "http://192.168.4.165:3001/api/v1/informe",
        newInforme,
        { withCredentials: true }
      );
      navigate(`/informe/${res.data.uuid}`);
    } catch (error) {
      if (error.response.status === 400) {
        setError(error.response.data.error.sqlMessage);
      }
      else{
        setError(JSON.stringify(error.response.data))
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
              <FormControl>
                <FormLabel htmlFor="productor">Productor</FormLabel>
                <Select
                  placeholder="Seleccione un productor"
                  onChange={(e) => setProductorInput(e.target.value)}
                  value={productorInput}
                >
                  {productores.map((productor) => (
                    <option key={productor.uuid} value={productor.uuid}>
                      {productor.nombreProductor}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <FormControl
                isInvalid={fincasByProd.length === 0 && productorInput !== ""}
              >
                <FormLabel htmlFor="finca">Finca</FormLabel>
                <Select
                  placeholder="Seleccione una finca"
                  onChange={(e) => setFincaInput(e.target.value)}
                  isDisabled={fincasByProd.length === 0}
                  value={fincaInput}
                >
                  {fincasByProd.map((finca) => (
                    <option key={finca.uuid} value={finca.uuid}>
                      {finca.nombreFinca}
                    </option>
                  ))}
                </Select>
                {fincasByProd.length === 0 && productorInput !== "" ? (
                  <FormErrorMessage>
                    El productor seleccionado no tiene fincas vigentes
                  </FormErrorMessage>
                ) : null}
              </FormControl>
            </Box>
            <Box>
              <FormControl
                isInvalid={variedadByFincas.length === 0 && fincaInput !== ""}
              >
                <FormLabel htmlFor="variedad">Variedad</FormLabel>
                <Select
                  placeholder="Seleccione una variedad"
                  onChange={(e) => setVariedadInput(e.target.value)}
                  isDisabled={
                    variedadByFincas.length === 0 || fincasByProd.length === 0
                  }
                  value={variedadInput}
                >
                  {variedadByFincas.map((variedad) => (
                    <option key={variedad.uuid} value={variedad.uuid}>
                      {variedad.nombreVariedad}
                    </option>
                  ))}
                </Select>
                {!(
                  variedadByFincas.length === 0 && fincaInput !== ""
                ) ? null : (
                  <FormErrorMessage>
                    La finca seleccionada no tiene variedades
                  </FormErrorMessage>
                )}
              </FormControl>
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
                        isDisabled={variedadInput === ""}
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
                          disabled={variedadInput === ""}
                        />
                      </Stack>
                    </FormControl>
                  </LocalizationProvider>
                </Box>
              </Flex>
            </Box>
            <Box>
              <FormControl
                isInvalid={
                  commentInput.length === 0 || commentInput.length > 300
                }
              >
                <FormLabel htmlFor="comentarioDescripcion">
                  Descripción de la recorrida
                </FormLabel>
                <Textarea
                  placeholder="Escriba una comentario sobre la recorrida"
                  onChange={(e) => setCommentInput(e.target.value)}
                  value={commentInput}
                  isDisabled={variedadInput === ""}
                />
                {!(commentInput.length === 0 || commentInput.length > 300) ? (
                  <FormHelperText>{commentInput.length}</FormHelperText>
                ) : (
                  <FormErrorMessage>{commentInput.length}</FormErrorMessage>
                )}
              </FormControl>
            </Box>
            <Box>
              <Button
                colorScheme="teal"
                isFullWidth={true}
                type="submit"
                isDisabled={
                  variedadInput === "" ||
                  commentInput.length === 0 ||
                  commentInput.length > 300
                }
              >
                Guardar
              </Button>
            </Box>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}
