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
import { useState } from "react";
import axios from "axios";

export const VariedadForm = ({ isOpen, onClose, update }) => {
  const [nombreInput, setNombreInput] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        nombreVariedad: nombreInput,
        codVariedad: new Date().getMilliseconds(),
      };
      const res = await axios.post(
        "http://localhost:3001/admin/variedad",
        body,
        { withCredentials: true }
      );
      if (res.status === 201) {
        await update();
        onClose();
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Agregar nueva variedad</ModalHeader>
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
              disabled={nombreInput.trim() === ""}
            >
              Guardar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
