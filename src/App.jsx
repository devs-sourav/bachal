import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider
} from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import Home from "./pages/Home";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Registration/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/forgotpassword" element={<ForgetPassword/>}></Route>
      <Route path="/home" element={<Home/>}></Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  )
}

export default App
