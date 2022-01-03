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
  const [productores, setProductores] = useState(null)
  const [error, setError] = useState();

  useEffect(() => {
    document.title = "Cargar nuevo informe - Informes Fincas";
    const getData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/v1/data", {
          withCredentials: true,
        });
        setFincas(res.data.fincas);
        setVariedades(res.data.variedades);
        setProductores(res.data.productores)
        setLoading(false);
      } catch (error) {
        setError(error.response.data.mensaje);
        setLoading(false);
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
          <InformeForm fincas={fincas} variedades={variedades} productores={productores} />
        )}
      </Container>
    </div>
  );
};
