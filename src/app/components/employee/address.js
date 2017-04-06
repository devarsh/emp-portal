import React from 'react'
import { Panel, Row, Col } from 'react-bootstrap'
const Address = (props) => {
  const { street1, street2, area, city, state, country, pincode , type } = props.data
  return (
      <Col md={3}>
        <h5>{type}</h5>
        <Row>
          <Col md={12}>{street1},</Col>
        </Row>
        <Row>
          <Col md={12}>{street2},</Col>
        </Row>
        <Row>
          <Col md={12}>{area}, {city},</Col>
        </Row>
        <Row>
          <Col md={12}>{state}, {country}.</Col>
        </Row>
        <Row>
          <Col md={12}>Pincode: {pincode}</Col>
        </Row>
      </Col>

  )
}


const AllAddress = (props) => {
  const allAddress = props.data
  const mappedAddress = allAddress.map((data,index) => {
    return (<Address key={index} data={data}/>)
  })
  return (
    <div>
      <h4>Address</h4>
      <Row>
        {mappedAddress}
      </Row>
    </div>
  )
}

export default AllAddress
