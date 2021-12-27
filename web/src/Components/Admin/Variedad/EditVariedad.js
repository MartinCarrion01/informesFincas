import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";

export const EditVariedad = ({
  isOpen,
  onClose,
  update,
  variedad,
  setVariedad,
}) => {
  const [nombreInput, setNombreInput] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!variedad) return;
    setNombreInput(variedad.nombreVariedad);
    return () => {
      setVariedad(null);
    };
  }, [variedad, setVariedad]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (variedad) {
        const body = {
          nombreVariedad: nombreInput,
        };
        const res = await axios.put(
          "http://localhost:3001/admin/variedad/" + variedad.uuid,
          body,
          { withCredentials: true }
        );
        if (res.status === 200) {
          await update();
          onClose();
        }
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar variedad</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={4}
              align="stretch"
            >
              {error ? (
                <Alert
                  status="error"
                  p={4}
                  borderWidth="1px"
                  borderRadius="lg"
                  my={5}
                >
                  <AlertIcon />
                  <AlertTitle mr={2}>
                    {"Ocurrio un error inesperado"}
                  </AlertTitle>
                </Alert>
              ) : null}
              <FormControl>
                <FormLabel htmlFor="nombreVariedad">
                  Nombre de la variedad
                </FormLabel>
                <Input
                  id="nombreVariedad"
                  value={nombreInput}
                  onChange={(e) => setNombreInput(e.target.value)}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              colorScheme="green"
              type="submit"
              disabled={
                nombreInput.trim() === "" ||
                nombreInput.trim() === variedad.nombreVariedad
              }
            >
              Guardar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
