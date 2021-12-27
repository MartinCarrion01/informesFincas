import {
  Flex,
  Box,
  Spacer,
  FormControl,
  Stack,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormErrorMessage,
} from "@chakra-ui/react";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { TextField } from "@mui/material";
import frLocale from "date-fns/locale/es";

export const SeCosecho = ({ seCosecho, cant, fecha }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
      <Flex py={[0, 10, 20]} direction={{ base: "column", md: "row" }}>
        <Box>
          <FormControl>
            <Stack spacing={2}>
              <FormLabel
                htmlFor={`cantKg${seCosecho ? "Real" : "Estimado"}Cosecha`}
              >
                Cantidad {seCosecho ? "real" : "estimada"} de kg. a cosechar
              </FormLabel>
              <NumberInput
                mt={4}
                min={0}
                clampValueOnBlur={false}
                id="cantKgEstimadoCosecha"
                onChange={(valueString) => cant.setCant(Number(valueString))}
                value={cant.cant}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Stack>
            {cant.cant > 0 ? null : (
              <FormErrorMessage>
                La cantidad de kilos a cosechar debe ser mayor a 0
              </FormErrorMessage>
            )}
          </FormControl>
        </Box>
        <Spacer />
        <Box>
          <FormControl>
            <Stack spacing={2}>
              <FormLabel
                htmlFor={`fecha${seCosecho ? "Real" : "Estimado"}Cosecha`}
              >
                Fecha {seCosecho ? "real" : "estimada"} de cosecha
              </FormLabel>
              <DatePicker
                value={fecha.fecha}
                onChange={(newValue) => {
                  fecha.setFecha(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </FormControl>
        </Box>
      </Flex>
    </LocalizationProvider>
  );
};
