import React from 'react'
import { Panel, Row, Col, Well } from 'react-bootstrap'
const Docs = (props) => {
  const { panNo, adharCardNo, passportNo } = props.data
  return (
    <Well bsSize="small">
      <Row>
        <Col md={3}><label>PAN No</label></Col>
        <Col md={6}>{panNo}</Col>
      </Row>
      <Row>
        <Col md={3}><label>Aadhar Card No</label></Col>
        <Col md={6}>{adharCardNo}</Col>
      </Row>
      <Row>
        <Col md={3}><label>Passport</label></Col>
        <Col md={6}>{passportNo}</Col>
      </Row>
    </Well>
  )
}

export default Docs
