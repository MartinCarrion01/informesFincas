import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useFetchSet } from "../../../Hooks/useFetchSet";
import { Loading } from "../../Loading";
import { Formik } from "formik";
import { Checkbox, FormControlLabel } from "@mui/material";
import { arrayCompare } from "./ComparadorVariedad";

export const EditFinca = ({ isOpen, onClose, update, finca, setFinca }) => {
  const [error, setError] = useState(false);

  const {
    data,
    error: fetchError,
    loading,
    setData,
    setError: setFetchError,
  } = useFetchSet("http://localhost:3001/api/v1/admin/newfincadata");

  useEffect(() => {
    if (!finca) return;
    return () => {
      setData(null);
      setFetchError(null);
      setFinca(null);
    };
  }, [setData, setFetchError, setFinca, finca]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"outside"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Agregar una nueva finca</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {loading ? (
            <Loading />
          ) : fetchError ? (
            <Alert
              status="error"
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              my={5}
            >
              <AlertIcon />
              <AlertTitle mr={2}>{fetchError.mensaje}</AlertTitle>
            </Alert>
          ) : data ? (
            <Formik
              initialValues={{
                nombreFinca: finca.nombreFinca,
                coordenadasFinca: finca.coordenadasFinca,
                productor: finca.productor.uuid,
                encargadoFinca: finca.encargadoFinca.uuid,
                variedad: finca.variedades.map((variedad) => variedad.uuid),
              }}
              onSubmit={async (values) => {
                try {
                  const body = {
                    nombreFinca: values.nombreFinca,
                    coordenadasFinca: values.coordenadasFinca,
                    encargadoFincaUuid: values.encargadoFinca,
                    productorUuid: values.productor,
                    variedades: values.variedad,
                  };
                  const res = await axios.put(
                    "http://localhost:3001/api/v1/admin/finca/" + finca.uuid,
                    body,
                    {
                      withCredentials: true,
                    }
                  );
                  if (res.status === 200) {
                    onClose();
                    await update();
                  }
                } catch (error) {
                  setError(true);
                }
              }}
            >
              {({ values, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <VStack
                    divider={<StackDivider borderColor="gray.200" />}
                    spacing={4}
                    align="stretch"
                  >
                    {error ? (
                      <Alert
                        status="error"
                        p={4}
                        borderWidth="1px"
                        borderRadius="lg"
                        my={5}
                      >
                        <AlertIcon />
                        <AlertTitle mr={2}>
                          {"Ocurrio un error inesperado"}
                        </AlertTitle>
                      </Alert>
                    ) : null}
                    <FormControl>
                      <FormLabel htmlFor="nombreFinca">
                        Nombre de la finca
                      </FormLabel>
                      <Input
                        id="nombreFinca"
                        value={values.nombreFinca}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="coordenadasFinca">
                        Coordenadas de la finca
                      </FormLabel>
                      <Input
                        id="coordenadasFinca"
                        value={values.coordenadasFinca}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="productor">Productor</FormLabel>
                      <Select
                        placeholder="Seleccione un productor"
                        onChange={handleChange}
                        value={values.productor}
                        name="productor"
                      >
                        {data.productores.map((productor) => (
                          <option key={productor.uuid} value={productor.uuid}>
                            {productor.nombreProductor}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="encargadoFinca">
                        Encargado de la finca
                      </FormLabel>
                      <Select
                        placeholder="Seleccione un encargado"
                        onChange={handleChange}
                        value={values.encargadoFinca}
                        name="encargadoFinca"
                      >
                        {data.encargadosFinca.map((encargado) => (
                          <option key={encargado.uuid} value={encargado.uuid}>
                            {encargado.nombreEncargadoFinca}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="variedades">Variedades</FormLabel>
                      <CheckboxGroup colorScheme="blue">
                        <VStack
                          divider={<StackDivider borderColor="gray.200" />}
                          spacing={4}
                          align="stretch"
                        >
                          {data.variedades.map((variedad) => (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={values.variedad.includes(
                                    variedad.uuid
                                  )}
                                  onChange={handleChange}
                                  name="variedad"
                                  value={variedad.uuid}
                                />
                              }
                              label={variedad.nombreVariedad}
                              key={variedad.uuid}
                            />
                          ))}
                        </VStack>
                      </CheckboxGroup>
                    </FormControl>
                    <Button
                      colorScheme="green"
                      type="submit"
                      disabled={
                        values.nombreFinca.trim() === "" ||
                        values.coordenadasFinca.trim() === "" ||
                        values.productor === "" ||
                        values.encargadoFinca === "" ||
                        values.variedad.length === 0 ||
                        (values.nombreFinca === finca.nombreFinca &&
                          values.coordenadasFinca === finca.coordenadasFinca &&
                          values.productor === finca.productor.uuid &&
                          values.encargadoFinca === finca.encargadoFinca.uuid &&
                          arrayCompare(
                            values.variedad,
                            finca.variedades.map((variedad) => variedad.uuid)
                          ))
                      }
                    >
                      Guardar
                    </Button>
                  </VStack>
                </form>
              )}
            </Formik>
          ) : null}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
