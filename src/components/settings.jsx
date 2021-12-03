import React, { Component } from 'react'
import { Container, Row, Col, Badge, Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class Settings extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {
      reset,
      closeSettings
    } = this.props
    return (
      <div
        onClick={closeSettings}
        className="modal-container">
        <div
          onClick={e => e.stopPropagation()}
          className="settings-modal">
          <div className="settings-modal-content p-2">
            <div
              onClick={closeSettings}
              className="close-button"></div>
            <h2>Settings</h2>
            <Container>
              <Row>
                <Col xs="12">
                  <div className="button-container justify-content-around my-2">
                    <button
                    onClick={() => {
                        reset()
                        closeSettings()
                    }}
                    type="button">Reset Inventory</button>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    )
  }
}
