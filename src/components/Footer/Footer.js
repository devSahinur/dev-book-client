import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
    return (
        <Container className="mt-5">
            <footer className="section-footer border-top">
                <Container>
                    <Row className="footer-bottom border-top">
                        <Col md={12} className="text-md-center">
                            <p className="text-muted">Made with ❤️  by <a href="https://sahinur.netlify.app" target="_blank" className='footer-btn' rel="noopener noreferrer">Sahinur Islam</a></p>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </Container>
    );
};

export default Footer;