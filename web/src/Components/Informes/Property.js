import { Box,SimpleGrid } from "@chakra-ui/react";

export const Property = (props) => {
  const { label, value } = props;
  return (
    <SimpleGrid columns={2} spacing={10} px="6" py="4" bg="gray.100">
      <Box as="dt" minWidth="180px">
        {label}
      </Box>
      <Box as="dd" flex="1" fontWeight="semibold">
        {value}
      </Box>
    </SimpleGrid>
  );
};
