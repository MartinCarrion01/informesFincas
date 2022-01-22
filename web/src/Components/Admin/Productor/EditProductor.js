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

export const EditProductor = ({
  isOpen,
  onClose,
  update,
  productor,
  setProductor,
}) => {
  const [nombreInput, setNombreInput] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!productor) return;
    setNombreInput(productor.nombreProductor);
    return () => {
      setProductor(null);
    };
  }, [productor, setProductor]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (productor) {
        const body = {
          nombreProductor: nombreInput,
        };
        const res = await axios.put(
          "http://192.168.4.165:3001/api/v1/admin/productor/" + productor.uuid,
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
        <ModalHeader>Editar productor</ModalHeader>
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
                <FormLabel htmlFor="nombreProductor">
                  Nombre del productor
                </FormLabel>
                <Input
                  id="nombreProductor"
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
                nombreInput.trim() === productor.nombreProductor
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
