import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import StarsBar from './details-components/stars-bar';
import SubheadingSeparator from './details-components/subheading-separator';
import EventDurationHeading from './details-components/event-duration-heading'
import K3 from '../models/k3'
import Table from './details-components/table'
import Title from './details-components/title'

export default function K3Details() {
  const wanderlust = new K3()
  return (
    <div className="details pt-5">
      <Container>
        <Title>
          <h1>
            TT Veggie Menu Customization
          </h1>
        </Title>
        <SubheadingSeparator content="TO BE DEVELOPED" />
        <EventDurationHeading
          content="Permanent"
        />
        <Row>
          <Col xs="12">
          <p className="my-3">
            〓Rules〓
          </p>
            <h4 className="my-3 brass">
              Items to wish for:
            </h4>
          </Col>
        </Row>
        <StarsBar
          starCount={5}
          content="Base Probability for 5-Star Item Drops: 0.600% (Incl. guarantee: 1.600%)"
          bgColor="#dcbba5"
        />
        <Table
          items={wanderlust.getDrops(5)}
        />
        <StarsBar
          starCount={4}
          content="Base Probability for 4-Star Item Drops: 5.100% (Incl. guarantee: 13.000%)"
          bgColor="#b6abbf"
        />
        <Table
          items={wanderlust.getDrops(4)}
        />
        <StarsBar
          starCount={3}
          content="Base Probability for 3-Star Item Drops: 94.300% (Incl. guarantee: 85.400%)"
          bgColor="#a5bacc"
        />
        <Table
          items={wanderlust.getDrops(3)}
        />
      </Container>
    </div>
  )

}
