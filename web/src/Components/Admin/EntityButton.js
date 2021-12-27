import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const EntityButton = ({ name, link }) => {
  return (
    <Link to={link}>
      <Box
        bg="gray.50"
        w="100%"
        p={4}
        borderWidth="1px"
        borderRadius="lg"
        display="flex"
        align-items="center"
      >
        <Text fontSize="lg">{name}</Text>
      </Box>
    </Link>
  );
};
