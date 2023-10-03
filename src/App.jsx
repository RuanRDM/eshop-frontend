import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Home from './componentes/telas/Home'
import Categoria from './componentes/categorias/Categoria'
import Login from "./componentes/telas/login/login";
import MenuPrivado from "./componentes/MenuPrivado";
import MenuPublico from "./componentes/MenuPublico";

const router = createBrowserRouter([
  {
    path : "/",
    element : <MenuPublico/>,
    children : [
      {
        index : true,
        element : <Home/>
      },
      {
        path : "login",
        element :  <Login/>
      }              
    ]
  }
  ,
  {
    path: "/privado",
    element: <MenuPrivado />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "categorias",
        element: <Categoria />,
      }
    ]
  }
])

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;