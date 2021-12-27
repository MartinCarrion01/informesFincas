import { Box, Button } from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik } from "formik";
import InputField from "../../Components/InputField";
import Wrapper from "../../Components/Wrapper";
import Cookies from "js-cookie";

const Login = ({ login }) => {
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ dni: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const body = {
            dniUsuario: values.dni,
            password: values.password,
          };
          try {
            const res = await axios.post("http://localhost:3001/login", body, {
              withCredentials: true,
            });
            if (res.status === 200) {
              Cookies.set("user", JSON.stringify(res.data), {expires: 1});
              login(res.data);
            }
          } catch (err) {
            const errorMsg = err.response.data.mensaje;
            if (err.response.status === 404) {
              setErrors({ dni: errorMsg });
            }
            if (err.response.status === 400) {
              switch (errorMsg) {
                case "El dni no puede contener letras, solo números":
                  setErrors({ dni: errorMsg });
                  break;
                case "La contraseña ingresada no es correcta":
                  setErrors({ password: errorMsg });
                  break;
                case "El usuario ingresado no es vigente, cómunicarse con el administrador":
                  setErrors({ dni: errorMsg });
                  break;
                default:
                  break;
              }
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="dni" placeholder="DNI" label="DNI" />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="Contraseña"
                label="Contraseña"
                type="password"
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              variantColor="teal"
            >
              Ingresar
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
