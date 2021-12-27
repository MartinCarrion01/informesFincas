import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { EntityButton } from "../../Components/Admin/EntityButton";
import { UserContext } from "../../UserContext";
import AccesoProhibido from "../Error/AccesoProhibido";

const Admin = () => {
  const { user } = useContext(UserContext);
  if (user.rol.nombreUserRole !== "admin") {
    return (
      <div>
        <AccesoProhibido />
      </div>
    );
  }
  return (
    <Container maxW="6xl" centerContent>
      <Stack spacing={4} mt={5}>
        <Heading as="h2" size="2xl">
          Panel de administración
        </Heading>
        <Heading as="h5" size="sm">
          Aquí puede dar de alta, baja o editar los datos de la aplicación
        </Heading>
        <EntityButton name="Usuarios" link="usuario" />
        <EntityButton name="Variedades" link="variedad" />
      </Stack>
    </Container>
  );
};

export default Admin;
