import {
  Alert,
  AlertIcon,
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Login = ({ login }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Iniciar sesión - Informes Fincas";
  }, []);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Bienvenido</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={async (values) => {
              const body = {
                username: values.username,
                password: values.password,
              };
              console.log(body);
              try {
                const res = await axios.post(
                  "http://localhost:3001/api/v1/login",
                  body,
                  {
                    withCredentials: true,
                  }
                );
                if (res.status === 200) {
                  Cookies.set("user", JSON.stringify(res.data), { expires: 1 });
                  login(res.data);
                }
              } catch (err) {
                const errorMsg = err.response.data.mensaje;
                setError(errorMsg);
              }
            }}
          >
            {({ isSubmitting, values, handleChange }) => (
              <Form>
                <Stack
                  spacing={4}
                  p="1rem"
                  backgroundColor="whiteAlpha.900"
                  boxShadow="md"
                >
                  {error ? (
                    <Alert status="error">
                      <AlertIcon />
                      {error}
                    </Alert>
                  ) : null}
                  <FormControl>
                    <FormLabel htmlFor="username">Nombre de usuario</FormLabel>
                    <Input
                      type="text"
                      name="username"
                      placeholder="Nombre de usuario"
                      value={values.username}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="password">Contraseña</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Contraseña"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
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
                    <FormHelperText textAlign="right">
                      Si olvidó su contraseña, comuníquese con un administrador
                      para reiniciarla
                    </FormHelperText>
                  </FormControl>
                  <Button
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    colorScheme="teal"
                    width="full"
                    isLoading={isSubmitting}
                  >
                    Ingresar
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
