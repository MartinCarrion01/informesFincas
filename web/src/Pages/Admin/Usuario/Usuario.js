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
import { Usuarios } from "../../../Components/Admin/Usuario/Usuarios";
import { UsuarioForm } from "../../../Components/Admin/Usuario/UsuarioForm";
import { useEffect } from "react";

export const Usuario = () => {
  useEffect(() => {
    document.title = "Usuarios - Informes Fincas";
  }, []);
  const { data, error, loading, update } = useFetch(
    "http://192.168.4.165:3001/api/v1/admin/user"
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
              Agregar un nuevo recorredor
            </Button>
            {isOpen ? (
            <UsuarioForm isOpen={isOpen} onClose={onClose} update={update} />
          ) : null}
          </>
        ) : null
      ) : (
        <>
          <Button colorScheme="teal" mt={6} isFullWidth={true} onClick={onOpen}>
            Agregar un nuevo recorredor
          </Button>
          {isOpen ? (
            <UsuarioForm isOpen={isOpen} onClose={onClose} update={update} />
          ) : null}
          {data ? <Usuarios usuarios={data} update={update} /> : null}
        </>
      )}
    </Container>
  );
};
