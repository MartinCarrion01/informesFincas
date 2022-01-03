import { Alert, AlertIcon, Box, Container } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EditarEliminarInformeForm } from "../../Components/EditarEliminarInforme/EditarEliminarInformeForm";
import { Loading } from "../../Components/Loading";
import { UserContext } from "../../UserContext";
import AccesoProhibido from "../Error/AccesoProhibido";

export const EditarEliminarInforme = () => {
  const { user } = useContext(UserContext);
  const [informe, setInforme] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  useEffect(() => {
    document.title = "Editar o eliminar - Informes Fincas";
    const getInforme = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/v1/admin/simpleinforme/${params.id}`,
          { withCredentials: true }
        );
        setInforme(res.data);
        setLoading(false);
      } catch (error) {
        setError(error.response.data.mensaje);
        setLoading(false);
      }
    };
    getInforme();
  }, [params.id]);

  if (user.rol.nombreUserRole !== "admin") {
    document.title = "Error - Informes Fincas";
    return (
      <div>
        <AccesoProhibido />
      </div>
    );
  }

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  console.log("error", error, "informe", informe);

  return (
    <Container maxW="6xl" centerContent>
      <Box bg="gray.50" p={10} mt={8} borderRadius={10} maxW={"3xl"}>
        {error ? (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        ) : null}
        {informe ? <EditarEliminarInformeForm informe={informe} setInforme={setInforme} /> : null}
      </Box>
    </Container>
  );
};
