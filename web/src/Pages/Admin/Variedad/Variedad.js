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
import { Variedades } from "../../../Components/Admin/Variedad/Variedades";
import { VariedadForm } from "../../../Components/Admin/Variedad/VariedadForm";

export const Variedad = () => {
  const { data, error, loading, update } = useFetch(
    "http://localhost:3001/admin/variedad"
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (loading) {
    return <Loading />;
  }

  return (
    <Container maxW="6xl" centerContent>
      {error ? (
        <Alert status="error" p={4} borderWidth="1px" borderRadius="lg" mt={5}>
          <AlertIcon />
          <AlertTitle mr={2}>{error.data.mensaje}</AlertTitle>
        </Alert>
      ) : (
        <>
          <Button colorScheme="teal" mt={6} isFullWidth={true} onClick={onOpen}>
            Agregar una nueva variedad
          </Button>
          <VariedadForm isOpen={isOpen} onClose={onClose} update={update} />
          {data ? <Variedades variedades={data} update={update}/> : null}
        </>
      )}
    </Container>
  );
};
