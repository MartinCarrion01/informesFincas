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
import { ProductorForm } from "../../../Components/Admin/Productor/ProductorForm";
import { Productores } from "../../../Components/Admin/Productor/Productores";
import { useEffect } from "react";

export const Productor = () => {
  useEffect(() => {
    document.title = "Productores - Informes Fincas";
  }, []);
  const { data, error, loading, update } = useFetch(
    "http://localhost:3001/api/v1/admin/productor"
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
              Agregar un nuevo productor
            </Button>
            {isOpen ? (
              <ProductorForm
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
            Agregar un nuevo productor
          </Button>
          {isOpen ? (
            <ProductorForm isOpen={isOpen} onClose={onClose} update={update} />
          ) : null}
          {data ? <Productores productores={data} update={update} /> : null}
        </>
      )}
    </Container>
  );
};
