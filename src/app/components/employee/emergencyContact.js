import React from 'react'
import { Panel, Row, Col } from 'react-bootstrap'
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
      <br/>
    </div>
  )
}


const AllEmergencyContact = (props) => {
  const allcontacts = props.data
  const mappedContacts = allcontacts.map((data,index) => {
    return (<EmergencyContact key={index} data={data}/>)
  })
  return (
    <div>
      <h4>Emergency Contact</h4>
      <div>{mappedContacts}</div>
    </div>
  )
}

export default AllEmergencyContact
