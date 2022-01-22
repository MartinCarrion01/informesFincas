import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  StackDivider,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import axios from "axios";
import { CheckIcon, WarningIcon } from "@chakra-ui/icons";
import Cookies from "js-cookie";
import { UserContext } from "../../UserContext";

export const PasswordChange = ({ changePassword }) => {
  const [oldInput, setOldInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [checkInput, setCheckInput] = useState("");
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showOld, setShowOld] = useState(false);

  const { user } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { password: passwordInput, oldpassword: oldInput };
    try {
      const res = await axios.post(
        `http://192.168.4.165:3001/api/v1/changepassword`,
        body,
        { withCredentials: true }
      );
      if (res.status === 200) {
        Cookies.set("user", JSON.stringify(res.data), { expires: 1 });
        setMensaje("La contraseña ha sido modificada exitosamente");
        setOldInput("");
        setPasswordInput("");
        setCheckInput("");
        changePassword(res.data.password);
        setTimeout(() => setMensaje(null), 5000);
      }
    } catch (error) {
      setError(error.response.data.mensaje);
      setOldInput("");
      setPasswordInput("");
      setCheckInput("");
      setTimeout(() => setError(null), 5000);
    }
  };

  return (
    <Box bg="gray.50" p={10} mt={8} borderRadius={10} maxW={"3xl"}>
      <Box bg="white" p={10} borderRadius={10} boxShadow={2}>
        <form onSubmit={handleSubmit}>
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            align="stretch"
            maxW="3xl"
          >
            <Box px={[4, 0]}>
              <Heading fontSize="xl" fontWeight="md" lineHeight="6">
                Cambiar contraseña
              </Heading>
              <Text
                mt={1}
                fontSize="sm"
                color={useColorModeValue("gray.600", "gray.400")}
              >
                Recuerde que la contraseña nueva debe tener una longitud mayor o
                igual a 6 caracteres
              </Text>
            </Box>
            {mensaje ? (
              <Alert status="success">
                <AlertIcon />
                {mensaje}
              </Alert>
            ) : null}
            {error ? (
              <Alert status="error">
                <AlertIcon />
                {error}
              </Alert>
            ) : null}
            {user.password === "" ? null : (
              <Box>
                <FormControl>
                  <FormLabel htmlFor="oldPassword">
                    Contraseña anterior
                  </FormLabel>
                  <InputGroup>
                    <Input
                      type={showOld ? "text" : "password"}
                      name="oldPassword"
                      placeholder="Contraseña anterior"
                      value={oldInput}
                      onChange={(e) => setOldInput(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={() => setShowOld(!showOld)}
                      >
                        {showOld ? "Ocultar" : "Ver"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Box>
            )}
            <Box>
              <FormControl>
                <FormLabel htmlFor="newPassword">Nueva contraseña</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    placeholder="Nueva contraseña"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Ocultar" : "Ver"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel htmlFor="newPassword">
                  Verificar nueva contraseña
                </FormLabel>
                <InputGroup>
                  <Input
                    type="password"
                    name="verifyPassword"
                    placeholder="Verificar contraseña"
                    value={checkInput}
                    onChange={(e) => setCheckInput(e.target.value)}
                  />
                  <InputRightElement
                    children={
                      checkInput === "" ||
                      passwordInput.length < 6 ? null : checkInput !==
                        passwordInput ? (
                        <WarningIcon color="red.500" />
                      ) : (
                        <CheckIcon color="green.500" />
                      )
                    }
                  />
                </InputGroup>
              </FormControl>
            </Box>
            <Box>
              <Button
                isDisabled={
                  user.password !== ""
                    ? oldInput < 6 ||
                      passwordInput < 6 ||
                      passwordInput !== checkInput
                    : passwordInput < 6 || passwordInput !== checkInput
                }
                colorScheme="teal"
                isFullWidth={true}
                type="submit"
              >
                Cambiar contraseña
              </Button>
            </Box>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};
