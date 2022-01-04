import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  StackDivider,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { SeCosecho } from "./SeCosecho";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ComentarioForm = ({ informeId }) => {
  const [seCosecho, setSeCosecho] = useState("");
  const [cant, setCant] = useState(0);
  const [fecha, setFecha] = useState(new Date());
  const [commentInput, setCommentInput] = useState("");
  const commentError = commentInput.length === 0 || commentInput.length > 300;
  const navigate = useNavigate();
  const [error, setError] = useState(null)


  const handleSubmit = async (e) => {
    e.preventDefault();
    let comment;
    if (seCosecho === "si") {
      comment = {
        cantKgRealCosecha: cant,
        fechaRealCosecha: fecha.toISOString().slice(0, 10),
        comentarioDescripcion: commentInput,
      };
    }
    if (seCosecho === "no") {
      comment = {
        cantKgEstimadoCosecha: cant,
        fechaEstimadaCosecha: fecha.toISOString().slice(0, 10),
        comentarioDescripcion: commentInput,
      };
    }
    try {
      const res = await axios.post(
        `http://localhost:3001/api/v1/informe/${informeId.id}`,
        comment,
        { withCredentials: true }
      );
      navigate(`/informe/${informeId.id}`);
    } catch (error) {
      setError(JSON.stringify(error.response.data));
    }
  };

  return (
    <Box bg="gray.50" p={10} mt={8} borderRadius={10} maxW={"3xl"}>
      <Box bg="white" p={10} borderRadius={10} boxShadow={2}>
        <form onSubmit={handleSubmit}>
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            align="stretch"
            maxW="3xl"
          >
            {error ? (
              <Alert
                status="error"
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                mt={5}
              >
                <AlertIcon />
                <AlertTitle mr={2}>{error}</AlertTitle>
              </Alert>
            ) : null}
            <Box px={[4, 0]}>
              <Heading fontSize="lg" fontWeight="md" lineHeight="6">
                Crear un comentario sobre última recorrida
              </Heading>
              <Text
                mt={1}
                fontSize="sm"
                color={useColorModeValue("gray.600", "gray.400")}
              >
                Recuerde que si desea eliminar o editar un comentario, debe
                comunicarse con un administrador
              </Text>
            </Box>
            <Box>
              <FormControl>
                <FormLabel htmlFor="seCosecho">¿Hubo cosecha?</FormLabel>
                <RadioGroup onChange={setSeCosecho} value={seCosecho}>
                  <Stack direction="row">
                    <Radio value="si">Sí</Radio>
                    <Radio value="no">No</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            </Box>
            {seCosecho === "si" ? (
              <SeCosecho
                seCosecho={true}
                cant={{ cant, setCant }}
                fecha={{ fecha, setFecha }}
              />
            ) : seCosecho === "no" ? (
              <SeCosecho
                seCosecho={false}
                cant={{ cant, setCant }}
                fecha={{ fecha, setFecha }}
              />
            ) : null}
            {seCosecho !== "" ? (
              <Box>
                <FormControl>
                  <FormLabel htmlFor="comentarioDescripcion">
                    Descripción de la recorrida
                  </FormLabel>
                  <Textarea
                    placeholder="Escriba una comentario sobre la recorrida"
                    onChange={(e) => setCommentInput(e.target.value)}
                    value={commentInput}
                  />
                  <FormHelperText>{commentInput.length}</FormHelperText>
                </FormControl>
              </Box>
            ) : null}
            {seCosecho !== "" ? (
              <Box>
                <Button
                  isDisabled={commentError}
                  colorScheme="teal"
                  isFullWidth={true}
                  type="submit"
                >
                  Guardar
                </Button>
              </Box>
            ) : null}
          </VStack>
        </form>
      </Box>
    </Box>
  );
};
