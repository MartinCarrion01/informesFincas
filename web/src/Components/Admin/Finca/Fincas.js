import {
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ChevronDownIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
  import { EditFinca } from "./EditFinca";
import { useState } from "react";
  import { DeleteFinca } from "./DeleteFinca";
import { useModalClose } from "../../../Hooks/useModalClose";

export const Fincas = ({ fincas, update }) => {
  const [fincaToEdit, setFincaToEdit] = useState(null);
  const [fincaToDelete, setFincaToDelete] = useState(null);
  const { isOpen, onOpen, onClose } = useModalClose();


  return !fincas ? null : (
    <>
      {fincaToEdit ? (
          <EditFinca
            isOpen={isOpen}
            onClose={() => onClose(setFincaToEdit)}
            finca={fincaToEdit}
            setFinca={setFincaToEdit}
            update={update}
          />
        ) : null}
        {fincaToDelete ? (
          <DeleteFinca
            isOpen={isOpen}
            onClose={() => onClose(setFincaToDelete)}
            finca={fincaToDelete}
            setFinca={setFincaToDelete}
            update={update}
          />
        ) : null}
      <Table variant="simple">
        <TableCaption placement="top">Fincas</TableCaption>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Nombre</Th>
            <Th>Coordenadas</Th>
            <Th>Productor</Th>
            <Th>Encargado</Th>
            <Th>Variedades</Th>
            <Th>Fecha de carga</Th>
            <Th>Activa</Th>
            <Th>Fecha de baja</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {fincas.map((finca) => {
            return (
              <Tr
                key={finca.uuid}
                bgColor={finca.active ? "green.100" : "red.100"}
              >
                <Td>{finca.uuid}</Td>
                <Td>{finca.nombreFinca}</Td>
                <Td>{finca.coordenadasFinca}</Td>
                <Td>{finca.productor.nombreProductor}</Td>
                <Td>{finca.encargadoFinca ? finca.encargadoFinca.nombreEncargadoFinca : "Sin encargado"}</Td>
                <Td>
                  <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                      Ver variedades{" "}
                    </MenuButton>
                    <MenuList>
                      {finca.variedades.map((variedad) => (
                        <MenuItem key={variedad.uuid}>{variedad.nombreVariedad}</MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                </Td>
                <Td>{new Date(finca.fechaIngreso).toLocaleString("es-AR")}</Td>
                <Td>{finca.active ? "Sí" : "No"}</Td>
                <Td>
                  {finca.fechaFinVigencia
                    ? new Date(finca.fechaFinVigencia).toLocaleString("es-AR")
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
                      disabled={!finca.active}
                      icon={<EditIcon />}
                      onClick={() => {
                        onOpen(finca, setFincaToEdit);
                      }}
                    />
                    <Spacer />
                    <IconButton
                      colorScheme="red"
                      aria-label="Eliminar"
                      disabled={!finca.active}
                      icon={<DeleteIcon />}
                      onClick={() => {
                        onOpen(finca, setFincaToDelete);
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
