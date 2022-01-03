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
  import { EditUsuario } from "./EditUsuario";
  import { useState } from "react";
  import { DeleteUsuario } from "./DeleteUsuario";
  import { useModalClose } from "../../../Hooks/useModalClose";
  
  export const Usuarios = ({ usuarios, update }) => {
    const { isOpen, onOpen, onClose } = useModalClose();
    const [usuarioToEdit, setUsuarioToEdit] = useState(null);
    const [usuarioToDelete, setUsuarioToDelete] = useState(null);
  
    return !usuarios ? null : (
      <>
        {usuarioToEdit ? (
          <EditUsuario
            isOpen={isOpen}
            onClose={() => onClose(setUsuarioToEdit)}
            usuario={usuarioToEdit}
            setUsuario={setUsuarioToEdit}
            update={update}
          />
        ) : null}
        {usuarioToDelete ? (
          <DeleteUsuario
            isOpen={isOpen}
            onClose={() => onClose(setUsuarioToDelete)}
            usuario={usuarioToDelete}
            setUsuario={setUsuarioToDelete}
            update={update}
          />
        ) : null}
        <Table variant="simple">
          <TableCaption placement="top">Usuarios</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Nombre y Apellido</Th>
              <Th>DNI</Th>
              <Th>Legajo</Th>
              <Th>Nombre de usuario</Th>
              <Th>Fecha de carga</Th>
              <Th>Activo</Th>
              <Th>Fecha de baja</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {usuarios.map((usuario) => {
              return (
                <Tr
                  key={usuario.uuid}
                  bgColor={usuario.active ? "green.100" : "red.100"}
                >
                  <Td>{usuario.uuid}</Td>
                  <Td>{usuario.nombreUsuario + " " + usuario.apellidoUsuario}</Td>
                  <Td>{usuario.dniUsuario}</Td>
                  <Td>{usuario.legajoUsuario}</Td>
                  <Td>{usuario.userName}</Td>
                  <Td>
                    {new Date(usuario.fechaIngreso).toLocaleString("es-AR")}
                  </Td>
                  <Td>{usuario.active ? "Sí" : "No"}</Td>
                  <Td>
                    {usuario.fechaFinVigencia
                      ? new Date(usuario.fechaFinVigencia).toLocaleString(
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
                        disabled={!usuario.active}
                        icon={<EditIcon />}
                        onClick={() => {
                          onOpen(usuario, setUsuarioToEdit)
                        }}
                      />
                      <Spacer />
                      <IconButton
                        colorScheme="red"
                        aria-label="Eliminar"
                        disabled={!usuario.active}
                        icon={<DeleteIcon />}
                        onClick={() => {
                          onOpen(usuario, setUsuarioToDelete);
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
  