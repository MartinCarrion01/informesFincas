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
  Radio,
  RadioGroup,
  Stack,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";

export const EditUsuario = ({
  isOpen,
  onClose,
  update,
  usuario,
  setUsuario,
}) => {
  const [nombreInput, setNombreInput] = useState("");
  const [apellidoInput, setApellidoInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [dniInput, setDniInput] = useState("");
  const [legajoInput, setLegajoInput] = useState("");
  const [seraAdmin, setSeraAdmin] = useState("no");
  const [rol, setRol] = useState(null);
  const [errorRol, setErrorRol] = useState(null);
  const [loadingRol, setLoadingRol] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    if (!usuario) return;
    setNombreInput(usuario.nombreUsuario);
    setApellidoInput(usuario.apellidoUsuario);
    setDniInput(usuario.dniUsuario.toString());
    setUsernameInput(usuario.userName);
    setLegajoInput(usuario.legajoUsuario);
    const getRoles = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/api/v1/admin/userrole",
          { withCredentials: true }
        );
        const recorredor = res.data.find(
          (rol) => rol.nombreUserRole === "admin"
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
      setUsuario(null);
      setRol(null);
      setErrorRol(null);
    };
  }, [usuario, setUsuario]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (usuario) {
        const body = {
          username: usernameInput,
          nombreUsuario: nombreInput,
          apellidoUsuario: apellidoInput,
          dniUsuario: dniInput,
          legajoUsuario: legajoInput,
          userRoleUuid: seraAdmin === "si" ? rol.uuid : "",
        };
        const res = await axios.put(
          "http://localhost:3001/api/v1/admin/user/" + usuario.uuid,
          body,
          { withCredentials: true }
        );
        if (res.status === 200) {
          await update();
          onClose();
        }
      }
    } catch (error) {
      setError(JSON.stringify(error.response.data));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar usuario</ModalHeader>
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
                      <AlertTitle mr={2}>
                        {"Ocurrio un error inesperado"}
                      </AlertTitle>
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
                  <FormControl>
                    <FormLabel htmlFor="seCosecho">
                      Convertir recorredor en administrador
                    </FormLabel>
                    <RadioGroup onChange={setSeraAdmin} value={seraAdmin}>
                      <Stack direction="row">
                        <Radio value="si">Sí</Radio>
                        <Radio value="no">No</Radio>
                      </Stack>
                    </RadioGroup>
                    {seraAdmin === "si"
                      ? "Recuerde que si usted convierte a este usuario en administrador, y se arrepiente, debera contactarse con el super administrador para revertir esta decisión"
                      : null}
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
                legajoInput.trim() === "" ||
                (nombreInput.trim() === usuario.nombreUsuario &&
                  apellidoInput.trim() === usuario.apellidoUsuario &&
                  usernameInput.trim() === usuario.userName &&
                  dniInput.trim() === usuario.dniUsuario.toString() &&
                  legajoInput.trim() === usuario.legajoUsuario && seraAdmin === "no")
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
