/* eslint-disable jsx-a11y/label-has-for */
import React, { PropTypes as P } from 'react'
import { Row, Col, Well } from 'react-bootstrap'

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
Docs.propTypes = {
  data: P.shape({
    panNo: P.string.isRequired,
    adharCardNo: P.string.isRequired,
    passportNo: P.string.isRequired
  }).isRequired
}

export default Docs
