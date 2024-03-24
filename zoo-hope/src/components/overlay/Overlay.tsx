import { Footer } from "../footer";
import { NavBar } from "../navBar";

interface IProps {
    children: any;
}

export default function Overlay(props: IProps) {
    return (
        <>
            <NavBar />
            {props.children}
            <Footer />
        </>
    )
}