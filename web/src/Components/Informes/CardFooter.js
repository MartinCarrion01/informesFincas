import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import { useContext } from "react";
import { UserContext } from "../../UserContext";
import { useNavigate } from "react-router-dom";

const NavLink = ({ informe, title }) => {
  const navigate = useNavigate();
  return <Button colorScheme="green" onClick={() => navigate(`/informe/${informe.uuid}`)}>{title}</Button>;
};

export const CardFooter = ({ informe }) => {
  const { user } = useContext(UserContext);
  return (
    <Flex>
      <Box p="4">
        <Button
          colorScheme="blue"
          hidden={user.rol.nombreUserRole === "admin" ? false : true}
        >
          Editar o eliminar
        </Button>{" "}
      </Box>
      <Spacer />
      <Box p="4">
        <NavLink informe={informe} title={"Ver detalle"} />
      </Box>
    </Flex>
  );
};
