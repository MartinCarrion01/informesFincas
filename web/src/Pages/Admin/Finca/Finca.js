import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Container,
  useDisclosure,
} from "@chakra-ui/react";
import { useFetch } from "../../../Hooks/useFetch";
import { Loading } from "../../../Components/Loading";
import { Fincas } from "../../../Components/Admin/Finca/Fincas";
import { FincaForm } from "../../../Components/Admin/Finca/FincaForm";
import { useEffect } from "react";

export const Finca = () => {
  useEffect(() => {
    document.title = "Fincas - Informes Fincas";
  }, []);
  const { data, error, loading, update } = useFetch(
    "http://localhost:3001/api/v1/admin/finca"
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (loading) {
    return <Loading />;
  }

  return (
    <Container maxW="6xl" centerContent>
      {error ? (
        error.status === 403 ? (
          <Alert
            status="error"
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            mt={5}
          >
            <AlertIcon />
            <AlertTitle mr={2}>{error.data.mensaje}</AlertTitle>
          </Alert>
        ) : error.status === 404 ? (
          <>
            <Alert
              status="error"
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              mt={5}
            >
              <AlertIcon />
              <AlertTitle mr={2}>{error.data.mensaje}</AlertTitle>
            </Alert>
            <Button
              colorScheme="teal"
              mt={6}
              isFullWidth={true}
              onClick={onOpen}
            >
              Agregar una nueva finca
            </Button>
            {isOpen ? (
              <FincaForm isOpen={isOpen} onClose={onClose} update={update} />
            ) : null}
          </>
        ) : null
      ) : (
        <>
          <Button colorScheme="teal" mt={6} isFullWidth={true} onClick={onOpen}>
            Agregar una nueva finca
          </Button>
          {isOpen ? (
            <FincaForm isOpen={isOpen} onClose={onClose} update={update} />
          ) : null}
          {data ? <Fincas fincas={data} update={update} /> : null}
        </>
      )}
    </Container>
  );
};
