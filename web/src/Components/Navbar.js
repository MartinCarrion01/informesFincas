import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Link as ReactLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import Cookies from "js-cookie";
import axios from "axios";

const LinkObject = function (name, route, id) {
  this.name = name;
  this.route = route;
  this.id = id;
};

const Links = [
  new LinkObject("Inicio", "/", 1),
  new LinkObject("Mis Informes", "/misinformes", 2),
  new LinkObject("Panel de administrador", "/admin", 3),
];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    as={ReactLink}
    to={children.route}
  >
    {children.name}
  </Link>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useContext(UserContext);

  const availableLinks = (user) => {
    if (user.rol.nombreUserRole === "recorredor") {
      return Links.filter((link) => link.route !== "/admin");
    } else if (user.rol.nombreUserRole === "admin") {
      return Links;
    }
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>📋</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {availableLinks(user.user).map((link) => (
                <NavLink key={link.id}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                {`${user.user.nombreUsuario} ${user.user.apellidoUsuario}`}
              </MenuButton>
              <MenuList>
                <MenuItem>Cambiar contraseña</MenuItem>
                <MenuDivider />
                <MenuItem
                  onClick={async () => {
                    const res = await axios.post(
                      "http://localhost:3001/logout",
                      {},
                      { withCredentials: true }
                    );
                    if (res.status === 200) {
                      Cookies.remove("user");
                      user.setUser(null);
                    }
                  }}
                >
                  Cerrar sesión
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {availableLinks(user.user).map((link) => (
                <NavLink key={link.id}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
