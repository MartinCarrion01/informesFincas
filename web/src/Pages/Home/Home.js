import { Button, Container, Divider } from "@chakra-ui/react";
import Informes from "../../Components/Informes/Informes";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InformeFilter } from "../../Components/Informes/InformeFilter";
import { DescargarInformes } from "../../Components/Informes/DescargarInformes";
import { ChevronDownIcon } from "@chakra-ui/icons";


const Home = () => {
  const [informes, setInformes] = useState(null);
  const [error, setError] = useState(null);
  const [productorFilter, setProductorFilter] = useState("");
  const [fincaFilter, setFincaFilter] = useState("");
  const [variedadFilter, setVariedadFilter] = useState("");
  const [fechaDesdeFilter, setFechaDesdeFilter] = useState("");
  const [fechaHastaFilter, setFechaHastaFilter] = useState("");
  const [showFilter, setShowFilter] = useState(false);


  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Inicio - Informes Fincas";
    const getInformes = async () => {
      try {
        const res = await axios.get("http://192.168.4.165:3001/api/v1/informe", {
          withCredentials: true,
        });
        setInformes(res.data);
      } catch (error) {
        if (error.response.status === 404) {
          setError(error.response.data.mensaje);
        }
      }
    };
    getInformes();
  }, []);
  return (
    <Container maxW="5xl" centerContent>
      <Button
        colorScheme="teal"
        mt={6}
        isFullWidth={true}
        onClick={() => navigate("nuevoinforme")}
      >
        Agregar un nuevo informe
      </Button>
      <Divider mt={5} />
      {informes ? (
        <Button
          colorScheme="teal"
          mt={6}
          variant="outline"
          rightIcon={<ChevronDownIcon />}
          isFullWidth={true}
          onClick={() => setShowFilter(!showFilter)}
        >
          Agregar filtros
        </Button>
      ) : null}
      {showFilter ? (
        <InformeFilter
          setProductor={setProductorFilter}
          setFinca={setFincaFilter}
          setVariedad={setVariedadFilter}
          setFd={{ fechaDesdeFilter, setFechaDesdeFilter }}
          setFh={{ fechaHastaFilter, setFechaHastaFilter }}
        />
      ) : null}
      {informes ? <DescargarInformes /> : null}
      <Informes
        informes={informes}
        error={error}
        productor={productorFilter}
        finca={fincaFilter}
        variedad={variedadFilter}
        fechaDesde={fechaDesdeFilter}
        fechaHasta={fechaHastaFilter}
      />
    </Container>
  );
};

export default Home;
