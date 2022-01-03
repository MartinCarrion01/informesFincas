import { Container, Heading, Stack } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { EntityButton } from "../../Components/Admin/EntityButton";
import { UserContext } from "../../UserContext";
import AccesoProhibido from "../Error/AccesoProhibido";

const Admin = () => {
  const { user } = useContext(UserContext);
  useEffect(() => {
    document.title = "Panel de administración - Informes Fincas";
  }, []);
  if (user.rol.nombreUserRole !== "admin") {
    document.title = "Error - Informes Fincas";
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
        <EntityButton name="Encargados de finca" link="encargadofinca" />
        <EntityButton name="Fincas" link="finca" />
        <EntityButton name="Usuarios" link="usuario" />
        <EntityButton name="Variedades" link="variedad" />
        <EntityButton name="Productores" link="productor" />
      </Stack>
    </Container>
  );
};

export default Admin;
