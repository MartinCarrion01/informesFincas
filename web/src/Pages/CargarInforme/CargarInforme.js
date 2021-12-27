import {
  Alert,
  AlertIcon,
  AlertTitle,
  Container,
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { InformeForm } from "../../Components/CargarInforme/InformeForm";

export const CargarInforme = () => {
  const [loading, setLoading] = useState(true);
  const [fincas, setFincas] = useState(null);
  const [variedades, setVariedades] = useState(null);
  const [error, setError] = useState();

  useEffect(() => {
    document.title = "Cargar nuevo informe - Informes";
    const getData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/data", {
          withCredentials: true,
        });
        setFincas(res.data.fincas);
        setVariedades(res.data.variedades);
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
    <div>
      <Container maxW="3xl" centerContent>
        {loading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            mt={6}
          />
        ) : error ? (
          <Alert
            status="error"
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            mt={6}
          >
            <AlertIcon />
            <AlertTitle mr={2}>{error}</AlertTitle>
          </Alert>
        ) : (
          <InformeForm fincas={fincas} variedades={variedades} />
        )}
      </Container>
    </div>
  );
};
