import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

const AdminNavbar = ({ setShowSidebar, show }) => {
    const { adminPanel } = useParams();

    return (
        <Navbar expand="lg" variant="light" bg="white">
            <Container fluid>
                <button
                    onClick={() => setShowSidebar(!show)}
                    type="button" id="sidebarCollapse"
                    className={show ? "navbar-btn active" : "navbar-btn"}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <Navbar.Brand>
                    <h2
                        className="d-inline-block ml-md-3"
                        style={{ fontSize: "1.7rem", fontWeight: "600" }}>
                        {adminPanel === "addProduct" ? "Add Product"
                            : adminPanel === "editProduct" ? "Edit Product"
                                : "Manage Product"}
                    </h2>
                </Navbar.Brand>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/" className="mr-4" active style={{ fontWeight: "500" }}>Home</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AdminNavbar;