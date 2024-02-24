import {Outlet} from "react-router-dom";
import "./layout.css"
import ResponsiveAppBar from "./components/shared/navbar_v2/NavBar2";

const Layout = () => {
    return (
        <div className="App">
            <ResponsiveAppBar/>
            <Outlet/>
        </div>
    );
};

export default Layout;
