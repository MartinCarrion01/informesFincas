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
import { EditProductor } from "./EditProductor";
import { useState } from "react";
import { DeleteProductor } from "./DeleteProductor";
import { useModalClose } from "../../../Hooks/useModalClose";

export const Productores = ({ productores, update }) => {
  const { isOpen, onOpen, onClose } = useModalClose();
  const [productorToEdit, setProductorToEdit] = useState(null);
  const [productorToDelete, setProductorToDelete] = useState(null);

  return !productores ? null : (
    <>
      {productorToEdit ? (
        <EditProductor
          isOpen={isOpen}
          onClose={() => onClose(setProductorToEdit)}
          productor={productorToEdit}
          setProductor={setProductorToEdit}
          update={update}
        />
      ) : null}
      {productorToDelete ? (
        <DeleteProductor
          isOpen={isOpen}
          onClose={() => onClose(setProductorToDelete)}
          productor={productorToDelete}
          setProductor={setProductorToDelete}
          update={update}
        />
      ) : null}
      <Table variant="simple">
        <TableCaption placement="top">Productores</TableCaption>
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
          {productores.map((productor) => {
            return (
              <Tr
                key={productor.uuid}
                bgColor={productor.active ? "green.100" : "red.100"}
              >
                <Td>{productor.uuid}</Td>
                <Td>{productor.nombreProductor}</Td>
                <Td>
                  {new Date(productor.fechaIngreso).toLocaleString("es-AR")}
                </Td>
                <Td>{productor.active ? "Sí" : "No"}</Td>
                <Td>
                  {productor.fechaFinVigencia
                    ? new Date(productor.fechaFinVigencia).toLocaleString(
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
                      disabled={!productor.active}
                      icon={<EditIcon />}
                      onClick={() => {
                        onOpen(productor, setProductorToEdit)
                      }}
                    />
                    <Spacer />
                    <IconButton
                      colorScheme="red"
                      aria-label="Eliminar"
                      disabled={!productor.active}
                      icon={<DeleteIcon />}
                      onClick={() => {
                        onOpen(productor, setProductorToDelete);
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
