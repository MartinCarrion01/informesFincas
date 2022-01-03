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
import { EncargadoFincaForm } from "../../../Components/Admin/EncargadoFinca/EncargadoFincaForm";
import { EncargadosFinca } from "../../../Components/Admin/EncargadoFinca/EncargadosFinca";
import { useEffect } from "react";

export const EncargadoFinca = () => {
  useEffect(() => {
    document.title = "Encargados de finca - Informes Fincas";
  }, []);
  const { data, error, loading, update } = useFetch(
    "http://localhost:3001/api/v1/admin/encargadofinca"
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
              Agregar un nuevo encargado de finca
            </Button>
            {isOpen ? (
              <EncargadoFincaForm
                isOpen={isOpen}
                onClose={onClose}
                update={update}
              />
            ) : null}
          </>
        ) : null
      ) : (
        <>
          <Button colorScheme="teal" mt={6} isFullWidth={true} onClick={onOpen}>
            Agregar un nuevo encargado de finca
          </Button>
          {isOpen ? (
            <EncargadoFincaForm
              isOpen={isOpen}
              onClose={onClose}
              update={update}
            />
          ) : null}
          {data ? (
            <EncargadosFinca encargadosFinca={data} update={update} />
          ) : null}
        </>
      )}
    </Container>
  );
};
