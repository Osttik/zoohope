import { useLocation } from "react-router";
import { Footer } from "../footer";
import { NavBar } from "../navBar";

interface IProps {
    children: any;
}

export default function Overlay(props: IProps) {
    const location = useLocation();
    const isAdminPage = location.pathname.startsWith("/admin");
    return (
        <>
            {!isAdminPage && <NavBar />}
            {props.children}
            {!isAdminPage && <Footer />}
        </>
    )
}