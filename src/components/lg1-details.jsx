import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import DetailsBox from "./details-components/details-box";
import StarsBar from "./details-components/stars-bar";
import SubheadingSeparator from "./details-components/subheading-separator";
import EventDurationHeading from "./details-components/event-duration-heading";
import LG1 from "../models/lg1";
import Table from "./details-components/table";
import Title from "./details-components/title";

export default function LG1Details() {
  const reign = new LG1();
  return (
    <div className="details pt-5">
      <Container>
        <Title>
          <h1>
            | Event Wish "Reign of <span className="purple">Serenity</span>"
          </h1>
        </Title>
        <SubheadingSeparator content="Increased Drop Rates!" />
        <StarsBar
          starCount={5}
          content="Percentage of 5-Star Item Drops：50.000%"
          bgColor="#dcbba5"
        />
        <StarsBar
          starCount={4}
          content="Percentage of 4-Star Item Drops：50.000%"
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
          </Col>
        </Row>
        <StarsBar
          starCount={5}
          content="Base Probability for 5-Star Item Drops: 0.600% (Incl. guarantee: 1.600%)"
          bgColor="#dcbba5"
        />
        <Table items={reign.getDrops(5)} />
        <StarsBar
          starCount={4}
          content="Base Probability for 4-Star Item Drops: 5.100% (Incl. guarantee: 13.000%)"
          bgColor="#b6abbf"
        />
        <Table items={reign.getDrops(4)} />
        <StarsBar
          starCount={3}
          content="Base Probability for 3-Star Item Drops: 94.300% (Incl. guarantee: 85.400%)"
          bgColor="#a5bacc"
        />
        <Table items={reign.getDrops(3)} />
      </Container>
    </div>
  );
}
