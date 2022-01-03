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
  
  export const ProductorForm = ({ isOpen, onClose, update }) => {
    const [nombreInput, setNombreInput] = useState("");
    const [error, setError] = useState(false);

    const navigate = useNavigate()
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const body = {
          nombreProductor: nombreInput,
        };
        const res = await axios.post(
          "http://localhost:3001/api/v1/admin/productor",
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
          <ModalHeader>Agregar nuevo productor</ModalHeader>
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
  