import React from 'react';
import { Container, Nav, Navbar,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./Header.css"
import logo from '../../images/WildTigerWheels Logo.png'

const Header = () => {
    return (
        <Container>
            <Navbar bg="transparent" expand="lg">
                <Navbar.Brand><Link to="/home" className="brand-name">Wild tiger Wheels</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="mr-auto" id="basic-navbar-nav">
                    <Nav className="justify-content-end nav-content" style={{ width: "100%" }}>
                        <Nav.Link to="/home"><Nav.Item className="nav-item">Home</Nav.Item></Nav.Link>
                        <Nav.Link to="/home"><Nav.Item className="nav-item">Destination</Nav.Item></Nav.Link>
                        <Nav.Link to="/home"><Nav.Item className="nav-item">Blog</Nav.Item></Nav.Link>
                        <Nav.Link to="/home"><Nav.Item className="nav-item">Contact</Nav.Item></Nav.Link>
                    </Nav>
                    <Button className="login-btn" >Login</Button>{' '}
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
};

export default Header;