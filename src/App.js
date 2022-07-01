import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./components/Pages/Auth/Login";
import PasswordReset from "./components/Pages/Auth/PasswordReset";
import Register from "./components/Pages/Auth/Register";
import RequireAuth from "./components/Pages/Auth/RequireAuth";
import CompletedTask from "./components/Pages/CompletedTask/CompletedTask";
import Home from "./components/Pages/Home/Home";
import NotFound from "./components/Pages/NotFound/NotFound";
import ToDo from "./components/Pages/ToDo/ToDo";
import Footer from "./components/Shared/Footer";
import Navbar from "./components/Shared/Navbar";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/password-reset" element={<PasswordReset></PasswordReset>}></Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
        <Route path="/todo" element={
          <RequireAuth>
            <ToDo />
          </RequireAuth>
        }></Route>
        <Route path="/completed-task" element={
          <RequireAuth>
            <CompletedTask />
          </RequireAuth>
        }></Route>
      </Routes>
      <Footer></Footer>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default App;
