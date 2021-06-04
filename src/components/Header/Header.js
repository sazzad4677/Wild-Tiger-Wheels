import React from 'react';
import { Container, Nav, Navbar,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./Header.css"
import logo from '../../images/WildTigerWheels Logo.png'

const Header = () => {
    return (
        <Container>
            <Navbar bg="transparent" expand="lg">
                <Navbar.Brand><Link to="/home"><img src={logo} width="50" height="50" className="d-inline-block align-top" alt="Wild Tiger Wheels Logo" /></Link></Navbar.Brand>
                <Navbar.Brand><Link to="/home" className="brand-name">Wild Tiger Wheels</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="collapse navbar-collapse">
                    <Nav className="justify-content-end" style={{ width: "100%" }}>
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