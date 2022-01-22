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

export const EditEncargadoFinca = ({
  isOpen,
  onClose,
  update,
  encargadoFinca,
  setEncargadoFinca,
}) => {
  const [nombreInput, setNombreInput] = useState("");
  const [numeroInput, setNumeroInput] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!encargadoFinca) return;
    setNombreInput(encargadoFinca.nombreEncargadoFinca);
    setNumeroInput(encargadoFinca.numeroEncargadoFinca);
    return () => {
      setEncargadoFinca(null);
    };
  }, [encargadoFinca, setEncargadoFinca]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (encargadoFinca) {
        const body = {
          nombreEncargadoFinca: nombreInput,
          numeroEncargadoFinca: numeroInput,
        };
        const res = await axios.put(
          "http://192.168.4.165:3001/api/v1/admin/encargadofinca/" + encargadoFinca.uuid,
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
        <ModalHeader>Editar encargado de finca</ModalHeader>
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
                <FormLabel htmlFor="nombreEncargadoFinca">
                  Nombre del encargado de finca
                </FormLabel>
                <Input
                  id="nombreEncargadoFinca"
                  value={nombreInput}
                  onChange={(e) => setNombreInput(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="numeroEncargadoFinca">
                  Número de teléfono del encargado de finca
                </FormLabel>
                <Input
                  id="numeroEncargadoFinca"
                  value={numeroInput}
                  onChange={(e) => setNumeroInput(e.target.value)}
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
                numeroInput.trim() === "" ||
                (nombreInput.trim() === encargadoFinca.nombreEncargadoFinca &&
                  numeroInput.trim() === encargadoFinca.numeroEncargadoFinca)
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
