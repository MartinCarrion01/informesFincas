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
  import { EditEncargadoFinca } from "./EditEncargadoFinca";
  import { useState } from "react";
  import { DeleteEncargadoFinca } from "./DeleteEncargadoFinca";
  import { useModalClose } from "../../../Hooks/useModalClose";
  
  export const EncargadosFinca = ({ encargadosFinca, update }) => {
    const { isOpen, onOpen, onClose } = useModalClose();
    const [encargadoFincaToEdit, setEncargadoFincaToEdit] = useState(null);
    const [encargadoFincaToDelete, setEncargadoFincaToDelete] = useState(null);
  
    return !encargadosFinca ? null : (
      <>
        {encargadoFincaToEdit ? (
          <EditEncargadoFinca
            isOpen={isOpen}
            onClose={() => onClose(setEncargadoFincaToEdit)}
            encargadoFinca={encargadoFincaToEdit}
            setEncargadoFinca={setEncargadoFincaToEdit}
            update={update}
          />
        ) : null}
        {encargadoFincaToDelete ? (
          <DeleteEncargadoFinca
            isOpen={isOpen}
            onClose={() => onClose(setEncargadoFincaToDelete)}
            encargadoFinca={encargadoFincaToDelete}
            setEncargadoFinca={setEncargadoFincaToDelete}
            update={update}
          />
        ) : null}
        <Table variant="simple">
          <TableCaption placement="top">Encargados de finca</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Nombre</Th>
              <Th>Número de teléfono</Th>
              <Th>Fecha de carga</Th>
              <Th>Activa</Th>
              <Th>Fecha de baja</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {encargadosFinca.map((encargadoFinca) => {
              return (
                <Tr
                  key={encargadoFinca.uuid}
                  bgColor={encargadoFinca.active ? "green.100" : "red.100"}
                >
                  <Td>{encargadoFinca.uuid}</Td>
                  <Td>{encargadoFinca.nombreEncargadoFinca}</Td>
                  <Td>{encargadoFinca.numeroEncargadoFinca}</Td>
                  <Td>{new Date(encargadoFinca.fechaIngreso).toLocaleString("es-AR")}</Td>
                  <Td>{encargadoFinca.active ? "Sí" : "No"}</Td>
                  <Td>
                    {encargadoFinca.fechaFinVigencia
                      ? new Date(encargadoFinca.fechaFinVigencia).toLocaleString("es-AR")
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
                        disabled={!encargadoFinca.active}
                        icon={<EditIcon />}
                        onClick={() => {
                          onOpen(encargadoFinca, setEncargadoFincaToEdit);
                        }}
                      />
                      <Spacer />
                      <IconButton
                        colorScheme="red"
                        aria-label="Eliminar"
                        disabled={!encargadoFinca.active}
                        icon={<DeleteIcon />}
                        onClick={() => {
                          onOpen(encargadoFinca, setEncargadoFincaToDelete);
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
  