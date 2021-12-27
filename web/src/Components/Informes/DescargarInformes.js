import { DownloadIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";

export const DescargarInformes = () => {
  const [informesToDownload, setInformesToDownload] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const getInformes = async () => {
      try {
        const res = await axios.get("http://localhost:3001/csvinformes", {
          withCredentials: true,
        });
        const header = [
          "informeTitulo",
          "fechaIngreso",
          "usuario",
          "finca",
          "productor",
          "variedad",
          "fechaEstimadaCosecha",
          "cantKgEstimadaCosecha",
          "fechaRealCosecha",
          "cantKgRealCosecha",
        ];
        const csv = [header, ...res.data];
        console.log(csv);
        setInformesToDownload(csv);
        setLoading(false);
      } catch (error) {
        setError(error.response.data.mensaje);
        setLoading(false);
      }
    };
    getInformes();
  }, []);
  if (loading) {
    return null;
  }
  return (
    <Button
      colorScheme="teal"
      mt={6}
      variant="outline"
      rightIcon={<DownloadIcon />}
      isFullWidth={true}
      disabled={error}
    >
      <CSVLink
        data={informesToDownload}
        filename={`informes_${new Date().getTime()}.csv`}
      >
        Descargar informes (.csv)
      </CSVLink>
    </Button>
  );
};

