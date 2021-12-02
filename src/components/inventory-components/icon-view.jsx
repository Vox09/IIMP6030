import React from 'react'
import { Row, Col } from 'reactstrap';
import ReactStars from "react-rating-stars-component";
import foodBackground from '../../assets/images/details/food-backgrounds/background.jpg'

const foodDetailsThumbs = require.context('../../assets/images/foods')

export default function IconView(props) {
  const { name, type, rating, src, quantity } = props.item
  const backgroundStyle = {
    backgroundImage: `url('${foodBackground}')`
  }

  return(
    <Col
      lg="6"
      xl="4"
      className="m-2 p-3 text-center icon-item"
      style={backgroundStyle}
    >
        <Row className="h-100">
          <Col
          xs='6'
          className="d-flex justify-content-center align-items-center">
            <Row>
            <Col xs='12' className='d-flex justify-content-center align-items-center'>
              <img
                src={foodDetailsThumbs(`./${src}`).default}
                className="img-fluid"
                style={{
                  maxHeight: '64px'
                }}
              />
              </Col>
            <Col xs='12' className="d-flex justify-content-center align-items-center mt-2">
              {name}
            </Col>
            </Row>
          </Col>
          <Col
          xs='6'
          >
          <Row className='justify-content-center align-items-center h-100'>
            <Col
              xs='12'
              className="d-flex justify-content-center align-items-center p-0">
              <ReactStars
                count={rating}
                size={16}
                edit={false}
                color="#ffd700"
              />
            </Col>
            <Col
              xs='12'
              className="d-flex justify-content-center align-items-center">
              X {quantity}
            </Col>
            </Row>
          </Col>
        </Row>
    </Col>
  )
}
