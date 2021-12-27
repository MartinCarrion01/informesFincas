import { Box, Flex, Stack, Text } from "@chakra-ui/react";

const Comentario = ({ comentario }) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Stack spacing={8}>
        <Text fontSize="md">{comentario.descripcion}</Text>
      </Stack>
      <Flex>
        <Box p="4">Publicado el:</Box>
        <Box p="4">{comentario.fechaIngreso}</Box>
      </Flex>
    </Box>
  );
};

export default Comentario;
