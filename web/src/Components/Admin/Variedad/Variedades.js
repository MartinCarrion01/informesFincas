import {
  Flex,
  IconButton,
  Spacer,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { EditVariedad } from "./EditVariedad";
import { useState } from "react";
import { DeleteVariedad } from "./DeleteVariedad";
import { useModalClose } from "../../../Hooks/useModalClose";

export const Variedades = ({ variedades, update }) => {
  const [variedadToEdit, setVariedadToEdit] = useState(null);
  const [variedadToDelete, setVariedadToDelete] = useState(null);
  const { isOpen, onOpen, onClose } = useModalClose();

  return !variedades ? null : (
    <>
      {variedadToEdit ? (
        <EditVariedad
          isOpen={isOpen}
          onClose={() => onClose(setVariedadToEdit)}
          variedad={variedadToEdit}
          setVariedad={setVariedadToEdit}
          update={update}
        />
      ) : null}
      {variedadToDelete ? (
        <DeleteVariedad
          isOpen={isOpen}
          onClose={() => onClose(setVariedadToDelete)}
          variedad={variedadToDelete}
          setVariedad={setVariedadToDelete}
          update={update}
        />
      ) : null}
      <Table variant="simple">
        <TableCaption placement="top">Variedades</TableCaption>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Nombre</Th>
            <Th>Fecha de carga</Th>
            <Th>Activa</Th>
            <Th>Fecha de baja</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {variedades.map((variedad) => {
            return (
              <Tr
                key={variedad.uuid}
                bgColor={variedad.active ? "green.100" : "red.100"}
              >
                <Td>{variedad.uuid}</Td>
                <Td>{variedad.nombreVariedad}</Td>
                <Td>
                  {new Date(variedad.fechaIngreso).toLocaleString("es-AR")}
                </Td>
                <Td>{variedad.active ? "Sí" : "No"}</Td>
                <Td>
                  {variedad.fechaFinVigencia
                    ? new Date(variedad.fechaFinVigencia).toLocaleString(
                        "es-AR"
                      )
                    : "Está activo"}
                </Td>
                <Td>
                  <Flex
                    py={[0, 10, 20]}
                    direction={{ base: "column", md: "row" }}
                  >
                    <IconButton
                      colorScheme="blue"
                      aria-label="Editar"
                      disabled={!variedad.active}
                      icon={<EditIcon />}
                      onClick={() => {
                        onOpen(variedad, setVariedadToEdit);
                      }}
                    />
                    <Spacer />
                    <IconButton
                      colorScheme="red"
                      aria-label="Eliminar"
                      disabled={!variedad.active}
                      icon={<DeleteIcon />}
                      onClick={() => {
                        onOpen(variedad, setVariedadToDelete);
                      }}
                    />
                  </Flex>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
};
