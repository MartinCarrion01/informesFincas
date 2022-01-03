import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "./Pages/Admin/Admin";
import Home from "./Pages/Home/Home";
import Perfil from "./Pages/Perfil/Perfil";
import Error from "./Pages/Error/Error";
import Login from "./Pages/Login/Login";
import Navbar from "./Components/Navbar";
import Cookies from "js-cookie";
import { UserContext } from "./UserContext";
import { Box, Container, Heading, Spinner } from "@chakra-ui/react";
import DetalleInforme from "./Pages/DetalleInforme/DetalleInforme";
import { CargarInforme } from "./Pages/CargarInforme/CargarInforme";
import { ComentarioInforme } from "./Pages/DetalleInforme/ComentarioInforme";
import { Usuario } from "./Pages/Admin/Usuario/Usuario";
import { Variedad } from "./Pages/Admin/Variedad/Variedad";
import { Productor } from "./Pages/Admin/Productor/Productor";
import { EncargadoFinca } from "./Pages/Admin/EncargadoFinca/EncargadoFinca";
import { Finca } from "./Pages/Admin/Finca/Finca";
import { Password } from "./Pages/Password/Password";
import { EditarEliminarInforme } from "./Pages/EditarEliminarInforme/EditarEliminarInforme";

const App = () => {
  const [user, setUser] = React.useState(null);

  const login = (user) => {
    setUser(user);
  };

  React.useEffect(() => {
    if (!Cookies.get("user")) {
      return;
    }
    setUser(JSON.parse(Cookies.get("user")));
  }, []);

  if (!user && !Cookies.get("user")) {
    return (
      <div>
        <Login login={login} />
      </div>
    );
  }

  if (!user) {
    return (
      <Container maxW="xl" centerContent>
        <Box padding="4" bg="gray.100" maxW="3xl">
          <Heading as="h1" size="4xl" isTruncated>
            Bienvenidos a Informes Fincas 📋
          </Heading>
          <Heading as="h2" size="xl">
            Cargando
          </Heading>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Box>
      </Container>
    );
  }

  const changePassword = (password) => {
    setUser({...user, password: password})
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/informe/:id" element={<DetalleInforme />} />
        <Route path="/editareliminar/:id" element={<EditarEliminarInforme />} />
        <Route path="/nuevocomentario/:id" element={<ComentarioInforme />} />
        <Route path="misinformes" element={<Perfil />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/usuario" element={<Usuario />} />
        <Route path="/admin/variedad" element={<Variedad />} />
        <Route path="/admin/finca" element={<Finca />} />
        <Route path="/admin/encargadofinca" element={<EncargadoFinca />} />
        <Route path="/admin/productor" element={<Productor />} />
        <Route path="/nuevoinforme" element={<CargarInforme />} />
        <Route path="/cambiarcontrasena" element={<Password changePassword={changePassword}/>} />
        <Route path="*" element={<Error />} />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
