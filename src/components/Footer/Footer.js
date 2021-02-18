import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return <footer className="footer bg-light py-3 mt-auto">
    <Container>
      <Row>
        <Col className=' footer text-center py-3 text-muted'>
          Copyright &copy; YelpLoo 2021
        </Col>
      </Row>
    </Container>
  </footer>
}

export default Footer
