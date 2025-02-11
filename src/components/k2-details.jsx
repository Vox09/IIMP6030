import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import DetailsBox from "./details-components/details-box";
import StarsBar from "./details-components/stars-bar";
import SubheadingSeparator from "./details-components/subheading-separator";
import EventDurationHeading from "./details-components/event-duration-heading";
import Table from "./details-components/table";
import Title from "./details-components/title";
import K2 from "../models/k2";

export default function K2Details() {
  const k2 = new K2();

  return (
    <div className="details pt-5">
      <Container>
        <Title>
          <h1>
            Gold Rice Bowl Menu Customization
          </h1>
        </Title>
        <SubheadingSeparator content="TO BE DEVELOPED" />
        <StarsBar
          starCount={5}
          content="Percentage of 5-Star Item Drops：75.000%"
          bgColor="#dcbba5"
        />
        <StarsBar
          starCount={4}
          content="Percentage of 4-Star Item Drops：75.000%"
          bgColor="#b6abbf"
        />
        <SubheadingSeparator content="Wish Details" />
        <EventDurationHeading content="Limited Time Event" />
        <Row>
          <Col xs="12">
            
            <p className="my-3">〓Rules〓</p>
            <p className="my-3">5-Star Items</p>
            
            <p className="my-3">4-Star Items</p>
            
           
            <h4 className="my-3 brass">Items to wish for:</h4>
            <StarsBar
              starCount={5}
              content="Base Probability for 5-Star Item Drops: 0.700% (Incl. guarantee: 1.850%)"
              bgColor="#dcbba5"
            />
            <Table items={k2.getDrops(5)} />
            <StarsBar
              starCount={4}
              content="Base Probability for 4-Star Item Drops: 6.000% (Incl. guarantee: 14.500%)"
              bgColor="#b6abbf"
            />
            <Table items={k2.getDrops(4)} />
            <StarsBar
              starCount={3}
              content="Base Probability for 3-Star Item Drops: 93.300% (Incl. guarantee: 83.650%)"
              bgColor="#a5bacc"
            />
            <Table items={k2.getDrops(3)} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
