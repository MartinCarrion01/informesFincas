import { Box, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";

const Error = () => {
  useEffect(() => {
    document.title = "Error - Informes Fincas";
  }, []);
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Página no encontrada
      </Text>
      <Text color={"gray.500"} mb={6}>
        La página que usted ingreso no existe
      </Text>
    </Box>
  );
};

export default Error;
