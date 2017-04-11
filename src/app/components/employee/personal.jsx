/* eslint-disable jsx-a11y/label-has-for, import/first */
import Address from './address'
import EmergencyContact from './emergencyContact'
import { dateToDateString } from 'utils'
import React, { PropTypes as P } from 'react'
import { Row, Col, Well } from 'react-bootstrap'

const Personal = (props) => {
  const {
    name, shortName, gender, birthDate, bloodGroup, maritialStatus, email, contact,
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
Personal.propTypes = {
  data: P.shape({
    name: P.string.isRequired,
    shortName: P.string.isRequired,
    gender: P.string.isRequired,
    birthDate: P.string.isRequired,
    bloodGroup: P.string.isRequired,
    maritialStatus: P.string.isRequired,
    email: P.string.isRequired,
    contact: P.string.isRequired,
    address: P.array.isRequired,
    emergencyContact: P.array.isRequired
  }).isRequired
}
export default Personal
