import { Container } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InformeDetallado from "../../Components/DetalleInforme/InformeDetallado";

const DetalleInforme = () => {
  const params = useParams();
  const [informe, setInforme] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getInformes = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/informe/${params.id}`, { withCredentials: true });
        setInforme(res.data);
      } catch (error) {
        if (error.response.status === 404) {
          setError(error.response.data.mensaje);
        }
      }
    };
    getInformes();
  }, [params.id]);  
  return (
    <Container maxW="6xl" centerContent>
      <InformeDetallado informe={informe} error={error} />
    </Container>
  );
};

export default DetalleInforme;
