import React from 'react'
import { Panel, Row, Col, Well } from 'react-bootstrap'
const Finance = (props) => {
  const { bankName, bankAccountNo, homeBranchName, ifscCode, pfNo, esiNo } = props.data
  return (
    <Well bsSize="small">
      <Row>
        <Col md={3}><label>Bank Name</label></Col>
        <Col md={6}>{bankName}</Col>
      </Row>
      <Row>
        <Col md={3}><label>Bank AccountNo</label></Col>
        <Col md={6}>{bankAccountNo}</Col>
      </Row>
      <Row>
        <Col md={3}><label>Home BranchName</label></Col>
        <Col md={6}>{homeBranchName}</Col>
      </Row>
      <Row>
        <Col md={3}><label>IFSC Code</label></Col>
        <Col md={6}>{ifscCode}</Col>
      </Row>
      <Row>
        <Col md={3}><label>PF No</label></Col>
        <Col md={6}>{pfNo}</Col>
      </Row>
      <Row>
        <Col md={3}><label>ESI No</label></Col>
        <Col md={6}>{esiNo}</Col>
      </Row>
    </Well>
  )
}

export default Finance
