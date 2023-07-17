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
import Message from "./pages/Message";
import RootLayout from "./components/RootLayout";
import Notification from "./pages/Notification";
import Setting from "./pages/Setting";
import Profile from "./pages/Profile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Registration/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/forgotpassword" element={<ForgetPassword/>}></Route>
      <Route path="/bachal" element={<RootLayout/>}>
        <Route index path="home" element={<Home/>}></Route>
        <Route index path="profile" element={<Profile/>}></Route>
        <Route path="message" element={<Message/>}></Route>
        <Route path="notification" element={<Notification/>}></Route>
        <Route path="settings" element={<Setting/>}></Route>
      </Route>

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
