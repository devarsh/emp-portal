import React from 'react'
import { Panel, Row, Col, Well } from 'react-bootstrap'
import {dateToDateString} from 'utils'
const Work = (props) => {
  const { employeeId, designation, department, dateOfJoin, email, contactNo } = props.data
  return (
    <Well bsSize="small">
      <Row>
        <Col md={3}><label>Employee Id</label></Col>
        <Col md={6}>{employeeId}</Col>
      </Row>
      <Row>
        <Col md={3}><label>Designation</label></Col>
        <Col md={6}>{designation}</Col>
      </Row>
      <Row>
        <Col md={3}><label>Department</label></Col>
        <Col md={6}>{department}</Col>
      </Row>
      <Row>
        <Col md={3}><label>Date of Joining</label></Col>
        <Col md={6}>{dateToDateString(dateOfJoin)}</Col>
      </Row>
      <Row>
        <Col md={3}><label>Work Email</label></Col>
        <Col md={6}>{email}</Col>
      </Row>
      <Row>
        <Col md={3}><label>Work Contact</label></Col>
        <Col md={6}>{contactNo}</Col>
      </Row>
    </Well>
  )
}

export default Work
