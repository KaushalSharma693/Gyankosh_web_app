import { Outlet } from "react-router-dom";

import Navbar  from "./components/navbar";
import Footer from "./components/finalfooter";

const Layout=()=>{
    return (
    <>
    <Navbar/>
    <Outlet/>
     <Footer/>
    </>
    );
};

export default Layout;