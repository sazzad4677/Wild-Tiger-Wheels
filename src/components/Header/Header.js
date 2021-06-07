import React, { useContext } from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { userContext } from '../../App';
import "./Header.css";
import firebase from "firebase/app";
import "firebase/auth";

const Header = (props) => {
    const [loggedIn, setLoggedIn] = useContext(userContext);
    const { isLoggedIn,name } = loggedIn;
    //Sign Out User
    const logOutUser = () => {
        firebase.auth().signOut().then(() => {
            const logoutUser = { ...loggedIn }
            logoutUser.isLoggedIn = false;
            logoutUser.error = '';
            setLoggedIn(logoutUser);
        }).catch((error) => {
            console.log(error.message);
        });
    }
    return (
        <Container>
            <Navbar bg="transparent" expand="lg">
                <Navbar.Brand><Link to="/home" className="brand-name">Wild tiger Wheels</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="mr-auto" id="basic-navbar-nav">
                    <Nav className="justify-content-end nav-content" style={{ width: "100%" }}>
                        <NavLink to="/home" className="nav-item" > Home </NavLink>
                        <NavLink to="/destination" className="nav-item" > Destination </NavLink>
                        <NavLink to="/blog" className="nav-item" > Blog </NavLink>
                        <NavLink to="/contact" className="nav-item" > Contact </NavLink>
                        {
                            isLoggedIn && <NavLink to="/" className="nav-item text-primary" > {loggedIn.name||loggedIn.displayName } </NavLink>
                        }
                    </Nav>
                    {isLoggedIn
                        ? <Link to="/login"><Button onClick={logOutUser} className="login-btn">Logout</Button></Link>
                        : <Link to="/login"><Button className="login-btn">Login</Button></Link>
                    }
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
};

export default Header;