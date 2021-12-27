import {
  Box,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  Flex,
  Divider,
  chakra,
  Grid,
  GridItem,
  Container,
  SimpleGrid,
  Spinner,
  StackDivider,
  Spacer,
  Button,
  Heading,
} from "@chakra-ui/react";
import Comentario from "./Comentario";
import {} from "@chakra-ui/react";
import { useContext } from "react";
import { UserContext } from "../../UserContext";
import { useNavigate } from "react-router-dom";

const Feature = ({ heading, text }) => {
  return (
    <GridItem>
      <chakra.h3 fontSize="xl" fontWeight="600">
        {heading}
      </chakra.h3>
      <chakra.p>{text}</chakra.p>
    </GridItem>
  );
};

export default function InformeDetallado({ informe, error }) {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  if (!informe && !error) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        mt={6}
      />
    );
  }

  if (error) {
    return (
      <Alert status="error" p={4} borderWidth="1px" borderRadius="lg" mt={6}>
        <AlertIcon />
        <AlertTitle mr={2}>{error}</AlertTitle>
      </Alert>
    );
  }
  return (
    <Box as={Container} maxW="7xl" mt={14} p={4}>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(2, 1fr)",
        }}
        gap={4}
      >
        <GridItem colSpan={1}>
          <VStack alignItems="flex-start" spacing="20px">
            <chakra.h2 fontSize="3xl" fontWeight="700">
              {informe.informeTitulo}
            </chakra.h2>
          </VStack>
        </GridItem>
        <GridItem>
          <Flex flexDirection="column" align="flex-end">
            <SimpleGrid columns={2} spacingX="40px" spacingY="20px">
              <Box height="80px">Cargado por:</Box>
              <Box height="80px">
                {informe.usuarioRecorredor.nombreUsuario}{" "}
                {informe.usuarioRecorredor.apellidoUsuario}
              </Box>
              <Box height="80px">Fecha de carga: </Box>
              <Box height="80px">{informe.fechaIngreso}</Box>
            </SimpleGrid>
          </Flex>
        </GridItem>
      </Grid>
      <Divider mt={8} mb={8} />
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        }}
        gap={{ base: "8", sm: "12", md: "16" }}
      >
        <Feature heading={"Finca"} text={informe.finca.nombreFinca} />
        <Feature heading={"Variedad"} text={informe.variedad.nombreVariedad} />
        <Feature
          heading={"Cantidad estimada a cosechar (en kg.)"}
          text={informe.informeCosechasEstimadas[0].cantKgEstimadoCosecha}
        />
        <Feature
          heading={"Fecha estimada de cosecha"}
          text={informe.informeCosechasEstimadas[0].fechaEstimadaCosecha}
        />
        <Feature
          heading={"Fecha real de cosecha"}
          text={
            informe.fechaRealCosecha
              ? informe.fechaRealCosecha
              : "Sin cosechar aún"
          }
        />
        <Feature
          heading={"Cantidad real de cosecha (en kg.)"}
          text={
            informe.cantKgRealCosecha
              ? informe.cantKgRealCosecha
              : "Sin cosechar aún"
          }
        />
        <Feature
          heading={"Nombre del encargado de la finca"}
          text={informe.finca.encargadoFinca.nombreEncargadoFinca}
        />
        <Feature
          heading={"Numero del encargado de la finca"}
          text={informe.finca.encargadoFinca.numeroEncargadoFinca}
        />
      </Grid>
      <Divider mt={8} mb={8} />
      <Flex py={[0, 10, 20]} direction={{ base: "column", md: "row" }}>
        <Box p="2">
          <Heading size="md">Comentarios realizados</Heading>
        </Box>
        <Spacer />
        <Box>
          <Button
            colorScheme="teal"
            size="md"
            textAlign="center"
            hidden={user.user.uuid !== informe.usuarioRecorredor.uuid}
            disabled={informe.fechaRealCosecha
            }
            onClick={() => navigate(`/nuevocomentario/${informe.uuid}`)}
          >
            Agregar un comentario sobre nueva recorrida
          </Button>
        </Box>
      </Flex>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
        mt="8"
      >
        {informe.informeComentarios.map((comentario) => (
          <Comentario comentario={comentario} key={comentario.uuid} />
        ))}
      </VStack>
    </Box>
  );
}
