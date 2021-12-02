import React from 'react'
import { Row, Col } from 'reactstrap';
import ReactStars from "react-rating-stars-component";
const foodDetailsThumbs = require.context('../../assets/images/foods')
export default function ListView(props) {
  const {name, type, rating, src, quantity} = props.item
  return (
    <Col
      xs="12"
      className="card my-2 p-2"
    >
      <div className="list-item">
        <Row>
          <Col xs='3' className="d-flex justify-content-center align-items-center">
            <img
            src={foodDetailsThumbs(`./${src}`).default }
            className="img-fluid"
            style={{
              maxHeight: '64px'
            }}
            />
          </Col>
          <Col xs='3' className="d-flex justify-content-center align-items-center">
            {name}
          </Col>
          <Col xs='3' className="d-flex justify-content-center align-items-center">
            <ReactStars
              count={rating}
              size={15}
              edit={false}
              color="#ffd700"
            />
          </Col>
          <Col xs='3' className="d-flex justify-content-center align-items-center">
            X {quantity}
          </Col>
        </Row>
      </div>
    </Col>
  )
}
