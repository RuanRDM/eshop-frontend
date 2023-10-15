import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Home from "./componentes/telas/Home";
import Editora from "./componentes/telas/editora/Editora";
import Livro from "./componentes/telas/livro/Livro";
import Login from "./componentes/telas/login/Login";
import MenuPublico from "./componentes/telas/MenuPublico";
import MenuPrivado from "./componentes/telas/MenuPrivado";

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
        element : <Login/>
      }   
    ]
  },
  {
    path : "/privado",
    element : <MenuPrivado/>,
    children : [
      {
        index : true,
        element : <Home/>
      },
      {
        path : "editoras",
        element :  <Editora/>
      },
      {
        path : "livros",
        element :  <Livro/>
      },
      {
        path : "login",
        element : <Login/>
      }   
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
