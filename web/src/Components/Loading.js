import { Spinner, Container } from "@chakra-ui/react";

export const Loading = () => {
  return (
    <Container maxW="6xl" centerContent>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        mt={6}
      />
    </Container>
  );
};
