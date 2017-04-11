/* eslint-disable react/no-array-index-key */
import React, { PropTypes as P } from 'react'
import { Row, Col } from 'react-bootstrap'

const Address = (props) => {
  const { street1, street2, area, city, state, country, pincode, type } = props.data
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
Address.propTypes = {
  data: P.shape({
    street1: P.string.isRequired,
    street2: P.string.isRequired,
    area: P.string.isRequired,
    city: P.string.isRequired,
    state: P.string.isRequired,
    country: P.string.isRequired,
    pincode: P.string.isRequired,
    type: P.string.isRequired
  }).isRequired
}

const AllAddress = (props) => {
  const allAddress = props.data
  const mappedAddress = allAddress.map((data, index) => (<Address key={`Address:${index}`} data={data} />))
  return (
    <div>
      <h4>Address</h4>
      <Row>
        {mappedAddress}
      </Row>
    </div>
  )
}
AllAddress.propTypes = {
  data: P.arrayOf(P.shape({
    street1: P.string.isRequired,
    street2: P.string.isRequired,
    area: P.string.isRequired,
    city: P.string.isRequired,
    state: P.string.isRequired,
    country: P.string.isRequired,
    pincode: P.string.isRequired,
    type: P.string.isRequired
  })).isRequired
}

export default AllAddress
