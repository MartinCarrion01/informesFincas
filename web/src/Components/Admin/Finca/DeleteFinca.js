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
  
  export const DeleteFinca = ({
    isOpen,
    onClose,
    update,
    finca,
    setFinca,
  }) => {
    const [error, setError] = useState(false);
  
    useEffect(() => {
      if (!finca) return;
      return () => {
        setFinca(null);
      };
    }, [finca, setFinca]);
  
    const handleEliminar = async () => {
      try {
        const res = await axios.delete(
          `http://192.168.4.165:3001/api/v1/admin/finca/${finca.uuid}`,
          { withCredentials: true }
        );
        if (res.status === 204) {
          onClose();
          await update();
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
            <ModalHeader>Eliminar finca</ModalHeader>
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
                  Recuerde que si elimina esta finca, esta no podra ser usada para la creación de nuevos informes
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
  