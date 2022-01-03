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
  
  export const DeleteUsuario = ({
    isOpen,
    onClose,
    update,
    usuario,
    setUsuario,
  }) => {
    const [error, setError] = useState(false);
  
    useEffect(() => {
      if (!usuario) return;
      return () => {
        setUsuario(null);
      };
    }, [usuario, setUsuario]);
  
    const handleEliminar = async () => {
      try {
        const res = await axios.delete(
          `http://localhost:3001/api/v1/admin/user/${usuario.uuid}`,
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
            <ModalHeader>Eliminar usuario</ModalHeader>
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
                  Recuerde que si elimina este usuario, este no podra ser usado para la creación de informes
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
  