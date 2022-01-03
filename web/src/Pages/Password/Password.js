import { Container } from "@chakra-ui/react";
import { useEffect } from "react";
import { PasswordChange } from "../../Components/Password/PasswordChange";

export const Password = ({ changePassword }) => {
  useEffect(() => {
    document.title = "Cambiar contraseña - Informes Fincas";
  }, []);

  return (
    <Container maxW="5xl" centerContent>
      <PasswordChange changePassword={changePassword} />
    </Container>
  );
};
