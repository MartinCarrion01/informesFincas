import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { Informe } from "./Informe";
import { useEffect, useState } from "react";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { Pagination } from "@mui/material";
import dayjs from "dayjs";
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const Informes = ({
  informes,
  error,
  finca,
  variedad,
  fechaDesde,
  fechaHasta,
  productor,
}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const informesPorPagina = 5;
  const pagesVisited = pageNumber * informesPorPagina - informesPorPagina;

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: "0px" });
  }, [pageNumber]);

  const handleChange = (event, value) => {
    setPageNumber(value);
  };

  if (!informes && !error) {
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

  const dateChecker = (informes) => {
    let filtered = [];
    if (
      !(
        (fechaDesde instanceof Date && !isNaN(fechaDesde.valueOf())) ||
        (fechaHasta instanceof Date && !isNaN(fechaHasta.valueOf()))
      )
    ) {
      return informes;
    }
    if (fechaDesde && fechaHasta) {
      filtered = informes.filter(
        (informe) =>
          !informe.fechaRealCosecha &&
          dayjs(
            new Date(informe.informeCosechasEstimadas[0].fechaEstimadaCosecha)
          ).isBetween(fechaDesde, fechaHasta, null, "[]")
      );
      console.log(filtered);
      return filtered;
    }
    if (fechaDesde && !fechaHasta) {
      filtered = informes.filter(
        (informe) =>
          !informe.fechaRealCosecha &&
          dayjs(
            new Date(informe.informeCosechasEstimadas[0].fechaEstimadaCosecha)
          ).isSameOrAfter(fechaDesde)
      );
      console.log(filtered);
      return filtered;
    }
    if (fechaHasta && !fechaDesde) {
      filtered = informes.filter(
        (informe) =>
          !informe.fechaRealCosecha &&
          dayjs(
            new Date(informe.informeCosechasEstimadas[0].fechaEstimadaCosecha)
          ).isSameOrBefore(fechaHasta)
      );
      console.log(filtered);
      return filtered;
    }
    return informes;
  };

  const filteredInformes = () => {
    let informesFiltrados = informes;
    console.log(productor)
    informesFiltrados =
      productor === ""
        ? informesFiltrados
        : informesFiltrados.filter((informe) =>
            informe.finca.productor.nombreProductor.includes(productor)
          );
    informesFiltrados =
      finca === ""
        ? informesFiltrados
        : informesFiltrados.filter((informe) =>
            informe.finca.nombreFinca.includes(finca)
          );
    informesFiltrados =
      variedad === ""
        ? informesFiltrados
        : informesFiltrados.filter((informe) =>
            informe.variedad.nombreVariedad.includes(variedad)
          );
    informesFiltrados = dateChecker(informesFiltrados);
    console.log(informesFiltrados);
    return informesFiltrados;
  };

  const showInformes = (informesToShow) => {
    console.log(informesToShow);
    if (informesToShow.length === 0) {
      return (
        <Alert status="error">
          <AlertIcon />
          Ningun informe cumple con el filtro especificado
        </Alert>
      );
    } else {
      const displayInformes = informesToShow
        ? informesToShow.slice(pagesVisited, pagesVisited + informesPorPagina)
        : null;
      return displayInformes.map((informe) => {
        return <Informe informe={informe} key={informe.uuid} />;
      });
    }
  };

  return error ? (
    <Alert status="error" p={4} borderWidth="1px" borderRadius="lg" mt={5}>
      <AlertIcon />
      <AlertTitle mr={2}>{error}</AlertTitle>
    </Alert>
  ) : (
    <Box p={4} borderWidth="1px" borderRadius="lg" my={5}>
      {showInformes(filteredInformes())}
      <Center p={4} alignItems="center">
        <Pagination
          count={Math.ceil(filteredInformes().length / informesPorPagina)}
          page={pageNumber}
          onChange={handleChange}
          variant="outlined"
          color="primary"
          size="large"
        />
      </Center>
    </Box>
  );
};

export default Informes;
