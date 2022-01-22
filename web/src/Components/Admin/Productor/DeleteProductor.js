import {
    Alert,
    AlertIcon,
    AlertTitle,
    Button,
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
  
  export const DeleteProductor = ({
    isOpen,
    onClose,
    update,
    productor,
    setProductor,
  }) => {
    const [error, setError] = useState(false);
  
    useEffect(() => {
      if (!productor) return;
      return () => {
        setProductor(null);
      };
    }, [productor, setProductor]);
  
    const handleEliminar = async () => {
      try {
        const res = await axios.delete(
          `http://192.168.4.165:3001/api/v1/admin/productor/${productor.uuid}`,
          { withCredentials: true }
        );
        if (res.status === 204) {
          await update();
          onClose();
        }
      } catch (err) {
        setError(true);
      }
    };
  
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Eliminar productor</ModalHeader>
            <ModalCloseButton />
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
                    <AlertTitle mr={2}>
                      {"Ocurrio un error inesperado"}
                    </AlertTitle>
                  </Alert>
                ) : null}
                <Alert status="warning">
                  <AlertIcon />
                  Recuerde que si elimina este productor, este no podra ser
                  editado ni utilizado para la carga de futuras fincas
                </Alert>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" mr={3} onClick={handleEliminar}>
                Eliminar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  