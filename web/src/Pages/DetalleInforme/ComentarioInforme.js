import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Container,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ComentarioForm } from "../../Components/CargarComentario/ComentarioForm";
import axios from "axios";

export const ComentarioInforme = () => {
  const params = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Cargar nuevo comentario - Informes Fincas";
    const valid = async () => {
      try {
        const res = await axios.get(
          "http://192.168.4.165:3001/api/v1/validateinforme/" + params.id,
          { withCredentials: true }
        );
        if (res.status === 200) {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setError(error.response.data.mensaje);
      }
    };
    valid();
  }, [params.id]);

  if (loading) {
    return (
      <Container maxW="6xl" centerContent>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          mt={6}
        />
      </Container>
    );
  }
  return (
    <Container maxW="6xl" centerContent>
      {!error ? (
        <ComentarioForm informeId={params} />
      ) : (
        <Stack>
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
          <Button colorScheme="teal" size="lg" onClick={() => navigate("/")}>
            Volver a inicio
          </Button>
        </Stack>
      )}
    </Container>
  );
};
