import React from 'react'
import { Row, Col } from 'reactstrap';

const foodBackgrounds = require.context('../../assets/images/details/food-backgrounds');
const foodDetailsThumbs = require.context('../../assets/images/details/foods')
export default function DetailsBox(props) {
  const {src, title, element} = props
  return (
    <Col
    xs="12"
    sm="6"
    md="4"
    className="details-box my-3"
    style={{
      backgroundImage: `url('${foodBackgrounds('./background.jpg').default}')`
    }}
    >
      <Row className="h-100 align-items-center p-4">
        <Col xs="4">
          <img src={foodDetailsThumbs(`./${src}`).default} className="img-fluid" />
        </Col>
        <Col xs="8">
          <h5 className="text-white text-capitalize">
            {title}
          </h5>
          <hr className="text-white"/>
        </Col>
      </Row>
    </Col>
  )
}
