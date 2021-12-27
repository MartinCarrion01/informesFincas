import { Box } from "@chakra-ui/react";
import { Card } from "./Card";
import { CardContent } from "./CardContent";
import { CardFooter } from "./CardFooter";
import { CardHeader } from "./CardHeader";
import { Property } from "./Property";

export const Informe = ({ informe }) => (
  <Box
    as="section"
    bg="gray.100"
    py="8"
    px={{
      md: "8",
    }}
    borderRadius={4}
    mt={4}
  >
    <Card maxW="3xl" mx="auto">
      <CardHeader title={informe.informeTitulo} />
      <CardContent>
        <Property label="Fecha de ingreso" value={informe.fechaIngreso} />
        <Property
          label="Estado"
          value={informe.fechaRealCosecha ? "Cosechado" : "Sin cosechar aún"}
        />
        <Property label="Finca" value={informe.finca.nombreFinca} />
        <Property
          label="Productor"
          value={informe.finca.productor.nombreProductor}
        />
        <Property label="Variedad" value={informe.variedad.nombreVariedad} />
        <Property
          label={`Fecha ${
            informe.fechaRealCosecha ? "de cosecha" : "estimada de cosecha"
          }`}
          value={
            informe.fechaRealCosecha
              ? informe.fechaRealCosecha
              : informe.informeCosechasEstimadas[0].fechaEstimadaCosecha
          }
        />
        <Property
          label={`Cantidad ${
            informe.fechaRealCosecha ? "cosechada" : "estimada a cosechar"
          }`}
          value={`${
            informe.fechaRealCosecha
              ? informe.cantKgRealCosecha
              : informe.informeCosechasEstimadas[0].cantKgEstimadoCosecha
          } kg.`}
        />
        <Property
          label="Creado por"
          value={`${informe.usuarioRecorredor.nombreUsuario} ${informe.usuarioRecorredor.apellidoUsuario}`}
        />
      </CardContent>
      <CardFooter informe={informe} />
    </Card>
  </Box>
);
