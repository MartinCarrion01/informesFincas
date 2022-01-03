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
import { useNavigate } from "react-router-dom";

export const UsuarioForm = ({ isOpen, onClose, update }) => {
  const [nombreInput, setNombreInput] = useState("");
  const [apellidoInput, setApellidoInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [dniInput, setDniInput] = useState("");
  const [legajoInput, setLegajoInput] = useState("");
  const [rol, setRol] = useState(null);
  const [errorRol, setErrorRol] = useState(null);
  const [loadingRol, setLoadingRol] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getRoles = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/api/v1/admin/userrole",
          { withCredentials: true }
        );
        const recorredor = res.data.find(
          (rol) => rol.nombreUserRole === "recorredor"
        );
        if (!recorredor) {
          setErrorRol(
            "No existe el rol recorredor por el momento, cómuniquese con un administrador"
          );
          setLoadingRol(false);
        } else {
          setRol(recorredor);
          setLoadingRol(false);
        }
      } catch (error) {
        setErrorRol(error.response.data.mensaje);
        setLoadingRol(false);
      }
    };
    getRoles();
    return () => {
      setRol(null);
      setErrorRol(null);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        username: usernameInput,
        nombreUsuario: nombreInput,
        apellidoUsuario: apellidoInput,
        dniUsuario: dniInput,
        legajoUsuario: legajoInput,
        password: "",
        userRoleUuid: rol.uuid,
      };
      const res = await axios.post(
        "http://localhost:3001/api/v1/admin/user/register",
        body,
        { withCredentials: true }
      );
      if (res.status === 201) {
        onClose();
        navigate(0);
      }
    } catch (error) {
      if (error.response.data.errno === 1062) {
        setError("El nombre de usuario especificado ya está ocupado");
      } else {
        setError(error.response.data.mensaje);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"outside"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Agregar nuevo recorredor</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={4}
              align="stretch"
            >
              {loadingRol ? null : errorRol ? (
                <>
                  <Alert
                    status="error"
                    p={4}
                    borderWidth="1px"
                    borderRadius="lg"
                    my={5}
                  >
                    <AlertIcon />
                    <AlertTitle mr={2}>{errorRol}</AlertTitle>
                  </Alert>
                </>
              ) : (
                <>
                  {error ? (
                    <Alert
                      status="error"
                      p={4}
                      borderWidth="1px"
                      borderRadius="lg"
                      my={5}
                    >
                      <AlertIcon />
                      <AlertTitle mr={2}>{error}</AlertTitle>
                    </Alert>
                  ) : null}
                  <FormControl>
                    <FormLabel htmlFor="nombreUsuario">
                      Nombre del usuario
                    </FormLabel>
                    <Input
                      id="nombreUsuario"
                      value={nombreInput}
                      onChange={(e) => setNombreInput(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="apellidoUsuario">
                      Apellido del usuario
                    </FormLabel>
                    <Input
                      id="apellidoUsuario"
                      value={apellidoInput}
                      onChange={(e) => setApellidoInput(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="userName">
                      Username del usuario
                    </FormLabel>
                    <Input
                      id="userName"
                      value={usernameInput}
                      onChange={(e) => setUsernameInput(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="dniUsuario">DNI del usuario</FormLabel>
                    <Input
                      id="dniUsuario"
                      value={dniInput}
                      onChange={(e) => setDniInput(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="legajoUsuario">
                      Legajo del usuario
                    </FormLabel>
                    <Input
                      id="legajoUsuario"
                      value={legajoInput}
                      onChange={(e) => setLegajoInput(e.target.value)}
                    />
                  </FormControl>
                </>
              )}
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
                apellidoInput.trim() === "" ||
                usernameInput.trim() === "" ||
                dniInput.trim() === "" ||
                legajoInput.trim() === ""
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
