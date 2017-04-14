/* eslint-disable jsx-a11y/label-has-for, react/no-array-index-key*/
import React, { PropTypes as P } from 'react'
import { Row, Col } from 'react-bootstrap'

const EmergencyContact = (props) => {
  const { name, relation, contactNo } = props.data
  return (
    <div>
      <Row>
        <Col md={3}><label>Name</label></Col>
        <Col md={6}>{name}</Col>
      </Row>
      <Row>
        <Col md={3}><label>Relation</label></Col>
        <Col md={6}>{relation}</Col>
      </Row>
      <Row>
        <Col md={3}><label>Contact No</label></Col>
        <Col md={6}>{contactNo}</Col>
      </Row>
      <br />
    </div>
  )
}
EmergencyContact.propTypes = {
  data: P.shape({
    name: P.string.isRequired,
    relation: P.string.isRequired,
    contactNo: P.string.isRequired
  }).isRequired
}


const AllEmergencyContact = (props) => {
  const allcontacts = props.data
  const mappedContacts = allcontacts.map((data, index) => (
    <EmergencyContact key={`EmergencyContact:${index}`} data={data} />
    )
  )
  return (
    <div>
      <h4>Emergency Contact</h4>
      <div>{mappedContacts}</div>
    </div>
  )
}
AllEmergencyContact.propTypes = {
  data: P.arrayOf(P.shape({
    name: P.string.isRequired,
    relation: P.string.isRequired,
    contactNo: P.string.isRequired
  })).isRequired
}

export default AllEmergencyContact
