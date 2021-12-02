import React from 'react'
import { Col, Row } from 'reactstrap';
import ReactStars from "react-rating-stars-component";
const foodImages = require.context('../assets/images/foods');
export default function WishItem(props) {
  const { isNewItem } = props
  const {src, name, rating} = props.item
  const backgroundImage = `url('${foodImages('./' + src).default}')`
  return (
      <Col
      xs="12"
      className="h-100 p-4"
      >
        <Row
        className="wish-item-single-container h-100 p-2"
        >
        {
          isNewItem && <span className="new-badge">New</span>
        }
          <Col
            className="h-100 d-flex flex-column justify-content-center align-items-center wish-item-single-content"
            >
            <div
              className="text-center text-wrap pb-1">{name}</div>
            <ReactStars
              count={rating}
              size={24}
              edit={false}
              color="#ffd700"
              classNames={"justify-content-center"}
            />
          </Col>
          <Col
            className="wish-item-single h-100 w-100"
            style={{
              backgroundImage,
              backgroundSize: 'contain'
            }}
            sm="12"
            md="9"
            >
          </Col>
        </Row>
      </Col>
  )
}
