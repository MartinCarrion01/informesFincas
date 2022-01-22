import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Container,
  Flex,
  Select,
  SimpleGrid,
  Spacer,
} from "@chakra-ui/react";
import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import frLocale from "date-fns/locale/es";
import axios from "axios";

export const InformeFilter = ({
  setFinca,
  setVariedad,
  setProductor,
  setFd,
  setFh,
}) => {
  const [fincas, setFincas] = useState(null);
  const [variedades, setVariedades] = useState(null);
  const [productores, setProductores] = useState(null);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("http://192.168.4.165:3001/api/v1/alldata", {
          withCredentials: true,
        });
        setFincas(res.data.fincas);
        setVariedades(res.data.variedades);
        setProductores(res.data.productores);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 404) {
          setLoading(false);
          setError(error.response.data.mensaje);
        }
      }
    };
    getData();
  }, []);

  return (
    <>
      {error ? (
        <Container maxW="container.xl" centerContent>
          <Alert
            status="error"
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            mt={5}
          >
            <AlertIcon />
            <AlertTitle mr={2}>{error}</AlertTitle>
          </Alert>
        </Container>
      ) : (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
          <Container maxW="container.xl">
            <SimpleGrid columns={[2, null, 3]} spacing="40px" mt={5}>
              <Select
                placeholder="Productor"
                disabled={loading}
                onChange={(e) => setProductor(e.target.value)}
              >
                {loading
                  ? null
                  : productores.map((productor) => (
                      <option
                        key={productor.uuid}
                        value={productor.nombreProductor}
                      >
                        {productor.nombreProductor}
                      </option>
                    ))}
              </Select>
              <Select
                placeholder="Finca"
                disabled={loading}
                onChange={(e) => setFinca(e.target.value)}
              >
                {loading
                  ? null
                  : fincas.map((finca) => (
                      <option key={finca.uuid} value={finca.nombreFinca}>
                        {finca.nombreFinca}
                      </option>
                    ))}
              </Select>
              <Select
                placeholder="Variedad"
                disabled={loading}
                onChange={(e) => setVariedad(e.target.value)}
              >
                {loading
                  ? null
                  : variedades.map((variedad) => (
                      <option
                        key={variedad.uuid}
                        value={variedad.nombreVariedad}
                      >
                        {variedad.nombreVariedad}
                      </option>
                    ))}
                <option value={"Inexistente"}>Inexistente</option>
              </Select>
            </SimpleGrid>
            <Flex
              py={[0, 10, 20]}
              direction={{ base: "column", md: "row" }}
              mt={5}
            >
              <Box>
                <DatePicker
                  label="Fecha estimada desde"
                  mask="__/__/____"
                  value={setFd.fechaDesdeFilter}
                  disabled={loading}
                  onChange={(newValue) => {
                    setFd.setFechaDesdeFilter(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>
              <Spacer />
              <Box>
                <DatePicker
                  label="Fecha estimada hasta"
                  mask="__/__/____"
                  value={setFh.fechaHastaFilter}
                  disabled={loading}
                  onChange={(newValue) => {
                    setFh.setFechaHastaFilter(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>
            </Flex>
          </Container>
        </LocalizationProvider>
      )}
    </>
  );
};
