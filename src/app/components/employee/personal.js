import React from 'react'
import { Row, Col, Panel, Well } from 'react-bootstrap'
import Address from './address.js'
import EmergencyContact from './emergencyContact.js'
import {dateToDateString} from 'utils'
const Personal = (props) => {
  const {
    name,shortName,gender,birthDate,bloodGroup,maritialStatus,email,contact,
    address, emergencyContact
  } = props.data
  return (
    <div>
      <Well bsSize="small">
        <Row>
          <Col md={3}><label>Name</label></Col>
          <Col md={6}>{name}</Col>
        </Row>
        <Row>
          <Col md={3}><label>ShortName</label></Col>
          <Col md={6}>{shortName}</Col>
        </Row>
        <Row>
          <Col md={3}><label>Gender</label></Col>
          <Col md={6}>{gender}</Col>
        </Row>
        <Row>
          <Col md={3}><label>BirthDate</label></Col>
          <Col md={6}>{dateToDateString(birthDate)}</Col>
        </Row>
        <Row>
          <Col md={3}><label>BloodGroup</label></Col>
          <Col md={6}>{bloodGroup}</Col>
        </Row>
        <Row>
          <Col md={3}><label>Maritial Status</label></Col>
          <Col md={6}>{maritialStatus}</Col>
        </Row>
        <Row>
          <Col md={3}><label>Email</label></Col>
          <Col md={6}>{email}</Col>
        </Row>
        <Row>
          <Col md={3}><label>Contact</label></Col>
          <Col md={6}>{contact}</Col>
        </Row>
      </Well>
      <Well bsSize="small">
        <Address data={address} />
      </Well>
      <Well bsSize="small">
        <EmergencyContact data={emergencyContact} />
      </Well>
    </div>
  )
}

export default Personal



