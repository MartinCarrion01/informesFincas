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
import { useNavigate } from "react-router-dom";

export const EncargadoFincaForm = ({ isOpen, onClose, update }) => {
  const [nombreInput, setNombreInput] = useState("");
  const [numeroInput, setNumeroInput] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        nombreEncargadoFinca: nombreInput,
        numeroEncargadoFinca: numeroInput,
      };
      const res = await axios.post(
        "http://192.168.4.165:3001/api/v1/admin/encargadofinca",
        body,
        { withCredentials: true }
      );
      if (res.status === 201) {
        onClose();
        navigate(0);
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Agregar nuevo encargado de finca</ModalHeader>
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
              disabled={nombreInput.trim() === "" || numeroInput.trim() === ""}
            >
              Guardar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
